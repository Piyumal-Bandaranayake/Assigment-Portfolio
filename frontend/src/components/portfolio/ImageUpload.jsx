import React, { useCallback, useState } from 'react';
import {
  FiUploadCloud,
  FiImage,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiRefreshCw,
} from 'react-icons/fi';

/* ────────────────────────────────────────────────────────────
   Constants
──────────────────────────────────────────────────────────── */
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const ACCEPTED_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/* ────────────────────────────────────────────────────────────
   Upload helper using XHR so we get progress events
──────────────────────────────────────────────────────────── */
const uploadToCloudinary = (file, onProgress) =>
  new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('folder', 'portfolio');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', CLOUDINARY_URL);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve({ publicId: data.public_id, url: data.secure_url });
      } else {
        reject(new Error('Upload failed. Check your Cloudinary preset.'));
      }
    };

    xhr.onerror = () => reject(new Error('Network error during upload'));
    xhr.send(formData);
  });

/* ────────────────────────────────────────────────────────────
   Delete helper — calls our backend proxy
──────────────────────────────────────────────────────────── */
const deleteFromBackend = async (publicId, token) => {
  if (!publicId) return;
  await fetch('/api/upload/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ publicId }),
  });
};

/* ────────────────────────────────────────────────────────────
   ImageUpload Component
   Props:
     value        { publicId, url }   — current stored value
     onChange     fn({ publicId, url }) — called after upload/remove
     label        string              — optional label text
     hint         string              — optional hint below label
     token        string              — JWT for delete endpoint (optional)
     shape        'square' | 'circle' — preview shape (default square)
──────────────────────────────────────────────────────────── */
const ImageUpload = ({
  value = { publicId: '', url: '' },
  onChange,
  label = 'Upload Image',
  hint = 'PNG, JPG, JPEG, WEBP — max 5 MB',
  token = null,
  shape = 'square',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('idle'); // idle | uploading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const hasImage = Boolean(value?.url);

  /* ── Validate file before upload ── */
  const validateFile = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Only PNG, JPG, JPEG, and WEBP files are accepted.';
    }
    if (file.size > MAX_SIZE_BYTES) {
      return `File too large. Maximum size is 5 MB (this file is ${(file.size / 1024 / 1024).toFixed(1)} MB).`;
    }
    return null;
  };

  /* ── Core upload flow ── */
  const handleUpload = useCallback(
    async (file) => {
      const validationError = validateFile(file);
      if (validationError) {
        setStatus('error');
        setErrorMsg(validationError);
        return;
      }

      // If there is an existing image, delete it from Cloudinary first
      if (value?.publicId) {
        await deleteFromBackend(value.publicId, token).catch(() => {});
      }

      setStatus('uploading');
      setProgress(0);
      setErrorMsg('');

      try {
        const result = await uploadToCloudinary(file, setProgress);
        onChange(result);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setErrorMsg(err.message || 'Upload failed. Please try again.');
      }
    },
    [value, token, onChange]
  );

  /* ── Remove image ── */
  const handleRemove = async () => {
    if (value?.publicId) {
      await deleteFromBackend(value.publicId, token).catch(() => {});
    }
    onChange({ publicId: '', url: '' });
    setStatus('idle');
    setProgress(0);
    setErrorMsg('');
  };

  /* ── Drag events ── */
  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const onDragLeave = () => setIsDragging(false);
  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  /* ── File input change ── */
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
    e.target.value = ''; // reset so same file can be re-selected
  };

  const inputId = `img-upload-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const previewShape = shape === 'circle' ? 'rounded-full' : 'rounded-xl';

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Label */}
      {label && (
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <FiImage className="text-blue-500" />
          {label}
        </label>
      )}

      {/* ── Preview state ── */}
      {hasImage ? (
        <div className="relative group w-full">
          <img
            src={value.url}
            alt="Uploaded preview"
            className={`w-full object-cover border-2 border-gray-200 shadow-sm ${previewShape} ${
              shape === 'circle' ? 'aspect-square max-w-[160px] mx-auto' : 'max-h-52'
            }`}
          />

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity ${previewShape} ${
              shape === 'circle' ? 'max-w-[160px] mx-auto' : ''
            }`}
          >
            {/* Replace button */}
            <label
              htmlFor={inputId}
              className="flex items-center gap-1 text-xs bg-white text-gray-800 font-semibold px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors shadow"
            >
              <FiRefreshCw className="text-sm" />
              Replace
            </label>

            {/* Remove button */}
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center gap-1 text-xs bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors shadow"
            >
              <FiX className="text-sm" />
              Remove
            </button>
          </div>
        </div>
      ) : (
        /* ── Drop zone ── */
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative flex flex-col items-center justify-center gap-3 w-full min-h-[160px] border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-blue-500 bg-blue-50 scale-[1.01]'
              : status === 'error'
              ? 'border-red-400 bg-red-50'
              : 'border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/40'
          }`}
        >
          <label htmlFor={inputId} className="absolute inset-0 cursor-pointer" />

          {status === 'uploading' ? (
            /* Progress view */
            <div className="flex flex-col items-center gap-3 px-6 w-full pointer-events-none">
              <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
              <p className="text-sm font-medium text-blue-700">Uploading… {progress}%</p>
              <div className="w-full max-w-xs bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : status === 'error' ? (
            /* Error view */
            <div className="flex flex-col items-center gap-2 px-6 text-center pointer-events-none">
              <FiAlertCircle className="text-3xl text-red-400" />
              <p className="text-sm font-medium text-red-600">Upload failed</p>
              <p className="text-xs text-red-400">{errorMsg}</p>
              <p className="text-xs text-gray-400 mt-1">Click or drop a new file to retry</p>
            </div>
          ) : (
            /* Idle / drop hint view */
            <div className="flex flex-col items-center gap-2 px-6 text-center pointer-events-none">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isDragging ? 'bg-blue-100 scale-110' : 'bg-gray-100'
                }`}
              >
                <FiUploadCloud
                  className={`text-2xl transition-colors ${
                    isDragging ? 'text-blue-600' : 'text-gray-400'
                  }`}
                />
              </div>
              <p className="text-sm font-medium text-gray-600">
                {isDragging ? 'Drop to upload' : 'Drag & drop or click to upload'}
              </p>
              <p className="text-xs text-gray-400">{hint}</p>
            </div>
          )}
        </div>
      )}

      {/* Success badge */}
      {status === 'success' && hasImage && (
        <p className="text-xs text-green-600 flex items-center gap-1 font-medium">
          <FiCheckCircle />
          Uploaded successfully — hover the image to replace or remove it
        </p>
      )}

      {/* Hidden file input */}
      <input
        id={inputId}
        type="file"
        accept={ACCEPTED_TYPES.join(',')}
        onChange={onFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUpload;
