import { animate } from "motion";
if (module.hot) {
  module.hot.accept();
}

const config1 = {
  keyframes: [
    {
      offset: 0,
      transform: "translateX(-50%)",
    },
    {
      color: '#ff0000',
    },
    {
      offset: 1,
      transform: "translateX(0%) rotate(360deg)",
    },
  ],
  timing: {
    duration: 1800,
    iterations: 1,
    delay: 0,
    easing: "ease-in-out",
  },
};

const config2 = {
  keyframes: [
    {
      offset: 0,
      transform: "translateY(0%)",
    },
    {
      offset: 1,
      transform: "translateY(-50%)",
    },
  ],
  timing: {
    duration: 1000,
    iterations: 1,
    delay: 0,
    easing: "ease-out",
    fill: "forwards"
  },
};

const config3 = {
  keyframes: [
    {
      transform: "translateY(-50%)",
    },
    {
      transform: "translateY(-45%)",
    },
    {
      transform: "translateY(-50%)",
    },
  ],
  timing: {
    duration: 100,
    iterations: 25,
    delay: 0,
    easing: "linear",
  },
};

const executeComposite = async () => {
  const box = document.getElementById("box1");

  const anim1 = () =>
    box.animate(config1.keyframes, {
      ...config1.timing,
      composite: "add",
    });
  const anim2 = () =>
    box.animate(config2.keyframes, {
      ...config2.timing,
      delay: 1800,
      composite: "add",
    });
  const anim3 = () =>
    box.animate(config3.keyframes, {
      ...config3.timing,
      delay: 1000,
    });

  anim1();
  anim2();
  anim3();
};

const execute = async () => {
  const box = document.getElementById("box2");

  function finishedHandler(index) {
    console.log(`animation ${index} finished: ` + Date.now());
  }
  function canceledHandler() {
    console.log("animation canceled: " + Date.now());
  }

  const anim1 = () =>
    box.animate(config1.keyframes, {
      ...config1.timing,
    });
  const anim2 = () => box.animate(config2.keyframes, { ...config2.timing });
  const anim3 = () =>
    box.animate(config3.keyframes, {
      ...config3.timing,
    });

  await anim1().finished;
  await anim2().finished;
  const anim = await anim3().finished;
  anim.commitStyles();
};

const executeKeyframes = async () => {
  
  
  const timeline = new DocumentTimeline({
    originTime: 0,
    timelineOffset: 0,

  })

  const finishedHandler = params => {
    console.log(params)
    console.log(`animation finished: ` + Date.now());
    console.log(timeline.currentTime);
  }
  

  const box = document.getElementById("box2");
  const effect1 = new KeyframeEffect(box, config1.keyframes, { ...config1.timing, composite: 'add' });
  const effect2 = new KeyframeEffect(box, config2.keyframes, config2.timing);
  const effect3 = new KeyframeEffect(box, config3.keyframes, config3.timing);
  
  const anim1 = new Animation(effect1, timeline);
  const anim2 = new Animation(effect2, timeline);
  const anim3 = new Animation(effect3, timeline);

  anim1.onfinish = finishedHandler;
  anim2.onfinish = finishedHandler;
  anim3.onfinish = finishedHandler;


  anim1.timeline
}

const main = async () => {
  // document.querySelector("#box1").addEventListener("click", executeComposite);
  // document.querySelector("#box2").addEventListener("click", execute);
  // executeComposite();
  executeKeyframes();
};

main();
