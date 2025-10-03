import { formatDate } from "../utils/utils"; // Import the function
import barberIcon from '../../../../assets/icon-barbershop.jpg';
import estilismoIcon from '../../../../assets/icon-estilismo.jpg';
import nurseIcon from '../../../../assets/icon-nurse.jpg';
import prepaIcon from '../../../../assets/icon-prepa.jpg';
import iteciIcon from '../../../../assets/iteci.png';
import inglesIcon from '../../../../assets/iconEnglish.png';

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

      const iconMap = {
        barber: barberIcon,
        estilismo: estilismoIcon,
        enfermeria: nurseIcon,
        prepa: prepaIcon,
        iteci: iteciIcon,
        ingles:inglesIcon,
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
            return "inicio: "+formatDate(startDate); // Format the date using the imported function
        }
        if( admision) {
            return "Curso ya iniciado pero con lugares disponibles";
        }
        return "Sin fecha disponible";
      };
    


    return (

        <div style={styles.card}>
  <h2 style={styles.h2}>{place.name}</h2>
  <p><strong>Dirección:</strong> {place.address}</p>
  <p><strong>Teléfono:</strong> {place.phone}</p>

  <div>
    <h3>Cursos disponibles:</h3>
    <div style={styles.buttonContainer}>
      {place.categories.map((category, index) => {
        const isValid = isStartDateValid(
          category.categoryDetails.startDate,
          category.categoryDetails.admision
        );
        const startDateMessage = getStartDateMessage(
          category.categoryDetails.startDate,
          category.categoryDetails.admision
        );

        const isImageLeft = index % 2 === 0;
        const animationStyle = {
          animation: isImageLeft ? 'slideInLeft 0.5s ease' : 'slideInRight 0.5s ease',
          animationDelay: `${index * 0.1}s`,
          animationFillMode: 'both',
          transition: 'transform 0.3s ease',
        };

        return (
          <div
            key={index}
            style={{
              marginBottom: '20px',
              display: 'flex',
              flexDirection: isImageLeft ? 'row' : 'row-reverse',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <img
              src={iconMap[category.description] || iteciIcon}
              alt={`${category.description} icon`}
              style={{
                width: '80px',
                height: '70px',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                ...animationStyle,
              }}
            />

            <div>
              <button
                style={{
                  ...styles.button,
                  backgroundColor: isValid ? 'green' : 'gray',
                  cursor: isValid ? 'pointer' : 'not-allowed',
                }}
                onClick={() => isValid && setCurso(index)}
                disabled={!isValid}
              >
                {category.name}
              </button>

              <p style={{ marginTop: '10px', color: isValid ? 'green' : 'red' }}>
                {startDateMessage}
              </p>
            </div>
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
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
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
