const stepWidth = canvasWidth/(numSteps*1.35)
const stepHeight = canvasHeight/ (numSounds * 5)
const paddingWide = (1/ numSteps) * 150
const paddingHigh = 10
const paddingLeft = 20
const paddingTop = controlsHeight + 10

class Step {
    constructor(id, snd, x, y){
        this.id = id
        this.sound = snd
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
        this.activeStrokeColor = [20,180,170,190]
        this.clicked = false
        this.tempoTriggered = false
        this.playing = false
        this.reverse = false
        this.currentFillColor = this.dormantFillColor
        this.currentStrokeColor = this.dormantStrokeColor
        
    }

    checkClick(mX, mY){
        if(mX > this.x && mX < this.x + this.w &&
            mY > this.y && mY < this.y + this.h){
                console.log('clicked')
                this.clicked = !this.clicked
            } 
    }

    playSound(){
        let rate = controls.sound[this.soundGroup].rate.value()/250
        if(this.reverse){
            rate *= -1
        }
        this.sound.rate(rate)
        this.sound.amp(controls.sound[this.soundGroup].vol.value()/500)
        this.sound.play()
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