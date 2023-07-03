// https://redstapler.co/realistic-water-effect-svg-turbulence-filter/
// https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/


// INIT

const useSeed = true
let seed
if (useSeed) {
  seed = new Hash()
} else {
  seed = false
}


// MEASUREMENTS FOR PRINT

const docWidth = 293
const docHeight = 125
const aspect = docWidth / docHeight
const scaledWidth = document.body.clientWidth
const scaledHeight = scaledWidth / aspect

// const scaledWidth = 1000
// const scaledHeight = scaledWidth / aspect


// const scaledWidth = docWidth
// const scaledHeight = docHeight


console.log(aspect, docWidth / aspect)

// SETUP SVG

const setup = {
      id: 'mySVG',
      parent: document.body,
      width: scaledWidth,
      height: scaledHeight,
      presAspect: 'none', // other values?
}

let svg = new SVG(setup)



// SETUP SKETCH

let defs = document.createElementNS(svg.ns, 'defs')
svg.stage.prepend(defs)


const useFilter = coinToss(100)
const useBlanks = coinToss(100)
const useCircles = coinToss(0)

const blanksProb = rndInt(40, 75)

const borderTop = 40

const wdths = [50, 100, 150, 200]
const nCols = 30
const nRows = rndInt(9, 20)
const fSize = ((setup.height - borderTop) / nRows) * 1.5 +'px'
// const fSize = (100 / nRows) * 1.5 +'vh'
const lOff = '.66em'

const colBG = '#ffffff'
const colFG = '#000000'

document.body.style['background-color'] = '#eee'
svg.stage.style['font-family'] = 'LLAL-linear'
svg.stage.style['background-color'] = colBG


let a = nVec(0, 0)
let txt = 'LLAL'

let cols = []


let letters = document.createElementNS(svg.ns, 'g')
letters.setAttribute('id', 'letters')
svg.stage.append(letters)

let circles = document.createElementNS(svg.ns, 'g')
circles.setAttribute('id', 'circles')



// FILTER STUFF

let fSet = {
  rows: nRows,
  blnkProb: blanksProb,
  seed: Math.round(rnd()*100),
  freqX: Math.round((rndInt(40, 100)/10000)*100000)/100000,
  freqY: Math.round((rndInt(40, 100)/10000)*100000)/100000,
  // bFreq: `${rnd()/100} ${rnd()/100}`,
  nOct: rndInt(5,20),
  scale: rndInt(75,120)
}


if (useFilter) {

  let swirl = document.createElementNS(svg.ns, 'filter')
  swirl.setAttribute('id', 'swirl')
  swirl.setAttribute('width', svg.w)
  swirl.setAttribute('height', svg.h)

  let turb = document.createElementNS(svg.ns, 'feTurbulence')
  turb.setAttribute('type', 'turbulence')
  turb.setAttribute('seed', fSet.seed)
  turb.setAttribute('baseFrequency', `${fSet.freqX} ${fSet.freqY}`)
  turb.setAttribute('numOctaves', fSet.nOct)
  turb.setAttribute('color-interpolation-filters', 'sRGB')
  turb.setAttribute('result', 'turbulence')


  let disp = document.createElementNS(svg.ns, 'feDisplacementMap')
  disp.setAttribute('in', 'SourceGraphic')
  disp.setAttribute('in2', 'turbulence')
  disp.setAttribute('scale', fSet.scale)

  disp.setAttribute('color-interpolation-filters', 'sRGB')

  swirl.append(turb, disp)
  defs.append(swirl)

  letters.setAttribute('style', 'filter: url(#swirl)')
  circles.setAttribute('style', 'filter: url(#swirl)')
}



// GRAPHICS

if(useCircles && useFilter) {
  let nCircles = rndInt(5, 50)
  
  for (let c = 0; c < nCircles; c++) {
    let pos = {
      x: rnd() * svg.w,
      y: rnd() * svg.h
    }
    circles.append(svg.makeCircle(pos, rnd()*300, 'transparent', colFG, rndInt(3, 20)))
  }
  svg.stage.append(circles)
}


// LETTERS

for (let col = 0; col < nCols; col++) {
  
  let text = document.createElementNS(svg.ns, 'text')
  text.setAttribute('x', a.x)
  text.setAttribute('y', a.y)
  text.setAttribute('style', 'font-size: ' + fSize)
  text.setAttribute('class', 'col')

  for (let row = 0; row < nRows; row++) {
    let row = document.createElementNS(svg.ns, 'tspan')
    row.setAttribute('x', a.x)
    row.setAttribute('dy', lOff)
    row.setAttribute('class', 'row')

    let wShuffled = shuffle(wdths)
    for (let g = 0; g < txt.length; g++) {
      let fill = colFG
      if(useBlanks) {
        if(coinToss(blanksProb)) {
          fill = colBG
        }
      }
      let span = document.createElementNS(svg.ns, 'tspan')
      span.setAttribute('style', 'font-size: ' + fSize + ';' + 'font-variation-settings: \'wdth\' ' + wShuffled[g] + ';' +  'fill: ' + fill)
      // span.setAttribute('font-family', "LLAL-linear")
      span.innerHTML = txt[g]
      row.append(span)
    }
    text.append(row)
  }
  letters.append(text)

  cols.push(text)
  a.x += cols[col].getBBox().width
}



/////// INTERACTION, KEYS & FILEHANDLING

const controls = document.getElementById('controls')
const values = document.createElement('ul')

const reloadBtn = document.createElement('a')
reloadBtn.classList.add('btn')
reloadBtn.setAttribute('id', 'btnreload')
reloadBtn.append('new')

for (const property in fSet) {
  const prop = document.createElement('li')
  prop.append(`${property}: ${fSet[property]}`)
  values.append(prop)
  // console.log(`${property}: ${fSet[property]}`)
}

const btnLi = document.createElement('li')
btnLi.append(reloadBtn)
values.append(btnLi)

controls.append(values)


reloadBtn.addEventListener('click', newSketch)

function newSketch() {
  const myURL = new URL(window.location.href)
  const newHash = seed.new()
  myURL.searchParams.set('seed', newHash)
  window.location.href = myURL.href
}




// SVG-TEXT-TO-PATH

let session = new SvgTextToPath(document.querySelector('svg'), {
  useFontFace: true,
});
let stat = session.replaceAll();







// My Only Friend, The End.