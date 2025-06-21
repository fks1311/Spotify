import { createContext, useContext, useState } from "react";

// 1. 타입 정의
interface ModalState {
  isOpen: boolean;
  data?: {
    playlist_id: string;
    tracks: { uri: string }[];
  };
  type?: string;
  txt?: string;
}
interface OptionButtonState {
  isOpen: boolean;
}

interface ContextProviderProps {
  modal: ModalState;
  setModal: React.Dispatch<React.SetStateAction<ModalState>>;
  option: OptionButtonState;
  setOption: React.Dispatch<React.SetStateAction<OptionButtonState>>;
}

// 2. 초기 Context 생성
const OpenContext = createContext<ContextProviderProps | null>(null);

// 3. Provider 컴포넌트 생성
export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [modal, setModal] = useState<ModalState>({ isOpen: false, data: undefined, type: undefined });
  const [option, setOption] = useState<OptionButtonState>({ isOpen: false });
  return <OpenContext.Provider value={{ modal, setModal, option, setOption }}>{children}</OpenContext.Provider>;
};

// 4. 커스텀 훅
export const useOpenContext = () => {
  const context = useContext(OpenContext);
  if (!context) {
    throw new Error("useOpenContext 애러");
  }
  return context;
};
