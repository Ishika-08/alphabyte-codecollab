import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import Client from '../../components/Room/Client';
import Editor1 from '../../components/Room/Editor1';
import { initSocket } from '../../socket';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const ACTIONS = {
    JOIN: 'join',
    JOINED: 'joined',
    DISCONNECTED: 'disconnected',
    CODE_CHANGE: 'code-change',
    NEW_STREAM: 'new-stream',
    TOGGLE_VIDEO: 'toggle-video',
    TOGGLE_AUDIO: 'toggle-audio',
};

const EditorPage = () => {
    const socketRef = useRef(null);
    const videoRef = useRef(null);
    const location = useLocation();
    const { roomId } = useParams();
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState([]);
    const reactNavigator = useNavigate();
    const [clients, setClients] = useState([]);
    const [code, setCode] = useState('');

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            socketRef.current.on(ACTIONS.JOINED, ({ clients, code }) => {
                setClients(clients);
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

            navigator.mediaDevices
                .getUserMedia({ video: true, audio: true })
                .then(stream => {
                    setLocalStream(stream);
                    socketRef.current.emit(ACTIONS.NEW_STREAM, { roomId, stream });
                })
                .catch(error => console.error('getUserMedia error:', error));

            socketRef.current.on(ACTIONS.NEW_STREAM, ({ roomId, stream }) => {
                setRemoteStreams(prevStreams => [
                    ...prevStreams,
                    { socketId: socketRef.current.id, stream },
                ]);
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
    }, []);
    useEffect(() => {
        remoteStreams.forEach(({ socketId, localStream }) => {
            console.log('Remote stream:', localStream);
            if (localStream && Object.keys(localStream).length > 0) {
                const videoElement = document.getElementById(socketId);
                if (videoElement) {
                    if (localStream instanceof MediaStream) {
                        videoElement.srcObject = localStream;
                    } else {
                        console.error("Invalid stream object:", localStream);
                    }
                } else {
                    console.error("Invalid video element for socket ID:", socketId);
                }
            } else {
                console.error("Received empty or invalid stream object:", localStream);
            }
        });
    }, [remoteStreams]);

    // Inside the useEffect hook for initializing local stream
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                console.log('Local stream:', stream);
                setLocalStream(stream);
                socketRef.current.emit(ACTIONS.NEW_STREAM, { roomId, localStream });
            })
            .catch(error => console.error('getUserMedia error:', error));
    }, []);



    const toggleVideo = () => {
        if (localStream) {
            console.log('Local stream:', localStream);
            const videoTracks = localStream.getVideoTracks();
            if (videoTracks.length > 0) {
                const track = videoTracks[0];
                track.enabled = !track.enabled;
                setVideoEnabled(track.enabled);
                setRemoteStreams(prevStreams => {
                    return prevStreams.map(stream => {
                        if (stream.socketId === socketRef.current.id) {
                            return { ...stream, stream: track };
                        }
                        return stream;
                    });
                });

                const updatedStream = new MediaStream([
                    ...localStream.getAudioTracks(),
                    track,
                ]);
                setLocalStream(updatedStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = updatedStream;
                }
            } else {
                console.error('No video tracks found in the local stream.');
            }
        } else {
            console.error('Local stream is null or undefined.');
        }
    };

    const toggleAudio = () => {
        if (localStream) {
            const audioTracks = localStream.getAudioTracks();
            if (audioTracks.length > 0) {
                const track = audioTracks[0];
                track.enabled = !track.enabled;
                setAudioEnabled(track.enabled);
            } else {
                console.error('No audio tracks found in the local stream.');
            }
        } else {
            console.error('Local stream is null or undefined.');
        }
    };

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    return (
        <div className="mainWrap">
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <h1>Code Collab</h1>
                    </div>
                    <h3>Connected</h3>
                    <div className="clientsList">
                        <div className="clientsList">
                            {clients.map((client, index) => (
                                <Client
                                    key={`${client.socketId}-${index}`} // Ensure keys are unique
                                    username={client.username}
                                    // socket={socketRef.current}
                                    videoRef={videoRef}
                                    // toggleAudio={toggleAudio}
                                    // toggleVideo={toggleVideo}
                                    roomId={roomId}
                                />
                            ))}
                        </div>

                    </div>
                </div>

                {/* <div className="controls">
                    <button className={`btn ${videoEnabled ? 'active' : ''}`} onClick={toggleVideo}>
                        {videoEnabled ? 'Stop Video' : 'Start Video'}
                    </button>
                    <button className={`btn ${audioEnabled ? 'active' : ''}`} onClick={toggleAudio}>
                        {audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
                    </button>
                </div> */}
                {/* <div className="videoWrapper">
                    {localStream ? (
                        <div>
                            <video ref={videoRef} className="local-video" autoPlay muted />
                        </div>
                    ) : (
                        <p>No local stream available</p>
                    )}

                    <div className="remoteVideos">
                        {remoteStreams.map(({ socketId }, index) => (
                            <div key={`${socketId}-${index}`}>
                                <video id={socketId} className="remote-video" autoPlay />
                                <h1>{socketId}</h1>
                            </div>
                        ))}

                    </div>
                </div> */}

                <button className="btn copyBtn" onClick={copyRoomId}>
                    Copy ROOM ID
                </button>
                <button className="btn leaveBtn" onClick={leaveRoom}>
                    Leave
                </button>
            </div>
            <div className="editorWrap">
                <Editor1 socketRef={socketRef} roomId={roomId} initialCode={code} />
            </div>
        </div>
    );
};

export default EditorPage;
