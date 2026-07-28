import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabaseClient';
import imageCompression from 'browser-image-compression';
import { Upload, Trash2, CheckCircle2, Image as ImageIcon, Loader2, X, Folder, FolderPlus, MoveRight, ChevronRight, Home } from 'lucide-react';
import { ImageDetailsModal } from './ImageDetailsModal';

interface MediaLibraryProps {
  onSelectImage?: (url: string) => void;
  onClose?: () => void;
  standalone?: boolean;
}

interface MediaFile {
  name: string;
  url: string;
  created_at: string;
  fullPath: string;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onSelectImage, onClose, standalone = false }) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [directories, setDirectories] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>('');
  
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [selectedFileForDetails, setSelectedFileForDetails] = useState<MediaFile | null>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage.from('biostation_images').list(currentPath, {
        limit: 500,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      });

      if (error) throw error;

      if (data) {
        // Folders have id: null
        const dirs = data
          .filter(f => f.id === null && f.name !== '.emptyFolderPlaceholder')
          .map(f => f.name);
          
        const validFiles = data.filter(f => f.id !== null && f.name !== '.emptyFolderPlaceholder');
        
        const filesWithUrl = validFiles.map(file => {
          const fullPath = currentPath ? `${currentPath}/${file.name}` : file.name;
          const { data: publicUrlData } = supabase.storage.from('biostation_images').getPublicUrl(fullPath);
          return {
            name: file.name,
            created_at: file.created_at,
            fullPath: fullPath,
            url: publicUrlData.publicUrl
          };
        });
        
        setDirectories(dirs);
        setFiles(filesWithUrl);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [currentPath]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const filesArray = Array.from(selectedFiles).slice(0, 20);
    setUploading(true);
    setUploadProgress(0);

    let completed = 0;

    for (const file of filesArray) {
      try {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1280,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        
        const fileExt = compressedFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const fullPath = currentPath ? `${currentPath}/${fileName}` : fileName;

        const { error: uploadError } = await supabase.storage
          .from('biostation_images')
          .upload(fullPath, compressedFile);

        if (uploadError) throw uploadError;
      } catch (err) {
        console.error(`Error uploading ${file.name}:`, err);
      } finally {
        completed++;
        setUploadProgress(Math.round((completed / filesArray.length) * 100));
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    fetchFiles();
  };

  const handleCreateFolder = async () => {
    const folderName = prompt('Nhập tên thư mục mới (không dùng dấu cách, ký tự đặc biệt):');
    if (!folderName) return;
    
    // basic sanitize
    const cleanName = folderName.replace(/[^a-zA-Z0-9_-]/g, '');
    if (!cleanName) {
      alert('Tên thư mục không hợp lệ.');
      return;
    }

    const fullPath = currentPath ? `${currentPath}/${cleanName}/.emptyFolderPlaceholder` : `${cleanName}/.emptyFolderPlaceholder`;
    
    try {
      setLoading(true);
      const dummyBlob = new Blob([''], { type: 'text/plain' });
      const { error } = await supabase.storage.from('biostation_images').upload(fullPath, dummyBlob);
      if (error) throw error;
      fetchFiles();
    } catch (error) {
      console.error('Lỗi tạo thư mục:', error);
      alert('Không thể tạo thư mục.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFolder = async (e: React.MouseEvent, dirName: string) => {
    e.stopPropagation();
    if (!window.confirm(`Bạn có chắc muốn xoá thư mục "${dirName}" và TOÀN BỘ ảnh bên trong?`)) return;
    
    try {
      setLoading(true);
      const dirPath = currentPath ? `${currentPath}/${dirName}` : dirName;
      // List all files in this dir
      const { data, error } = await supabase.storage.from('biostation_images').list(dirPath, { limit: 1000 });
      if (error) throw error;
      
      const filesToRemove = data.map(f => `${dirPath}/${f.name}`);
      // Also remove the empty placeholder if exists
      filesToRemove.push(`${dirPath}/.emptyFolderPlaceholder`);
      
      if (filesToRemove.length > 0) {
        await supabase.storage.from('biostation_images').remove(filesToRemove);
      }
      fetchFiles();
    } catch (error) {
      console.error('Error deleting folder:', error);
      alert('Lỗi khi xoá thư mục.');
    } finally {
      setLoading(false);
    }
  };

  const handleMoveFile = async (e: React.MouseEvent, file: MediaFile) => {
    e.stopPropagation();
    const destDir = prompt('Nhập tên thư mục đích (để trống để di chuyển ra Trang chủ):', '');
    if (destDir === null) return; // cancelled
    
    const cleanDestDir = destDir.replace(/[^a-zA-Z0-9_-]/g, '');
    const newPath = cleanDestDir ? `${cleanDestDir}/${file.name}` : file.name;
    
    try {
      setLoading(true);
      const { error } = await supabase.storage.from('biostation_images').move(file.fullPath, newPath);
      if (error) throw error;
      fetchFiles();
    } catch (error) {
      console.error('Error moving file:', error);
      alert('Lỗi khi di chuyển file. Lưu ý: Thư mục đích phải tồn tại.');
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (path: string) => {
    setCurrentPath(path);
  };

  const renderBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean);
    return (
      <div className="flex items-center gap-1 text-sm font-semibold text-[#5c4d43] mb-4 overflow-x-auto no-scrollbar pb-1">
        <button onClick={() => navigateTo('')} className="flex items-center gap-1 hover:text-[#274e23] transition-colors whitespace-nowrap">
          <Home className="w-4 h-4" /> Trang chủ
        </button>
        {parts.map((part, index) => {
          const path = parts.slice(0, index + 1).join('/');
          return (
            <React.Fragment key={path}>
              <ChevronRight className="w-4 h-4 text-stone-300 flex-shrink-0" />
              <button 
                onClick={() => navigateTo(path)} 
                className="hover:text-[#274e23] transition-colors whitespace-nowrap"
              >
                {part}
              </button>
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  const content = (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-inner">
      <div className="p-4 sm:p-6 border-b border-[#f0e6d8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#fbf8f3]">
        <div>
          <h2 className="text-xl font-bold text-[#274e23] flex items-center gap-2">
            <ImageIcon className="w-6 h-6" />
            Kho Ảnh Đám Mây (Media Library)
          </h2>
          <p className="text-sm text-stone-500 mt-1">Quản lý thư mục, di chuyển, chỉnh sửa và tải ảnh hàng loạt.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={handleCreateFolder}
            className="px-4 py-2.5 bg-white border border-[#dcd0bf] hover:bg-[#f0e6d8] text-[#2d241e] rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <FolderPlus className="w-4 h-4 text-amber-600" /> Tạo thư mục
          </button>
          
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="px-4 py-2.5 bg-[#274e23] hover:bg-[#1e3e1a] text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
          >
            {uploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Đang tải lên ({uploadProgress}%)</>
            ) : (
              <><Upload className="w-4 h-4" /> Tải ảnh lên đây</>
            )}
          </button>
          {!standalone && onClose && (
            <button onClick={onClose} className="p-2 hover:bg-[#e6dbc8] rounded-full text-stone-500 transition-colors bg-white border border-[#dcd0bf]">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6 flex-1 overflow-y-auto bg-stone-50/50">
        {renderBreadcrumbs()}

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p>Đang đồng bộ dữ liệu...</p>
          </div>
        ) : directories.length === 0 && files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-stone-400 border-2 border-dashed border-[#dcd0bf] rounded-2xl bg-white">
            <ImageIcon className="w-12 h-12 mb-4 text-stone-300" />
            <p className="font-medium text-stone-500">Thư mục trống</p>
            <p className="text-sm mt-1">Hãy bấm "Tải ảnh lên" hoặc "Tạo thư mục" để bắt đầu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            
            {/* Render Directories */}
            {directories.map(dir => (
              <div
                key={dir}
                onClick={() => navigateTo(currentPath ? `${currentPath}/${dir}` : dir)}
                className="group relative flex flex-col items-center justify-center p-4 bg-white rounded-xl border-2 border-[#e2d5c3] hover:border-amber-400 hover:shadow-md cursor-pointer transition-all h-36"
              >
                <Folder className="w-12 h-12 text-amber-400 mb-2 group-hover:scale-110 transition-transform" fill="currentColor" />
                <span className="text-xs font-bold text-center w-full truncate text-[#2d241e]" title={dir}>{dir}</span>
                
                <button
                  onClick={(e) => handleDeleteFolder(e, dir)}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-red-100 text-red-500 rounded-lg opacity-0 md:opacity-0 group-hover:opacity-100 transition-opacity border border-red-200 shadow-sm"
                  title="Xoá thư mục"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}

            {/* Render Files */}
            {files.map((file) => (
              <div
                key={file.name}
                onClick={() => setSelectedFileForDetails(file)}
                className="relative group rounded-xl overflow-hidden border-2 border-transparent hover:border-[#274e23] hover:shadow-md transition-all bg-white cursor-pointer h-36"
              >
                <div className="w-full h-full bg-stone-100 flex items-center justify-center relative">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {onSelectImage && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <CheckCircle2 className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  )}
                </div>
                
                {/* Overlay actions (Move / Select) */}
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/80 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex justify-between items-end gap-1">
                  <span className="truncate text-[10px] text-white/90 flex-1 font-medium pb-0.5" title={file.name}>{file.name}</span>
                  <button
                    onClick={(e) => handleMoveFile(e, file)}
                    className="text-white hover:text-amber-400 p-1.5 bg-black/40 hover:bg-black/60 rounded-md transition-colors"
                    title="Di chuyển"
                  >
                    <MoveRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Details Modal */}
      {selectedFileForDetails && (
        <ImageDetailsModal
          url={selectedFileForDetails.url}
          currentPath={currentPath}
          onClose={() => setSelectedFileForDetails(null)}
          onDeleteSuccess={() => {
            setSelectedFileForDetails(null);
            fetchFiles();
          }}
          onSelect={onSelectImage ? () => {
            onSelectImage(selectedFileForDetails.url);
            setSelectedFileForDetails(null);
            if (onClose) onClose();
          } : undefined}
        />
      )}
    </div>
  );

  if (standalone) return content;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm p-2 sm:p-8">
      <div className="w-full max-w-6xl h-full sm:h-[90vh] sm:rounded-2xl overflow-hidden shadow-2xl">
        {content}
      </div>
    </div>
  );
};
