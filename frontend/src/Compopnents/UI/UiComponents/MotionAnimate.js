export const SectionAnimate = {
  hidden: {
    opacity: 0,
    y: "100px",
  },

  visible: {
    opacity: 1,
    y: "0px",
  },

  transition: {
    duration: 0.8,
    ease: "easeInOut",
  },
};

export const SlideAnimateFromLeft = {
  hidden: {
    opacity: 0,
    x: "-100px",
  },

  visible: {
    opacity: 1,
    x: "0px",
  },

  transition: {
    duration: 0.8,
    ease: "easeInOut",
  },
};

export const SlideAnimateFromRight = {
  hidden: {
    opacity: 0,
    x: "100px",
  },

  visible: {
    opacity: 1,
    x: "0px",
  },

  transition: {
    duration: 0.8,
    ease: "easeInOut",
  },
};
