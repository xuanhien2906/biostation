import React, { useState } from 'react';
import { X, Trash2, Edit2, Check, Loader2 } from 'lucide-react';
import { supabase } from '../utils/supabaseClient';
import { deleteStorageFile } from '../utils/storageHelper';
import { ImageCropperModal } from './ImageCropperModal';
import imageCompression from 'browser-image-compression';

interface ImageDetailsModalProps {
  url: string;
  onClose: () => void;
  onDeleteSuccess: () => void;
  onSelect?: (url: string) => void;
  currentPath?: string;
  onRefresh?: () => void;
}

export const ImageDetailsModal: React.FC<ImageDetailsModalProps> = ({
  url,
  onClose,
  onDeleteSuccess,
  onSelect,
  currentPath = '',
  onRefresh,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showCropper, setShowCropper] = useState(false);

  /**
   * Trích xuất đường dẫn file từ URL Supabase Storage.
   * URL format: .../storage/v1/object/public/biostation_images/path/to/file.jpg
   */
  const extractFilePath = (imageUrl: string): string | null => {
    try {
      const urlObj = new URL(imageUrl);
      // Try multiple split patterns to handle different URL formats
      const patterns = ['/biostation_images/', 'biostation_images/'];
      for (const pattern of patterns) {
        const idx = urlObj.pathname.indexOf(pattern);
        if (idx !== -1) {
          const raw = urlObj.pathname.substring(idx + pattern.length);
          return decodeURIComponent(raw);
        }
      }
      // Fallback: try from the full URL string
      for (const pattern of patterns) {
        const idx = imageUrl.indexOf(pattern);
        if (idx !== -1) {
          const raw = imageUrl.substring(idx + pattern.length).split('?')[0];
          return decodeURIComponent(raw);
        }
      }
      return null;
    } catch {
      return null;
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bạn có chắc chắn muốn xoá ảnh này? (Không thể hoàn tác)')) return;
    try {
      setIsDeleting(true);

      const filePath = extractFilePath(url);
      if (!filePath) {
        alert('Không thể xác định đường dẫn ảnh từ URL.');
        return;
      }

      console.log('[ImageDetailsModal] Đang xóa file:', filePath);

      // Sử dụng storageHelper với cơ chế fallback đa lớp
      const result = await deleteStorageFile('biostation_images', filePath);

      if (result.success) {
        console.log('[ImageDetailsModal] Xóa thành công!');
        onDeleteSuccess();
        if (typeof onRefresh === 'function') onRefresh();
      } else {
        throw new Error(result.error || 'Xóa thất bại không rõ lý do');
      }
    } catch (error) {
      console.error('Lỗi khi xoá:', error);
      alert(`Lỗi khi xoá ảnh: ${(error as any)?.message || JSON.stringify(error)}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditComplete = async (croppedBlob: Blob) => {
    try {
      setIsUploading(true);
      setShowCropper(false);

      // Compress
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
      };
      const fileToCompress = new File([croppedBlob], 'edited.jpg', { type: 'image/jpeg' });
      const compressedFile = await imageCompression(fileToCompress, options);

      // Generate new name in current path
      const fileName = `edited_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.jpg`;
      const fullPath = currentPath ? `${currentPath}/${fileName}` : fileName;

      const { error: uploadError } = await supabase.storage
        .from('biostation_images')
        .upload(fullPath, compressedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Refresh list & close modal
      if (typeof onRefresh === 'function') onRefresh();
      onDeleteSuccess();
    } catch (error) {
      console.error('Lỗi lưu ảnh chỉnh sửa:', error);
      alert(`Không thể lưu ảnh đã chỉnh sửa: ${(error as any)?.message || ''}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/95 flex flex-col backdrop-blur-md">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between p-4 pt-14 md:pt-4 border-b border-white/10 gap-4">
        <button 
          onClick={onClose} 
          className="p-2 hover:bg-white/10 rounded-full transition-colors text-white flex-shrink-0"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {onSelect && (
            <button
              onClick={() => onSelect(url)}
              className="flex items-center gap-2 px-4 py-2 bg-[#274e23] hover:bg-[#1e3e1a] text-white rounded-xl font-bold text-sm transition-colors whitespace-nowrap"
            >
              <Check className="w-4 h-4" /> Sử dụng ảnh
            </button>
          )}
          <button
            onClick={() => setShowCropper(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-colors whitespace-nowrap"
          >
            <Edit2 className="w-4 h-4" /> Cắt / Xoay
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting || isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-xl font-bold text-sm transition-colors whitespace-nowrap"
          >
            {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            {isDeleting ? 'Đang xoá...' : 'Xoá ảnh'}
          </button>
        </div>
      </div>
      
      {/* Image Container */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
        {isUploading && (
          <div className="absolute inset-0 z-10 bg-black/60 flex flex-col items-center justify-center text-white">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p className="font-bold">Đang lưu ảnh chỉnh sửa...</p>
          </div>
        )}
        <img 
          src={url} 
          alt="Preview" 
          className="max-w-full max-h-full object-contain rounded-lg ring-1 ring-white/10 shadow-2xl"
        />
      </div>

      {showCropper && (
        <ImageCropperModal
          imageSrc={url}
          onClose={() => setShowCropper(false)}
          aspect={undefined} // Free crop mode
          onCropComplete={handleEditComplete}
        />
      )}
    </div>
  );
};
