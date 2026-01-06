export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    sizes.length - 1
  );

  return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
}

// he function doesn’t read the file content, it just takes the file size in bytes (a number) and converts it into a human-readable string like KB, MB, or GB.


//  You give it a file size, e.g. file.size (bytes) from your FileUploader.

// const fileSize = file.size; // e.g., 2048000 bytes


//  The function calculates which unit to use: Bytes, KB, MB, or GB using Math.log(bytes)/Math.log(1024).