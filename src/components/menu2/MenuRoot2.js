import { formatDate } from "../utils/utils"; // Import the function

const PlaceCard = ({ place, curso, setCurso }) => {

    const isStartDateValid = (startDate, admision) => {
        const now = new Date(); // Current date and time
        const start = new Date(startDate); // Convert startDate string to Date object
        let esValido =  start > now; // Check if startDate is greater than now
        if(esValido === false && admision === true) {
            esValido = true;
        }
        return esValido; // Return true if valid, false otherwise
      };

      
      const getStartDateMessage = (startDate, admision) => {

        console.log('startDate: {}', startDate);
        const start = new Date(startDate);


        console.log('startDate  converted: {}',start); // Outputs: Sat May 17 2025 00:00:00 GMT+0000 (Coordinated Universal Time)
        if (!startDate) {
          return "No hay fecha disponible aún";
        }
        const now = new Date();
        if (start > now) {
            return "Inicia el: "+formatDate(startDate); // Format the date using the imported function
        }
        if( admision) {
            return "Curso ya iniciado pero con lugares disponibles";
        }
        return "Sin fecha disponible";
      };
    


    return (
        <div style={styles.card}>
            <h2 style={styles.h2}>{place.name}</h2>
            <p><strong>Direccion:</strong> {place.address}</p>
            <p><strong>Telefono:</strong> {place.phone}</p>

                <div>
                    <h3>Cursos disponibles:</h3>
                    <div style={styles.buttonContainer}>
                        {place.categories.map((category, index) => {
                            const isValid = isStartDateValid(category.categoryDetails.startDate, category.categoryDetails.admision);
                            const startDateMessage = getStartDateMessage(category.categoryDetails.startDate, category.categoryDetails.admision);
                           
                            
                            return (
                                <div key={index} style={{ marginBottom: "20px" }}>

                                <button
                                key={index}
                                style={{
                                    ...styles.button,
                                    backgroundColor: isValid ? 'green' : 'gray', // Change button color based on validation
                                    cursor: isValid ? 'pointer' : 'not-allowed', // Disable button if invalid
                                }}
                                onClick={() => isValid && setCurso(index)} // Only allow click if valid
                                disabled={!isValid} // Disable button if invalid
                                >
                                {category.name}

                                </button>
                                <p style={{ marginTop: "10px", color: isValid ? "green" : "red" }}>
                                    {startDateMessage}
                                </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

        </div>
    );
}
const styles = {
    card: {
        border: "1px solid #ddd",
        padding: "10px",
        margin: "1px",
        borderRadius: "8px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        width: "300px",
        backgroundColor: "#fff",
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "10px",
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "backgroundColor 0.3s ease",
    },
    buttonHover: {
        backgroundColor: "#0056b3",
    },
    h2: {
        marginTop: "0px",
        marginBottom: "0px",
        marginLeft: "0px",
        marginRight: "0px",
        padding: "0px 0px",
    },
};

export default PlaceCard;
