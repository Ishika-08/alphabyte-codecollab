import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library to generate hashes

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates('kk44');
  }, []);

  const fetchCandidates = async (interviewerId) => {
    try {
      const response = await fetch(`http://localhost:3000/interviewees/${interviewerId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // Assign a unique hash for each candidate (for the meeting ID)
      const updatedData = data.map(candidate => ({
        ...candidate,
        meetingHash: uuidv4(), // This will generate a unique hash for each candidate
      }));
      setCandidates(updatedData);
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    }
  };

  // Function to handle button click, which should send the room ID to the candidate's email and redirect to the room
  const startInterview = async (user) => {
    // Function to send the meeting hash via email to the candidate
    const sendMeetingHash = async (email, meetingHash) => {
      // API call to your backend to send the email
      // await axios.post('/send-email', { email, meetingHash });
    };

    await sendMeetingHash(user.email, user.meetingHash); // Send the email
    navigate(`/editor/${user.meetingHash}`); // Redirect to the room with the meeting hash
  };

  return (
    <div className="text-gray-900 bg-gray-200">
      <div className="p-4 flex">
        <h1 className="text-3xl">Users</h1>
      </div>
      <div className="px-3 py-4 flex justify-center">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
            <tr className="border-b">
              <th className="text-left p-3 px-5">Name</th>
              <th className="text-left p-3 px-5">Email</th>
              <th>Action</th>
              <th>Meeting ID</th>
            </tr>
            {candidates.map((user) => (
              <tr key={user._id} className="border-b hover:bg-orange-100 bg-gray-100">
                <td className="p-3 px-5">{user.name}</td>
                <td className="p-3 px-5">{user.email}</td>
                <td className="p-3 px-5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => startInterview(user)}
                    className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Start Interview
                  </button>
                </td>
                <td>{user.meetingHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Candidate;
