class Track {
  constructor(track, config) {
    this.track = track;
    this.rect = config.rect;

    this.config = config;

    this.posX = 0;
  }

  updatePosX(speed) {
    this.posX -= speed;

    if (this.posX <= this.config.limit) {
      this.posX += this.config.startNextPos;
    }
  }
  updateTrack() {
    this.track.style.transform = `translateX(${this.posX}px)`;
  }
  update(speed) {
    this.updatePosX(speed);
    this.updateTrack();
  }
}

export default class RunningLine {
  constructor(runningLine, speed = 1.5) {
    this.runningLine = runningLine;
    this.speed = speed;

    this.trackObj1 = null;
    this.trackObj2 = null;

    this.init();
  }

  init() {
    const trackElems = Array.from(this.runningLine.querySelectorAll(".running-line__track"));

    const tractElRect1 = trackElems[0].getBoundingClientRect();
    const tractElRect2 = trackElems[1].getBoundingClientRect();

    this.trackObj1 = new Track(trackElems[0], {
      rect: tractElRect1,
      limit: -tractElRect1.width,
      startNextPos: tractElRect1.width * 2,
    });
    this.trackObj2 = new Track(trackElems[1], {
      rect: tractElRect2,
      limit: -tractElRect2.width * 2,
      startNextPos: tractElRect2.width * 2,
    });

    this.animate();
  }

  animate() {
    const step = () => {
      this.trackObj1.update(this.speed);
      this.trackObj2.update(this.speed);

      requestAnimationFrame(step);
    };

    step();
  }
}
