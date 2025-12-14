let ws = new WebSocket('ws://localhost:3000');
function startMultiplayer() {
    // sakrij glavni meni i prikaži loading
    document.querySelector('#glavni').style.display = 'none';
    document.querySelector('#loading').style.display = 'flex';

    
    player = Character1;

    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === 'waiting') {
            console.log('Waiting for another player...');
        }

        if (data.type === 'start') {
            // sakrij loading i prikaži igru
            document.querySelector('#loading').style.display = 'none';
            document.querySelector('#game').style.display = 'inline-block';

            // enemy1 je protivnik
            enemy = Character3;

            // pozicioniranje igrača
            player.position.x = data.player === 1 ? 200 : 600;
            enemy.position.x = data.player === 1 ? 600 : 200;

            // pokreni animaciju
            animate(); 
        }

        if (data.type === 'command') {
            handleEnemyCommand(data.key, data.state); // funkcija za upravljanje protivnikom
        }
    };
}
