import React, { useState, useEffect, useRef } from 'react';
import Avatar from 'react-avatar';
import * as faceapi from 'face-api.js';
import { CiVideoOff } from "react-icons/ci";
import { CiVideoOn } from "react-icons/ci";
import { AiTwotoneAudio } from "react-icons/ai";
import { AiOutlineAudioMuted } from "react-icons/ai";


const Client = ({ username, roomId, socketRef, key }) => {
    const [videoEnabled, setVideoEnabled] = useState(true);
    const [audioEnabled, setAudioEnabled] = useState(true);
    const [remoteStream, setRemoteStream] = useState(null);
    const [localStream, setLocalStream] = useState(null);
    const [numFaces, setNumFaces] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        // Load face detection model
        const loadModel = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/@tensorflow-models/face-landmarks-detection@0.0.1/weights');
                // Start face detection after the model is loaded
                setInterval(async () => {
                    const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
                    setNumFaces(detections.length);
                }, 1000);
            } catch (error) {
                console.error('Error loading model:', error);
            }
        };

        loadModel();

        // Event listener to handle incoming remote stream
        socketRef.current.on('new-stream', ({ stream }) => {
            if (stream) {
                setRemoteStream(stream);
            }
        });

        // Clean up function to remove the remote stream when unmounting
        return () => {
            setRemoteStream(null);
        };
    }, [socketRef]);

    useEffect(() => {
        // Get the local video stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setLocalStream(stream);
            })
            .catch(error => {
                console.error('Error accessing local video stream:', error);
            });

        // Clean up function to stop the local stream when unmounting
        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        };
    }, []);

    useEffect(() => {
        // Set the local stream as the video source when available
        if (localStream && videoRef.current) {
            videoRef.current.srcObject = localStream;

            // Start face detection
            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
                setNumFaces(detections.length);
            }, 1000);
        }
    }, [localStream]);

    const toggleVideo = () => {
        setVideoEnabled(prev => !prev);
    };

    const toggleAudio = () => {
        setAudioEnabled(prev => !prev);
    };

    return (
        <div className="client">
            <div className="controls">
                <button onClick={toggleVideo}>{videoEnabled ? <CiVideoOn/> : <CiVideoOff />}</button>
                <button onClick={toggleAudio}>{audioEnabled ? <AiTwotoneAudio /> : <AiOutlineAudioMuted />}</button>
            </div>
            <div className="video-container">
                {/* Show local video stream if video is enabled, otherwise show avatar */}
                {videoEnabled && localStream && (
                    <video className="local-video" autoPlay muted ref={videoRef} style={{ width: '150px' }} />
                )}
                {!videoEnabled && (
                    <Avatar
                        name={username}
                        size={150} // Set the size of the avatar to match the video width
                        round="14px"
                    />
                )}
                {/* Show remote stream if available */}
                {remoteStream && (
                    <video className="remote-video" autoPlay ref={videoRef} style={{ width: '150px' }} />
                )}
            </div>
            {/* Display warning if more than one face detected */}
            {numFaces > 1 && <div style={{ color: 'red' }}>Multiple people detected!</div>}
        </div>
    );
};

export default Client;
