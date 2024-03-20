import React, { useEffect, useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        setRole('interviewer');

        // Set role to interviewer when creating a new room
        toast.success('Created a new room');
    };
    useEffect(() => {
        if (role !== 'interviewer') {
            setRole('candidate');
        }
    }, [role]);
    const joinRoom = () => {
        if (!roomId || !username) {
            toast.error('ROOM ID & username are required');
            return;
        }

        // If role is not set to interviewer, set it to candidate
        if (role !== 'interviewer') {
            setRole('candidate');
        }

        // Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                username,
                role,
            },
        });
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };

    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                <h1 className="mainHeading">Welcome to CodeCollab</h1>
                <h4 className="mainLabel">Paste invitation ROOM ID</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="USERNAME"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        onKeyUp={handleInputEnter}
                    />
                    <button className="btn joinBtn" onClick={joinRoom}>
                        Join
                    </button>
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <button onClick={createNewRoom} className="createNewBtn">
                            new room
                        </button>
                    </span>
                </div>
            </div>
            <footer>
                <h4>Built with 💛 &nbsp; by &nbsp; Code Collab</h4>
            </footer>
        </div>
    );
};

export default Home;
