// https://redstapler.co/realistic-water-effect-svg-turbulence-filter/
// https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/


// INIT

let useSeed = true
let seed
if (useSeed) {
  seed = new Hash()
} else {
  seed = false
}

// NOISE

// let simplex = new SimplexNoise(seed.hash)

// SETUP

const setup = {
      id: 'mySVG',
      parent: document.body,
      presAspect: 'none', // other values?
}

let svg = new SVG(setup)





let defs = document.createElementNS(svg.ns, 'defs')
let style = document.createElementNS(svg.ns, 'style')
style.setAttribute('type', 'text/css')

style.append('@font-face \{ font-family: LLAL; src: url(\'../assets/fonts/LLALLogoLinearGX.ttf\')\; \}')
style.append('svg \{ font-family: LLAL; \}')

defs.append(style)
svg.stage.prepend(defs)


// FILTER STUFF
/*
let swirl = document.createElementNS(svg.ns, 'filter')
swirl.setAttribute('id', 'swirl')

let turb = document.createElementNS(svg.ns, 'feTurbulence')
turb.setAttribute('type', 'turbulence')
turb.setAttribute('baseFrequency', '.007 .001')
turb.setAttribute('numOctaves', '2')
turb.setAttribute('result', 'turbulence')

let disp = document.createElementNS(svg.ns, 'feDisplacementMap')
disp.setAttribute('in2', 'turbulence')
disp.setAttribute('in', 'SourceGraphic')
disp.setAttribute('scale', '10')
disp.setAttribute('xChannelSelector', 'R')
disp.setAttribute('yChannelSelector', 'G')

swirl.append(turb, disp)
svg.stage.prepend(swirl)
*/

let usefilter = false

const wdths = [50, 100, 150, 200]
const nCols = 3
const nRows = 20
const fSize = (100 / nRows) * 1.5 +'vh'
const lOff = '.66em'


let a = nVec(0, 0)
let txt = 'LLAL'

// MORE FILTER STUFF
/*
if (usefilter) {
  svg.stage.setAttribute('style', 'filter: url(#swirl')
}
*/

let cols = []

let group = document.createElementNS(svg.ns, 'g')
// group.setAttribute('style', 'filter: url(#swirl)')

svg.stage.append(group)



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
      let span = document.createElementNS(svg.ns, 'tspan')
      span.setAttribute('style', 'font-variation-settings: \'wdth\' ' + wShuffled[g])
      span.setAttribute('font-family', "LLAL Logo Linear")
      // span.setAttribute('font-stretch', "expanded")
      span.innerHTML = txt[g]
      row.append(span)
    }
    text.append(row)
  }
  group.append(text)

  cols.push(text)
  a.x += cols[col].getBBox().width
}








// DRAW/ANIMATE





// My Only Friend, The End.