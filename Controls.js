class Controls {
    constructor(){
        this.x = 0
        this.y = 0
        this.w = width
        this.h = controlsHeight
        this.bgCol = controlsBGCol
        // loop speed/bpm
        this.bpm = createSlider(1, 60, 20)
        this.bpm.position(this.w/30, this.h/6)
        this.bpm.class('master-slider')
        // how quickly do the selections disappear
        this.randomReset = createSlider(9000,9999,9900)
        this.randomReset.position(this.w/30, this.h/3)
        this.randomReset.class('master-slider')
        // maximum ball speed
        this.maxSpeed = createSlider(0,50,25)
        this.maxSpeed.position(this.w/30, this.h/1.9)
        this.maxSpeed.class('master-slider')

        // buttons
        this.startPlay = createButton('▶')
        this.startPlay.position(this.w/20, this.h/1.5)
        this.startPlay.mousePressed(loop)
        this.startPlay.class('start-button')
        this.stopPlay = createButton('■')
        this.stopPlay.position(this.w/7, this.h/1.5)
        this.stopPlay.mousePressed(noLoop)
        this.stopPlay.class('stop-button')

        //ball, removed
        // this.stopBall = createButton('start ball')
        // this.stopBall.position(this.w/17, this.h/1.15)
        // this.stopBall.mousePressed(() => ball.velocity = createVector(10.0,20.0))
        // this.stopBall.class('ball-button')
        // this.restartBall = createButton('stop ball')
        // this.restartBall.position(this.w/6, this.h/1.15)
        // this.restartBall.mousePressed(() => ball.velocity = createVector(0.0,0.0))
        // this.restartBall.class('ball-button')

        this.fourSteps = createButton('4')
        this.fourSteps.position(this.w/3.8, this.h/1.4)
        this.fourSteps.mousePressed(() => resetGrid(4))
        this.fourSteps.class('steps-button')

        this.eightSteps = createButton('8')
        this.eightSteps.position(this.w/3.3, this.h/1.4)
        this.eightSteps.mousePressed(() => resetGrid(8))
        this.eightSteps.class('steps-button')

        this.sixteenSteps = createButton('16')
        this.sixteenSteps.position(this.w/3.8, this.h/1.15)
        this.sixteenSteps.mousePressed(() => resetGrid(16))
        this.sixteenSteps.class('steps-button')

        this.thirtytwoSteps = createButton('32')
        this.thirtytwoSteps.position(this.w/3.3, this.h/1.15)
        this.thirtytwoSteps.mousePressed(() => resetGrid(32))
        this.thirtytwoSteps.class('steps-button')
   
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
        textSize(20)
        fill(controlsTextColor)
        noStroke()
        text('playback speed', 50, 25)
        text('step memory', 50, 77)
        text('ball speed', 50, 125)
        strokeWeight(2)
        stroke(controlsBottomCol)
        line(0, controlsHeight, width, controlsHeight)
        stroke(controlsDividerCol)
        //outlines
        line(0,2,width,2)
        line(1,0,1,controlsHeight)
        line(width-2,0,width-2,controlsHeight)
        stroke(180,190,185)
        strokeWeight(1)
        //middle lines
        line(width/2.8, 10, width/2.8, controlsHeight - 10)
        line(width/2.75, 10, width/2.75, controlsHeight - 10)
        line(width/2.7, 10, width/2.7, controlsHeight - 10)

        // hack for bigger stop square
        // fill(0)
        // noStroke()
        // rect(this.w/7, this.h/1.5, 20, 0)


        // render text for sound controls
        this.sound.forEach(control => {
            control.renderText()
        })
        
    }
}