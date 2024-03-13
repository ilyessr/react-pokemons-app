import React, { FunctionComponent, useEffect, useRef } from 'react';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    children: JSX.Element

}

const Modal: FunctionComponent<Props> = ({ isVisible, onClose, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (event: MouseEvent) => {
        const clickedElement = event.target as Node
        if (modalRef.current && !modalRef.current.contains(clickedElement)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isVisible) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isVisible, onClose, handleOutsideClick]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div ref={modalRef} className="bg-white p-8 mx-4 rounded-lg shadow-lg relative text-center w-full max-w-sm" >
                <button
                    onClick={onClose}
                    className="absolute top-1 right-3 text-lg font-bold text-gray-800 hover:text-gray-600"
                >
                    &times;
                </button>

                {children}
            </div>
        </div>

    );
};

export default Modal;
