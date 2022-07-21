import { Board } from '@prisma/client';
import { createContext, Dispatch, SetStateAction, useState } from 'react';

interface IBoardContext {
  boards: Board[];
  setBoards: Dispatch<SetStateAction<Board[]>>;
}

const defaultState = {
  boards: [],
  setBoards: () => {},
};

const boardContext = createContext<IBoardContext>(defaultState);
export const BoardProvider = (props: any) => {
  const [boards, setBoards] = useState<Board[]>(defaultState.boards);

  return (
    <boardContext.Provider value={{ boards, setBoards: setBoards }}>
      {props.children}
    </boardContext.Provider>
  );
};

export default boardContext;

