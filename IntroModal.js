class IntroModal {
    constructor(){
        this.bgCol = [220, 220, 200, 120]
        this.outlineCol = [20, 20, 20,20]
        this.textCol = [20, 20, 20]
        this.x = 40
        this.y = controlsHeight + 40, 
        this.w = width - 80
        this.h = height - (controlsHeight + 60)
        this.textLines = [
            'Think of this as the love child of a step sequencer and the classic game breakout.',
            'You can start/stop/control the speed of the playhead with the controls above.',
            'Selected steps will disappear, to keep you on your toes.',
            'Step memory controls how long a step stays lit before resetting.',
            'The controls on right side control the sound attached to each row.',
            'You can select one of four sound palettes for each bank with the numbered buttons.',
            'You can drag the ball or bounce it with the paddle.',
            'Move the paddle with the arrow keys.',
            'Blocks cleared by the ball become triggers for sounds.',
        ]
    }

    render(){
        fill(this.bgCol)
        stroke(this.outlineCol)
        rect(this.x, this.y, this.w, this.h)
        fill(this.textCol)
        textSize(18)
        noStroke()

        this.textLines.forEach( (line, idx) => {
            text(line, 60, controlsHeight + 80 + (idx * 30) )
        })

    }
}
