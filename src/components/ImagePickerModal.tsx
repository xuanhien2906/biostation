import React, { useState, useRef } from 'react';
import { supabase } from '../utils/supabaseClient';
import imageCompression from 'browser-image-compression';
import { X, Upload, Link as LinkIcon, Image as ImageIcon, Camera, Loader2 } from 'lucide-react';
import { ImageCropperModal } from './ImageCropperModal';
import { MediaLibrary } from './MediaLibrary';

interface ImagePickerModalProps {
  onClose: () => void;
  onSelect: (url: string) => void;
  aspect?: number;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  onClose,
  onSelect,
  aspect = 1,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'library' | 'url'>('upload');
  
  // URL Tab state
  const [urlInput, setUrlInput] = useState('');

  // Upload Tab state
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setRawImageSrc(reader.result?.toString() || null));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    setRawImageSrc(null); // close cropper
    setIsUploading(true);
    try {
      // Compress
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      };
      // Note: croppedBlob is a Blob, imageCompression expects a File. 
      // We wrap it in a File object.
      const fileToCompress = new File([croppedBlob], 'cropped.jpg', { type: 'image/jpeg' });
      const compressedFile = await imageCompression(fileToCompress, options);

      // Upload to Supabase
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('biostation_images')
        .upload(fileName, compressedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: publicUrlData } = supabase.storage.from('biostation_images').getPublicUrl(fileName);
      onSelect(publicUrlData.publicUrl);
    } catch (err) {
      console.error('Error processing and uploading image:', err);
      alert('Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {rawImageSrc && (
        <ImageCropperModal
          imageSrc={rawImageSrc}
          aspect={aspect}
          onClose={() => setRawImageSrc(null)}
          onCropComplete={handleCropComplete}
        />
      )}

      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#f0e6d8]">
          <h3 className="font-bold text-xl text-[#274e23]">Chọn Hình Ảnh</h3>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex border-b border-[#f0e6d8]">
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'upload' ? 'border-b-2 border-[#274e23] text-[#274e23]' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Camera className="w-4 h-4" /> Chụp / Tải Mới
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'library' ? 'border-b-2 border-[#274e23] text-[#274e23]' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> Từ Kho Ảnh
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'url' ? 'border-b-2 border-[#274e23] text-[#274e23]' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-50'
            }`}
          >
            <LinkIcon className="w-4 h-4" /> Dán Link
          </button>
        </div>

        <div className="p-6 min-h-[400px]">
          {activeTab === 'upload' && (
            <div className="h-full flex flex-col items-center justify-center">
              {isUploading ? (
                <div className="flex flex-col items-center text-[#274e23]">
                  <Loader2 className="w-10 h-10 animate-spin mb-4" />
                  <p className="font-bold">Đang Xử Lý & Tải Lên...</p>
                  <p className="text-sm text-stone-500 mt-2">Vui lòng chờ trong giây lát</p>
                </div>
              ) : (
                <div className="text-center w-full max-w-sm">
                  <div className="mb-6 mx-auto w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center text-stone-400">
                    <Camera className="w-10 h-10" />
                  </div>
                  <h4 className="font-bold text-lg text-stone-800 mb-2">Tải ảnh lên hoặc Chụp mới</h4>
                  <p className="text-sm text-stone-500 mb-8">Ảnh sẽ được cho phép cắt (crop) và tự động nén nhỏ để tối ưu tốc độ website.</p>
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3.5 bg-[#274e23] hover:bg-[#1e3e1a] text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow"
                  >
                    <Upload className="w-5 h-5" /> Chọn / Chụp Ảnh
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'library' && (
            <div className="h-full -m-6 h-[400px]">
               <MediaLibrary 
                  standalone={true} 
                  onSelectImage={(url) => onSelect(url)} 
               />
            </div>
          )}

          {activeTab === 'url' && (
            <div className="h-full flex flex-col items-center justify-center max-w-md mx-auto w-full">
              <div className="mb-6 w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-400">
                <LinkIcon className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg text-stone-800 mb-2">Sử Dụng Đường Dẫn Ảnh</h4>
              <p className="text-sm text-stone-500 mb-6 text-center">Dán đường dẫn (URL) hình ảnh từ Google Drive hoặc các trang web khác.</p>
              
              <div className="w-full space-y-4">
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full p-3.5 rounded-xl border-2 border-[#dcd0bf] focus:border-[#274e23] focus:ring-4 focus:ring-[#274e23]/10 transition-all outline-none"
                />
                <button
                  onClick={() => urlInput && onSelect(urlInput)}
                  disabled={!urlInput}
                  className="w-full py-3.5 bg-[#274e23] hover:bg-[#1e3e1a] text-white rounded-xl font-bold flex items-center justify-center transition-all disabled:opacity-50"
                >
                  Xác Nhận Dùng Link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
