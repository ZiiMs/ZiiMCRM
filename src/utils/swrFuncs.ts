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

export const useFindBoard = (id: string, userId: string) => {
  const fetcher: Fetcher<Board> = async () => {
    const res = await fetch(`/api/board/getboard/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (!res.ok) {
      console.log('Res not ok', data.errorMsg);
      if (data.errorMsg.name === 'NotFoundError') {
        console.log('NotFoundError');
        const error = new Error(
          'Board not found with ID or player not authorized'
        );

        throw error;
      }
    }
    console.log('Working', data);
    return data;
  };
  const { data, error, mutate } = useSWR<Board>(`findBoard`, fetcher);
  console.log('Error', JSON.stringify(error));
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

