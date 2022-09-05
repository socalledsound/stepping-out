// rate
// volume
// other settings

// start at 300

class SoundControl {
    constructor(idx, cX, cY, cW, cH){

        this.idx = idx
        this.controlX = cW/2.6 + (idx * cW/6.5) 
        this.controlY = cH/7
        this.cW = cW
        this.cH = cH
        this.w = cW/12
        this.h = cH
        this.reverseButton = createButton('<=>')
        this.reverseButton.position(this.controlX + 37,  this.controlY + 10)
        this.reverseButton.mousePressed(() => {this.reverseGroup(idx)})
        this.reverseButton.class('not-reversed')
        this.rate = createSlider(1,500, 20)
        this.rate.position(this.controlX + 20, this.controlY + 70)
        this.rate.class('sound-slider')
        this.vol = createSlider(1, 500, 20)
        this.vol.position(this.controlX + 20, this.controlY + 120)
        this.vol.class('sound-slider')
        // this.length = createSlider(1, 100, 50)
        // this.length.position(cW/2.5 + idx * cW/7, cH/7 + 190)
        // this.length.class('sound-slider')
        this.oneButton = createButton('1')
        this.oneButton.position(this.controlX + 32,  this.controlY + 155)
        this.oneButton.mousePressed(() => {this.changeBank(0)})
        this.oneButton.class('selected-sb')

        this.twoButton = createButton('2')
        this.twoButton.position(this.controlX + 66,  this.controlY + 155)
        this.twoButton.mousePressed(() => {this.changeBank(1)})
        this.twoButton.class('sound-bank-toggle')

        this.threeButton = createButton('3')
        this.threeButton.position(this.controlX + 32,  this.controlY + 190)
        this.threeButton.mousePressed(() => {this.changeBank(2)})
        this.threeButton.class('sound-bank-toggle')

        this.fourButton = createButton('4')
        this.fourButton.position(this.controlX + 66,  this.controlY + 190)
        this.fourButton.mousePressed(() => {this.changeBank(3)})
        this.fourButton.class('sound-bank-toggle')

        this.bankButtons = [this.oneButton, this.twoButton, this.threeButton, this.fourButton]

    }

    changeBank = (num) => {
        this.bankButtons.forEach( (button,idx) => {
            if(idx === num){
                button.class('selected-sb')
            }else {
                button.class('sound-bank-toggle')
            }
        })
        
        steps.forEach(step => {
            console.log(this.idx)
            if(step.soundGroup === this.idx){
                console.log(num, this.idx)
                step.currentSound = step.sounds[num]
            }
        })
    }

    resetBank(){
        this.bankButtons.forEach((button,idx) => {
            if(idx === 0){
                button.class('selected-sb')
            }else {
                button.class('sound-bank-toggle')
            }
        })
    }

    reverseGroup = (idx) => {
        steps.forEach(step => {
            if(step.soundGroup == idx){
                if(!step.reverse){
                    step.reverse = true
                    this.reverseButton.class('reversed')
                } else {
                    step.reverse = false
                    this.reverseButton.class('not-reversed')
                }
                
                
            }
        })
    }

    renderText(){
        // console.log(this.idx)
        noStroke()
        textSize(17)
        fill(controlsTextColor)
        text('reverse', this.controlX + 25, this.controlY - 10)
        text('rate', this.controlX  + 30, this.controlY + 60)
        text('volume', this.controlX  + 30, this.controlY + 105)
        noFill()
        strokeWeight(4)
        stroke(blockColors[this.idx])
        rect(this.controlX, this.controlY - 30, this.w + 40, this.h- 20)


    }
}