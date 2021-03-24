import { Ticker } from 'pixi.js'

const ticker = new Ticker()

ticker.maxFPS = 10
ticker.autoStart = true
ticker.speed = 2

ticker.add((dt) => {
  console.log('ticker', dt)
})

