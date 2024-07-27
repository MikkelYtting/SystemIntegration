console.log(new Date()) // Opretter date objekt

console.log(Date()) // Kalder blot en funktion, returnere en streng

console.log(Date.now()) // Returnerer antallet af millisekunder siden 1. januar 1970 00:00:00 UTC

//---------------------------------------------------------//


const DateVariabel = new Date();
console.log(DateVariabel); // Tue Jul 23 2024 14:30:00 GMT+0200 (Central European Summer Time)

const Formater_Dato_Til_Dansk_Format = new Intl.DateTimeFormat("da-dk").format(DateVariabel); // JS funktion til at formatere dataoer og tidspunkt
console.log(Formater_Dato_Til_Dansk_Format); // 23/07/2024"                                         

const Formater_Dato_Til_US_Format = new Intl.DateTimeFormat("en-us").format(DateVariabel);
console.log(Formater_Dato_Til_US_Format); // "07/23/2024"