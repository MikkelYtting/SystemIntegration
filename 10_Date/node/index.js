console.log(new Date()) // Opretter date objekt

console.log(Date()) // Kalder blot en funktion, returnere en streng

console.log(Date.now()) // Returnerer antallet af millisekunder siden 1. januar 1970 00:00:00 UTC

//---------------------------------------------------------//


const DateVariabel = new Date();
console.log(DateVariabel); // Tue Jul 23 2024 14:30:00 GMT+0200 (Central European Summer Time)

const DanskTidsFormat = new Intl.DateTimeFormat("da-dk").format(DateVariabel); // JS funktion til at formatere dataoer og tidspunkt
console.log(DanskTidsFormat); // 23/07/2024"                                         

const AmerikanskTidsFormat = new Intl.DateTimeFormat("en-us").format(DateVariabel);
console.log(AmerikanskTidsFormat); // "07/23/2024"