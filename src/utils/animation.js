import back from '../images/back.jpg'

const background = {
  fullScreen: {
    enable: true,
    zIndex: -10,
  },
  
  particles: {
    number: {
      value: 40,
    },
    size: {
      value: 1,
    },
    line_linked: {
      enable: true,
      distance: 200,
      color: "#fff",
      opacity: 0.2,
      width: 1,
      
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: ["repulse"],
      },
      onclick: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 200,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 100,
        size: 40,
        duration: 2,
        opacity: 8,
        speed: 1,
      },
      repulse: {
        distance: 200,
      },
      push: {
        particles_nb: 4,
      },
      remove: {
        particles_nb: 2,
      },
    },
  },
  retina_detect: true,
  background: {
    image: `linear-gradient(rgba(0, 0, 0, 0.15), rgb(0, 0, 0, 0.15)), url(${back})`,
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
  },
};

export default background;
