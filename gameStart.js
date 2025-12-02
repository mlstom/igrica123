function gameStart(){
    // Sakrij glavni meni
    screen("#glavni", "none");

    // Prikaži loading screen
    screen("#loading", "flex");

    player = Character1;
    player.position.y = 100;

    // Pošalji serveru da je igrač spreman
    ws.send(JSON.stringify({ type: "ready" }));

    // Čekaj signal servera da igra može da počne
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if(data.type === "start"){
            enemy = Character3; // ili info o drugom igraču sa servera
            enemy.position.y = 100;
            enemy.neprijatelj = true;
            enemy.fliping();
            enemy.position.x = 600;
            player.position.x = 200;

            // Sakrij loading screen i prikaži igru
            screen("#loading", "none");
            screen("#game", "inline-block");

            timer = 60;
            vreme();
            animate();
        }
    };
}
