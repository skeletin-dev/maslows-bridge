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

  async destroy(id: string) {
    return handleRequest("/projects/" + id, {
      method: "DELETE",
      credentials: "include",
    });
  },
};
