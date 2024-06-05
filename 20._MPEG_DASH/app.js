// videokvalitet baseret på brugerens netværksbetingelser

import express from "express";
const app = express();
// Server statiske filer fra "public" mappen
app.use(express.static("public"));
// Server statiske filer fra "videos" mappe
app.use(express.static("videos"));

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => console.log("Server is running on port:", PORT));




// Jeg downloadede en sample video ved navn: "SampleVideo_1280x720_1mb.mp4"
// Derefter brugte jeg ffmpeg til at konvertere videoen til flere bitrates og opløsninger for at muliggøre adaptiv streaming
// ffmpeg -i videos/SampleVideo_1280x720_1mb.mp4 -map 0 -c:v libx264 -c:a aac -b:v:0 500k -s:v:0 640x360 -b:v:1 1000k -s:v:1 1280x720 -b:a 128k -adaptation_sets "id=0,streams=v id=1,streams=a" -f dash videos/playlist.mpd
// Denne kommando genererer en MPEG-DASH manifestfil (playlist.mpd) og segmentfiler i "videos" mappen. 
// Manifestfilen indeholder information om de forskellige streams, så videoafspilleren kan tilpasse kvaliteten efter netværksforholdene.