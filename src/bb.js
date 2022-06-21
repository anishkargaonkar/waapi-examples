const EventEmitter = require('events');

var ball = document.getElementsByTagName("ball")[0];
const half_canvas_width = window.innerWidth / 2;
const channels = {
  jumping: [
    { transform: "translateY(0)", easing: "ease-out" },
    { transform: "translateY(-500%)", easing: "ease-in" },
  ],
  position: {
      transform: [
          `translateX(-${half_canvas_width}px)`,
          `translateX(${half_canvas_width}px)`
      ]
  }
};
const keyframes = [
  ...JSON.parse(JSON.stringify([...channels.jumping ])),
  ...JSON.parse(JSON.stringify(channels.jumping).replaceAll("-500", "-250")),
  ...JSON.parse(JSON.stringify(channels.jumping).replaceAll("-500", "-125")),
  ...JSON.parse(JSON.stringify(channels.jumping).replaceAll("-500", "-50")),
  ...JSON.parse(JSON.stringify(channels.jumping).replaceAll("-500", "0"))
];
console.log(keyframes)
const timing = {
  duration: 2000,
  iterations: 1,
  direction: "normal",
  fill: "forwards",
};

const animation = new Animation(new KeyframeEffect(ball, keyframes, timing));

/**
 * 
 * @param {{ animation: Animation }} animation : ;
 */
const updateTimelineProgress = (animation) => {
  const progress = animation.currentTime;
  const progressPercentage = Math.floor((progress / timing.duration) * 100);
  document.getElementById('timeline').value = progressPercentage;
}

const updateProgressInterval = setInterval(() => {
  if (animation.currentTime === timing.duration) {
    return clearInterval(updateProgressInterval);
  };
  updateTimelineProgress(animation);
}, 10);

document.getElementById('timeline').addEventListener('change', val => {
  // console.log(val.target.va)
  const value = (val.target.value * timing.duration)/100; 
  console.log(value);
  onUpdatePlaybackTimeline(value);
});

function onUpdatePlaybackTimeline(value) {
  animation.currentTime = value;
  // animation.play();
  animation.pause();
}

animation.play();
animation.commitStyles();
