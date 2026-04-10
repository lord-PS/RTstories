import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Reflection.css'

const emotions = [
  { id: 'love', label: '❤ Love', color: '#c4713a', message: 'You carry bonds that time cannot break.' },
  { id: 'freedom', label: '🌿 Freedom', color: '#5a8f6e', message: 'Your spirit knows no walls, no cages.' },
  { id: 'pain', label: '💧 Pain', color: '#7b99c4', message: 'Your longing makes you deeply, beautifully human.' },
]

export default function Reflection({ onRestart, userChoices }) {
  const [selected, setSelected] = useState(null)

  const emotion = emotions.find(e => e.id === selected)

  const getPersonalizedResponse = () => {
    if (!userChoices) return emotion.message;
    
    let context = ''
    if (userChoices.connection === 'friendship') {
      context += 'You saw friendship bloom in unexpected places. '
    } else if (userChoices.connection === 'fatherly') {
      context += 'You resonated with the profound depth of a fatherly bond. '
    }

    if (userChoices.freedom === 'stay') {
      context += 'You found solace in the comfort of belonging. '
    } else if (userChoices.freedom === 'leave') {
      context += 'You chose the infinite expanse of freedom. '
    }

    if (userChoices.childhood) {
      context += 'You felt the silent ache of a displaced child. '
    }

    return `${context} ${emotion.message}`
  }

  return (
    <div className="reflection-root">
      <div className="reflection-bg-gradient" />

      {/* Three connecting lines */}
      <div className="reflection-threads" aria-hidden="true">
        <div className="thread thread-1" />
        <div className="thread thread-2" />
        <div className="thread thread-3" />
      </div>

      <div className="reflection-content">
        <motion.h1
          className="reflection-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          Tagore Understood Us<br />Before We Understood Ourselves
        </motion.h1>

        {/* Three themes connected */}
        <motion.div
          className="themes-connected"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="theme-dot" style={{ '--dot-color': '#c4713a' }}>
            <span>Love</span>
          </div>
          <div className="theme-connector" />
          <div className="theme-dot" style={{ '--dot-color': '#5a8f6e' }}>
            <span>Freedom</span>
          </div>
          <div className="theme-connector" />
          <div className="theme-dot" style={{ '--dot-color': '#7b99c4' }}>
            <span>Pain</span>
          </div>
        </motion.div>

        {/* Emotion picker */}
        <motion.div
          className="emotion-picker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <p className="picker-question">Which emotion did you feel the most?</p>
          <div className="picker-options">
            {emotions.map(em => (
              <motion.button
                key={em.id}
                id={`emotion-${em.id}-btn`}
                className={`picker-btn ${selected === em.id ? 'selected' : ''}`}
                style={{ '--btn-color': em.color }}
                onClick={() => setSelected(em.id)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                {em.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Response */}
        <AnimatePresence mode="wait">
          {emotion && (
            <motion.div
              key={selected}
              className="emotion-response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8 }}
            >
              <p className="response-message">{getPersonalizedResponse()}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final quote */}
        <motion.div
          className="final-quote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2 }}
        >
          <p className="closing-line">
            "Tagore didn’t just tell stories.<br />
            He revealed human truth."
          </p>
        </motion.div>

        <motion.button
          className="restart-btn"
          onClick={onRestart}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          whileHover={{ scale: 1.04 }}
        >
          Experience Again
        </motion.button>
      </div>
    </div>
  )
}
