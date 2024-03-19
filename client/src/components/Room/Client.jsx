import React, { useState, useEffect, useRef } from 'react';
import Avatar from 'react-avatar';
import io from 'socket.io-client';

const Client = ({ username, roomId }) => {
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStreams, setRemoteStreams] = useState([]);
    const videoRef = useRef(null);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io('http://localhost:5000'); // Change URL as per your server configuration

        socketRef.current.emit('join-room', { roomId, username });

        const initMediaStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                setLocalStream(stream);
                console.log(stream)
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                socketRef.current.emit('new-stream', { roomId, stream });
            } catch (error) {
                console.error('getUserMedia error:', error);
            }
        };

        initMediaStream();

        socketRef.current.on('new-remote-stream', ({ stream }) => {
            setRemoteStreams(prevStreams => [...prevStreams, stream]);
        });

        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
            socketRef.current.disconnect();
        };
    }, [roomId, username]);

    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            videoTrack.enabled = !videoTrack.enabled;
            setVideoEnabled(videoTrack.enabled);
        }
    };

    const toggleAudio = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            audioTrack.enabled = !audioTrack.enabled;
            setAudioEnabled(audioTrack.enabled);
        }
    };

    return (
        <div className="client">
            {username && (
                <div className="userInfo">
                    <Avatar name={username} size={50} round="14px" />
                    <span className="userName">{username}</span>
                </div>
            )}
            <div className="controls">
                <button className={`btn ${videoEnabled ? 'active' : ''}`} onClick={toggleVideo}>
                    {videoEnabled ? 'Stop Video' : 'Start Video'}
                </button>
                <button className={`btn ${audioEnabled ? 'active' : ''}`} onClick={toggleAudio}>
                    {audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
                </button>
            </div>
            <div>
                <video ref={videoRef} className="local-video" autoPlay muted />
            </div>
            <div>
                {remoteStreams.map((stream, index) => (
                    <div key={index}>
                        <video className="remote-video" autoPlay ref={video => { if (video) video.srcObject = stream; }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Client;
