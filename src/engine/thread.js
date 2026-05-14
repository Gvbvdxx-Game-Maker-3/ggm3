var TWEEN = require("@tweenjs/tween.js");
var EasingMap = require("./easingmap.js");

class Thread {
  constructor(firstBlockID, sprite) {
    this.id = firstBlockID;
    this.sprite = sprite;
    this.running = true;
    this.screenRefresh = true;
    this._hasStopped = false;
    this.hadError = false;
    this.customBlockValues = {};
    this.subThreads = {};
    this.inherited = false;
    this.isPreviewMode = false;
  }

  stopEverythingButMe() {
    if (this.inherited) {
      var allThreads = Object.keys(this.parent.subThreads); //Stop the subthreads.
      allThreads.push(this.parent.id); //Including the main thread.
      this.sprite.stopAllScriptsExceptThreads(allThreads);
      return;
    }
    this.sprite.stopAllScriptsExceptThread(this);
  }

  stopAllScripts() {
    this.sprite.stopAllScripts();
  }

  customBlockInherit(thread) {
    if (this.inherited) {
      return;
    }
    thread.subThreads[this.id] = this;
    this.inherited = true;
    if (!thread.screenRefresh) {
      this.screenRefresh = false;
    }
    this.parent = thread;
  }

  turnOnWithoutRefresh() {
    this.screenRefresh = false;
  }

  stop() {
    this.running = false;
    if (!this._hasStopped) {
      this._hasStopped = true;
      this.sprite.removeThread(this.id);
    }
    if (this.inherited) {
      delete this.parent.subThreads[this.id];
    } else {
      for (var key of Object.keys(this.subThreads)) {
        this.subThreads[key].stop();
      }
    }

    if (this.isPreviewMode) {
      return; //Skip logging errors when the block is clicked.
    }
    if (this.hadError) {
      var spr = this.sprite.parent || this.sprite; //Use main sprite for errorLogs.
      spr.errorLogs.push(this.output || "");
      spr.errorLogs = spr.errorLogs.slice(-100); //Keep last 100 logs.

      if (spr.onErrorLog) {
        spr.onErrorLog(this.output || "");
      }
    }
  }

  waitForNextFrame() {
    if (!this.running) {
      return new Promise((a) => a());
    }
    if (this.screenRefresh) {
      var _this = this;
      return new Promise((resolve) => {
        _this.sprite._addFrameListener(resolve);
      });
    } else {
      return new Promise((a) => a());
    }
  }

  waitSeconds(seconds) {
    var _this = this;
    return new Promise((resolve) => {
      if (!_this.running) {
        resolve();
      }
      var milliseconds = seconds * 1000;
      var start = performance.now();
      var interval = setInterval(() => {
        var now = performance.now();
        if (!_this.running) {
          clearInterval(interval);
          resolve();
        }
        if (now - start > milliseconds) {
          clearInterval(interval);
          resolve();
        }
      });
    });
  }

  tweenToXY(targetX, targetY, duration, easing) {
    return this.tweenTo(
      {
        x: +targetX || 0,
        y: +targetY || 0,
      },
      +duration || 0,
      easing,
    );
  }

  tweenToSize(targetSize, duration, easing) {
    return this.tweenTo(
      {
        size: +targetSize || 0,
      },
      +duration || 0,
      easing,
    );
  }

  tweenToStretchXY(targetScaleX, targetScaleY, duration, easing) {
    return this.tweenTo(
      {
        scaleX: (+targetScaleX || 0) / 100,
        scaleY: (+targetScaleY || 0) / 100,
      },
      +duration || 0,
      easing,
    );
  }

  tweenToSkewXY(targetSkewX, targetSkewY, duration, easing) {
    return this.tweenTo(
      {
        skewX: +targetSkewX || 0,
        skewY: +targetSkewY || 0,
      },
      +duration || 0,
      easing,
    );
  }

  tweenTo(target, duration, easing) {
    var _this = this;
    return this.tweenToSource(_this.sprite, target, duration, easing);
  }

