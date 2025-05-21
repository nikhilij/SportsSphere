import React, { useState, useRef, useEffect } from 'react';

const ChatBox = ({ messages = [], onSendMessage, user }) => {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSend = (e) => {
        e.preventDefault();
        if (input.trim() && onSendMessage) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    return (
        <div className="flex flex-col h-[400px] w-full border border-gray-300 rounded-lg bg-gray-50">
            <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`max-w-[70%] px-3 py-2 rounded-xl shadow-sm text-[15px] break-words mb-0.5 ${
                            msg.user === user
                                ? 'self-end bg-green-100'
                                : 'self-start bg-white'
                        }`}
                    >
                        <div className="text-xs text-gray-500 mb-0.5">{msg.user}</div>
                        <div>{msg.text}</div>
                        <div className="text-[10px] text-gray-400 mt-0.5 text-right">{msg.time}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form className="flex border-t border-gray-200 p-2 bg-white" onSubmit={handleSend}>
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 rounded-md border border-gray-300 text-[15px] mr-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-blue-700 text-white font-bold hover:bg-blue-800 transition"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatBox;
