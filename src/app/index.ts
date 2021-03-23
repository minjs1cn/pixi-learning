import { Application, Rectangle, Resource, utils, Texture, AnimatedSprite } from 'pixi.js'

export function createApp() {
  return new Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundAlpha: 0,
    resolution: window.devicePixelRatio
  })
}

export function createTextureFrames(name: string, frameWidth: number, frameHeight: number) {
  const baseTexture = utils.TextureCache[name]
  const rows = baseTexture.height / frameHeight
  const cols = baseTexture.width / frameWidth
  const positions = []
  const total = cols * rows
  // 计算每一帧的位置坐标
  for (let i = 0; i < total; i++) {
    positions.push([(i % cols) * frameWidth, Math.floor((i / cols)) * frameHeight])
  }
  // 构造帧数组
  return positions.map(frame => {
    let texture = baseTexture.clone()
    texture.frame = new Rectangle(frame[0], frame[1], frameWidth, frameHeight)
    return texture
  })
}

export * as Particle from './proton'