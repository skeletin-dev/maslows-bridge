/** Must match Project::IMAGE_CONTENT_TYPES / MAX_IMAGE_BYTES / MAX_IMAGES in the API. */
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];
export const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
export const MAX_PROJECT_IMAGES = 30;

/** iPhone photos; most browsers can decode these, so we convert them to JPEG. */
const CONVERTIBLE_TYPES = ["image/heic", "image/heif"];
export const PICKER_ACCEPT = [...ACCEPTED_IMAGE_TYPES, ...CONVERTIBLE_TYPES, ".heic", ".heif"].join(",");

const MAX_EDGE = 2400;
const JPEG_QUALITY = 0.85;
const KEEP_ORIGINAL_UNDER_BYTES = 2 * 1024 * 1024;

/**
 * Downscale large photos to at most 2400px on the long edge and re-encode as JPEG.
 * Phone photos shrink from ~5 MB to a few hundred KB, and re-encoding drops EXIF data
 * such as GPS location. GIFs (may be animated) and small PNG/WebP/AVIF files are kept as-is.
 * Falls back to the original file if the browser can't decode it.
 */
export async function prepareImageForUpload(file: File): Promise<File> {
  if (file.type === "image/gif") return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
    const isJpeg = file.type === "image/jpeg";
    const isConvertible = CONVERTIBLE_TYPES.includes(file.type) || /\.hei[cf]$/i.test(file.name);

    if (scale === 1 && !isJpeg && !isConvertible && file.size < KEEP_ORIGINAL_UNDER_BYTES) {
      bitmap.close();
      return file;
    }

    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close();
      return file;
    }
    ctx.fillStyle = "#ffffff"; // JPEG has no transparency
    ctx.fillRect(0, 0, width, height);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );
    if (!blob) return file;
    // Re-encoding a small non-JPEG made it bigger: keep the original.
    if (!isJpeg && !isConvertible && scale === 1 && blob.size >= file.size) return file;

    const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg", lastModified: Date.now() });
  } catch {
    return file;
  }
}

/** Returns an error message, or null if the file can be uploaded. */
export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return `${file.name} isn't a supported image. Use JPEG, PNG, WebP, GIF, or AVIF.`;
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `${file.name} is larger than ${MAX_IMAGE_BYTES / 1024 / 1024} MB.`;
  }
  return null;
}
