// app/lib/Pdf2img.ts
/**
 * Converts the first page of a PDF file to a PNG image Blob
 * Completely client-side only - uses dynamic imports to prevent SSR crashes
 */
export async function convertPdfToImage(
  file: File,
  options: {
    page?: number;
    scale?: number;
    maxWidth?: number;
  } = {}
): Promise<Blob> {
  // Safety check - must run in browser
  if (typeof window === "undefined") {
    throw new Error("PDF to image conversion is only supported in the browser");
  }

  const {
    page = 1,
    scale = 2.0,
    maxWidth = 1800, // prevent memory explosion on huge PDFs
  } = options;

  try {
    // ── Dynamic imports - this is the key to avoiding SSR evaluation ──
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const workerUrl = (await import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url")).default;

    // Set worker source (required!)
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

    // Read file
    const arrayBuffer = await file.arrayBuffer();

    // Load PDF document
    const loadingTask = pdfjs.getDocument({
      data: arrayBuffer,
      useSystemFonts: true, // better text rendering
    });

    const pdf = await loadingTask.promise;

    // Page validation
    if (page < 1 || page > pdf.numPages) {
      throw new Error(`Page ${page} is invalid. Document has ${pdf.numPages} pages.`);
    }

    const pdfPage = await pdf.getPage(page);

    // Calculate smart scale
    const originalViewport = pdfPage.getViewport({ scale: 1 });
    const scaleFactor = Math.min(scale, maxWidth / originalViewport.width);
    const viewport = pdfPage.getViewport({ scale: scaleFactor });

    // Create canvas
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) {
      throw new Error("Failed to get 2D canvas context");
    }

    // White background (many PDFs are transparent)
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render PDF page → canvas
    await pdfPage.render({
      canvasContext: ctx,
      viewport,
    }).promise;

    // Convert to Blob
    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (result) resolve(result);
          else reject(new Error("canvas.toBlob() returned null"));
        },
        "image/png",
        0.97 // very good quality/size balance
      );
    });

    return blob;
  } catch (err) {
    console.error("PDF → Image conversion failed:", err);
    throw err instanceof Error
      ? err
      : new Error("Failed to convert PDF to image");
  }
}