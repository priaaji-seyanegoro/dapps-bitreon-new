import { del, get, post, put } from "@/services/api";
import { toast } from "react-toastify";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Project {
  id: number;
  name: string;
  framework: string;
  packageManager: string;
  subdomain: string;
  port: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  version: number;
}

interface ProjectStore {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  createProject: (data: Partial<Project>) => Promise<void>;
  updateProject: (id: number, data: Partial<Project>) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  selectProject: (project: Project | null) => void;
  uploadProjectSource: (id: number, file: File) => Promise<void>;
  buildProjectPipeline: (id: number) => Promise<void>;
}

export const useProjectStore = create<ProjectStore>()(
  devtools((set) => ({
    projects: [],
    loading: false,
    error: null,
    selectedProject: null,

    fetchProjects: async () => {
      set({ loading: true, error: null });
      try {
        const response = await get<Project[]>("/api/project");
        set({ projects: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

    selectProject: (project) => set({ selectedProject: project }),

    createProject: async (data) => {
      set({ loading: true, error: null });
      try {
        const response = await post<Project>("/api/project", data);
        set((state) => ({
          projects: [...state.projects, response],
          loading: false,
        }));

        toast.success("Project created successfully");
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

    updateProject: async (id, data) => {
      set({ loading: true, error: null });
      try {
        const response = await put<Project>(`/api/project/${id}`, data);
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? response : project
          ),
          loading: false,
        }));
        toast.success("Project edited successfully");
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

    deleteProject: async (id) => {
      set({ loading: true, error: null });
      try {
        await del(`/api/project/${id}`);
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
          loading: false,
        }));

        toast.success("Project deleted successfully");
      } catch (error: any) {
        set({ error: error.message, loading: false });
        toast.success("Project failed to be deleted");
      }
    },

    uploadProjectSource: async (id, file) => {
      set({ loading: true, error: null });
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await post<{ message: string }>(
          `/api/project/${id}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        set({ loading: false });
        toast.success(response.message);
      } catch (error: any) {
        set({ error: error.message, loading: false });
        toast.error("Failed to upload project source");
      }
    },

    buildProjectPipeline: async (id) => {
      set({ loading: true, error: null });
      try {
        const response = await post<{ message: string; sessionText: string }>(
          `/api/project/${id}/build`,
          { id: id }
        );

        set({ loading: false });
        toast.success(response.message);
      } catch (error: any) {
        set({ error: error.message, loading: false });
        toast.error("Failed to build project pipeline");
      }
    },
  }))
);
