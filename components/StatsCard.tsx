'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StatsCardProps {
  icon: string | ReactNode
  title: string
  value: string | number
  gradient: string
  delay?: number
}

export function StatsCard({ icon, title, value, gradient, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl border border-glass-border bg-glass-white p-6 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-400 mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}>
          {typeof icon === 'string' ? (
            <span className="text-2xl">{icon}</span>
          ) : (
            icon
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <motion.div
        className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r ${gradient} opacity-0 blur-xl group-hover:opacity-20`}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}