import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length) {
      setError("Only PDF files under 20MB are allowed.");
      return;
    }

    const uploadedFile = acceptedFiles[0];
    setFile(uploadedFile);
    setError(null);
    onFileSelect?.(uploadedFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024,
    multiple: false,
  });

  return (
    <div className="w-full gradient-border">
      <div
        {...getRootProps()}
        className={`transition-all duration-200 border-2 border-dashed rounded-xl p-6 
        ${isDragActive ? "ring-4 ring-green-400 scale-[1.01] border-green-400" : "border-gray-400"}`}
      >
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 flex items-center justify-center">
            <img src="/icons/info.svg" alt="upload" className="w-16 h-16" />
          </div>

          {/* Content */}
          {file ? (
            <div
              className="uploader-selected-file flex items-center justify-center space-x-3"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="pdf" className="w-10 h-10" />
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-blue-500 truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-gray-400 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
<button
  className="p-2 cursor-pointer"
  onClick={(e) => {
    e.stopPropagation();
    setFile(null);
    onFileSelect?.(null);
  }}
>

<img src="/icons/cross.svg" alt="remove" className="w-4 h-4"/>


              </button>

            </div>
            
            
          ) : (
            <>
              {isDragActive ? (
                <p className="text-blue-500 font-semibold">Drop File Here</p>
              ) : (
                <>
                  <p className="text-lg text-gray-500 font-semibold">
                    Click or Drag to upload
                  </p>
                  <p className="text-gray-500">PDF (max 20MB)</p>
                </>
              )}
            </>
          )}

          {/* Error */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
