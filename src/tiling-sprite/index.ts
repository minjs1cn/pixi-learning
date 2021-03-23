import { TilingSprite } from 'pixi.js'
import { utils } from 'pixi.js'
import { createApp } from '../app'
import dnf from '../assets/brick.jpeg'
import ground from '../assets/ground.png'
import wood from '../assets/wood.jpeg'

const app = createApp()

document.body.appendChild(app.view)

function init() {
  app.loader.add([
    {
      name: 'dnf',
      url: dnf
    },
    {
      name: 'ground',
      url: ground
    },
    {
      name: 'wood',
      url: wood
    }
  ]).load(setup)
}

function setup() {
  const sprite = new TilingSprite(utils.TextureCache['dnf'], 200, 200)
  sprite.x = 100
  sprite.y = 100

  const wood = new TilingSprite(utils.TextureCache['wood'], 1286, 640)
  const ground = new TilingSprite(utils.TextureCache['ground'], 1286, 179)

  wood.y = app.view.scrollHeight - 640
  ground.y = app.view.scrollHeight - 179
  app.stage.addChild(wood)
  app.stage.addChild(ground)
  app.stage.addChild(sprite)


  app.ticker.add((dt) => {
    wood.tilePosition.x -= 1 * dt
    ground.tilePosition.x -= 2 * dt
    sprite.tilePosition.x -= 1 * dt
  })
}

init()