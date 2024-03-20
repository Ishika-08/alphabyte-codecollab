import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
const Candidate = () => {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    fetchCandidates('kk44');
  }, []);

  const fetchCandidates = async (interviewerId) => {
    console.log("triggered")
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
      setCandidates(data);
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    }
  };


  // Function to handle button click, redirecting to the classroom page
  const startInterview = (userId, interviewerId) => {
    navigate(`/editor/:roomId`);
    //send the room id to the email
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
              <th className="text-left p-3 px-5">Role</th>
              <th>Action</th>
            </tr>
            {candidates.map((user) => (
              <tr key={user._id} className="border-b hover:bg-orange-100 bg-gray-100">
                <td className="p-3 px-5">
                  <input type="text" value={user.name} className="bg-transparent" readOnly/>
                </td>
                <td className="p-3 px-5">
                  <input type="text" value={user.email} className="bg-transparent" readOnly/>
                </td>
                <td className="p-3 px-5">
                  <select value={user.role} className="bg-transparent" disabled>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
                <td className="p-3 px-5 flex justify-end">
                  <button 
                    type="button" 
                    onClick={() => startInterview(user._id, 'kk44')}
                    className="text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Start Interview
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Candidate;
