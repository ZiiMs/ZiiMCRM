import { Role, Ticket, User } from '@prisma/client';
import create from 'zustand';

type ticket = Ticket & {
  Members: User[];
};

interface DrawerState {
  showDrawer: boolean;
  ticket: ticket | null;
  userRole: Role;
  openDrawer: (ticket: ticket, role: Role) => void;
  closeDrawer: () => void;
}

const useDrawerStore = create<DrawerState>()((set) => ({
  showDrawer: false,
  ticket: null,
  userRole: Role.CLIENT,
  closeDrawer: () =>
    set((state) => ({
      ticket: null,
      showDrawer: false,
      userRole: Role.CLIENT,
    })),
  openDrawer: (ticket: ticket, role: Role) =>
    set((state) => ({ ticket, showDrawer: true, userRole: role })),
}));

export default useDrawerStore;

