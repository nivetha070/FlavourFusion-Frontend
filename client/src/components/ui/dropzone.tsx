import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';

interface DropzoneProps {
  onFilesSelected: (files: File[]) => void;
  className?: string;
  maxFiles?: number;
  maxSize?: number;
  accept?: Record<string, string[]>;
  disabled?: boolean;
}

export function Dropzone({
  onFilesSelected,
  className,
  maxFiles = 1,
  maxSize = 10 * 1024 * 1024, // 10MB
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.heic', '.webp']
  },
  disabled = false
}: DropzoneProps) {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles?.length > 0) {
      onFilesSelected(acceptedFiles);
    }
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept,
    disabled,
    onDropRejected: (fileRejections) => {
      const errors: string[] = [];
      fileRejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          if (error.code === 'file-too-large') {
            errors.push(`File is too large. Max size is ${maxSize / 1024 / 1024}MB`);
          } else if (error.code === 'file-invalid-type') {
            errors.push('Invalid file type. Please upload an image file.');
          } else if (error.code === 'too-many-files') {
            errors.push(`Too many files. Max allowed is ${maxFiles}`);
          } else {
            errors.push(error.message);
          }
        });
      });
      setError(errors[0] || 'Error uploading file');
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className={cn(
        'border-2 border-dashed rounded-xl p-8 text-center bg-white transition cursor-pointer',
        isDragActive ? 'border-primary bg-primary/5' : 'border-neutral-300 hover:border-primary',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-neutral-400 mb-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
          <path d="M12 12v9"></path>
          <path d="m8 17 4-4 4 4"></path>
        </svg>
        <h3 className="font-semibold mb-2">Drag & Drop Your Image Here</h3>
        <p className="text-neutral-600 text-sm mb-4">or</p>
        <button 
          type="button" 
          className="bg-primary hover:bg-primary-dark text-white py-2 px-5 rounded-full text-sm transition"
          onClick={(e) => e.stopPropagation()}
        >
          Browse Files
        </button>
        <p className="text-xs text-neutral-500 mt-3">Supports: JPG, PNG, HEIC</p>
        {error && (
          <div className="mt-3 text-destructive text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
