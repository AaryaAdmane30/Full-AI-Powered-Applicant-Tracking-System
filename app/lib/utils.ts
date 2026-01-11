
// Avoid collisions

// Imagine two people upload a resume named resume.pdf at the same time.

// If you just use the filename or timestamp (resumes/1699000000-resume.pdf), there’s a small chance two files could end up with the same path, overwriting each other.

// UUIDs are universally unique, so even if multiple users upload at the exact same millisecond, each file gets its own unique identifier.



export function generateUUID(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // fallback: simple UUID v4
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
