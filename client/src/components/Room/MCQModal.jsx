import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Data from '../../data/data'; // Importing the quiz data

const MCQModal = ({ isOpen, closeModal }) => {
    const [selectedAnswers, setSelectedAnswers] = useState({});

    const handleSelectAnswer = (questionIndex, answerIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: answerIndex
        });
    };
    // const handleOptionClick = (e) => {
    //     // Prevent the event from bubbling up and triggering the onClose event of the Dialog
    //     e.stopPropagation();
    // };

    const handleModalContentClick = (e) => {
        // Prevent the event from bubbling up and triggering the onClose event of the Dialog
        e.stopPropagation();
    };

    const isAnswerCorrect = (questionIndex, answerIndex) => {
        const correctAnswerIndex = Data.mern[questionIndex].Answer;
        return selectedAnswers[questionIndex] === correctAnswerIndex;
    };

    const handleOptionClick = (e) => {
        // Prevent the event from bubbling up and triggering the onClose event of the Dialog
        e.stopPropagation();
    };

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
                        <div className="inline-block align-middle bg-white rounded-lg p-6 my-8 w-full max-w-md text-left shadow-xl" onClick={handleModalContentClick}>
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                MERN Stack MCQ Test
                            </Dialog.Title>
                            <div className="mt-4">
                                {/* Render MERN stack MCQ test questions here */}
                                {Data.mern.map((question, index) => (
                                    <div key={question.KEY} className="mb-4">
                                        <p className="font-semibold">{question.Question}</p>
                                        <div className="options">
                                            {question.Options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="option">
                                                    <input
                                                        type="radio"
                                                        id={`option-${index}-${optionIndex}`}
                                                        name={`option-${index}`}
                                                        value={optionIndex}
                                                        checked={selectedAnswers[question.KEY] === optionIndex}
                                                        onChange={() => handleSelectAnswer(question.KEY, optionIndex)}
                                                    />
                                                    <label htmlFor={`option-${index}-${optionIndex}`}>{option}</label>
                                                </div>
                                            ))}
                                        </div>
                                        {selectedAnswers[question.KEY] !== undefined && (
                                            <p className={isAnswerCorrect(index, selectedAnswers[question.KEY]) ? "text-green-600" : "text-red-600"}>
                                                {isAnswerCorrect(index, selectedAnswers[question.KEY]) ? "Correct!" : "Incorrect!"}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MCQModal;
