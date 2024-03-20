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
      const updatedData = data.map(candidate => ({
        ...candidate,
        meetingHash: uuidv4(),
      }));
      setCandidates(updatedData);
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    }
  };

  const startInterview = async (user) => {
    const sendMeetingHash = async (email, meetingHash) => {
      try {
        const response = await fetch('http://localhost:3000/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, meetingHash }),
        });

        if (!response.ok) {
          throw new Error(`Email send failed: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Email sent successfully:', result);
      } catch (error) {
        console.error('Failed to send email:', error);
      }
    };

    await sendMeetingHash(user.email, user.meetingHash);
    navigate(`/editor/${user.meetingHash}`);
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
