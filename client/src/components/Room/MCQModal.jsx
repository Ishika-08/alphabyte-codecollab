import React from 'react';
import { Dialog, Transition } from '@headlessui/react';

const MCQModal = ({ isOpen, closeModal, mcqTestData }) => {
    return (
        <Transition show={isOpen} as={React.Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="flex items-center justify-center min-h-screen">
                    <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className="inline-block align-middle bg-white rounded-lg p-6 my-8 w-full max-w-md text-left shadow-xl">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                MCQ Test
                            </Dialog.Title>
                            {mcqTestData && (
                                <div className="mt-4">
                                    {/* Render MCQ test questions/options here */}
                                    {mcqTestData.questions.map((question, index) => (
                                        <div key={index} className="mb-4">
                                            <p className="font-semibold">{question.question}</p>
                                            <ul className="list-disc list-inside">
                                                {question.options.map((option, optionIndex) => (
                                                    <li key={optionIndex}>{option}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mt-4 text-right">
                                <button
                                    type="button"
                                    className="btn mr-2"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                                {/* Add any other buttons or actions */}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MCQModal;
