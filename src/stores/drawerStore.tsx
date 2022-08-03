import { Ticket } from '@prisma/client';
import create from 'zustand';

interface DrawerState {
  showDrawer: boolean;
  ticket: Ticket | null;
  openDrawer: (ticket: Ticket) => void;
  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>()((set) => ({
  showDrawer: false,
  ticket: null,
  closeDrawer: () => set((state) => ({ ticketId: null, showDrawer: false })),
  openDrawer: (ticket: Ticket) =>
    set((state) => ({ ticket, showDrawer: true })),
}));

