import create from 'zustand';

interface RegisterState {
  showRegister: boolean;
  age: number;
  gender: string;
  error: string | null;
  toggleRegister: () => void;
  setGender: (gender: string) => void;
  setAge: (age: number) => void;
  setError: (err: string | null) => void;
}

const useRegisterStore = create<RegisterState>()((set) => ({
  showRegister: false,
  age: 0,
  gender: '',
  error: null,
  toggleRegister: () => set((state) => ({ showRegister: !state.showRegister })),
  setGender: (gender) => set(() => ({ gender: gender })),
  setAge: (age) => set(() => ({ age: age })),
  setError: (err) => set(() => ({ error: err })),
}));

export default useRegisterStore;

// gender == ''
// ? (setGenderValid(false), (valid = false))
// : setGenderValid(true);
// age === null || age === undefined || (age >= 16 && age <= 100)
// ? setAgeValid(true)
// : (setAgeValid(false), (valid = false));

