
const canvasWidth = 770, canvasHeight = 800
const controlsHeight = canvasHeight/3
let numSteps = 32
const numSounds = 4
const blockColors = [[110,30, 200,90], [220,90,220,90],[10,190,190,90],[190,190,80,90]]

let stepWidth = canvasWidth/(numSteps*1.35)
let stepHeight = canvasHeight/ (numSounds * 5)
let paddingWide = (1/ numSteps) * 150
const paddingHigh = 10
const paddingLeft = 20
const paddingTop = controlsHeight + 10