const btnStart = document.getElementById('btnStart')
const blue = document.getElementById('blue')
const violet = document.getElementById('violet')
const orange = document.getElementById('orange')
const green = document.getElementById('green')

btnStart.addEventListener("click",gamestar);
class Game{
    
    constructor(){
        this.colors={
            0: blue,// === blue : blue = true
            1: violet,
            2: orange,
            3: green
        }
        this.sequence_color()
        this.start()
    
    }
    
    sequence_color(){
        this.finalLevel= 2
        this.sequence= new Array(this.finalLevel).fill(0).map(n => Math.floor(Math.random() * 4 ))
    }
    
    start(){
        this.color_choise=this.color_choise.bind(this)
        btnStart.classList.add("hide")
        this.level= 1
        setTimeout(()=> this.next_level(),1000)   
    }
    next_level(){      
        this.subLevel= 0
        this.iluminate_sequence()
    }
    
    iluminate_sequence(){
        for(let i=0; i < this.level; i++){
            const color= this.sequence[i]  
            setTimeout(() =>this.iluminate_color(color,i),i*1000)
        }
    }
    
    iluminate_color(color,i){
        this.colors[color].classList.add("light");
        setTimeout(() => this.trunOff_color(color,i),350)
    }
    
    trunOff_color(color,i){
        this.colors[color].classList.remove("light")
        if((i+1) === this.level){
            this.event_click()
        } 
    }

    event_click(){
        this.colors[0].addEventListener("click",this.color_choise)
        this.colors[1].addEventListener("click",this.color_choise)
        this.colors[2].addEventListener("click",this.color_choise)
        this.colors[3].addEventListener("click",this.color_choise)
    }

    remove_event_click(){
        this.colors[0].removeEventListener("click",this.color_choise)
        this.colors[1].removeEventListener("click",this.color_choise)
        this.colors[2].removeEventListener("click",this.color_choise)
        this.colors[3].removeEventListener("click",this.color_choise)
    }

    color_choise(ev){
        if(ev.target === this.colors[this.sequence[this.subLevel]]){
            this.subLevel++
            if(this.subLevel===this.level){
                if(this.level===(this.finalLevel)){
                    this.you_win()
                }
                else{
                    this.complet_level_notification()
                }
            }
        }
        else{
            this.you_lose()
        }
    }

    complet_level_notification(){
        swal(`You complete the level ${this.level} of ${this.finalLevel}`,"","info")
        .then(()=>{
            this.level++
            this.remove_event_click()
            setTimeout(()=> this.next_level(),1000) 
        })
    }

    you_win(){
        swal("You win","","success")
        .then (() =>{
            btnStart.classList.remove("hide")
            this.remove_event_click()
        })
    }

    you_lose(){
        swal("You Lose","","error")
        .then(()=>{
            btnStart.classList.remove("hide")
            this.remove_event_click()
        })
    }
}

function gamestar(){
 
    window.game = new Game()
}