
// set up a 2d array, 4 banks, 4 sounds each
const numBanks = 4
const numSounds = 4
let snds = Array.from({length: numBanks}, () => new Array(numSounds))
// need one for each row
// let currentBank = [0,0,0,0]
// same as
// let snds = Array(4)
// for(let i = 0; i < numSounds; i++){
//     snds[i] = []
// } d

// grid
let numSteps = 32
let stepWidth = canvasWidth/(numSteps*1.35)
let stepHeight = canvasHeight/ (numSounds * 5)
let paddingWide = (1/ numSteps) * 150
const paddingHigh = 10
const paddingLeft = 20
const paddingTop = controlsHeight + 30

let steps = []
let stepCounter = 0
let stepUpdate = 0

let modal
let controls
let ball, paddle
let paused = false
let started = false
let startGameButton


function preload(){
    for(let i = 0; i < numBanks; i++){
        for(let j = 0; j < numSounds; j++){
            snds[i][j] = loadSound(`snds/${i}/${j}.mp3`)
        }      
    }
}

function setup(){
    createCanvas(canvasWidth, canvasHeight)
    frameRate(fr)
    background(190, 190, 190)
    controls = new Controls()
    modal = new IntroModal()
    modal.render()
    startGameButton = createButton('ok')
    startGameButton.position(width/2 - 100, 650)
    startGameButton.class('start-game-button')
    startGameButton.mousePressed(initGame)
}

function draw(){
    


    controls.render()

    if(started){
        background(190, 190, 190)
        controls.render()

        ball.update()
        ball.render()
        paddle.render()
    
    
        stepUpdate++
        if(keyIsPressed){
            if(keyCode === LEFT_ARROW){
                if(paddle.position.x > 0){
                    let vec = createVector(-10,0)
                    paddle.move(vec)
                    paddle.hit(vec)
                }
            } else if(keyCode === RIGHT_ARROW){
                if(paddle.position.x + paddle.w < width){
                    let vec = createVector(10,0)
                    paddle.move(vec)
                    paddle.hit(vec)
                } 
            } else if(keyCode === UP_ARROW){
                let vec = createVector(0,-10)
                paddle.move(vec)
                    paddle.hit(vec)
            } else if(keyCode === DOWN_ARROW){
                if(paddle.position.y + paddle.h < height){
                    let vec = createVector(0,10)
                    paddle.move(vec)
                    paddle.hit(vec)
                }

            }
        }

        
        steps.forEach(step => {
                step.update(stepCounter)
                step.render()
        })

        bpmMod = controls.bpm.value()
        if(stepUpdate % bpmMod === 0){
            stepCounter++
        }

    }



}



function initGame(){
    if(startGameButton){
        startGameButton.remove()
    }
    ball = new Ball()
    paddle = new Paddle()
    resetGrid(8)
    started = true
}

function resetGrid(num){

    let counter = 0
    numSteps = num
    stepWidth = canvasWidth/(numSteps*1.35)
    stepHeight = canvasHeight/ (numSounds * 5)
    paddingWide = (1/ numSteps) * 150
    background(190, 190, 190)
    steps = []
    for(let x = 0; x < numSteps; x++){
        for(let y = 0; y < numSounds; y++){
           
            const stepSounds = Array.from({length: numBanks}, (el,idx) => {
                return snds[idx][y]
            })
            
            steps.push(new Step(counter, stepSounds, x, y))
            counter++  
        }
    }
    controls.sound.forEach(sound => {
        sound.resetBank()
    })
}

function mousePressed(){
    steps.forEach(step => {
        step.checkClick(mouseX, mouseY)
    })  
}

function mouseReleased(){
    if(ball && ball.dragged){
        ball.fling(mouseX, mouseY)
        ball.dragged = false
    }
    
}

function mouseDragged(){
    ball.checkMouse(mouseX, mouseY)
}

