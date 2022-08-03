import create from 'zustand';

interface SetttinsState {
  showSettings: boolean;
  toggleSettings: () => void;
}

const useSettingsStore = create<SetttinsState>()((set) => ({
  showSettings: false,
  toggleSettings: () => set((state) => ({ showSettings: !state.showSettings })),
}));

export default useSettingsStore;

