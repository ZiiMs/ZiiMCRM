import useSWR, { Fetcher } from 'swr';

const fetcher: Fetcher = (url: string) => fetch(url).then((res) => res.json());

export const createBoard = async (data: any) => {
  const { boardName, description, type, userId } = data;

  const res = await fetch('/api/board/createboard', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      boardName,
      description,
      type,
      userId: userId,
    }),
  });
  return await res.json();
};

const useBoards = (id: string) => {
  const { data, error, mutate } = useSWR(`/api/board/${id}`, fetcher);
  console.log('data', data);
  return { boards: data, error, isLoading: !data && !error, mutate };
};

export default useBoards;

