
type Partial<T> = {
  [P in keyof T]?: T[P]
}

/**
 * 点集
 */
class Point {
  private _x: number
  get x() {
    return this._x
  }
  set x(x: number) {
    if (this._x !== x) this._x = x
  }

  private _y: number
  get y() {
    return this._y
  }
  set y(y: number) {
    if (this._y !== y) this._y = y
  }

  constructor(x = 1, y = 1) {
    this._x = x
    this._y = y
  }

  set(x = 1, y = x) {
    if (this._x !== x) this._x = x
    if (this._y !== y) this._y = y
    return this
  }
}

/**
 * 对象缓存池
 */
class Pool<T> {
  private _pool: T[] = []
  get size() {
    return this._pool.length
  }

  private _create: () => T

  constructor(create: () => T) {
    this._create = create
  }

  get() {
    if (this.has()) return this._pool.pop()
    return this._create()
  }

  push(o: T) {
    this._pool.push(o)
  }

  has() {
    return this.size > 0
  }
}


export type ParticleOptions = {
  /** 宽 */
  width: number
  /** 高 */
  height: number
  /** 坐标x */
  x: number
  /** 坐标y */
  y: number
  /** x方向速度 */
  vx: number
  /** y方向速度 */
  vy: number
  /** 透明度 */
  alpha: number
  /** 旋转角度 */
  rotation: number
  /** 缩放 */
  scale: {
    x: number
    y: number
  }
  /** 透明度减小速度 */
  alphaSpeed: number
  /** 旋转加速速度 */
  rotationSpeed: number
  /** 缩小速度 */
  scaleSpeed: number
}

export type ParticleCreateOptions = Partial<ParticleOptions>
/**
 * 粒子类
 */
export class Particle {
  /** 静态方法 */
  static create(options?: ParticleCreateOptions) {
    return new Particle(options)
  }
  /** 默认配置 */
  static defaultOptions = {
    x: 0, 
    y: 0,
    width: 1,
    height: 1,
    alpha: 1,
    rotation: 0,
    scale: { x: 1, y: 1 },
    vx: 0,
    vy: 0,
    rotationSpeed: 0,
    alphaSpeed: 0,
    scaleSpeed: 0
  }
  /** 宽 */
  private _w: number
  get width() {
    return this._w
  }
  /** 高 */
  private _h: number
  get height() {
    return this._h
  }
  /** 坐标 */
  private _position: Point
  get position() {
    return this._position
  }
  /** 坐标x */
  get x() {
    return this._position.x
  }
  /** 坐标y */
  get y() {
    return this._position.y
  }
  /** 透明度 */
  private _alpha: number
  get alpha() {
    return this._alpha
  }
  /** 旋转角度 */
  private _rotation: number
  get rotation() {
    return this._rotation
  }
  /** 缩放 */
  private _scale: Point
  get scale() {
    return this._scale
  }

  /** x方向速度 */
  private _vx: number
  /** y方向速度 */
  private _vy: number
  /** 旋转加速速度 */
  private _rotationSpeed: number
  /** 缩小速度 */
  private _scaleSpeed: number
  /** 透明速度 */
  private _alphaSpeed: number
  /** 配置 */
  private _options: ParticleOptions = {} as ParticleOptions

  constructor(options: ParticleCreateOptions) {
    Object.assign(this._options, Particle.defaultOptions, options)
    const {
      x,
      y,
      width,
      height,
      alpha,
      rotation,
      scale,
      vx,
      vy,
      rotationSpeed,
      alphaSpeed,
      scaleSpeed
    } = this._options
    
    this._position = new Point(x, y)
    this._w = width
    this._h = height
    this._alpha = alpha
    this._rotation = rotation
    this._scale = new Point(scale.x, scale.y)

    this._vx = vx
    this._vy = vy
    this._alphaSpeed = alphaSpeed
    this._rotationSpeed = rotationSpeed
    this._scaleSpeed = scaleSpeed
  }

  /**
   * 每一帧的更新粒子状态
   * @param dt - 每一帧的延迟时间
   */
  update(dt = 1) {
    this.position.x += this._vx * dt
    this.position.y += this._vy * dt
    this._rotation += this._rotationSpeed * dt

    this._alpha > 0 && (this._alpha -= this._alphaSpeed * dt)
    this._scale.x > 0 && (this._scale.x -= this._scaleSpeed * dt)
    this._scale.y > 0 && (this._scale.y -= this._scaleSpeed * dt)
    
    if (this._alpha < 0) this._alpha = 0
    if (this._scale.x < 0) this._scale.x = 0
    if (this._scale.y < 0) this._scale.y = 0
  }

  /**
   * 判断粒子是否存活
   * @returns 
   */
  alive() {
    return this._alpha > 0
  }
}

