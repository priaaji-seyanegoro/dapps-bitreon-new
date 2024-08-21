import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { get } from '@/services/api';

export interface User {
  id: number;
  username: string;
  createdAt: string;
  updatedAt: string;
}

interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  fetchUserProfile: () => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    user: null,
    loading: false,
    error: null,

    fetchUserProfile: async () => {
      set({ loading: true, error: null });
      try {
        const response = await get<User>('/api/user/me');
        set({ user: response, loading: false });
      } catch (error: any) {
        set({ error: error.message, loading: false });
      }
    },

    clearUser: () => {
      set({ user: null });
    },
  }))
);