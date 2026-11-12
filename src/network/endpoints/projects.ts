import { handleRequest } from "../helpers/handleRequest";

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
      credentials: "include",
    });
  },

  async update({ id, payload }: UpdateProject) {
    return handleRequest<Project>("/projects/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project: payload }),
      credentials: "include",
    });
  },

  /** Upload one or more photos (multipart). Returns the updated project. */
  async uploadImages(id: string, files: Blob[]) {
    const body = new FormData();
    for (const file of files) {
      body.append("images[]", file, file instanceof File ? file.name : "photo.jpg");
    }
    return handleRequest<Project>(
      `/projects/${id}/images`,
      { method: "POST", body, credentials: "include" },
      120_000,
    );
  },

  async deleteImage({ id, imageId }: { id: string; imageId: string }) {
    return handleRequest<Project>(`/projects/${id}/images/${imageId}`, {
      method: "DELETE",
      credentials: "include",
    });
  },

  /** Save photo order; the first id becomes the cover photo. */
  async reorderImages({ id, imageIds }: { id: string; imageIds: string[] }) {
    return handleRequest<Project>(`/projects/${id}/images/order`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_ids: imageIds }),
      credentials: "include",
    });
  },

  async destroy(id: string) {
    return handleRequest("/projects/" + id, {
      method: "DELETE",
      credentials: "include",
    });
  },
};
