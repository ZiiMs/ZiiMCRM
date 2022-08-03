import { Ticket, User } from '@prisma/client';
import create from 'zustand';

type ticket = Ticket & {
  Members: User[];
};

interface DrawerState {
  showDrawer: boolean;
  ticket: ticket | null;
  openDrawer: (ticket: ticket) => void;
  closeDrawer: () => void;
}

const useDrawerStore = create<DrawerState>()((set) => ({
  showDrawer: false,
  ticket: null,
  closeDrawer: () => set((state) => ({ ticket: null, showDrawer: false })),
  openDrawer: (ticket: ticket) =>
    set((state) => ({ ticket, showDrawer: true })),
}));

export default useDrawerStore;

