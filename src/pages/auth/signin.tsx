import registerToggle from '@/context/registerContext';
import { trpc } from '@/utils/trpc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useContext, useEffect } from 'react';

const SignIn: NextPage = () => {
  const { data: session } = useSession();
  const { data } = trpc.useQuery([
    'users.isRegistered',
    {
      id: String(session?.user?.id),
    },
  ]);

  const router = useRouter();

  useEffect(() => {
    router.push('/auth/newAuth');
    console.log('newData', data);
  }, [data, router]);

  return <></>;
};

export default SignIn;

