import './chat.css';
import React, {useRef, useState} from 'react';
import ChatHistory from "./history/ChatHistory";

function App() {
    const [textValue, setTextValue] = useState('Bienvenido a Grupo Iteci plantel LORETO ¿ Por favor dime en que puedo ayudarte??');

    const textAreaRef = useRef(null);
    let place = 'Loreto';
    let curso = 'Preparatoria';


    const handleSubmit = () => {
        const textoValue = textAreaRef.current.value.trim(); //
        textAreaRef.current.value = '';
        if (textoValue === '') {
            alert('Por favor escriba una pregunta');
        } else {
            setTextValue(textoValue);
        }
    };
    return (
            <div className="chat-container">
                {textValue && <ChatHistory userMessage={textValue} />}
                <textarea
                    id="questionTextArea"
                    name="questionTextArea"
                    placeholder="Escribe tu pregunta aqui..."
                    ref={textAreaRef}></textarea>
                <button onClick={handleSubmit}>Submit</button>
            </div>
    );
}

export default App;
