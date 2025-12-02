// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: http });

app.use(express.static('public')); // folder sa HTML/JS/CSS fajlovima

let waitingPlayer = null; // čeka igrača
let rooms = [];

wss.on('connection', (ws) => {
    console.log('New player connected');

    // Ako nema igrača u čekaonici, stavimo ovog igrača da čeka
    if (!waitingPlayer) {
        waitingPlayer = ws;
        ws.send(JSON.stringify({ type: 'waiting' }));
    } else {
        // Ako već postoji igrač, kreiramo sobu
        const room = { player1: waitingPlayer, player2: ws };
        rooms.push(room);

        // Pošaljemo oba igrača signal da igra počinje
        room.player1.send(JSON.stringify({ type: 'start', player: 1 }));
        room.player2.send(JSON.stringify({ type: 'start', player: 2 }));

        waitingPlayer = null; // soba popunjena
    }

    ws.on('message', (message) => {
        const data = JSON.parse(message);

        // Prosleđujemo komande drugom igraču u sobi
        rooms.forEach(room => {
            if (room.player1 === ws) room.player2.send(JSON.stringify(data));
            else if (room.player2 === ws) room.player1.send(JSON.stringify(data));
        });
    });

    ws.on('close', () => {
        console.log('Player disconnected');
        if (waitingPlayer === ws) waitingPlayer = null;

        // Uklanjamo igrača iz soba
        rooms = rooms.filter(room => room.player1 !== ws && room.player2 !== ws);
    });
});

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
