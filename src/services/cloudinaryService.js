import axios from "axios";
import { CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET } from "../config/cloudinary";

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const IMAGE_EXT = ["jpg", "jpeg", "png", "webp"];
const IMAGE_MAX_BYTES = 2 * 1024 * 1024; // 2MB

const DOC_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
const DOC_EXT = ["pdf", "doc", "docx"];
const DOC_MAX_BYTES = 5 * 1024 * 1024; // 5MB

function getExtension(name) {
  const match = (name || "").match(/\.([a-zA-Z0-9]+)$/);
  return match ? match[1].toLowerCase() : "";
}

export function validateImageFile(file) {
  if (!file || !(file instanceof File)) return { ok: false, error: "Fișier invalid." };
  const ext = getExtension(file.name);
  if (!IMAGE_EXT.includes(ext)) {
    return { ok: false, error: "Tip fișier invalid. Folosiți: JPG, JPEG, PNG sau WEBP." };
  }
  if (file.size > IMAGE_MAX_BYTES) {
    return { ok: false, error: "Imaginea nu poate depăși 2 MB." };
  }
  return { ok: true };
}

export function validateDocumentFile(file) {
  if (!file || !(file instanceof File)) return { ok: false, error: "Fișier invalid." };
  const ext = getExtension(file.name);
  if (!DOC_EXT.includes(ext)) {
    return { ok: false, error: "Tip fișier invalid. Folosiți: PDF, DOC sau DOCX." };
  }
  if (file.size > DOC_MAX_BYTES) {
    return { ok: false, error: "Documentul nu poate depăși 5 MB." };
  }
  return { ok: true };
}

/**
 * Upload image to Cloudinary (folder: events_images).
 * Returns { secure_url, public_id, bytes, format }.
 * onProgress(0-100) optional.
 */
export async function uploadImage(file, onProgress) {
  const validation = validateImageFile(file);
  if (!validation.ok) throw new Error(validation.error);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "events_images");

  const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percent);
      }
    },
  });

  return response.data;
}

/**
 * Upload gallery/album image to Cloudinary (folder: gallery_images).
 * Returns { secure_url, public_id, ... }. Use result.secure_url for storage.
 */
export async function uploadGalleryImage(file, onProgress) {
  const validation = validateImageFile(file);
  if (!validation.ok) throw new Error(validation.error);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "gallery_images");

  const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percent);
      }
    },
  });

  return response.data;
}

/**
 * Upload document to Cloudinary (folder: documents).
 * Returns { secure_url, public_id, bytes, format }.
 * onProgress(0-100) optional.
 */
export async function uploadDocument(file, onProgress) {
  const validation = validateDocumentFile(file);
  if (!validation.ok) throw new Error(validation.error);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "documents");

  const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percent);
      }
    },
  });

  return response.data;
}

/**
 * Cloudinary URL for flipbook: width 1600, auto quality/format.
 * Use for album photos in the flipbook viewer.
 */
export function getFlipbookImage(url) {
  if (!url || typeof url !== "string") return url;
  return url.replace("/upload/", "/upload/w_1600,q_auto,f_auto/");
}

/**
 * Cloudinary URL for gallery thumbnails: width 400, fill crop, auto quality/format.
 * Use for gallery cards (admin and public).
 */
export function getGalleryThumbnail(url) {
  if (!url || typeof url !== "string") return url;
  return url.replace("/upload/", "/upload/w_400,c_fill,q_auto,f_auto/");
}

/**
 * Normalize photo/cover item to URL. Supports legacy string URLs or { url, public_id }.
 */
export function getPhotoUrl(item) {
  if (item == null) return "";
  if (typeof item === "string") return item;
  return item?.url ?? "";
}

/**
 * Get public_id from photo/cover item for Cloudinary delete. Returns null for legacy URLs.
 */
export function getPhotoPublicId(item) {
  if (item == null || typeof item !== "object") return null;
  return item?.public_id ?? null;
}

/**
 * Call server API to delete an image from Cloudinary by public_id.
 * @returns {{ cloudinaryDeleted: boolean, serverConfigMissing?: boolean }}
 */
export async function deleteCloudinaryImage(publicId) {
  if (!publicId) return { cloudinaryDeleted: false };
  const res = await fetch("/api/cloudinary/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ public_id: publicId }),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* plain text error */
  }
  if (!res.ok) {
    if (json?.error === "Server Cloudinary config missing") {
      return { cloudinaryDeleted: false, serverConfigMissing: true };
    }
    throw new Error(json?.error || text || "Delete failed");
  }
  return { cloudinaryDeleted: true };
}
