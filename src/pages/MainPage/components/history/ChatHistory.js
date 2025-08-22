import React, { useState, useEffect, memo, useRef } from 'react';
import './chatHistory.css';
import { askQuestion } from "../api/apliClient"; // Import API function

const ChatHistory = memo(function ChatHistory(props) {
    const [messages, setMessages] = useState([]);
    const firstMessageSkipped = useRef(false);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        console.log('ChatHistory  RENDERED ALWAYS with:', firstMessageSkipped.current);
        if (!firstMessageSkipped.current) return;

        console.log('ChatHistory  RENDERED ALWAYS with:', firstMessageSkipped.current);
        if (firstMessageSkipped.current) {
            console.log('ChatHistory  RENDERED ALWAYS with:', props.userMessage);
            if (props.userMessage && !isWelcomeMessage(props.userMessage)) {
                /*setMessages((prevMessages) => {
                    // Prevent adding duplicate messages
                    //if (!prevMessages.some(msg => msg.text === props.userMessage)) {
                    console.log('ChatHistory Rendered with:', props.userMessage);
                    return [...prevMessages, {text: props.userMessage, response: false}];
                    //}
                    return prevMessages;
                });
*/

                handleAsk(props.userMessage);

            }
        }
    }, [props.userMessage]);

    useEffect(() => {
        if (!firstMessageSkipped.current) {
            firstMessageSkipped.current = true;
            console.log('ChatHistory INITIAL REDNDERED with:', props.userMessage);
            console.log('ChatHistory Rendered with:', props.userMessage);
            // eslint-disable-next-line no-unused-expressions
            setMessages ([ { text: props.userMessage, response: true }]);
            return;
        }


    }, []);

    const handleAsk = async (question) => {
        if (loading) return;
        setLoading(true);
        const cleanedQuestion = question.toLowerCase().trim().normalize("NFD").replace(/\s+/g, ' ');
        const cleanedExpected = 'bienvenido a grupo iteci plantel loreto ¿ por favor dime en que puedo ayudarte??'.normalize("NFD").replace(/\s+/g, ' ');

        if (cleanedQuestion === cleanedExpected) {
            console.log('Skipping because question is empty or matches the welcome message');
            return;
        } else {
            console.log('DIFFERENT');
        }


        try {
            console.log('Calling askQuestion API:', question);
            const data = await askQuestion(question);
            let responseText = `${data.answer}`;

            setMessages((prevMessages) => {
                if (!prevMessages.some(msg => msg.text === responseText)) {
                    console.log('ChatHistory Updated with:', responseText);
                    return [...prevMessages,
                        {text: props.userMessage, response: false},
                        { text: responseText, response: true }
                    ];
                }
                return prevMessages;
            });

        } catch (err) {
            console.error('Failed to get a response. Please try again.', err);
        }finally {
            setLoading(false);
        }
    };

    const isWelcomeMessage = (message) => {
        const cleanedQuestion = message.toLowerCase().trim().normalize("NFD").replace(/\s+/g, ' ');
        const cleanedExpected = 'bienvenido a grupo iteci plantel loreto ¿ por favor dime en que puedo ayudarte??'.normalize("NFD").replace(/\s+/g, ' ');

        return (cleanedQuestion === cleanedExpected);
    };

    return (
        <div className="chat-history">
            {messages.map((message, index) => (
                <div key={index}
                     className={`message ${message.response ? 'response' : 'user1'}`}>
                    {message.text}
                </div>
            ))}
            {loading && <div className="message response">Thinking...</div>}  {/* Show "Thinking..." */}
        </div>
    );
});

export default ChatHistory;
