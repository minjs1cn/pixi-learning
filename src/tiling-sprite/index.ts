import { Graphics, Sprite, TilingSprite } from 'pixi.js'
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
  // 两个平铺精灵，利用速度差打造3D效果
  const wood = new TilingSprite(utils.TextureCache['wood'], 1286, 640)
  const ground = new TilingSprite(utils.TextureCache['ground'], 1286, 179)

  wood.y = app.view.scrollHeight - 640
  ground.y = app.view.scrollHeight - 179
  app.stage.addChild(wood)
  app.stage.addChild(ground)

  // 平铺精灵的纹理坐标实现循环
  const sprite = new TilingSprite(utils.TextureCache['dnf'], 200, 200)
  sprite.x = app.view.scrollWidth - 200
  sprite.y = 0
  app.stage.addChild(sprite)

  // 普通精灵可以着色
  const sprite1 = new Sprite(utils.TextureCache['dnf'])
  sprite1.tint = 0xFFFF660
  app.stage.addChild(sprite1)

  // 对精灵加蒙版
  const sprite2 = new Sprite(utils.TextureCache['dnf'])
  sprite2.tint = 0xFFFF660
  sprite2.x = 100
  sprite2.y = 100
  const rectangle = new Graphics()
  rectangle.beginFill(0x66CCFF)
  rectangle.drawCircle(0, 0, 50)
  rectangle.endFill()
  rectangle.x = 50
  rectangle.y = 50
  sprite2.mask = rectangle
  app.stage.addChild(sprite2)
  sprite2.addChild(rectangle)


  app.ticker.add((dt) => {
    wood.tilePosition.x -= 1 * dt
    ground.tilePosition.x -= 2 * dt
    sprite.tilePosition.x -= 1 * dt
  })
}

init()