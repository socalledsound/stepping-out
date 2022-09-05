class Controls {
    constructor(){
        this.x = 0
        this.y = 0
        this.w = width
        this.h = controlsHeight
        this.bgCol = [190,180,189]
        this.bpm = createSlider(1, 60, 20)
        this.bpm.position(this.w/20, this.h/6)
        this.bpm.class('master-slider')
        this.randomReset = createSlider(9000,9999,9900)
        this.randomReset.position(this.w/20, this.h/3)
        this.randomReset.class('master-slider')
        // ball speed
        this.maxSpeed = createSlider(1,50,25)
        this.maxSpeed.position(this.w/20, this.h/1.9)
        this.maxSpeed.class('master-slider')

        // buttons
        this.startPlay = createButton('start play')
        this.startPlay.position(this.w/14, this.h/1.5)
        this.startPlay.mousePressed(loop)
        this.startPlay.class('transport-button')
        this.stopPlay = createButton('stop play')
        this.stopPlay.position(this.w/5, this.h/1.5)
        this.stopPlay.mousePressed(noLoop)
        this.stopPlay.class('transport-button')
        this.stopBall = createButton('start ball')
        this.stopBall.position(this.w/14, this.h/1.15)
        this.stopBall.mousePressed(() => ball.velocity = createVector(10.0,20.0))
        this.stopBall.class('ball-button')
        this.restartBall = createButton('stop ball')
        this.restartBall.position(this.w/5, this.h/1.15)
        this.restartBall.mousePressed(() => ball.velocity = createVector(0.0,0.0))
        this.restartBall.class('ball-button')
 
   
        this.sound = this.initSoundControls(this.x, this.y, this.w, this.h)
    }

    initSoundControls(x,y,w,h){
        const arr = Array.from({length: numSounds}, (e, idx) => {
                return new SoundControl(idx,x,y,w,h)
        })
        return arr
    }

    render(){
        fill(this.bgCol)
        rect(this.x, this.y, this.w, this.h)
    }
}