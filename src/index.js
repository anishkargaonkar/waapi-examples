import { animate } from "motion";
if (module.hot) {
  module.hot.accept();
}

const slideFromAbove = {
  keyframes: [
    {
      offset: 0,
      transform: "translateX(0%) translateY(-100%)",
      visibility: "hidden",
    },
    {
      offset: 0,
      backgroundColor: "#fff",
    },
    {
      offset: 1,
      backgroundColor: "#FFD166",
    },
    {
      offset: 1,
      transform: "translateX(0%) translateY(0%)",
      visibility: "visible",
    },
  ],
  timing: {
    duration: 1800,
    // iterations: "Infinity",
    iterations: 2,
    easing: "ease-out",
    // fill: "forwards",
  },
};

const slideToSide = {
  keyframes: [
    {
      offset: 0,
      transform: "translateX(0%) translateY(0%)",
      visibility: "hidden",
    },
    {
      offset: 1,
      transform: "translateX(100%) translateY(0%)",
      visibility: "visible",
      backgroundColor: "#06D6A0",
    },
  ],
  timing: {
    duration: 1800,
    // iterations: "Infinity",
    delay: 0,
    easing: "ease-out",
    // fill: "forwards",
    // composite: "accumulate",
  },
};

const slideFromBelow = {
  keyframes: [
    {
      offset: 0,
      transform: "translateX(100%) translateY(0%)",
      visibility: "hidden",
    },
    {
      offset: 1,
      transform: "translateX(100%) translateY(100%)",
      visibility: "visible",
      backgroundColor: "#EF476F",
    },
  ],
  timing: {
    duration: 1800,
    // iterations: "Infinity",
    delay: 0,
    easing: "ease-out",
  },
};

const execute = async () => {
  const box2 = document.getElementById("box2").animate();

  const timeline = new DocumentTimeline({
    originTime: 0,
  });

  function finishedHandler(index) {
    console.log(`animation ${index} finished: ` + Date.now());
  }
  function canceledHandler() {
    console.log("animation canceled: " + Date.now());
  }

  const anim1 = () =>
    box2.animate(slideFromAbove.keyframes, {
      ...slideFromAbove.timing,
    });
  const anim2 = () => box2.animate(slideToSide.keyframes, slideToSide.timing);
  const anim3 = () =>
    box2.animate(slideFromBelow.keyframes, {
      ...slideFromBelow.timing,
    });

  const x = await anim1().finished;
  await anim2().finished;
  const anim = await anim3().finished;
  anim.finish();
};

const executeAnimationTimeline = async () => {
  const box2 = document.getElementById("box2");

  const timeline = new DocumentTimeline({
    originTime: 0,
  });

  const animeEffect1 = new KeyframeEffect(
    box2,
    slideFromAbove.keyframes,
    slideFromAbove.timing
  );
  const animeEffect2 = new KeyframeEffect(
    box2,
    slideToSide.keyframes,
    slideToSide.timing
  );
  const animeEffect3 = new KeyframeEffect(
    box2,
    slideFromBelow.keyframes,
    slideFromBelow.timing
  );

  const animeAnimation1 = new Animation(animeEffect1, timeline);
  const animeAnimation2 = new Animation(animeEffect2, timeline);
  const animeAnimation3 = new Animation(animeEffect3, timeline);

  const animations = [animeAnimation1, animeAnimation2, animeAnimation3];
  let totalTimelineTime = 0;
  for await (const animation of animations) {
    const { activeDuration, delay, endDelay } =
      animation.effect.getComputedTiming();

    const runningDuration = activeDuration + delay + endDelay;
    console.log(
      totalTimelineTime >= runningDuration,
      runningDuration,
      animation.effect.getComputedTiming()
    );
    totalTimelineTime += runningDuration;
    animation.play();

    await animation.finished;
    console.log(timeline.currentTime);
  }
};

const main = async () => {
  document
    .querySelector("#box2")
    .addEventListener("click", executeAnimationTimeline);
  executeAnimationTimeline();
};

main();
