import { ParticleContainer } from '@pixi/particles'
import { Sprite } from '@pixi/sprite'
import { utils } from 'pixi.js'
import { createApp } from '../app'
import { Particles, Particle, defineRenderer } from '../app/particles'
import dnf from '../assets/headimgurl.png'

const app = createApp()

document.body.appendChild(app.view)

function init() {
  app.loader.add({
    name: 'dnf',
    url: dnf
  }).load(setup)
}

const syncSprite = (particle: Particle, sprite: Sprite) => {
  sprite.rotation = particle.rotation
  sprite.alpha = particle.alpha
  sprite.position.set(particle.x, particle.y)
  sprite.scale.set(particle.scale.x, particle.scale.y)
}

function setup() {
  const container = new ParticleContainer(100, {
    scale: true,
    rotation: true,
    position: true,
    alpha: true
  })
  const renderer = defineRenderer<Sprite>({
    update(particle, sprite) {
      syncSprite(particle, sprite)
    },
    create() {
      let sprite = new Sprite(utils.TextureCache['dnf'])
      sprite.anchor.set(0.5, 0.5)
      container.addChild(sprite)
      return sprite
    },
    remove(sprite) {
      container.removeChild(sprite)
      sprite = null
    }
  })

  const renderer2 = defineRenderer<HTMLDivElement>({
    update(particle, sprite) {
      sprite.style.width = particle.width + 'px'
      sprite.style.height = particle.height + 'px'
      sprite.style.opacity = particle.alpha + ''
      sprite.style.left = particle.x + 'px'
      sprite.style.top = particle.y + 'px'
      sprite.style.transform = `scale(${particle.scale.x},${particle.scale.y})`
    },
    create(particle) {
      let sprite = document.createElement('div')
      sprite.style.width = particle.width + 'px'
      sprite.style.height = particle.height + 'px'
      sprite.classList.add('box')
      document.body.appendChild(sprite)
      return sprite
    },
    remove(sprite) {
      document.body.removeChild(sprite)
      // sprite = null
    }
  })
  const particles = Particles.create({
    total: 20,
    maxAngle: Math.PI,
    renderer: renderer
  })

  particles.fire({
    x: 300,
    y: 300
  })

  window.addEventListener('click', (e) => {
    particles.fire({
      x: e.x,
      y: e.y
    })
  })


  // const sprites = particles.map<Sprite>(particle => {
  //   let sprite = new Sprite(utils.TextureCache['dnf'])
  //   sprite.anchor.set(0.5, 0.5)
  //   syncSprite(particle, sprite)
  //   container.addChild(sprite)
  //   return sprite
  // })

  // console.log(sprites)

  app.stage.addChild(container)

  app.ticker.add((dt) => {
    particles.update(dt)
  })
}

init()