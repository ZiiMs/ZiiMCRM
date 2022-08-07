import { ElementType, FC, PropsWithChildren, ReactElement } from 'react';
import create from 'zustand';

interface NavBarDrawerState {
  isNavbarOpen: boolean;
  type: ReactElement<any, any>;
  setType: (type: ReactElement<any, any>) => void;
  toggleDrawer: (Component?: ReactElement<any, any>) => void;
}

const useNavbarDrawer = create<NavBarDrawerState>()((set) => ({
  isNavbarOpen: false,
  type: <div />,
  setType: (type: ReactElement<any, any>) =>
    set((state) => ({ ...state, type })),
  toggleDrawer: (comp = <div />) =>
    set((state) => ({ isNavbarOpen: !state.isNavbarOpen, type: comp })),
}));

export default useNavbarDrawer;

