import create from 'zustand';

interface LoginState {
  showLogin: boolean;
  toggleLogin: () => void;
}

const useLoginStore = create<LoginState>()((set) => ({
  showLogin: false,
  toggleLogin: () => set((state) => ({ showLogin: !state.showLogin })),
}));

export default useLoginStore;

