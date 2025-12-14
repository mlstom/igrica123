class Sprite {
    constructor({ position, imageSrc, scale = 1, koliko = 1,pomeri={x:0,y:0} }) {
        this.position = position
        this.height = 150
        this.width = 60
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.koliko = koliko
        this.trenutni = 0
        this.frameSkip= 0
        this.frameHold=5
        this.pomeri = pomeri
        this.pomoc =false

    }
    draw() {
        if(c){
            c.drawImage(
                this.image,
                this.trenutni * (this.image.width / this.koliko),
                0, 
                this.image.width / this.koliko,
                this.image.height,
                this.position.x - this.pomeri.x,
                this.position.y-this.pomeri.y,
                1*(this.image.width / this.koliko) * this.scale  ,
                this.image.height * this.scale,
    
            )
            c.restore()
            
        }
        
        
    }
    animateFrame(){
        this.frameSkip++
        if (this.frameSkip % this.frameHold === 0){
            if(this.trenutni<this.koliko -1){
                this.trenutni++
            }else{
                this.trenutni=0
            }
        }  
    }

    update() {
        if(c){
            this.draw()
            this.animateFrame()
        }
        
        
    }

}



class Fighter extends Sprite {
    constructor({awidth=120,aheight=50, position, velocity,offset, color,imageSrc, scale = 1, koliko = 1 ,pomeri = {x:0,y:0},sprites ,neprijatelj=false,name,id}) {
        super({
            imageSrc,
            scale,
            position,
            koliko,
            pomeri,
            
        })
        this.name=name
        this.id= id
        this.neprijatelj=neprijatelj
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 60
        this.lastKey
        this.ground
        this.gravity = 0.5
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset:offset,
            width: awidth,
            height: aheight,
        }
        this.color = color
        this.isAttack = false
        this.health = 100
        this.frameSkip= 0
        this.frameHold=10
        this.flip=false
        this.flag = true
        this.udarac=true
        this.smrt=false

        if(this.neprijatelj){
            this.flip=neprijatelj
        }

        if(this.neprijatelj){
            this.trenutni=this.koliko-1
        }else{
            this.trenutni=0
        }
        
        
        
        this.sprites = sprites


        for(const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
            if(this.neprijatelj){
                sprites[sprite].image.src=sprites[sprite].imageSrc.slice(0,-4)+"flip.png"
            }
        }
        
    }
    
    fliping(){
        for(const sprite in this.sprites){
            this.sprites[sprite].image = new Image()
            this.sprites[sprite].image.src=this.sprites[sprite].imageSrc.slice(0,-4)+"flip.png" 
            this.neprijatelj= true 
        }
        this.attackBox.offset.x -=240
    }
    normaling(){
        for(const sprite in this.sprites){
            this.sprites[sprite].image = new Image()
            this.sprites[sprite].image.src=this.sprites[sprite].imageSrc.slice(0,-4)+".png"  
            this.neprijatelj= false
        }
        this.attackBox.offset.x +=240
    }
    
    animateFrameWarrior(){

        if(this.neprijatelj && this.flag){
            this.trenutni=this.koliko-1
            this.flag = false
        }
        if(this.neprijatelj && this.udarac){
            this.trenutni=this.koliko-1
            this.udarac = false
        }
      
        this.frameSkip++
        if (this.frameSkip % this.frameHold === 0){
            if(this.neprijatelj){
                if(this.trenutni >0){
                    this.trenutni--  
                }else{
                    this.trenutni=this.koliko-1
                }
            }else{
                if(this.trenutni<this.koliko -1){
                    this.trenutni++
                    
                }else{
                    this.trenutni=0
                }
            }
           
        }

        
    }

    update() {
        this.draw()

       if(!this.smrt) this.animateFrameWarrior()

        if (
        this.image === this.sprites.attack1.image &&
        (
            (this.neprijatelj && this.trenutni === 0) ||
            (!this.neprijatelj && this.trenutni === this.koliko - 1)
        )
    ) {
        this.isAttack = false
    }

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        //c.fillStyle = 'red'
        //c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height)

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            this.velocity.y = 0
            this.position.y=330
        } else {
            this.velocity.y += this.gravity
        }
    }
    isGround() {
        if (this.position.y < canvas.height - this.height - 96) this.ground = false; else this.ground = true
    }
    takeHit(){
        this.health -=10
        
        if(this.health<=0){
            this.switchSprite('death')
        }else{
            this.switchSprite('takehit')
        }
    }
    attack() {
        this.switchSprite('attack1')
        this.isAttack = true
        
    }


    switchSprite(sprite){
     
        if(this.image === this.sprites.death.image ){
            if(this.neprijatelj){
                if(this.trenutni==0){
                    this.smrt=true
                }  
            }else{
                if(this.trenutni==this.sprites.death.koliko-1){
                    this.smrt=true
                }
            }
            return
        }

        if(this.image === this.sprites.attack1.image && (this.neprijatelj? this.trenutni>0 : this.trenutni<this.koliko-1)  ){
           
           return
        }

        if(this.image === this.sprites.takehit.image && (this.neprijatelj? this.trenutni>0 : this.trenutni<this.koliko-1)  ){
            return
        }
       

        switch(sprite){
            case 'idle':
                if(this.image !==this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.koliko=this.sprites.idle.koliko
                    this.trenutni = this.neprijatelj? this.trenutni = this.koliko-1 : this.trenutni=0
                }
                
            break
            case 'run':
                if(this.image !==this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.koliko=this.sprites.run.koliko
                    this.trenutni = this.neprijatelj? this.trenutni = this.koliko-1 : this.trenutni=0
                }
            break
            case 'jump':
                if(this.image !==this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.koliko=this.sprites.jump.koliko
                    this.trenutni = this.neprijatelj? this.trenutni = this.koliko-1 : this.trenutni=0
                }
            break
            case 'fall':
                if(this.image !==this.sprites.fall.image){
                    this.image = this.sprites.fall.image
                    this.koliko=this.sprites.fall.koliko
                    this.trenutni = this.neprijatelj? this.trenutni = this.koliko-1 : this.trenutni=0
                }
            break
            case 'attack1':
                this.flag =true
                if(this.image !==this.sprites.attack1.image){
                    this.image = this.sprites.attack1.image
                    this.koliko=this.sprites.attack1.koliko
                    this.trenutni = this.neprijatelj? this.trenutni = this.koliko-1 : this.trenutni=0
                }
            break
            case 'takehit':
                this.udarac=true
                if(this.image !==this.sprites.takehit.image){
                    this.image = this.sprites.takehit.image
                    this.koliko=this.sprites.takehit.koliko
                    this.trenutni = this.neprijatelj? this.trenutni = this.koliko-1 : this.trenutni=0
                }
            break
            case 'death':
                if(this.image !==this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.koliko=this.sprites.death.koliko
                    this.trenutni = this.neprijatelj? this.trenutni = this.koliko-1 : this.trenutni=0
                }
            break
        }
    }
}

