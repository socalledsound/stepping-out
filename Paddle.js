class Paddle{
    constructor(){
        
            this.position = createVector(400, 760)
            // this.position = createVector(150, 600)
            this.w = 200
            this.h = 25
            this.fillColor = paddleFillColor
            this.strokeColor = paddleStrokeColor
        }

        hit(vec){
            if(circleRectCollision(ball.position.x, ball.position.y, ball.r, this.position.x, this.position.y, this.w, this.h)){
                ball.velocity.add(vec.mult((-1,-1)))
            }
           
            // ball.velocity.add(createVector(1,1))
            
            
        }

        move(vec){
                this.position.add(vec)
        }
    
        render(){
            stroke(this.strokeColor)
            fill(this.fillColor)
            rect(this.position.x, this.position.y, this.w, this.h)
        }
}