import { AnimatedSprite } from '@pixi/sprite-animated'
import { Text } from 'pixi.js'
import { createApp, createTextureFrames } from '../app'
import dnf from '../assets/Iori.png'
import keyboardjs from 'keyboardjs'

const app = createApp()

document.body.appendChild(app.view)

function init() {
  app.loader.add({
    name: 'dnf',
    url: dnf
  }).load(setup)
}

function setup() {
  const textures = createTextureFrames('dnf', 128 / 4, 192 / 4)
  const sprite = new AnimatedSprite(textures)

  app.stage.addChild(sprite)

  const text = new Text('w s a d')
  app.stage.addChild(text)

  sprite.animationSpeed = 0.1
  // sprite.play()

  const state = {
    down: [0, 3],
    left: [4, 7],
    right: [8, 11],
    up: [12, 15],
    status: '',
    vx: 0,
    vy: 0
  }

  const keyState = {
    down: false,
    left: false,
    right: false,
    up: false
  }

  sprite.onFrameChange = currentFrame => {
    if (currentFrame === (state[state.status][1] >= 15 ? 0 : state[state.status][1] + 1)) {
      sprite.gotoAndPlay(state[state.status][0])
    }
  }

  keyboardjs.bind('w', () => {
    if (keyState.up) return
    state.status = 'up'
    keyState.up = true
    state.vy = -1
    sprite.gotoAndPlay(state[state.status][0])
  }, () => {
    keyState.up = false
    state.vy = 0
    sprite.gotoAndStop(sprite.currentFrame)
  })

  keyboardjs.bind('s', () => {
    if (keyState.down) return
    state.status = 'down'
    keyState.down = true
    state.vy = 1
    sprite.gotoAndPlay(state[state.status][0])
  }, () => {
    keyState.down = false
    state.vy = 0
    sprite.gotoAndStop(sprite.currentFrame)
  })

  keyboardjs.bind('a', () => {
    if (keyState.left) return
    state.status = 'left'
    keyState.left = true
    state.vx = -1
    sprite.gotoAndPlay(state[state.status][0])
  }, () => {
    keyState.left = false
    state.vx = 0
    sprite.gotoAndStop(sprite.currentFrame)
  })

  keyboardjs.bind('d', () => {
    if (keyState.right) return
    state.status = 'right'
    state.vx = 1
    keyState.right = true
    sprite.gotoAndPlay(state[state.status][0])
  }, () => {
    keyState.right = false
    state.vx = 0
    sprite.gotoAndStop(sprite.currentFrame)
  })

  app.ticker.add((dt) => {
    if ((sprite.x <= 0 && state.vx < 0) || (sprite.x >= (app.view.offsetWidth - sprite.width) && state.vx > 0)) return
    if ((sprite.y <= 0 && state.vy < 0) || (sprite.y >= (app.view.offsetHeight - sprite.height) && state.vy > 0)) return

    sprite.x += state.vx * dt
    sprite.y += state.vy * dt
  })
}

init()