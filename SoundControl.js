// rate
// volume
// other settings

// start at 300

class SoundControl {
    constructor(idx, cX, cY, cW, cH){
        this.reverseButton = createButton('<=>')
        this.reverseButton.position(cW/2.5 + idx * cW/7 + 30, cH/7 + 10)
        this.reverseButton.mousePressed(() => {this.reverseGroup(idx)})
        this.reverseButton.class('not-reversed')
        this.rate = createSlider(1,500, 20)
        this.rate.position(cW/2.5 + idx * cW/7, cH/7 + 90)
        this.rate.class('sound-slider')
        this.vol = createSlider(1, 500, 20)
        this.vol.position(cW/2.5 + idx * cW/7, cH/7 + 140)
        this.vol.class('sound-slider')
        // this.length = createSlider(1, 100, 50)
        // this.length.position(cW/2.5 + idx * cW/7, cH/7 + 190)
        // this.length.class('sound-slider')
        this.cW = cW
        this.cH = cH
        this.idx = idx

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
        text('reverse', this.cW/2.5 + this.idx * this.cW/7 + 15, this.cH/7 - 10)
        text('rate', this.cW/2.5 + this.idx * this.cW/7 + 30, this.cH/7 + 80)
        text('volume', this.cW/2.5 + this.idx * this.cW/7 + 30, this.cH/7 + 130)
    }
}