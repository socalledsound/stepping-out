class Paddle{
    constructor(){
        
            this.position = createVector(400, 760)
            // this.position = createVector(150, 600)
            this.w = 200
            this.h = 15
            this.color = [90,200,120]
        }

        move(vec){
                this.position.add(vec)
        }
    
        render(){
            noStroke()
            fill(this.color)
            rect(this.position.x, this.position.y, this.w, this.h)
        }
}