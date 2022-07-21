import registerToggle from '@/context/registerContext';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useContext, useEffect } from 'react';

const RegisterFilter: NextPage = () => {
  const { showRegister, toggleRegister } = useContext(registerToggle);
  const router = useRouter();

  useEffect(() => {
    if (!showRegister) {
      router.push('/');
      toggleRegister();
    }
  }, [router, showRegister, toggleRegister]);

  return <></>;
};

export default RegisterFilter;
