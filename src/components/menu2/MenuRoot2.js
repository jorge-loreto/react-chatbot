import React, { useState } from "react";

const PlaceCard = ({ place, curso, setCurso }) => {



    return (
        <div style={styles.card}>
            <h2>{place.name}</h2>
            <p><strong>Direccion:</strong> {place.address}</p>
            <p><strong>Telefono:</strong> {place.phone}</p>

                <div>
                    <h3>Cursos disponibles:</h3>
                    <div style={styles.buttonContainer}>
                        {place.categories.map((category, index) => (
                            <button
                                key={index}
                                style={styles.button}
                                onClick={() => setCurso(index)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

        </div>
    );
}

const styles = {
    card: {
        border: "1px solid #ddd",
        padding: "20px",
        margin: "10px",
        borderRadius: "8px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        width: "300px", // Added width to make the card more consistent
        backgroundColor: "#fff",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column", // This makes the buttons display vertically
        gap: "10px", // Adds spacing between the buttons
        marginTop: "10px", // Adds space above the buttons
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#0056b3", // Darker blue when hovered
    },
};

export default PlaceCard;
