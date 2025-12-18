'use client'

import Lottie from 'lottie-react'
import { motion } from 'framer-motion'

interface LottieAnimationProps {
  animationData: any
  loop?: boolean
  autoplay?: boolean
  className?: string
  onComplete?: () => void
}

export function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
  onComplete,
}: LottieAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        onComplete={onComplete}
      />
    </motion.div>
  )
}