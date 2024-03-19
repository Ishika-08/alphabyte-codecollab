// WebRTC.js

import { useState, useEffect } from 'react';
import SimplePeer from 'simple-peer';

const useWebRTC = (socketRef, roomId, location, ACTIONS) => {
    const [stream, setStream] = useState(null);
    const [peers, setPeers] = useState([]);
    const [clients, setClients] = useState([]);
    const [code, setCode] = useState('');
    const codeRef = useRef('');

    useEffect(() => {
        const initWebRTC = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                setStream(stream);

                socketRef.current.emit(ACTIONS.JOIN, {
                    roomId,
                    username: location.state?.username,
                });

                socketRef.current.on(ACTIONS.JOINED, ({ clients, username, code }) => {
                    const newPeers = [];
                    clients.forEach(client => {
                        if (client.socketId !== socketRef.current.id) {
                            const peer = new SimplePeer({ initiator: true, stream });
                            peer.on('signal', signal => {
                                socketRef.current.emit('signal', { signal, to: client.socketId });
                            });
                            newPeers.push({ socketId: client.socketId, peer });
                        }
                    });
                    setPeers(newPeers);

                    if (username !== location.state?.username) {
                        toast.success(`${username} joined the room.`);
                        console.log(`${username} joined`);
                    }
                    setClients(clients);
                    codeRef.current = code;
                    setCode(code); // Update code state
                });

                socketRef.current.on('signal', ({ signal, from }) => {
                    const peer = new SimplePeer({ initiator: false, stream });
                    peer.signal(signal);
                    setPeers(prevPeers => [...prevPeers, { socketId: from, peer }]);
                });

            } catch (error) {
                console.error('Error accessing media devices:', error);
            }
        };

        initWebRTC();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            peers.forEach(({ peer }) => {
                peer.destroy();
            });
        };
    }, []);

    return { stream, peers, clients, code };
};

export default useWebRTC;
