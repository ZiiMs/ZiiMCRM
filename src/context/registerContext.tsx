import {
  createContext, useState
} from 'react';

interface IRegisterContext {
  showRegister: boolean;
  toggleRegister: () => void;
}

const defaultState = {
  showRegister: false,
  toggleRegister: () => {},
};

const registerToggle = createContext<IRegisterContext>(defaultState);

export const RegisterToggleProvider = (props: any) => {
  const [showRegister, setShow] = useState(defaultState.showRegister);
  const togRegister = () => {
    console.log('ToggleRegister', !showRegister);
    setShow(!showRegister);
  };
  return (
    <registerToggle.Provider
      value={{ showRegister: showRegister, toggleRegister: togRegister }}
    >
      {props.children}
    </registerToggle.Provider>
  );
};

export default registerToggle;

