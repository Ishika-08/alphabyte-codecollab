import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import Dropdown from '../Editor/dropdown';
import { python } from '@codemirror/lang-python';
import { abcdef } from '@uiw/codemirror-theme-abcdef';
import io from 'socket.io-client';
import { initSocket } from '../../socket';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import axios from 'axios';

const ACTIONS = {
  CODE_CHANGE: 'code-change',
};

const socket = io('http://localhost:5000');

const Editor1 = ({ socketRef, roomId, initialCode }) => {
  const [code, setCode] = useState('#include <iostream>\nusing namespace std;\n\nint main() {\n\t// your code goes here\n\treturn 0;\n}');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('output will be displayed here');
  const [lang, setLanguage] = useState('C++');
  const editorRef = useRef(null);

  useEffect(() => {
    socketRef.current = socket;
    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, []);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleSubmit = () => {
    if(lang == "Python"){
    axios.post("http://localhost:3000/editor/python", {code,input})
    .then(res => setOutput(res.data.result))
    .catch(err => console.log(err))
    }else{
      axios.post("http://localhost:3000/editor/compile", { lang, code, input })
      .then(res => {
        setOutput(res.data.output);
          console.log(res);
      })
      .catch(err => console.log(err));
    }  
  }

  useEffect(() => {
    const handleCodeChange = (newCode) => {
      setCode(newCode);
    };

    initSocket(roomId, handleCodeChange)
      .then(socket => {
        socketRef.current = socket;
      })
      .catch(error => {
        console.error('Socket connection failed:', error);
      });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [roomId]);

  const handleChange = (editor, change) => {
    const value = editor;
    // console.log(value) // Get the updated value from the editor state
    setCode(value); // Update local state with the new value
    socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
      // console.log('Received code change', code);
      setCode(code); // Update the code state with the received code
    });
    socketRef.current.emit(ACTIONS.CODE_CHANGE, { roomId, code: value });
  };

  return (
    <div className='my-5' >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 md:row-span-2 p-4 rounded-md">
            <div className='h-[70px] bg-black m-4 flex justify-center rounded-xl'>
              <div className='flex p-5 '>
              <Dropdown onLanguageChange={handleLanguageChange} />
                <button className='bg-green-500 text-white p-2 rounded-md w-[200px] text-xl font-semibold h-[50px] mt-[-12px]'
                onClick={handleSubmit}>Compile & Execute</button>
              </div>
            </div>
            <div id="realtimeEditor">

              <CodeMirror
                value={code}
                height="500px"
                theme={abcdef}
                extensions={[python({ jsx: true })]}
                onChange={handleChange}
                style={{ fontSize: "20px", marginLeft: "15px", marginRight: "15px" }}
              />
            </div>
          </div>

          <div className="md:col-span-1 md:row-span-2 p-4 bg-black mt-4 mr-4 rounded-lg h-[600px]">

          <div className="md:col-span-1 md:row-span-2 p-4 h-[250px] mb-5 rounded-lg bg-white">
            {/* Content for the bottom right row */}
            <h2 className="text-3xl font-bold mb-2">Input</h2>
            <textarea 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            placeholder='Enter input here...'
            className='w-[15  0px] h-[150px] border-none resize-none focus:outline-none'/>
          </div>

          <div className="md:col-span-1 md:row-span-2 p-4 h-[250px] bg-white rounded-lg">
            {/* Content for the bottom right row */}
            <h2 className="text-3xl font-bold mb-2">Output</h2>
            <p className='text-xl'>{`${output}`}</p>
          </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor1;
