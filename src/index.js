import { Application, utils, Sprite, ParticleContainer  } from 'pixi.js'
import headimgurl from './headimgurl.png'


// 是否支持webgl
if (utils.isWebGLSupported()) {
  utils.sayHello('webgl')
}

// 初始化应用
const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundAlpha: 0,
  resolution: window.devicePixelRatio,
  // sharedTicker: true
})

console.log(app)

// app.ticker.stop()

document.body.appendChild(app.view)

app.loader.add({
  name: 'sprite',
  url: headimgurl
})

app.loader.load(() => {
  console.log('load')
  setup()
})

const sprites = []
const total = 1



function setup() {
  const container = new ParticleContainer()
  for (let i = 0; i < total; i++) {
    const sprite = new Sprite(app.loader.resources['sprite'].texture)
    sprite.x = i + 1
    container.addChild(sprite)
    sprites.push(sprite)
  }

  app.stage.addChild(container)

  app.ticker.speed = 0.1
  

  app.ticker.add((dt) => {
    container.y += 1 * dt
  })

  setTimeout(() => {
    console.log(app.ticker.FPS, app.ticker.maxFPS, app.ticker.minFPS)
  }, 2000)

  // function animate(dt) {
  //   requestAnimationFrame(animate)
  //   app.ticker.update()
  //   container.y += 1
  // }

  // animate(performance.now())
}


