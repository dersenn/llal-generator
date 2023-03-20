
// INIT

let useSeed = true
let seed
if (useSeed) {
  seed = new Hash()
} else {
  seed = false
}

const setup = {
      id: 'mySVG',
      parent: document.body,
      presAspect: 'none', // other values?
}

let svg = new SVG(setup)


// NOISE

let simplex = new SimplexNoise(seed.hash)


// SETUP

const wdths = [50, 100, 150, 200]
const nRows = 20
const nCols = 13
const fSize = (100 / nRows) * 1.5 +'vh'
const lOff = '.66em'


let a = nVec(0, 0)
let txt = 'LLAL'



svg.makeText = function(pos, txt) {
  let text = document.createElementNS(this.ns, 'text')
  text.setAttribute('x', pos.x)
  text.setAttribute('y', pos.y)
  text.setAttribute('dy', lOff)
  text.setAttribute('style', 'font-size: ' +fSize)

  for (let row = 0; row < nRows; row++) {
    let row = document.createElementNS(this.ns, 'tspan')
    row.setAttribute('x', pos.x)
    row.setAttribute('dy', lOff)

    let wShuffled = shuffle(wdths)
    for (let g = 0; g < txt.length; g++) {
      svg.makeSpan(txt[g], row, wShuffled[g])
    }
    text.append(row)
  }
  
  // text.innerHTML = txt
  this.stage.append(text)
  return text
}

svg.makeSpan = function(txt, parent, w = 50) {
  let span = document.createElementNS(this.ns, 'tspan')
  span.setAttribute('style', 'font-variation-settings: \'wdth\' ' +w)
  span.innerHTML = txt
  parent.append(span)
  return span
}

let cols = []

for (let col = 0; col < nCols; col++) {
  console.log(simplex.noise2D(col, 1))
  cols.push(svg.makeText(a, txt))
  a.x += cols[col].getBBox().width
}




// DRAW/ANIMATE





// My Only Friend, The End.