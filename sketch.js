
let steps = []
let snds = []
let stepCounter = 0
let stepUpdate = 0
const fr = 30
// 30 equals 60 bpm
let bpmMod = 30
let controls
let ball, paddle
let paused = false

function preload(){
    for(let i = 0; i < numSounds; i++){
        snds[i] = loadSound(`snds/${i}.mp3`)
    }
}

function setup(){
    createCanvas(canvasWidth, canvasHeight)
    frameRate(fr)
    controls = new Controls()
    ball = new Ball()
    paddle = new Paddle()
    let counter = 0
    for(let x = 0; x < numSteps; x++){
        for(let y = 0; y < numSounds; y++){
            steps.push(new Step(counter, snds[y], x, y))
            counter++  
        }
    }
}

function draw(){
    background(190, 190, 190)

    controls.render()
    steps.forEach(step => {
            step.update(stepCounter)
            step.render()
    })
    bpmMod = controls.bpm.value()
    if(stepUpdate % bpmMod === 0){
        stepCounter++
    }

    ball.update()
    ball.render()
    paddle.render()


    stepUpdate++
    if(keyIsPressed){
        if(keyCode === LEFT_ARROW){
            if(paddle.position.x > 0){
                paddle.move(createVector(-10,0))
            }
        } else if(keyCode === RIGHT_ARROW){
            if(paddle.position.x + paddle.w < width){
                paddle.move(createVector(10,0))
            } 
        } else if(keyCode === UP_ARROW){
            paddle.move(createVector(0,-10))
        } else if(keyCode === DOWN_ARROW){
            paddle.move(createVector(0,10))
        }
    }
}

function mousePressed(){
    steps.forEach(step => {
        step.checkClick(mouseX, mouseY)
    })
}

function keyIsPressed(){

}

