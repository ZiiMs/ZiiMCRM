import { prisma } from '@/utils/database';
import { NextApiRequest, NextApiResponse } from 'next';

const createAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const { age, gender, userId } = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        age: age,
        gender: gender,
      },
    });

    console.log(user);
    res.status(200).json({
      message: 'Board created successfully',
      user: user,
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      error: error,
    });
  }
};

export default createAccount;

