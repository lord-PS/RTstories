import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ChildhoodEmotion.css'

const letterText = "I want to go home…"

export default function ChildhoodEmotion({ onBack, onComplete }) {
  const [step, setStep] = useState(1)
  const [choice, setChoice] = useState(true) // Just tracking completion here
  
  const [view, setView] = useState('village') // 'village' | 'city'
  const [letterOpen, setLetterOpen] = useState(false)
  const [typedText, setTypedText] = useState('')
  const typingRef = useRef(null)

  useEffect(() => {
    if (!letterOpen) {
      setTypedText('')
      if (typingRef.current) clearTimeout(typingRef.current)
      return
    }
    let idx = 0
    function typeNext() {
      if (idx <= letterText.length) {
        setTypedText(letterText.slice(0, idx))
        idx++
        typingRef.current = setTimeout(typeNext, 100)
      } else {
        setTimeout(() => setStep(4), 1500)
      }
    }
    typeNext()
    return () => { if (typingRef.current) clearTimeout(typingRef.current) }
  }, [letterOpen])

  const isCity = view === 'city'

  return (
    <div className={`childhood-root ${isCity ? 'city-mode' : 'village-mode'}`}>
      {/* Village BG */}
      <AnimatePresence>
        {!isCity && (
          <motion.img
            key="village-bg"
            src="/assets/childhood_village.png"
            alt="Village"
            className="childhood-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        )}
      </AnimatePresence>
      {/* City BG */}
      <AnimatePresence>
        {isCity && (
          <motion.img
            key="city-bg"
            src="/assets/childhood_city.png"
            alt="City"
            className="childhood-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
        )}
      </AnimatePresence>

      <div className="childhood-overlay" />

      {/* Rain for city */}
      <AnimatePresence>
        {isCity && (
          <motion.div
            className="rain-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className="raindrop"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`,
                  animationDelay: `${Math.random() * 2}s`,
                  opacity: Math.random() * 0.4 + 0.1,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="childhood-content">
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
              <h1 className="connection-title">I Just Want to Go Home</h1>
              <p className="connection-story-tag">Step 1: The Experience</p>
              
              <div className="outcome-box">
                <p>A boy travels from a warm village to a cold, unfeeling city.</p>
                <p>He is surrounded by people, but entirely alone.</p>
              </div>

              <button className="next-step-btn" onClick={() => setStep(2)}>Enter his world →</button>
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
              <h1 className="connection-title">Two Worlds</h1>
              <p className="choice-prompt">Experience the contrasting reality of his life.</p>
              
              {/* Toggle */}
              <div className="toggle-wrapper">
                <span className={`toggle-label ${!isCity ? 'active' : ''}`}>🏡 Village</span>
                <button
                  className="toggle-switch"
                  id="village-city-toggle"
                  onClick={() => setView(isCity ? 'village' : 'city')}
                  aria-label="Toggle between Village and City"
                >
                  <div className={`toggle-knob ${isCity ? 'right' : 'left'}`} />
                </button>
                <span className={`toggle-label ${isCity ? 'active' : ''}`}>🏙 City</span>
              </div>

              {/* Scene descriptors */}
              <AnimatePresence mode="wait">
                {!isCity ? (
                  <motion.div
                    key="village-desc"
                    className="scene-desc village-desc"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.7 }}
                  >
                    <p>Warm light. Familiar voices. The smell of earth after rain.</p>
                    <p className="scene-feel">This is where he belongs.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="city-desc"
                    className="scene-desc city-desc"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.7 }}
                  >
                    <p>Cold walls. Busy streets. Nobody stops to listen.</p>
                    <p className="scene-feel">He is here — but he is invisible.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="next-step-btn" onClick={() => setStep(3)}>Continue →</button>
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
              <h1 className="connection-title">The Silent Plea</h1>
              <p className="choice-prompt">Can you hear his voice?</p>

              {/* Letter Interaction */}
              <div className="letter-section">
                {!letterOpen ? (
                  <button
                    className="theme-btn"
                    id="open-letter-btn"
                    onClick={() => setLetterOpen(true)}
                  >
                    Write a letter home
                  </button>
                ) : (
                  <motion.div
                    className="letter-paper"
                    initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <p className="letter-text">{typedText}<span className="letter-cursor">|</span></p>
                  </motion.div>
                )}
              </div>
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
                Tagore sheds light on the often-ignored emotional landscape of children. 
                The tragedy of Phatik is precisely this silent suffering—being physically present in a bustling city but emotionally stranded, craving only the warmth of a mother's true acceptance.
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
                <h2 className="final-tagline">“A child’s silence often hides the deepest pain.”</h2>
              </div>
              <button className="complete-btn" onClick={() => onComplete(choice)}>Return to Portals</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
