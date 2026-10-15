import React, { useState } from 'react';
import { Loader2, Upload, X } from 'lucide-react';

interface FileUploadProps {
  onUpload: (url: string) => void;
}

export default function FileUpload({ onUpload }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate size (28MB limit)
    if (file.size > 28 * 1024 * 1024) {
      setError("Max file size warning: 28MB per image (ImgBB limit)");
      return;
    }

    // Validate format
    if (!file.type.startsWith('image/')) {
      setError("Accepted formats: Images only");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      // Use API key from environment variable
      const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("ImgBB API key is missing");
      }
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        onUpload(data.data.url);
      } else {
        throw new Error(data.error.message || "Image upload failed, try again");
      }
    } catch (err) {
      setError("Image upload failed, try again");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-cyan-500/50 transition">
        <div className="flex flex-col items-center gap-2">
          {uploading ? (
            <Loader2 className="w-8 h-8 animate-spin text-cyan-500" />
          ) : (
            <>
              <Upload className="w-8 h-8 text-neutral-400" />
              <span className="text-sm text-neutral-400">Click to upload screenshot</span>
            </>
          )}
        </div>
        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
