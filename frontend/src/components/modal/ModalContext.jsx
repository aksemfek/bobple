import { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GroupModal from './GroupModal';
import ErrorModal from './ErrorModal'; // ErrorModal 추가

// Context 생성
const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalState, setModalState] = useState("hide");
    const [errorState, setErrorState] = useState("hide");
    const [errorMessage, setErrorMessage] = useState("");

    const showModal = () => {
        setModalState("show");
    };

    const hideModal = () => {
        setModalState("hide");
    };

    const showErrorModal = (message) => {
        setErrorMessage(message);
        setErrorState("show");
    };

    const hideErrorModal = () => {
        setErrorState("hide");
        setErrorMessage("");
        showModal(); // 에러 모달을 닫을 때 모임 만들기 모달을 다시 열기
    };

    return (
        <ModalContext.Provider value={{ modalState, showModal, hideModal, showErrorModal, hideErrorModal }}>
            {modalState === "show" && <GroupModal modalState={modalState} hideModal={hideModal} />}
            {errorState === "show" && <ErrorModal message={errorMessage} hideErrorModal={hideErrorModal} />}
            {children}
        </ModalContext.Provider>
    );
};

ModalProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useModal = () => {
    return useContext(ModalContext);
};