/** 渲染器 */
type RendererObject<T> = {
  create(particle: Particle): T
  update(particle: Particle, sprite: T): void
  remove( sprite: T): void
}

export function defineRenderer<T>(renderer: RendererObject<T>) {
  return renderer
}

export type ParticlesOptions = {
  /** 单次发射数量 */
  total: number
  /** 重力 */
  gravity: number
  /** 逆时针最小角度 0.0 - 6.28 */
  minAngle: number
  /** 逆时针最大角度 */
  maxAngle: number
  /** 最小尺寸 */
  minSize: number
  /** 最大尺寸 */
  maxSize: number
  /** 最小速度 */
  minSpeed: number
  /** 最大速度 */
  maxSpeed: number
  /** 最小缩放速度 */
  minScaleSpeed: number
  /** 最大缩放速度 */
  maxScaleSpeed: number
  /** 最小透明速度 */
  minAlphaSpeed: number
  /** 最大透明速度 */
  maxAlphaSpeed: number
  /** 最小旋转速度 */
  minRotationSpeed: number
  /** 最大旋转速度 */
  maxRotationSpeed: number
  /** 是否随机分布 */
  spaceRandom: boolean
}

const particlesOptions = {
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

export type ParticlesCreateOptions<T> = Partial<ParticlesOptions> & {
  renderer: RendererObject<T>
}

export class Particles<T> {
  /** 发射器默认配置 */
  static defaultOptions = particlesOptions

  /**
   * 创建粒子发射器
   * @param options
   * @returns 
   */
  static create<T>(options?: ParticlesCreateOptions<T>) {
    return new Particles(options)
  }

  /** 粒子对象集合 */
  private _particles: T[] = []
  get particles() {
    return this._particles
  }
  /** 粒子数量 */
  get size() {
    return this._particles.length
  }
  /** 发射器配置 */
  private _options: ParticlesCreateOptions<T> = {} as ParticlesCreateOptions<T>
  get options() {
    return this._options
  }
  /** 粒子对象数据集合 */
  private _particleDatas: Particle[] = []
  /** 粒子对象池 */
  private _particlePool: T[] = []
  
  constructor(options: ParticlesCreateOptions<T>) {
    Object.assign(this._options, Particles.defaultOptions, options)
  }

  /**
   * 发射粒子
   */
  fire(config?: ParticleCreateOptions) {
    const options = this._options
    // 根据发射器配置，计算每个粒子的发射角度
    let minAngle = options.minAngle
    const spacing = (options.maxAngle - options.minAngle) / (options.total - 1)
    const angles = []
    for (let i = 0; i < options.total; i++) {
      if (options.spaceRandom) {
        angles.push(randomFloat(options.minAngle, options.maxAngle))
      } else {
        angles.push(minAngle)
        minAngle += spacing
      }
    }
    // 单个粒子构造器
    const makeParticle = angle => {
      const size = randomInt(options.minSize, options.maxSize)
      const speed = randomFloat(options.minSpeed, options.maxSpeed)
  
      return Particle.create({
        ...config,
        width: size,
        height: size,
        rotationSpeed: randomFloat(options.minRotationSpeed, options.maxRotationSpeed),
        scaleSpeed: randomFloat(options.minScaleSpeed, options.maxScaleSpeed),
        alphaSpeed: randomFloat(options.minAlphaSpeed, options.maxAlphaSpeed),
        vx: speed * Math.cos(angle),
        vy: speed * Math.sin(angle) + options.gravity
      })
    }
    // 遍历生成每个粒子
    angles.forEach(angle => {
      let particleData = makeParticle(angle)
      let particle = options.renderer.create(particleData)
      options.renderer.update(particleData, particle)
      this._particleDatas.push(particleData)
      this._particles.push(particle)
    })
  }

  /**
   * 每一帧的更新粒子状态
   * @param dt - 每一帧的延迟时间
   */
  update(dt = 1) {
    const { renderer } = this._options

    const particleDatas = this._particleDatas
    for (let i = 0; i < particleDatas.length; i++) {
      if (particleDatas[i].alive()) {
        particleDatas[i].update(dt)
        renderer.update(particleDatas[i], this._particles[i])
      } else {
        let particle = particleDatas[i]
        let index = particleDatas.indexOf(particle)
        particleDatas.splice(index, 1)
        renderer.remove(this._particles[index])
        this._particles.splice(index, 1)
      }
    }
  }

  /**
   * 粒子遍历
   * @param cb 
   */
  map<T>(cb: (Particle, index) => T) {
    return this._particleDatas.map((item, index) => cb(item, index))
  }
}

/**
 * 随机数浮点型
 * @param min 
 * @param max 
 * @returns 
 */
function randomFloat(min: number, max: number) {
  return min + Math.random() * (max - min)
}

/**
 * 随机数整型
 * @param min 
 * @param max 
 * @returns 
 */
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}