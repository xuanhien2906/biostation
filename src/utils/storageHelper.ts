import { supabase } from './supabaseClient';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://llkbikqnfqrdrmwslniw.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Xóa file trên Supabase Storage bằng REST API trực tiếp.
 * 
 * Lý do: supabase.storage.from().remove() dùng anon key
 * KHÔNG trả lỗi khi RLS chặn DELETE, nhưng file cũng không bị xóa.
 * Hàm này gọi trực tiếp REST endpoint và kiểm tra response status
 * để phát hiện lỗi RLS chính xác.
 * 
 * Nếu vẫn thất bại (403), sẽ fallback sang API backend (server-side).
 */
export async function deleteStorageFile(bucket: string, filePath: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Method 1: Try supabase JS client first
    const { data, error } = await supabase.storage.from(bucket).remove([filePath]);
    
    if (error) {
      console.warn('[deleteStorageFile] JS client error:', error.message);
      // Fall through to method 2
    } else {
      // The JS client returns data:[] with no error even when RLS blocks delete
      // We need to verify the file is actually gone
      const stillExists = await checkFileExists(bucket, filePath);
      if (!stillExists) {
        return { success: true };
      }
      console.warn('[deleteStorageFile] JS client returned success but file still exists. RLS likely blocking. Trying REST API...');
    }

    // Method 2: Direct REST API call
    const restResult = await deleteViaRestApi(bucket, filePath);
    if (restResult.success) {
      return { success: true };
    }

    // Method 3: Server-side API proxy (bypasses RLS with service_role)
    const serverResult = await deleteViaServer(bucket, filePath);
    return serverResult;

  } catch (err: any) {
    console.error('[deleteStorageFile] Unexpected error:', err);
    return { success: false, error: err.message || 'Lỗi không xác định khi xóa file' };
  }
}

/**
 * Kiểm tra xem file có tồn tại hay không.
 */
async function checkFileExists(bucket: string, filePath: string): Promise<boolean> {
  try {
    // Parse the path: "folder/file.jpg" -> folder = "folder", fileName = "file.jpg"
    const parts = filePath.split('/');
    const fileName = parts.pop()!;
    const folderPath = parts.join('/');

    const { data, error } = await supabase.storage.from(bucket).list(folderPath, {
      limit: 1000,
      search: fileName,
    });

    if (error) return true; // Assume exists if we can't check
    return data?.some(f => f.name === fileName) ?? false;
  } catch {
    return true; // Assume exists if error
  }
}

/**
 * Xóa file qua REST API trực tiếp (có thể bypass một số giới hạn của JS client).
 */
async function deleteViaRestApi(bucket: string, filePath: string): Promise<{ success: boolean; error?: string }> {
  try {
    const url = `${SUPABASE_URL}/storage/v1/object/${bucket}/${encodeURIComponent(filePath)}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
    });

    if (response.ok || response.status === 200) {
      // Verify
      const stillExists = await checkFileExists(bucket, filePath);
      if (!stillExists) {
        return { success: true };
      }
    }

    const errorBody = await response.text().catch(() => '');
    console.warn(`[deleteViaRestApi] Status: ${response.status}, Body: ${errorBody}`);
    return { success: false, error: `REST API: ${response.status} - ${errorBody}` };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

/**
 * Xóa file qua server API (dùng service_role key để bypass RLS).
 */
async function deleteViaServer(bucket: string, filePath: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/storage/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bucket, filePath }),
    });

    const result = await response.json();
    
    if (response.ok && result.success) {
      return { success: true };
    }

    return { success: false, error: result.error || `Server returned ${response.status}` };
  } catch (err: any) {
    return { success: false, error: `Server API unavailable: ${err.message}` };
  }
}

/**
 * Xóa nhiều file cùng lúc.
 */
export async function deleteMultipleStorageFiles(
  bucket: string, 
  filePaths: string[]
): Promise<{ success: boolean; errors: string[] }> {
  const errors: string[] = [];
  
  for (const fp of filePaths) {
    const result = await deleteStorageFile(bucket, fp);
    if (!result.success) {
      errors.push(`${fp}: ${result.error}`);
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}
