const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width=1024
canvas.height = 576

c.fillRect(0,0,canvas.width,canvas.height)

const background = new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc: './assest/background/background.png'
})

const shop = new Sprite({
    position:{
        x:600,
        y:159
    },
    imageSrc : './assest/background/shop_anim.png',
    scale:2.5,
    koliko:6
})

 let player
 let enemy

const keys = {
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
}


    function animate(){
        window.requestAnimationFrame(animate)
        c.fillStyle= 'black'
        c.fillRect(0,0,canvas.width,canvas.height)
    
        background.update()
        shop.update()
    
        player.update()
        enemy.update()
        if(player){
            
            if(player.position.x+player.width+player.pomeri.x >enemy.position.x+enemy.pomeri.x+enemy.width){
               if(enemy.neprijatelj){
                    player.fliping()
                    enemy.normaling()
               }
               
            }else {
                if(player.neprijatelj){
                    enemy.fliping()
                    player.normaling()
                }
                
                
            }
        }
        


        player.velocity.x=0
    
        
        if (keys.a.pressed && player.lastKey=='a'){
            if(player.position.x>0){
                player.velocity.x=-5
            }else{
                player.velocity.x=0
            }
            
            player.switchSprite('run')
        }else if (keys.d.pressed && player.lastKey=='d'){
            if(player.position.x<915){
                player.velocity.x=5
            }else{
                player.velocity.x=0
            }
            player.switchSprite('run')
        }else{
            player.switchSprite('idle')
        }
    
        if(player.velocity.y<0){
            player.switchSprite('jump')
        }else if (player.velocity.y>0){
            player.switchSprite('fall')
        }
    
        enemy.velocity.x=0
        if (keys.ArrowRight.pressed && enemy.lastKey=='ArrowRight' ){
            if(enemy.position.x<915){
                enemy.velocity.x=5
            }else{
                enemy.velocity.x=0
            }
            
            enemy.switchSprite('run')
        }else if (keys.ArrowLeft.pressed && enemy.lastKey=='ArrowLeft' ){
            if(enemy.position.x>0){
                enemy.velocity.x=-5
            }else{
                enemy.velocity.x=0
            }
            
            enemy.switchSprite('run')
        }else{
            enemy.switchSprite('idle')
        }
        if(enemy.velocity.y < 0){
            enemy.switchSprite('jump')
        }else if (enemy.velocity.y > 0){
            enemy.switchSprite('fall')
        }
    
       player.isGround()
       enemy.isGround()
    
    
       if(
         udaren({napadac:player,udaren:enemy})&& player.isAttack && player.trenutni==4
         ){
            enemy.takeHit()
            player.isAttack = false
            
            document.querySelector('#enemyhl').style.width = enemy.health + '%'
       }
       if(
        udaren({napadac:enemy,udaren:player})&& enemy.isAttack && enemy.trenutni == 2
        ){
            player.takeHit()
           enemy.isAttack = false
           
           
            document.querySelector('#playerhl').style.width = player.health + '%'
           
      }
      //console.log(player.position.x+player.pomeri.x,enemy.position.x+enemy.pomeri.x)
      //za flipovanje ali me sada mrzi
      
    
    
      if(player.isAttack && player.trenutni ==4){
          player.isAttack= false
      }
      if(enemy.isAttack && enemy.trenutni ==2){
        enemy.isAttack= false
    }
      if(enemy.health <=0 || player.health <=0) {
            pobednik({player,enemy,timerId})
      }
    }
    


    function pobednik({player,enemy,timerId}){
        clearTimeout(timerId)
        const p =document.querySelector("#displayText")
            p.style.display = 'flex'
            if(player.health === enemy.health){
                p.innerHTML ="Tie"  
            }else if(player.health>enemy.health){
                p.innerHTML ="Player 1 Wins"
                enemy.switchSprite('death')
            } else if(player.health<enemy.health){
                p.innerHTML = "Player 2 Wins"
                player.switchSprite('death')
            }
    }
    
    function udaren({napadac,udaren}){
        return(napadac.attackBox.position.x + napadac.attackBox.width>= udaren.position.x &&
            napadac.attackBox.position.x <=udaren.position.x+udaren.width
            && napadac.attackBox.position.y + napadac.attackBox.height >= udaren.position.y)
    }
    let timer=60
    let timerId
    function vreme(){
        if(timer>0){
           timerId=setTimeout(vreme,1000)
            timer--
            document.querySelector("#timer").innerHTML = timer
        }
        
        if(timer ===0){
           pobednik({player,enemy,timerId})
        }
    }
    
    
    window.addEventListener('keydown', (event)=>{
        if(!player.smrt){
        switch (event.key){
            case 'd':
                keys.d.pressed = true
                player.lastKey ='d'
            break
            case 'a':
                keys.a.pressed = true
                player.lastKey ='a'
            break
            case 'w':
                if(player.ground)
                player.velocity.y =-16
            break
            case ' ':
                player.attack()
            break
            case 's':
                if(!player.ground) player.gravity += 0.8;
            break
        }
        }
    
        if(!enemy.smrt){
            switch(event.key){
                case 'ArrowRight':
                    keys.ArrowRight.pressed = true
                    enemy.lastKey='ArrowRight'
                break
                case 'ArrowLeft':
                    keys.ArrowLeft.pressed = true
                    enemy.lastKey='ArrowLeft'
                break
                case 'ArrowUp':
                    if(enemy.ground)
                    enemy.velocity.y =-16
                break
                case 'o':
                    enemy.attack()
                break
                case 'ArrowDown':
                    if(!enemy.ground) enemy.gravity += 0.8;
                break
            }
        }
    })
    window.addEventListener('keyup', (event)=>{
        switch (event.key){
            case 'd':
                keys.d.pressed = false
            break
            case 'a':
                keys.a.pressed = false
            break
            case 'ArrowRight':
                keys.ArrowRight.pressed = false
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = false
                
            break
            case 's':
                player.gravity = 0.5
            break
            case 'ArrowDown':
                enemy.gravity = 0.5;
            break
        }
    })



