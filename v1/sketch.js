
// INIT

let useSeed = false
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


// TEST NOISE


let simplex = new SimplexNoise(seed.hash),
    value2d = simplex.noise2D(svg.w/2, svg.h/2)

console.log(value2d)


// SETUP

let a = nVec(svg.w / 2, svg.h / 2)
let txt = 'LLAL'


svg.makeCircle(a, 10)


svg.makeText = function(pos, txt, w) {
  let text = document.createElementNS(this.ns, 'text')
  text.setAttribute('x', pos.x)
  text.setAttribute('y', pos.y)
  text.setAttribute('lengthAdjust', 'spacingAndGlyphs')
  text.setAttribute('textLength', w)
  text.innerHTML = txt
  this.stage.append(text)
  return text
}

let t = svg.makeText(a, txt, svg.w/2)

let h = svg.clientHeight

console.log(h)

// DRAW/ANIMATE

/*
makeCircle(c, r = 5, fill = this.def.fill, stroke = this.def.stroke, strokeW = this.def.strokeW) {
  let circle = document.createElementNS(this.ns, 'circle')
  circle.setAttribute('cx', c.x)
  circle.setAttribute('cy', c.y)
  circle.setAttribute('r', r)
  circle.setAttribute('fill', fill)
  circle.setAttribute('stroke', stroke)
  circle.setAttribute('stroke-width', strokeW)
  this.stage.append(circle)
  return circle
}
*/




// My Only Friend, The End.