import { io } from 'socket.io-client';

export const initSocket = async () => {
    
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    const backendUrl = 'http://localhost:5000';
    console.log('backendUrl', backendUrl);
    if (!backendUrl) {
        throw new Error('REACT_APP_BACKEND_URL is not defined in the environment.');
    }
    return io(backendUrl, options);
};
