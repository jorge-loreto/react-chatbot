import React, {useEffect} from "react";
import CategoryDetails from "./details/CategoryDetails";

const CursoCard = ({ place, curso, setSelectedOption }) => {
    // Validación para evitar errores si no hay datos
    const course = place?.categories[curso];
    let courseImage;

    if (!course) {
        return <p style={styles.error}>Curso no encontrado</p>;
    }

    // Obtener la imagen dinámicamente
    try {
        console.log("Imagen trying:", course.image);
        courseImage = require(`../../../../assets/${course.image}`);
        console.log("Imagen encontrada:", courseImage);
    } catch (err) {
        console.error("Imagen no encontrada, usando imagen de respaldo:", err);
        courseImage = require(`../../../../assets/iteci-logo.jpeg`); // Imagen de respaldo
    }




    return (
        <div style={styles.card}>
            {/* Información del lugar */}
            <h2 style={styles.title}>{place.name}</h2>
            <p style={styles.info}>
                <strong>Dirección:</strong> {place.address}
            </p>
            <p style={styles.info}>
                <strong>Teléfono:</strong> {place.phone}
            </p>
            

            {/* Información del curso */}
            <div style={styles.courseContainer}>
                <h3 style={styles.courseTitle}>{course.name}</h3>
                <img
                    src={courseImage}
                    alt="Course"
                    style={styles.image}
                />
            </div>
            <button style={styles.button} onClick={() => {
                        /*setSelectedOption(888);
                        setCurso(777);*/
                        setSelectedOption(555);//llama a REFERIDO
                    }}>
                🎁 ¡Gira y gana grandes descuentos!
            </button>
            <CategoryDetails categoryDetails={course.categoryDetails} />
        </div>
    );
};

const styles = {
    card: {
        border: "1px solid #ddd",
        padding: "12px",
        margin: "5px auto",
        borderRadius: "8px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        width: "320px",
        backgroundColor: "#fff",
        textAlign: "center",
    },
    title: {
        fontSize: "24px",
        marginBottom: "1px",
        color: "#333",
         marginTop: "0px",
    },
    info: {
        fontSize: "14px",
        margin: "5px 0",
        color: "#555",
    },
    courseContainer: {
        marginTop: "1px",
        padding: "1px",
        borderTop: "1px solid #ddd",
    },
    courseTitle: {
        fontSize: "18px",
        marginBottom: "1px",
        color: "#007bff",
    },
    description: {
        fontSize: "14px",
        color: "#666",
        marginBottom: "15px",
    },
    image: {
        width: "100%",
        height: "auto",
        borderRadius: "8px",
        boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
    },
    error: {
        color: "red",
        fontSize: "14px",
        textAlign: "center",
    },
     h2: {
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: "0px",
        marginRight: "0px",
        padding: "0px 0px",
    },
    button: {
        margin: "10px",
        padding: "10px 5px",
        fontSize: "16px",
        cursor: "pointer",
        borderRadius: "5px",
        border: "1px solid black",
        backgroundColor: "#007bff",
        color: "#fff"
    },
};

export default CursoCard;
