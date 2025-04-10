import React, { useState, useEffect, memo, useRef } from 'react';
import './ChatPlaceCategory2.css';
import { askQuestion } from "./api/apiClient"; // Import API function

const ChatPlaceCategory2 = memo(function ChatHistory(props) {
    const [messages, setMessages] = useState([]);
    const firstMessageSkipped = useRef(false);
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        console.log('ChatPlaceCategory2  RENDERED ALWAYS with:', firstMessageSkipped.current);
        if (!firstMessageSkipped.current) return;

        console.log('ChatPlaceCategory2  RENDERED ALWAYS with:', firstMessageSkipped.current);
        if (firstMessageSkipped.current) {
            console.log('ChatPlaceCategory2  RENDERED ALWAYS with:', props.userMessage);
            if (props.userMessage && !isWelcomeMessage(props.userMessage)) {
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
        const cleanedExpected = 'bienvenido a grupo iteci plantel'.normalize("NFD").replace(/\s+/g, ' ');

        if (cleanedQuestion.includes(cleanedExpected)) {
            console.log('ChatPlaceCategory2 Skipping because question is empty or matches the welcome message');
            setLoading(false);
            return;
        } else {
            console.log('DIFFERENT');
        }


        try {
            console.log('ChatPlaceCategory2 Calling askQuestion API:', question);
            console.log('Calling askQuestion API:', props.place);
            console.log('Calling askQuestion API:', props.curso);
            const data = await askQuestion(props.place.id, props.place.categories[props.curso].id, question);
            let responseText = `${data.answer}`;
            console.log('ChatPlaceCategory2 Updated with BEFORE RENDER:', responseText);
            console.log('ChatPlaceCategory2 Updated with BEFORE RENDER:', props.userMessage);
            setMessages((prevMessages) => {
                //if (!prevMessages.some(msg => msg.text === responseText)) {
                    console.log('ChatPlaceCategory2 Updated with:', responseText);
                    return [...prevMessages,
                        {text: props.userMessage, response: false},
                        { text: responseText, response: true }
                    ];
                //}
                return prevMessages;
            });

        } catch (err) {
            console.error('Failed to get a response. Please try again.', err);
        } finally {
            setLoading(false);
        }
    };

    const isWelcomeMessage = (message) => {

        const cleanedQuestion = message.toLowerCase().trim().normalize("NFD").replace(/\s+/g, ' ');
        const cleanedExpected = 'por favor dime en que puedo ayudarte'.normalize("NFD").replace(/\s+/g, ' ');

        return (cleanedQuestion.includes(cleanedExpected));
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

export default ChatPlaceCategory2;
