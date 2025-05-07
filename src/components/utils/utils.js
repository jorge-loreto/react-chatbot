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