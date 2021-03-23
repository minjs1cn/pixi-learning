type ProtonOptions = {
  /** 中心点坐标 */
  x: number
  y: number
  total: number
  gravity: number
  minAngle: number
  maxAngle: number
  minSize: number
  maxSize: number
  minSpeed: number
  maxSpeed: number
  minScaleSpeed: number
  maxScaleSpeed: number
  minAlphaSpeed: number
  maxAlphaSpeed: number
  minRotationSpeed: number
  maxRotationSpeed: number
  spaceRandom: boolean
}

const config = {
  x: 0,
  y: 0,
  total: 100,
  gravity: 0.1,
  minAngle: 0,
  maxAngle: Math.PI * 2,
  minSize: 4,
  maxSize: 16,
  minSpeed: 0.3,
  maxSpeed: 3,
  minScaleSpeed: 0.01,
  maxScaleSpeed: 0.05,
  minAlphaSpeed: 0.02,
  maxAlphaSpeed: 0.02,
  minRotationSpeed: 0.01,
  maxRotationSpeed: 0.03,
  spaceRandom: true
}

function randomFloat(min: number, max: number) {
  return min + Math.random() * (max - min)
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function create(options: { [k in keyof ProtonOptions]?: ProtonOptions[k] }) {
  options = Object.assign(config, options)
  const spacing = (options.maxAngle - options.minAngle) / (options.total - 1)
  
  const angles = []
  for (let i = 0; i < options.total; i++) {
    if (options.spaceRandom) {
      angles.push(randomFloat(options.minAngle, options.maxAngle))
    } else {
      angles.push(options.minAngle)
      options.minAngle += spacing
    }
  }

  const makeParticle = angle => {
    const size = randomInt(options.minSize, options.maxSize)
    const speed = randomFloat(options.minSpeed, options.maxSpeed)

    return new Proton({
      x: options.x,
      y: options.y,
      width: size,
      height: size,
      rotationSpeed: randomFloat(options.minRotationSpeed, options.maxRotationSpeed),
      scaleSpeed: randomFloat(options.minScaleSpeed, options.maxScaleSpeed),
      alphaSpeed: randomFloat(options.minAlphaSpeed, options.maxAlphaSpeed),
      vx: speed * Math.cos(angle),
      vy: speed * Math.sin(angle) + options.gravity
    })
  }

  return angles.map(makeParticle)
}

export class Proton {
  public width: number
  public height: number
  public x: number
  public y: number
  public alpha: number
  public rotation: number
  public scale: {
    x: number
    y: number
  }

  public _vx: number
  public _vy: number
  public _rotaionSpeed: number
  public _scaleSpeed: number
  public _alphaSpeed: number

  constructor({ x = 0, y = 0, width = 1, height = 1, alpha = 1, rotation = 0, scale = { x: 1, y: 1 }, vx = 0, vy = 0, rotationSpeed, alphaSpeed, scaleSpeed }) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.alpha = alpha
    this.rotation = rotation
    this.scale = scale

    this._vx = vx
    this._vy = vy
    this._alphaSpeed = alphaSpeed
    this._rotaionSpeed = rotationSpeed
    this._scaleSpeed = scaleSpeed
  }

  update(dt = 1) {
    this.x += this._vx * dt
    this.y += this._vy * dt
    this.rotation += this._rotaionSpeed * dt

    this.alpha > 0 && (this.alpha -= this._alphaSpeed * dt)
    this.scale.x > 0 && (this.scale.x -= this._scaleSpeed * dt)
    this.scale.y > 0 && (this.scale.y -= this._scaleSpeed * dt)
    
    if (this.alpha < 0) this.alpha = 0
    if (this.scale.x < 0) this.scale.x = 0
    if (this.scale.y < 0) this.scale.y = 0
  }
}