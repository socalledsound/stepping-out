

class Step {
    constructor(id, snds, x, y){
        this.id = id
        this.sounds = snds
        this.currentSound = snds[0]
        this.step = x
        this.soundGroup = y
        this.x = x * stepWidth + x * paddingWide + paddingLeft
        this.y = y * stepHeight + y * paddingHigh + paddingTop
        this.w = stepWidth
        this.h = stepHeight
        this.playingFillColor = [220, 30,110,200]
        this.activeFillColor = [200, 200, 200]
        this.dormantFillColor = blockColors[this.soundGroup]
        this.dormantStrokeColor = [60,140,190,70]
        this.activeStrokeColor = [220,80,120,255]
        this.clicked = false
        this.tempoTriggered = false
        this.playing = false
        this.reverse = false
        this.currentFillColor = this.dormantFillColor
        this.currentStrokeColor = this.dormantStrokeColor
        
    }

    changeSound(bankNum){
        this.currentSound = this.snds[bankNum]
    }

    checkClick(mX, mY){
        if(mX > this.x && mX < this.x + this.w &&
            mY > this.y && mY < this.y + this.h){
                console.log('clicked')
                this.clicked = !this.clicked
            } 
    }

    playSound(){
        console.log(this.currentSound)
        let rate = controls.sound[this.soundGroup].rate.value()/250
        if(this.reverse){
            rate *= -1
        }
        this.currentSound.rate(rate)
        this.currentSound.amp(controls.sound[this.soundGroup].vol.value()/500)
        this.currentSound.play()
        this.playing = true
        //setTimeout(() => {this.sound.stop()}, controls.sound[this.soundGroup].length.value() * 500)
    }

    stopSound = () => {
        this.sound.amp(0)
    }

    trigger(){
        this.tempoTriggered = true
        if(this.clicked){
            if(!this.playing){
                this.playSound()

            }
        }
    }

    triggerOff(){
        this.tempoTriggered = false
        this.playing = false
        
        
    }

    randomReset(){
        if(random(10000) > controls.randomReset.value()){
            this.clicked = false
        }
    }

    render(){
        fill(this.currentFillColor)
        strokeWeight(6)
        stroke(this.currentStrokeColor)        
        rect(this.x, this.y, this.w, this.h)   
    }

    update(counter){  
        this.updateStep(counter)
        this.updateStrokeColor()
        this.updateFillColor()
        this.randomReset()

    }

    updateStep(counter){
        if(counter % numSteps === this.step){
            // console.log(this.step)
            this.trigger()
        } else {
            this.triggerOff()
        }
    }

    updateFillColor(){
        if(this.playing){
            this.currentFillColor = this.playingFillColor
        }else if(this.clicked){
            this.currentFillColor = this.activeFillColor
        } else {
            this.currentFillColor = this.dormantFillColor
        }
    }

    updateStrokeColor(){
        if(this.tempoTriggered){
            this.currentStrokeColor = this.activeStrokeColor
        }else{
            this.currentStrokeColor = this.dormantStrokeColor
        }
    }
}