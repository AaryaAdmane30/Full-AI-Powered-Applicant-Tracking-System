import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const uploadedFile = acceptedFiles[0];
    console.log("Dropped:", uploadedFile);

    setFile(uploadedFile);

    // send file to parent
    if (onFileSelect) onFileSelect(uploadedFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    maxSize: 20 * 1024 * 1024, // 20MB
    multiple: false, // only one file at a time
  });

  return (
    <div className="w-full gradient-border">
      <div
        {...getRootProps()}
        className={`transition-all duration-200 border-2 border-dashed rounded-xl p-6 
          ${isDragActive ? "ring-4 ring-green-400 scale-[1.01] border-green-400" : "border-gray-400"}`}
      >
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer">
          {/* Upload Icon */}
          <div className="mx-auto w-16 h-16 flex items-center justify-center">
            <img src="/icons/info.svg" alt="upload" className="w-16 h-16" />
          </div>

          {/* File Info or Instructions */}
          {file ? (
            <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
            
             <img src="/images/pdf.png" alt="pdf" className="w-10 h-10" />
            <div className="flex items-center space-x-3">
             
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-green-500 truncate max-w-xs">
                  {file.name}
                </p>
                <p className="text-gray-400 text-sm">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            </div>
          ) : (
            <div className="text-center">
              {isDragActive ? (
                <p className="text-green-500 font-semibold">Drop File Here</p>
              ) : (
                <>
                  <p className="text-lg text-gray-500">
                    <span className="font-semibold">Click or Drag to upload</span>
                  </p>
                  <p className="text-lg text-gray-500">PDF (max 20MB)</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
