// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({ server: http });

app.use(express.static('public'));

let waitingPlayer = null;
let rooms = [];

wss.on('connection', (ws) => {
    console.log('New player connected');

    // Dodeljivanje broja igrača i čeka protivnika
    if (!waitingPlayer) {
        waitingPlayer = ws;
        waitingPlayer.playerNumber = 1;
        ws.send(JSON.stringify({ type: 'waiting' }));
    } else {
        ws.playerNumber = 2;

        // Kreiranje sobe
        const room = { player1: waitingPlayer, player2: ws };
        waitingPlayer.room = room;
        ws.room = room;

        // Samo dodeljujemo karaktere kao ID-e, klijent će ih instancirati
        waitingPlayer.character = 1;
        ws.character = 2;

        rooms.push(room);

        // Obaveštavanje oba igrača da igra počinje
        waitingPlayer.send(JSON.stringify({ type: 'start', player: 1, character: 1 }));
        ws.send(JSON.stringify({ type: 'start', player: 2, character: 2 }));

        waitingPlayer = null;
    }

    // Primanje poruka od klijenta
    ws.on('message', (message) => {
        let data;
        try { data = JSON.parse(message); }
        catch (e) { console.error('Invalid JSON:', message); return; }

        const room = ws.room;
        if (!room) return;
        const otherPlayer = room.player1 === ws ? room.player2 : room.player1;

        switch (data.type) {
            case 'keyDown':
            case 'keyUp':
            case 'button_click':
                if (otherPlayer.readyState === WebSocket.OPEN) {
                    otherPlayer.send(JSON.stringify({
                        ...data,
                        from: ws.playerNumber
                    }));
                }
                break;

            case 'disconnect':
                if (otherPlayer.readyState === WebSocket.OPEN) {
                    otherPlayer.send(JSON.stringify({ type: 'opponent_disconnected' }));
                }
                break;

            default:
                console.log('Unknown message type:', data.type);
        }
    });


    // Kada se igrač diskonektuje
    ws.on('close', () => {
        console.log('Player disconnected');
        if (waitingPlayer === ws) waitingPlayer = null;

        // Obavesti protivnika i ukloni sobu
        const room = ws.room;
        if (room) {
            const otherPlayer = room.player1 === ws ? room.player2 : room.player1;
            if (otherPlayer && otherPlayer.readyState === WebSocket.OPEN) {
                otherPlayer.send(JSON.stringify({ type: 'opponent_disconnected' }));
            }
            rooms = rooms.filter(r => r !== room);
        }
    });
});

http.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
