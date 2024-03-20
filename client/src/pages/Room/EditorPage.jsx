import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import Client from '../../components/Room/Client';
import Editor1 from '../../components/Room/Editor1';
import { initSocket } from '../../socket';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MCQModal from '../../components/Room/MCQModal';

const ACTIONS = {
    JOIN: 'join',
    JOINED: 'joined',
    DISCONNECTED: 'disconnected',
    CODE_CHANGE: 'code-change',
    NEW_STREAM: 'new-stream',
    TOGGLE_VIDEO: 'toggle-video',
    TOGGLE_AUDIO: 'toggle-audio',
    START_MCQ_TEST: 'start_mcq_test',
};

const EditorPage = () => {
    const socketRef = useRef(null);
    const videoRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const locationState = useLocation().state; // Access location state
    const role = locationState ? locationState.role : '';

    const navigate = useNavigate();
    const [localStream, setLocalStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clients, setClients] = useState([]);
    const [code, setCode] = useState('');
    const [mcqTestData, setMcqTestData] = useState(null);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            socketRef.current.on(ACTIONS.JOINED, ({ clients, code }) => {
                setClients(prevClients => {
                    // Filter out any clients that are already in the state
                    const filteredClients = clients.filter(client => {
                        return !prevClients.some(prevClient => prevClient.socketId === client.socketId);
                    });
                    // Concatenate the new clients with the existing ones
                    return [...prevClients, ...filteredClients];
                });
                setCode(code);
            });

            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId }) => {
                setClients(prevClients =>
                    prevClients.filter(client => client.socketId !== socketId)
                );
                setRemoteStreams(prevStreams =>
                    prevStreams.filter(stream => stream.socketId !== socketId)
                );
            });

            // Rest of your code...
        };
        init();

        // Rest of your code...
    }, [roomId, location.state, localStream]);

    // Function to handle copying the room ID
    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    };

    // Function to leave the room
    const leaveRoom = () => {
        navigate('/');
    };
    const openRoomModal = () => {
        setIsModalOpen(true);
    };

    // Function to start MCQ test
    const startMCQTest = () => {
        const testData = {
            questions: [
                {
                    question: 'What is the capital of France?',
                    options: ['Paris', 'London', 'Berlin', 'Madrid'],
                    answer: 'Paris',
                },
                {
                    question: 'What is the capital of Germany?',
                    options: ['Paris', 'London', 'Berlin', 'Madrid'],
                    answer: 'Berlin',
                },
                {
                    question: 'What is the capital of Spain?',
                    options: ['Paris', 'London', 'Berlin', 'Madrid'],
                    answer: 'Madrid',
                },
                {
                    question: 'What is the capital of England?',
                    options: ['Paris', 'London', 'Berlin', 'Madrid'],
                    answer: 'London',
                },
            ],
        };
        setMcqTestData(testData);
        if (role === 'candidate') {
            setIsModalOpen(true);
        }

        // Emit the event to start MCQ test to all clients in the room
        socketRef.current.emit(ACTIONS.START_MCQ_TEST, { roomId, testData });
    };

    // Function to close the MCQ modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="mainWrap">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <h1>Code Collab</h1>
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        {clients.map(client => (
                            <Client
                                key={client.socketId} // Use socketId as the key for uniqueness
                                username={client.username}
                                socketRef={socketRef}
                                roomId={roomId}
                            />
                        ))}
                    </div>
                </div>

                <button className="btn copyBtn" onClick={copyRoomId}>
                    Copy ROOM ID
                </button>
                <button className="btn leaveBtn" onClick={leaveRoom}>
                    Leave
                </button>
                {role === 'interviewer' ? (
                    <button className="btnmcqBtn" onClick={startMCQTest}>
                        Start MCQ Test
                    </button>
                ) : (
                    <button className="btn redirectBtn" onClick={openRoomModal}>
                        Redirect
                    </button>
                )}
                {/* Render MCQModal only when isModalOpen is true */}
                <MCQModal isOpen={isModalOpen} closeModal={closeModal} mcqTestData={mcqTestData} />

            </div>
            <div className="editorWrap">
                <Editor1 socketRef={socketRef} roomId={roomId} initialCode={code} />
            </div>
        </div>
    );
};

export default EditorPage;
