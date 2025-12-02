const Character1 = new Fighter({
    id:1,
    name:"Martial Hero",
    position:{
        x:0,
        y:0
    },
    velocity:{
        x:0,
        y:10
    },
    color:'yellow',
    offset:{
        x:80,
        y:20
    },
    aheight:80,
    awidth:100,
    imageSrc : './assest/characters/Martial Hero 3/Sprite/Idle.png',
    koliko:10,
    scale:2.80,
    pomeri:{
        x:160,
        y:76
    },
    sprites:{
        idle:{
            imageSrc : './assest/characters/Martial Hero 3/Sprite/Idle.png',
            koliko:10
        },
        run:{
            imageSrc : './assest/characters/Martial Hero 3/Sprite/Run.png',
            koliko:8
        },
        jump:{
            imageSrc : './assest/characters/Martial Hero 3/Sprite/Going Up.png',
            koliko:3
        },
        fall:{
            imageSrc : './assest/characters/Martial Hero 3/Sprite/Going Down.png',
            koliko:3
        },
        attack1:{
            imageSrc : './assest/characters/Martial Hero 3/Sprite/Attack1.png',
            koliko:7
        },
        takehit:{
            imageSrc: './assest/characters/Martial Hero 3/Sprite/Take Hit.png',
            koliko:3
        },
        death:{
            imageSrc: './assest/characters/Martial Hero 3/Sprite/Death.png',
            koliko:11
        }
    }

}
)

const Character2 = new Fighter({
    id:2,
    name:"Fantasy Warrior",
    position:{
        x:0,
        y:100
    },
    velocity:{
        x:0,
        y:10
    },
    color:'blue',
    offset:{
        x:140,
        y:30
    },  
    aheight:80,
    awidth:100,
    imageSrc : './assest/characters/Fantasy Warrior/Sprites/Idle.png',
    koliko:10,
    scale:2.80,
    pomeri:{
        x:160,
        y:132
    },
    sprites:{
        idle:{
            imageSrc : './assest/characters/Fantasy Warrior/Sprites/Idle.png',
            koliko:10
        },
        run:{
            imageSrc : './assest/characters/Fantasy Warrior/Sprites/Run.png',
            koliko:8
        },
        jump:{
            imageSrc : './assest/characters/Fantasy Warrior/Sprites/Jump.png',
            koliko:3
        },
        fall:{
            imageSrc : './assest/characters/Fantasy Warrior/Sprites/Fall.png',
            koliko:3
        },
        attack1:{
            imageSrc : './assest/characters/Fantasy Warrior/Sprites/Attack1.png',
            koliko:7,
        },
        takehit:{
            imageSrc: './assest/characters/Fantasy Warrior/Sprites/Take hit.png',
            koliko:3
        },
        death:{
            imageSrc: './assest/characters/Fantasy Warrior/Sprites/Death.png',
            koliko:7
        }
    },
}
)
const Character3 = new Fighter({
    id:3,
    name:"Hero Knight",
    position:{
        x:0,
        y:100
    },
    velocity:{
        x:0,
        y:10
    },
    color:'blue',
    offset:{
        x:96,
        y:30
    },  
    aheight:80,
    awidth:100,
    imageSrc : './assest/characters/Hero Knight 2/Sprites/Idle.png',
    koliko:11,
    scale:3.0,
    pomeri:{
        x:160,
        y:98
    },
    sprites:{
        idle:{
            imageSrc : './assest/characters/Hero Knight 2/Sprites/Idle.png',
            koliko:11
        },
        run:{
            imageSrc : './assest/characters/Hero Knight 2/Sprites/Run.png',
            koliko:8
        },
        jump:{
            imageSrc : './assest/characters/Hero Knight 2/Sprites/Jump.png',
            koliko:4
        },
        fall:{
            imageSrc : './assest/characters/Hero Knight 2/Sprites/Fall.png',
            koliko:4
        },
        attack1:{
            imageSrc : './assest/characters/Hero Knight 2/Sprites/Attack.png',
            koliko:6
        },
        takehit:{
            imageSrc: './assest/characters/Hero Knight 2/Sprites/Take Hit.png',
            koliko:3
        },
        death:{
            imageSrc: './assest/characters/Hero Knight 2/Sprites/Death.png',
            koliko:9
        }
    },
}
)

const Character4 = new Fighter({
    id:4,
    name:"Samurai Mack",
    position:{
        x:0,
        y:100
    },
    velocity:{
        x:0,
        y:10
    },
    color:'blue',
    offset:{
        x:140,
        y:30
    },  
    aheight:80,
    awidth:100,
    imageSrc : './assest/characters/samuraiMack/Idle.png',
    koliko:8,
    scale:2.80,
    pomeri:{
        x:160,
        y:192
    },
    sprites:{
        idle:{
            imageSrc : './assest/characters/samuraiMack/Idle.png',
            koliko:8
        },
        run:{
            imageSrc : './assest/characters/samuraiMack/Run.png',
            koliko:8
        },
        jump:{
            imageSrc : './assest/characters/samuraiMack/Jump.png',
            koliko:2
        },
        fall:{
            imageSrc : './assest/characters/samuraiMack/Fall.png',
            koliko:2
        },
        attack1:{
            imageSrc : './assest/characters/samuraiMack/Attack1.png',
            koliko:6
        },
        takehit:{
            imageSrc: './assest/characters/samuraiMack/Take Hit.png',
            koliko:4
        },
        death:{
            imageSrc: './assest/characters/samuraiMack/Death.png',
            koliko:6
        }
    },
}
)



const Characters =[Character1,Character2,Character3,Character4]