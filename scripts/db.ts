import { prisma } from '../src/utils/database';

(async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/comments');

  const comments: any[] = await res.json();

  const commentSplit1 = comments.slice(0, 150);
  const commentSplit2 = comments.slice(151, 300);
  const commentSplit3 = comments.slice(301, 450);
  const commentSplit4 = comments.slice(451, 500);
  const formattedComments = commentSplit1.map((comment: { body: any }) => {
    return prisma.comments.create({
      data: {
        text: comment.body,
        Board: {
          connect: {
            id: 'cl615hfcn0106awta1i2k8leu',
          },
        },
        User: {
          connect: {
            id: 'cl615gxoi0026awta4gs20vam',
          },
        },
      },
    });
  });

  await Promise.all(formattedComments);

  const formattedComments2 = commentSplit2.map((comment: { body: any }) => {
    return prisma.comments.create({
      data: {
        text: comment.body,
        Board: {
          connect: {
            id: 'cl615hfcn0106awta1i2k8leu',
          },
        },
        User: {
          connect: {
            id: 'cl615gxoi0026awta4gs20vam',
          },
        },
      },
    });
  });

  await Promise.all(formattedComments2);

  const formattedComments3 = commentSplit3.map((comment: { body: any }) => {
    return prisma.comments.create({
      data: {
        text: comment.body,
        Board: {
          connect: {
            id: 'cl615hfcn0106awta1i2k8leu',
          },
        },
        User: {
          connect: {
            id: 'cl615gxoi0026awta4gs20vam',
          },
        },
      },
    });
  });

  await Promise.all(formattedComments3);

  const formattedComments4 = commentSplit4.map((comment: { body: any }) => {
    return prisma.comments.create({
      data: {
        text: comment.body,
        Board: {
          connect: {
            id: 'cl615hfcn0106awta1i2k8leu',
          },
        },
        User: {
          connect: {
            id: 'cl615gxoi0026awta4gs20vam',
          },
        },
      },
    });
  });

  await Promise.all(formattedComments4);
})();

