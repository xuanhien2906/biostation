import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../utils/supabaseClient';
import imageCompression from 'browser-image-compression';
import { Upload, Trash2, CheckCircle2, Image as ImageIcon, Loader2, X } from 'lucide-react';

interface MediaLibraryProps {
  onSelectImage?: (url: string) => void;
  onClose?: () => void;
  standalone?: boolean;
}

interface MediaFile {
  name: string;
  url: string;
  created_at: string;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ onSelectImage, onClose, standalone = false }) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage.from('biostation_images').list('', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      });

      if (error) throw error;

      if (data) {
        // Filter out the empty placeholder file if exists
        const validFiles = data.filter(f => f.name !== '.emptyFolderPlaceholder');
        
        const filesWithUrl = validFiles.map(file => {
          const { data: publicUrlData } = supabase.storage.from('biostation_images').getPublicUrl(file.name);
          return {
            name: file.name,
            created_at: file.created_at,
            url: publicUrlData.publicUrl
          };
        });
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
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    // Limit to 20 files at once
    const filesArray = Array.from(selectedFiles).slice(0, 20);
    setUploading(true);
    setUploadProgress(0);

    let completed = 0;

    for (const file of filesArray) {
      try {
        // Compress image
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        
        // Generate unique name
        const fileExt = compressedFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;

        // Upload to Supabase
        const { error: uploadError } = await supabase.storage
          .from('biostation_images')
          .upload(fileName, compressedFile);

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

  const handleDelete = async (e: React.MouseEvent, fileName: string) => {
    e.stopPropagation();
    if (!window.confirm('Bạn có chắc chắn muốn xóa ảnh này khỏi Kho không?')) return;
    
    try {
      const { error } = await supabase.storage.from('biostation_images').remove([fileName]);
      if (error) throw error;
      setFiles(files.filter(f => f.name !== fileName));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Không thể xóa ảnh. Vui lòng thử lại.');
    }
  };

  const content = (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-[#f0e6d8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#274e23] flex items-center gap-2">
            <ImageIcon className="w-6 h-6" />
            Kho Ảnh Tổng (Media Library)
          </h2>
          <p className="text-sm text-stone-500 mt-1">Quản lý và sử dụng lại tất cả hình ảnh. Tải lên tối đa 20 ảnh/lần, tự động nén.</p>
        </div>
        
        <div className="flex items-center gap-3">
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
            className="px-4 py-2.5 bg-[#274e23] hover:bg-[#1e3e1a] text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow disabled:opacity-50"
          >
            {uploading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Đang Nén & Tải Lên ({uploadProgress}%)</>
            ) : (
              <><Upload className="w-4 h-4" /> Tải Ảnh Lên Kho</>
            )}
          </button>
          {!standalone && onClose && (
            <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-500 transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto bg-stone-50">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-stone-400">
            <Loader2 className="w-8 h-8 animate-spin mb-4" />
            <p>Đang tải Kho Ảnh...</p>
          </div>
        ) : files.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-stone-400 border-2 border-dashed border-stone-200 rounded-2xl bg-white">
            <ImageIcon className="w-12 h-12 mb-4 text-stone-300" />
            <p className="font-medium text-stone-500">Kho ảnh đang trống</p>
            <p className="text-sm mt-1">Hãy bấm "Tải Ảnh Lên Kho" để bắt đầu lưu trữ.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {files.map((file) => (
              <div
                key={file.name}
                onClick={() => onSelectImage && onSelectImage(file.url)}
                className={`relative group rounded-xl overflow-hidden border-2 transition-all bg-white shadow-sm ${onSelectImage ? 'cursor-pointer hover:border-[#274e23] hover:shadow-md' : 'border-transparent'}`}
              >
                <div className="aspect-square bg-stone-100 flex items-center justify-center relative">
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {onSelectImage && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  )}
                </div>
                <div className="p-2 truncate text-[10px] text-stone-500 flex justify-between items-center">
                  <span className="truncate flex-1 pr-2" title={file.name}>{file.name}</span>
                  <button
                    onClick={(e) => handleDelete(e, file.name)}
                    className="text-red-500 hover:text-red-700 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Xóa ảnh"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (standalone) return content;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-8">
      <div className="w-full max-w-6xl h-full max-h-[90vh] shadow-2xl">
        {content}
      </div>
    </div>
  );
};
