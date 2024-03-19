// Editor.js
import React, { useEffect, useRef } from 'react';
import Editor1 from './Editor1';
import { EditorState, EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';

const ACTIONS = {
    JOIN: 'join',
    JOINED: 'joined',
    DISCONNECTED: 'disconnected',
    CODE_CHANGE: 'code-change',
    SYNC_CODE: 'sync-code',
    LEAVE: 'leave',
};

const Editor = ({ socketRef, roomId, initialCode }) => {
    const editorRef = useRef(null);

    useEffect(() => {
        async function init() {
            const extensions = [
                basicSetup,
                javascript(),
            ];

            console.log('initialCode', initialCode);

            const parentElement = document.getElementById('realtimeEditor');
            if (!parentElement) {
                console.error("Parent element not found");
                return;
            }

            editorRef.current = new EditorView({
                state: EditorState.create({
                    doc: initialCode,
                    extensions,
                }),
                parent: parentElement,
            });

            editorRef.current.on('change', (changes) => {
                const code = editorRef.current.state.doc.toString();
                console.log(changes)
                socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                    roomId,
                    code,
                });
            });
        }


        init();
    }, []);



    useEffect(() => {
        if (editorRef.current && socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
                console.log('Received code change', code);
                editorRef.current.dispatch({
                    changes: {
                        from: 0,
                        to: editorRef.current.state.doc.length,
                        insert: code,
                    },
                });
            });

            // Cleanup function for socket event listener
            return () => {
                socketRef.current.off(ACTIONS.CODE_CHANGE);
            };
        }
    }, [socketRef.current, editorRef.current]); // Provide socketRef.current as a dependency

    // return <textarea id="realtimeEditor"></textarea>;
    return <Editor1 id="realtimeEditor" />;
};

export default Editor;
