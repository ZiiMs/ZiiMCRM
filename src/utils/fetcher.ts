import { Fetcher } from 'swr';

export const fetcher: Fetcher = (url: string) =>
  fetch(url).then((res) => res.json());

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

