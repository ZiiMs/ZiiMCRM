import {
  createContext,
  Dispatch,
  ReactChild,
  ReactFragment,
  ReactPortal,
  SetStateAction,
  useState,
} from 'react';

interface ISettingsContext {
  showSettings: boolean;
  toggleSettings: () => void;
}

const defaultState = {
  showSettings: false,
  toggleSettings: () => {},
};

const settingsToggle = createContext<ISettingsContext>(defaultState);

export const SettingsToggleProvider = (props: any) => {
  const [showSettings, setShow] = useState(defaultState.showSettings);
  const togSettings = () => {
    console.log('ToggleSetings', !showSettings);
    setShow(!showSettings);
  };
  return (
    <settingsToggle.Provider
      value={{ showSettings, toggleSettings: togSettings }}
    >
      {props.children}
    </settingsToggle.Provider>
  );
};

export default settingsToggle;

