function gameStart(){
    let element = document.querySelector("#game")
    element.style.display =" inline-block"
    player =Character1
    enemy =Character2
    player.position.y = 100
    enemy.position.y = 100
    enemy.neprijatelj = true
    enemy.fliping()
    enemy.position.x=600
    player.position.x=200
    timer=60
    gameOver=false
    vreme()
    animate()
    screen("#glavni","none")
    
}
gameStart()