import { Application, AppLoaderPlugin, utils, Sprite  } from 'pixi.js'
import headimgurl from './headimgurl.png'

// 注册插件
Application.registerPlugin(AppLoaderPlugin)

// 是否支持webgl
if (utils.isWebGLSupported()) {
  utils.sayHello('webgl')
}

// 初始化应用
const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight
})

document.body.appendChild(app.view)

app.loader.add({
  name: 'sprite',
  url: headimgurl
})

app.loader.load(() => {
  console.log('load')
  setup()
})

function setup() {
  const sprite = new Sprite(app.loader.resources['sprite'].texture)

  app.stage.addChild(sprite)
}
