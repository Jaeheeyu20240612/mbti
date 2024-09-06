import { create } from "zustand";

const useStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: (authStatus) => set({ isAuthenticated: authStatus }),
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null, isAuthenticated: false }) // clearUser 함수 추가
}));

export default useStore;
