class GameTime {
  constructor(engine) {
    this.engine = engine;
    this.frameTimestamps = [];
    this.totalTime = 0;
  }

  stop() {
    var frameTimestamps = this.frameTimestamps;
    while (frameTimestamps.length > 0) {
      frameTimestamps.shift();
    }
  }

  start() {
    this.totalTime = 0;
  }

  startLoop() {
    var _this = this;
    var previous = performance.now();
    var frameTimestamps = this.frameTimestamps;
    var engine = this.engine;

    function loop() {
      var now = performance.now();

      var frameDuration = 1000 / engine.frameRate;
      var delta = now - previous;

      if (delta >= frameDuration) {
        previous = now - (delta % frameDuration);

        while (frameTimestamps.length > 0 && frameTimestamps[0] <= now - 1000) {
          frameTimestamps.shift();
        }
        frameTimestamps.push(now);

        _this.totalTime += delta / 1000;
        _this.elapsed = delta;
        _this.totalFps = frameTimestamps.length;
        engine.runFrame();
      }

      _this.timeout = setTimeout(loop, 1);
    }

    _this.timeout = setTimeout(loop, 1);
  }
}

module.exports = GameTime;
