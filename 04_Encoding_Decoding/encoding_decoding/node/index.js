const base64EncodedString = btoa("hello there, this is base 64"); // btoa = binary to ASCII

console.log(base64EncodedString);

const base64DecodedString = atob(base64EncodedString); // atob = ASCII to binary

console.log(base64DecodedString);



