import {
  createContext, useState
} from 'react';

interface ILoginContext {
  showLogin: boolean;
  toggleLogin: () => void;
}

const defaultState = {
  showLogin: false,
  toggleLogin: () => {},
};

const loginToggle = createContext<ILoginContext>(defaultState);

export const LoginToggleProvider = (props: any) => {
  const [showLogin, setShow] = useState(defaultState.showLogin);
  const togLogin = () => {
    console.log('ToggleLogin', !showLogin);
    setShow(!showLogin);
  };
  return (
    <loginToggle.Provider
      value={{ showLogin: showLogin, toggleLogin: togLogin }}
    >
      {props.children}
    </loginToggle.Provider>
  );
};

export default loginToggle;

