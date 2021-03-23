import { AnimatedSprite } from '@pixi/sprite-animated'
import { createApp, createTextureFrames } from '../app'
import dnf from '../assets/dnf.png'

const app = createApp()

document.body.appendChild(app.view)

function init() {
  app.loader.add({
    name: 'dnf',
    url: dnf
  }).load(setup)
}

function setup() {
  const textures = createTextureFrames('dnf', 80, 143)
  const sprite = new AnimatedSprite(textures)

  app.stage.addChild(sprite)

  sprite.animationSpeed = 0.1
  sprite.play()

  app.ticker.add((dt) => {
    sprite.x += 1 * dt
  })
}

init()