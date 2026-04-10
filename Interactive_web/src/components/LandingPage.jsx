import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Landing.css'

const NUM_PARTICLES = 60

function generateParticles() {
  return Array.from({ length: NUM_PARTICLES }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 6,
    opacity: Math.random() * 0.5 + 0.1
  }))
}

export default function LandingPage({ onBegin }) {
  const particles = useRef(generateParticles()).current

  return (
    <div className="landing-root">
      {/* Background image */}
      <img src="/assets/tagore_silhouette.png" alt="Tagore" className="landing-bg" />
      {/* Gradient overlay */}
      <div className="landing-overlay" />

      {/* Ambient particles */}
      <div className="particles-layer" aria-hidden="true">
        {particles.map(p => (
          <motion.div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [p.opacity, p.opacity * 2, p.opacity],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="landing-content">
        <motion.p
          className="landing-label"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          Rabindranath Tagore
        </motion.p>

        <motion.h1
          className="landing-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.8 }}
        >
          Step Into the World<br />of Human Emotions
        </motion.h1>

        <motion.p
          className="landing-quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.6 }}
        >
          "Tagore did not just write stories.<br />He made us feel them."
        </motion.p>

        <motion.button
          id="begin-experience-btn"
          className="landing-btn"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.4 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBegin}
        >
          Begin Experience
        </motion.button>
      </div>

      {/* Bottom fade */}
      <div className="landing-bottom-fade" />
    </div>
  )
}
