import { Board } from '@prisma/client';
import useSWR, { Fetcher } from 'swr';

interface IBoard {
  name: string;
  description: string;
  type: string;
  userId: string;
}

export const useBoards = (id: string) => {
  const fetcher: Fetcher<Board[]> = (url: string) =>
    fetch(url).then((res) => res.json());
  const { data, error, mutate } = useSWR<Board[]>(`/api/board/${id}`, fetcher);
  const boardData = data || [];
  return { boards: boardData, error, isLoading: !data && !error, mutate };
};

export const useFindBoard = (id: string) => {
  const fetcher: Fetcher<Board> = (url: string) =>
    fetch(url).then((res) => res.json());
  const { data, error, mutate } = useSWR<Board>(
    `/api/board/getboard/${id}`,
    fetcher
  );
  const boardData = data;
  return { board: boardData, error, isLoading: !data && !error, mutate };
};

// export const useCreateBoard = ({ name, description, type, userId }: IBoard) => {
//   const fetcher: Fetcher<Board> = async (query: string) => {
//     const res = await fetch('/api/board/createboard', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         boardName: name,
//         description,
//         type,
//         userId: userId,
//       }),
//     });
//     if (!res.ok) throw new Error('Error creating board');

//     const json = (await res.json()) as { data: Board };
//     return json.data;
//   };

//   return useSWR<Board, Error>(`/api/board/createboard`, fetcher);
// };

