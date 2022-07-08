import registerToggle from '@/context/registerContext';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

const registerFilter = () => {
  const { showRegister, toggleRegister } = useContext(registerToggle);
  const router = useRouter();

  useEffect(() => {
    if (!showRegister) {
      router.push('/');
      toggleRegister();
    }
  }, []);

  return <></>;
};

export default registerFilter;

