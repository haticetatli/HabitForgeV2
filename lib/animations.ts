export const easing = {
  bounce: [0.68, -0.55, 0.265, 1.55],
  soft: [0.25, 0.46, 0.45, 0.94],
  energetic: [0.68, -0.6, 0.32, 1.6],
  entrance: [0.43, 0.13, 0.23, 0.96],
  exit: [0.4, 0, 1, 1],
}

export const springs = {
  gentle: { stiffness: 120, damping: 14 },
  bouncy: { stiffness: 300, damping: 10 },
  snappy: { stiffness: 400, damping: 25 },
}

export const durations = {
  micro: 0.15,
  quick: 0.3,
  standard: 0.5,
  dramatic: 0.8,
  cinematic: 1.2,
}

// Microinteractions
export const microAnimations = {
  hover: {
    scale: 1.05,
    transition: { duration: durations.micro, ease: easing.soft }
  },
  press: {
    scale: 0.95,
    transition: { duration: 0.1, ease: easing.soft }
  },
  drag: {
    scale: 1.02,
    cursor: 'grabbing',
    transition: { duration: 0.2 }
  },
  focus: {
    boxShadow: '0 0 0 3px rgba(0, 240, 255, 0.5)',
    transition: { duration: 0.2 }
  }
}

// Page Transitions
export const pageTransitions = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -20, scale: 0.95 },
  transition: { duration: durations.standard, ease: easing.soft }
}

// Modal Animations
export const modalAnimations = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  content: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: 20 },
    transition: { type: 'spring', ...springs.gentle }
  }
}

// Stagger Animations (Liste öğeleri için)
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: durations.quick }
}