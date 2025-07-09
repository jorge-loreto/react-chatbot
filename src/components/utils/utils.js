// utils.js
export const formatDate = (dateString) => {

    const monthsInSpanish = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];
      
    console.log(monthsInSpanish); // Outputs the array of months in Spanish

    console.log('formatDate: {}', dateString); // "Sat May 17 2025"
    console.log('formatDate: {}', dateString); // "2025-05-17T00:00:00Z"
    const [year, month, day] = dateString.split('-');
    console.log('' + year + '-' + month + '-' + day); // "Sat May 17 2025"
    const formattedDate = day+' de '+monthsInSpanish[month-1]+' de ' + year
    console.log(day+' de '+monthsInSpanish[month-1]+' de ' + year  ); // "Sat May 17 2025"
    console.log('fomratted dayte: ', formattedDate); // "Sat May 17 2025"
    return formattedDate;

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