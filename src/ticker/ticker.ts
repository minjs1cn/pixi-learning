class TickerListener {
  
}

class Ticker {
  private autoStart: boolean = false
  private deltaTime: number = 1
  private lastTime: number = -1
  private speed: number = 1
  private started: boolean = false
  private _requestId: number | null = null

  private _tick: (time: number) => any;

  constructor() {
    this._tick = (time: number) => {
      this._requestId = null
      if (this.started) {
        this.update(time)
        if (this.started && this._requestId === null) {
          this._requestId = requestAnimationFrame(this._tick)
        }
      }
    }
  }

  update(time = performance.now()) {

  }
}

const ticker = new Ticker()