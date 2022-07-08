import {
  createContext, useState
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
    console.log('ToggleSettings', !showSettings);
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

