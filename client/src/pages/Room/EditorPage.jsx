import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import Client from '../../components/Room/Client';
import Editor1 from '../../components/Room/Editor1';
import { initSocket } from '../../socket';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MCQModal from '../../components/Room/MCQModal';
import Data from '../../data/data';

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
    const locationState = useLocation().state;
    const role = locationState ? locationState.role : '';

    const [localStream, setLocalStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState([]);
    const [clients, setClients] = useState([]);
    const [code, setCode] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // State for controlling the modal
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
                    const filteredClients = clients.filter(client => {
                        return !prevClients.some(prevClient => prevClient.socketId === client.socketId);
                    });
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

            socketRef.current.on(ACTIONS.NEW_STREAM, ({ roomId, stream }) => {
                setRemoteStreams(prevStreams => [
                    ...prevStreams,
                    { socketId: socketRef.current.id, stream },
                ]);
            });

            socketRef.current.on(ACTIONS.START_MCQ_TEST, ({ roomId, testData }) => {
                setMcqTestData(testData);
                setIsModalOpen(true); // Open the modal when the MCQ test starts
            });

        };
        init();

        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, [roomId, location.state, localStream]);

    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    };

    const leaveRoom = () => {
        navigate('/');
    };

    const startMCQTest = () => {
        if (role === 'candidate') {
            setIsModalOpen(true); // Open the modal when starting the MCQ test
        }
        socketRef.current.emit(ACTIONS.START_MCQ_TEST, { roomId, testData: Data });
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal when closeModal is called
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
                        {clients.map((client, index) => (
                            <Client
                                key={`${client.socketId}-${index}`} // Ensure keys are unique
                                username={client.username}
                                socketRef={socketRef} // Pass the socketRef prop here
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
                {mcqTestData && <MCQModal isOpen={isModalOpen} closeModal={closeModal} />}


            </div>
            <div className="editorWrap">
                <Editor1 socketRef={socketRef} roomId={roomId} initialCode={code} />
            </div>
        </div>
    );
};

export default EditorPage;