  tweenToSource(source, target, duration, easing) {
    var _this = this;
    return new Promise((resolve) => {
      if (!_this.running) {
        resolve();
      }
      var movement = new TWEEN.Tween(source).to(target, duration * 1000);
      _this.sprite.tween.add(movement);
      if (easing) {
        movement.easing(EasingMap[easing]);
      }
      movement.onComplete(() => {
        resolve();
      });
      movement.onUpdate(() => {
        if (!_this.running) {
          movement.stop();
          resolve();
        }
      });
      movement.start(_this.sprite.engine._iTime * 1000);
    });
  }

  tweenToProperty(variableName, targetValue, duration, easing) {
    var _this = this;
    return new Promise((resolve) => {
      if (!_this.sprite.engine.hasSpriteProperty(variableName)) {
        //Stops unused variables from being created accidentally.
        resolve();
        return;
      }
      if (!_this.running) {
        resolve();
      }
      var source = {
        value: +_this.sprite.spriteProperties[variableName] || 0,
      };
      var movement = new TWEEN.Tween(source).to(
        {
          value: +targetValue || 0,
        },
        duration * 1000,
      );
      _this.sprite.tween.add(movement);
      if (easing) {
        movement.easing(EasingMap[easing]);
      }
      movement.onComplete(() => {
        resolve();
      });
      movement.onUpdate(() => {
        this.sprite.spriteProperties[variableName] = source.value;
        if (!_this.running) {
          movement.stop();
          resolve();
        }
      });
      movement.start(_this.sprite.engine._iTime * 1000);
    });
  }

  tweenToGlobalVariable(variableName, targetValue, duration, easing) {
    var _this = this;
    return new Promise((resolve) => {
      if (
        typeof _this.sprite.engine.globalVariables[variableName] == "undefined"
      ) {
        //Stops unused variables from being created accidentally.
        resolve();
        return;
      }
      if (!_this.running) {
        resolve();
      }
      var source = {
        value: +_this.sprite.engine.globalVariables[variableName] || 0,
      };
      var movement = new TWEEN.Tween(source).to(
        {
          value: +targetValue || 0,
        },
        duration * 1000,
      );
      _this.sprite.tween.add(movement);
      if (easing) {
        movement.easing(EasingMap[easing]);
      }
      movement.onComplete(() => {
        resolve();
      });
      movement.onUpdate(() => {
        this.sprite.engine.globalVariables[variableName] = source.value;
        if (!_this.running) {
          movement.stop();
          resolve();
        }
      });
      movement.start(_this.sprite.engine._iTime * 1000);
    });
  }

  isInt(val) {
    //Copied and pasted from scratch-vm, but just with some edits.
    // Values that are already numbers.
    if (typeof val === "number") {
      if (isNaN(val)) {
        // NaN is considered an integer.
        return true;
      }
      // True if it's "round" (e.g., 2.0 and 2).
      return val === Math.floor(val);
    } else if (typeof val === "boolean") {
      return true;
    } else if (typeof val === "string") {
      return val.indexOf(".") < 0;
    }
    return false;
  }

  deleteClone() {
    if (this.sprite.isClone) {
      //Bug fix: Stop non-clone threads from stopping themselves even though they aren't clones.
      this.stop();
      this.sprite.destroyClone();
    }
  }

  random(from, to) {
    //Copied and pasted from scratch-vm, but just with some edits.
    var { isInt } = this;

    var low = from <= to ? from : to;
    var high = from <= to ? to : from;
    if (low === high) return low;
    // If both arguments are ints, truncate the result to an int.
    if (isInt(from) && isInt(to)) {
      return low + Math.floor(Math.random() * (high + 1 - low));
    }
    return Math.random() * (high - low) + low;
  }

  async repeatTimes(times, func) {
    //No need for error handling since that is done by the thread.
    if (!this.running) {
      return;
    }
    var i = 0;
    while (i < times) {
      i += 1;
      if (!this.running) {
        return;
      }
      await func();
      if (this.screenRefresh) {
        await this.waitForNextFrame();
      }
      if (!this.running) {
        return;
      }
    }
    if (!this.running) {
      return;
    }
  }
}

module.exports = Thread;
