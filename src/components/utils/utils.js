// utils.js
export const formatDate = (dateString) => {
  const monthsInSpanish = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  try {
    // Asegurarse que la fecha tiene el formato ISO 'YYYY-MM-DD' o similar
    const [year, month, day] = dateString.split('-');

    // Validar que todos los componentes existan y sean numéricos
    if (
      year?.length === 4 &&
      !isNaN(parseInt(month)) &&
      !isNaN(parseInt(day)) &&
      parseInt(month) >= 1 && parseInt(month) <= 12
    ) {
      const formattedDate = `${parseInt(day)} de ${monthsInSpanish[parseInt(month) - 1]} de ${year}`;
      return formattedDate;
    } else {
      // Si falla la validación, devolver el valor original
      return dateString;
    }
  } catch (error) {
    // Si ocurre cualquier error inesperado, también devolver el valor original
    return dateString;
  }
};


export const formatDateSpanish = (dateString) => {//
  // Split the input into day, month, and year
  const [day, month, year] = dateString.split("/");

  // Array of month names in Spanish
  const monthsInSpanish = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  // Get the month name
  const monthName = monthsInSpanish[parseInt(month, 10) - 1]; // Convert month string to index (0-based)

  // Return the formatted string
  return `${day} ${monthName} ${year}`;
};

export const premioTranslation = (optionSelected) =>{
  console.log('Option selected random code: {} ...', optionSelected);
    if(optionSelected==='Sorpresa 1'){
      return "30% inscripcion";
    }
    if(optionSelected==='Sorpresa 2'){
      return "40% inscripcion";
    }
    if(optionSelected==='Sorpresa 3'){
      return "50% inscripcion";
    }
    if(optionSelected==='Sorpresa 4'){
      return "20% inscripcion";
    }
    if(optionSelected==='Sorpresa 5'){
      return "10% inscripcion";
    }
    
    return "50% en inscripcion";
};
/*
export const formatFloat = (num) =>{
    return parseFloat(num.toFixed(2)); 
  };*/

  export const formatFloat = (num) => {
    return parseFloat(Number(num).toFixed(2));
  };