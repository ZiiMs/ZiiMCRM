import {
  default as settingsToggle,
  default as useSettingsStore
} from '@/stores/settingsStore';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@chakra-ui/react';
import shallow from 'zustand/shallow';

export const SettingsModal = () => {
  const { showSettings, toggleSettings } = useSettingsStore(
    (state) => ({
      showSettings: state.showSettings,
      toggleSettings: state.toggleSettings,
    }),
    shallow
  );

  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Saving settings');
    toggleSettings();
  };
  return (
    <Modal isOpen={showSettings} onClose={toggleSettings}>
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Test Settings</FormLabel>
            <Input placeholder='Test Settings' />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>New Test Settigns</FormLabel>
            <Input placeholder='New Test Settigns' />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={toggleSettings}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;

