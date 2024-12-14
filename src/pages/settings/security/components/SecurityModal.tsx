/*************************************************************************
 * @file SecurityModal.tsx
 * @author Ramiro Santos
 * @desc  Component for the security modal. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/



//THIRD PARTY IMPORTS 
import React, { useState } from 'react';
import styled from 'styled-components';
import PasswordField from './PasswordSecurityField'; 
import { Formik, Form, Field } from 'formik';

// Styled components for the modals
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #08090A;
  padding: 20px;
  border-radius: 8px;
  max-width: 700px;  // Increased from 500px to 700px
  width: 100%;
  border: 1px solid #333333;
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #e0e0e0;
  margin: 1rem 0;
`;

const ModalText = styled.p`
  margin-bottom: 20px;
  color: #848484;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  margin-right: 10px;
  cursor: pointer;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  background-color: #08090A;
  color: #848484;
  border: 1px solid #848484;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1a1a1a;
  }
`;

const DeleteButton = styled.button`
  background-color: #9EFF00;
  color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #8CE000;
  }
`;

const PasswordFieldWrapper = styled.div`
  margin: 20px 0;
  width: 50%;
`;

// Modal with title, text, inputs, and button
interface InputModalProps {
  title: string;
  text: string;
  onSubmit: (password: string) => void;
  onClose: () => void;
}

export const InputModal: React.FC<InputModalProps> = ({ title, text, onSubmit, onClose }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <TitleRow>
          <ModalTitle>{title}</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </TitleRow>
        <Divider />
        <ModalText>{text}</ModalText>
        <Formik
          initialValues={{ currentPassword: '' }}
          onSubmit={(values) => {
            onSubmit(values.currentPassword);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <PasswordFieldWrapper>
                <PasswordField name="currentPassword" placeholder="Enter Password" mode={false}/>
              </PasswordFieldWrapper>
              <div className="flex justify-end mt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="text-black bg-[#9EFF00] px-4 py-2 rounded-full hover:bg-[#8CE000] transition-colors"
                >
                  Continue      
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </ModalOverlay>
  );
};

// Modal with title, text, and 2 buttons
interface ConfirmationModalProps {
  title: string;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ title, text, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#08090A] p-6 rounded-lg max-w-2xl w-full border border-[#333333]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
        </div>
        <hr className="border-t border-[#333333] my-4" />
        <p className="text-[#848484] mb-8">{text}</p>
        <div className="flex justify-end gap-5 mt-10">
          <button 
            onClick={onCancel}
            className="bg-[#08090A] text-[#848484] border border-[#848484] px-4 py-2 rounded-full hover:bg-[#1a1a1a] transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="bg-[#9EFF00] text-black px-4 py-2 rounded-full hover:bg-[#8CE000] transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal with title, text, inputs, and button
interface EmailInputModalProps {
    title: string;
    text: string;
    onSubmit: (password: string) => void;
    onClose: () => void;
    hasError?: boolean;
}

export const EmailInputModal: React.FC<EmailInputModalProps> = ({ 
    title, 
    text, 
    onSubmit, 
    onClose,
    hasError 
}) => {
    return (
        <ModalOverlay>
            <ModalContent>
                <TitleRow>
                    <ModalTitle>{title}</ModalTitle>
                    <CloseButton onClick={onClose}>&times;</CloseButton>
                </TitleRow>
                <Divider />
                <ModalText>{text}</ModalText>
                <Formik
                    initialValues={{ currentPassword: '' }}
                    onSubmit={(values) => {
                        onSubmit(values.currentPassword);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <PasswordFieldWrapper>
                                <PasswordField name="currentPassword" placeholder="Enter Password" mode={false}/>
                                {hasError && (
                                    <div className="text-red-500 text-sm mt-2">
                                        Incorrect password. Please try again.
                                    </div>
                                )}
                            </PasswordFieldWrapper>
                            <div className="flex justify-end mt-4">
                                <button 
                                    type="submit" 
                                    className="text-black bg-[#9EFF00] px-4 py-2 rounded-full hover:bg-[#8CE000] transition-colors"
                                >
                                    Continue      
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </ModalOverlay>
    );
};

// Modal with title, text, and 2 buttons
interface EmailConfirmationModalProps {
    title: string;
    text: string;
    onConfirm: (code: string) => void;
    onCancel: () => void;
    hasError?: boolean;
}

export const EmailConfirmationModal: React.FC<EmailConfirmationModalProps> = ({ 
    title, 
    text, 
    onConfirm, 
    onCancel,
    hasError 
}) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = Array(6).fill(0).map(() => React.createRef<HTMLInputElement>());

    const handleInputChange = (index: number, value: string) => {
      if (!/^\d*$/.test(value)) return; // Only allow digits

      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to next input if value is entered
      if (value && index < 5) {
        inputRefs[index + 1].current?.focus();
      }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
      if (e.key === 'Backspace' && !code[index] && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#08090A] p-6 rounded-lg max-w-2xl w-full border border-[#333333]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-white">{title}</h2>
                </div>
                <hr className="border-t border-[#333333] my-4" />
                <p className="text-[#848484] mb-8">{text}</p>
                
                {/* Code input section */}
                <div className="flex justify-center gap-2 mb-8">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={inputRefs[index]}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 text-center bg-[#1a1a1a] border border-[#333333] rounded-md text-white focus:border-[#9EFF00] focus:outline-none"
                        />
                    ))}
                </div>

                {/* Add error message */}
                {hasError && (
                    <div className="text-red-500 text-sm text-center mb-4">
                        Incorrect verification code. Please try again.
                    </div>
                )}

                <div className="flex justify-end gap-5 mt-10">
                    <button 
                        onClick={onCancel}
                        className="bg-[#08090A] text-[#848484] border border-[#848484] px-4 py-2 rounded-full hover:bg-[#1a1a1a] transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => onConfirm(code.join(''))}
                        disabled={code.some(digit => !digit)}
                        className="bg-[#9EFF00] text-black px-4 py-2 rounded-full hover:bg-[#8CE000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Verify
                    </button>
                </div>
            </div>
        </div>
    );
};
  