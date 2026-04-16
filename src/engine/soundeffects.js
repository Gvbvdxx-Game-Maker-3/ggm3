class SoundEffects {
  constructor(sound) {
    this.sound = sound;
    this.playbackRate = 1;
    this.volume = 100;
  }

  set duration(v) {
    //empty so there is no errors thrown when trying to set duration, even though it's not writable.
  }
  get duration() {
    return this.sound.data ? this.sound.getDuration() : 0;
  }

  set playbackRate(v) {
    this._playbackRate = +v || 0;
    if (this._playbackRate > 9999) {
      //To prevent crashing the audio engine with excessively high playback rates. This is an arbitrary limit.
      this._playbackRate = 9999;
    }
    if (this._playbackRate < 0) {
      //Same as above, to prevent crashing the audio engine with negative playback rates.
      this._playbackRate = 0;
    }
  }

  get playbackRate() {
    return this._playbackRate;
  }

  set volume(v) {
    this._volume = +v || 0;
    if (this._volume > 500) {
      // Maximum of 500% volume, which is 5 times the original volume. This is an arbitrary limit to prevent excessively loud sounds.
      this._volume = 500;
    }
    if (this._volume < 0) {
      // Minimum of 0% volume, which is silence. To stop audio engine from crashing with negative volume values.
      this._volume = 0;
    }
  }

  get volume() {
    return this._volume;
  }

  dispose() {
    this._volume = null;
    this._playbackRate = null;
  }
}

module.exports = SoundEffects;
