import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Freedom.css'

export default function Freedom({ onBack, onComplete }) {
  const [step, setStep] = useState(1)
  const [choice, setChoice] = useState(null) // 'stay' | 'leave'

  const handleChoice = (c) => {
    setChoice(c)
    setStep(3)
  }

  return (
    <div className={`freedom-root ${choice === 'stay' ? 'restricted' : ''} ${choice === 'leave' ? 'open' : ''}`}>
      {/* Background image */}
      <img
        src="/assets/freedom_sky.png"
        alt="Freedom"
        className="freedom-bg"
        style={{
          filter: choice === 'stay'
            ? 'brightness(0.3) saturate(0.3) blur(2px)'
            : choice === 'leave'
            ? 'brightness(0.7) saturate(1.3)'
            : 'brightness(0.45) saturate(0.7)',
          transform: choice === 'leave' ? 'scale(1.1)' : 'scale(1)',
        }}
      />
      <div className="freedom-overlay" />

      {/* Vignette for "stay" */}
      <AnimatePresence>
        {choice === 'stay' && (
          <motion.div
            className="freedom-vignette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>

      {/* Wind lines for "leave" */}
      <AnimatePresence>
        {choice === 'leave' && (
          <motion.div
            className="wind-lines"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="wind-line"
                style={{ top: `${8 + i * 7.5}%`, animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="freedom-content">
        <div className="step-indicator">Step {step} of 5</div>

        <motion.button
          className="back-btn"
          onClick={onBack}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ← Exit
        </motion.button>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1" 
              className="step-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="connection-title">The Soul That Refused to Stay</h1>
              <p className="connection-story-tag">Step 1: The Experience</p>
              
              <div className="outcome-box">
                <p>A wandering boy arrives at a household.</p>
                <p>He brings life, light, laughter.</p>
                <p>But the open road calls to him again...</p>
              </div>

              <button className="next-step-btn" onClick={() => setStep(2)}>Enter the mind of the boy →</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2" 
              className="step-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="connection-title">The Dilemma</h1>
              <p className="choice-prompt">Would you stay in comfort or choose freedom?</p>
              <div className="choice-buttons">
                <button className="theme-btn" onClick={() => handleChoice('stay')}>Stay</button>
                <button className="theme-btn" onClick={() => handleChoice('leave')}>Leave</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3" 
              className="step-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="connection-title">The Consequence</h1>
              {choice === 'stay' ? (
                <div className="outcome-box">
                  <p>The walls close in. The routine settles.</p>
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1 }}
                    className="outcome-highlight"
                  >
                    Safety—but at the cost of the wandering spirit. The comfort gradually becomes a cage.
                  </motion.p>
                </div>
              ) : (
                <div className="outcome-box">
                  <p>The horizon stretches endlessly before you.</p>
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1 }}
                    className="outcome-highlight"
                  >
                    No walls. No expectations. Only the open sky. Freedom is intoxicating, yet lonely.
                  </motion.p>
                </div>
              )}
              <button className="next-step-btn" onClick={() => setStep(4)}>Continue →</button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div 
              key="step4" 
              className="step-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h1 className="connection-title">Reflection</h1>
              <p className="reflection-text">
                Tagore beautifully captures the eternal human conflict between society and individuality. 
                There is a deep tension between the human desire to belong and the primal urge to be completely untethered.
              </p>
              <button className="next-step-btn" onClick={() => setStep(5)}>Final Message →</button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div 
              key="step5" 
              className="step-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="final-message-box">
                <h2 className="final-tagline">“Freedom is often chosen by those who cannot be contained.”</h2>
              </div>
              <button className="complete-btn" onClick={() => onComplete(choice)}>Return to Portals</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
