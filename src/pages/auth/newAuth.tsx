import {
  default as registerToggle,
  default as useRegisterStore
} from '@/stores/registerStore';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useContext, useEffect } from 'react';

const RegisterFilter: NextPage = () => {
  const { showRegister, toggleRegister } = useRegisterStore((state) => ({
    showRegister: state.showRegister,
    toggleRegister: state.toggleRegister,
  }), shallow);
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

