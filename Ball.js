class Ball {
    constructor(){
        this.fillColor = ballFillColor 
        this.strokeColor = ballStrokeColor
        this.r = 30
        this.position = createVector(110, 600)
        this.velocity = createVector(0,0)
        this.ballSpeed = 1.01
        this.maxSpeed = 50.0
        this.dragged = false
       
    }

    checkMouse(mX, mY){
        if(dist(mX, mY, this.position.x, this.position.y) < this.r){
            this.position.x = mX
            this.position.y = mY
            this.velocity.mult(createVector(0,0))
            this.dragged = true
            this.dragStart = createVector(mX, mY)
        }
    }

    checkPaddleCollision(){
        if(circleRectCollision(this.position.x, this.position.y, this.r, paddle.position.x, paddle.position.y, paddle.w, paddle.h)){
            this.velocity.y *=-1
        }
    }

    checkStepCollision(){
        steps.forEach(step => {
            if(!step.clicked){
                if(circleRectCollision(this.position.x, this.position.y, this.r, step.x, step.y, step.w, step.h)){
                    step.clicked = true
                    //this.velocity.mult(createVector(-1,-1))
                    this.velocity.y *= -1
                }
            }
        })


    }


    checkEdges(){
        // detect boundary collision
        // right
        if (this.position.x > width - this.r) {
        this.position.x = width - this.r;
        this.velocity.x *= -1;
        // this.heading *= -1;
        }
        // left
        if (this.position.x < this.r) {
        this.position.x = this.r;
        this.velocity.x *= -1;
        // this.heading *= -1;
        }
        // top
        if (this.position.y < controls.h + this.r) {
        this.position.y = controls.h + this.r;
        this.velocity.y *= -1;
        // this.heading *= -1;
        }
        
        if(this.position.y > height - this.r){
        this.position.y = height - this.r;
        this.velocity.y *= -1
        // this.heading *= -1;
        }
    }

    fling(mX, mY){
        console.log('flung')
        const mousePos = createVector(mX, mY)
        const dist = p5.Vector.sub(mousePos, this.dragStart)
        // const distMag = dist.mag()
        const theta = dist.heading()
        // console.log(distMag)
        this.velocity.x = cos(theta) * dist.x - sin(theta) * dist.y
        this.velocity.y = cos(theta) * dist.y + sin(theta) * dist.x
    }
   
    move(){
        this.maxSpeed = controls.maxSpeed.value()
        this.velocity.mult(this.ballSpeed)
        this.velocity.limit(this.maxSpeed)
        this.position.add(this.velocity)
    }


    render(){
        stroke(this.strokeColor)
        fill(this.fillColor)
        ellipse(this.position.x, this.position.y, this.r * 2)
    }

    update(){
        // this.position.x = mouseX
        // this.position.y = mouseY
        this.checkEdges()
        this.checkStepCollision()
        this.checkPaddleCollision()
        this.move()
    }
}


// checkPaddle(){
//     console.log(this.position.x, this.position.y)
//     console.log(paddle.position.x, paddle.position.y)
//     // check which side is closest
//     let testX = this.position.x
//     let testY = this.position.y
//     if(this.position.x < paddle.position.x){
//         testX = paddle.position.x
//     }else if(this.position.x > paddle.position.x + paddle.w){
//         testX = paddle.position.x + paddle.w
//     }
//     if(this.position.y < paddle.position.y){
//         testY = paddle.position.y
//     } else if(this.position.y > paddle.position.y + paddle.h){
//         testY = paddle.position.y + paddle.h
//     }
//     let distX = this.position.x - testX
//     console.log(distX)
//     let distY = this.position.y - testY
//     console.log(distY)
//     let dist = sqrt((distX * distX) + (distY * distY))
//     console.log(dist)
//     if(dist < this.r){
//         //console.log('should move')
//         this.velocity.y *=-1
//     } 

//     // if( this.position.x + this.r > paddle.x &&
//     //     this.position.x - this.r < paddle.x + paddle.w &&
//     //     this.position.y + this.r > paddle.y && 
//     //     this.position.y + this.r > step.y
//     //     ){
//     //     step.clicked = true
//     //     //this.velocity.mult(createVector(-1,-1))
//     //     this.velocity.y *= -1
//     // }

// }

// checkStepCollision(){
//     steps.forEach(step => {
//         if(!step.clicked){
            
//             if( this.position.x + this.r > step.x &&
//                 this.position.x - this.r < step.x + step.w &&
//                 this.position.y - this.r < step.y + step.h && 
//                 this.position.y + this.r > step.y
//                 ){
//                 step.clicked = true
//                 //this.velocity.mult(createVector(-1,-1))
//                 this.velocity.y *= -1
//             }
//         }
//     })
// }