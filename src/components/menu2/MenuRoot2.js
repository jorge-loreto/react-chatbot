import { formatDate } from "../utils/utils"; // Import the function

const PlaceCard = ({ place, curso, setCurso }) => {

    const isStartDateValid = (startDate) => {
        const now = new Date(); // Current date and time
        const start = new Date(startDate); // Convert startDate string to Date object
        return start > now; // Check if startDate is greater than now
      };

      
      const getStartDateMessage = (startDate) => {

        console.log('startDate: {}', startDate);
        const start = new Date(startDate);


        console.log('startDate  converted: {}',start); // Outputs: Sat May 17 2025 00:00:00 GMT+0000 (Coordinated Universal Time)
        if (!startDate) {
          return "No hay fecha disponible aún";
        }
        const now = new Date();
        if (start > now) {
            return formatDate(startDate); // Format the date using the imported function
        }
        return "Sin fecha disponible";
      };
    


    return (
        <div style={styles.card}>
            <h2>{place.name}</h2>
            <p><strong>Direccion:</strong> {place.address}</p>
            <p><strong>Telefono:</strong> {place.phone}</p>

                <div>
                    <h3>Cursos disponibles:</h3>
                    <div style={styles.buttonContainer}>
                        {place.categories.map((category, index) => {
                            const isValid = isStartDateValid(category.categoryDetails.startDate);
                            const startDateMessage = getStartDateMessage(category.categoryDetails.startDate);
                           
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
                                    {isValid ? `Inicia el: ${startDateMessage}` : startDateMessage}
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
