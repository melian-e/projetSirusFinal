const express = require('express');         //initialise les package utilisé
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs')


app.use(express.static(__dirname + '/front/'));     //"initialisation du chemin pour express"

app.get('/', (req, res) => {                //permet au serveur de savoir quelle page il doit afficher
      res.sendFile(__dirname + '/front/html/index.html');
});
app.get('/game.html', (req, res) => {                //permet au serveur de savoir quelle page il doit afficher
    res.sendFile(__dirname + '/front/html/game.html');
});

io.on('connection', (socket) =>{

    socket.on("json", () =>{
        let json = fs.readFileSync('cartesPlay.json', 'utf8');         //lecture du json
        json = JSON.parse(json)
        socket.emit("jsonaction", json);
    });

});


http.listen(4200, () => {               //on indique sur quel port est le site
    console.log("Serveur lancé sur le port 4200")
});