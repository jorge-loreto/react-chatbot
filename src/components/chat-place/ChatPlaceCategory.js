import './ChatPlaceCategory.css';

import React, {useRef, useState} from 'react';
import ChatPlaceCategory2 from "./chat-place2/ChatPlaceCategory2";

function App({ place, curso}) {
    const course = place?.categories[curso];
    const [textValue, setTextValue] = useState(
        `Bienvenido a Grupo Iteci plantel ${place.name.toUpperCase()} ¿Por favor dime en qué puedo ayudarte?`
    );

    const textAreaRef = useRef(null);


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
            Curso: {place.categories[curso].name.toUpperCase()}
            {textValue && <ChatPlaceCategory2 userMessage={textValue} place={place} curso = {curso} />}
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
