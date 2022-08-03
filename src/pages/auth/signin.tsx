import { trpc } from '@/utils/trpc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useEffect } from 'react';

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
  }, [data, router]);

  return <></>;
};

export default SignIn;

