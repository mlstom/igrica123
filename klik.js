let ws = new WebSocket('ws://localhost:3000');


window.addEventListener('keyup', (event) => {
   ws.send(JSON.stringify({
    type:"button_click",
    text:event.key
   }))
})