import { handleRequest } from "../helpers/handleRequest";

// In the browser these go through the same-origin /api proxy, so the login cookie is sent
// automatically (see src/constants.ts).
export default {
  async getAll() {
    return handleRequest<Project[]>("/projects");
  },

  async show(slug: string) {
    return handleRequest<Project>("/projects/" + slug);
  },

  async create(payload: NewProject) {
    return handleRequest<Project>("/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project: payload }),
    });
  },

  async update({ id, payload }: UpdateProject) {
    return handleRequest<Project>("/projects/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project: payload }),
    });
  },

  /**
   * Upload photos (multipart). Returns the updated project. Send one photo per call: uploads
   * pass through a Netlify Function, which caps request bodies at about 4.5 MB.
   */
  async uploadImages(id: string, files: Blob[]) {
    const body = new FormData();
    for (const file of files) {
      body.append("images[]", file, file instanceof File ? file.name : "photo.jpg");
    }
    return handleRequest<Project>(`/projects/${id}/images`, { method: "POST", body }, 120_000);
  },

  async deleteImage({ id, imageId }: { id: string; imageId: string }) {
    return handleRequest<Project>(`/projects/${id}/images/${imageId}`, {
      method: "DELETE",
    });
  },

  /** Save photo order; the first id becomes the cover photo. */
  async reorderImages({ id, imageIds }: { id: string; imageIds: string[] }) {
    return handleRequest<Project>(`/projects/${id}/images/order`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_ids: imageIds }),
    });
  },

  async destroy(id: string) {
    return handleRequest("/projects/" + id, {
      method: "DELETE",
    });
  },
};
