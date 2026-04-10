import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './HumanConnection.css'

const conversations = [
  { speaker: 'Mini', text: 'Kabuliwala! Kabuliwala!', delay: 0 },
  { speaker: 'Rahamat', text: 'And what does your father do, little one?', delay: 1.5 },
  { speaker: 'Mini', text: 'Are you going to your father-in-law\'s house?', delay: 3 },
  { speaker: 'Rahamat', text: '...she would be about as old as my own little girl.', delay: 5 },
]

const happyMoments = [
  'Laughter echoes through the corridor as Mini runs toward her friend.',
  'Almonds and raisins — simple gifts, enormous love.',
  'Two people, from different worlds, connected by pure affection.',
]

const separationMoments = [
  'Years pass. Memory fades. But the heart remembers.',
  'A father returns, but the child is gone — replaced by time.',
  'He holds a crumpled handprint — all that remains of what was.',
]

export default function HumanConnection({ onBack, onComplete }) {
  const [step, setStep] = useState(1)
  const [choice, setChoice] = useState(null)
  
  const [timeValue, setTimeValue] = useState(50)
  const [voiceTriggered, setVoiceTriggered] = useState(false)
  const [visibleConvos, setVisibleConvos] = useState([])

  const isHappy = timeValue < 50
  const isSad = timeValue > 50

  const moments = isHappy ? happyMoments : isSad ? separationMoments : []
  const momentIndex = isHappy
    ? Math.floor(((50 - timeValue) / 50) * happyMoments.length)
    : isSad
    ? Math.floor(((timeValue - 50) / 50) * separationMoments.length)
    : 0

  useEffect(() => {
    if (step === 1 && voiceTriggered) {
      let idx = 0
      const timer = setInterval(() => {
        const item = conversations[idx]
        if (item) {
          setVisibleConvos(prev => [...prev, item])
        }
        idx++
        if (idx >= conversations.length) {
          clearInterval(timer)
          // Automatically move to choice after dialogue ends
          setTimeout(() => setStep(2), 2000)
        }
      }, 1800)
      return () => clearInterval(timer)
    }
  }, [voiceTriggered, step])

  const handleChoice = (c) => {
    setChoice(c)
    setStep(3)
  }

  return (
    <div className={`connection-root ${isHappy ? 'warm' : ''} ${isSad ? 'cold' : ''}`}>
      <img
        src="/assets/connection_warm.png"
        alt="Warmth"
        className="connection-bg"
        style={{
          filter: `sepia(${isHappy ? 0.6 : 0.1}) saturate(${isHappy ? 1.3 : 0.5}) brightness(${isSad ? 0.4 : 0.55})`,
        }}
      />
      <div className="connection-overlay" style={{
        background: isHappy
          ? 'radial-gradient(ellipse at center, rgba(180,100,30,0.15) 0%, rgba(10,8,6,0.75) 70%)'
          : isSad
          ? 'radial-gradient(ellipse at center, rgba(60,60,80,0.2) 0%, rgba(10,8,6,0.85) 70%)'
          : 'radial-gradient(ellipse at center, transparent 0%, rgba(10,8,6,0.75) 70%)'
      }} />

      <div className="connection-content">
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
              <h1 className="connection-title">A Bond Beyond Blood</h1>
              <p className="connection-story-tag">Step 1: The Experience</p>

              {!voiceTriggered ? (
                <motion.button
                  className="voice-trigger"
                  onClick={() => setVoiceTriggered(true)}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="voice-icon">🔔</span>
                  <span>Hear Mini's voice</span>
                </motion.button>
              ) : (
                <div className="convo-list">
                  {visibleConvos.map((c, i) => (
                    <motion.div
                      key={i}
                      className={`convo-bubble ${c.speaker === 'Mini' ? 'mini' : 'rahamat'}`}
                      initial={{ opacity: 0, x: c.speaker === 'Mini' ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <span className="convo-speaker">{c.speaker}</span>
                      <p className="convo-text">"{c.text}"</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Time Shift Slider */}
              <motion.div
                className="slider-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                <div className="slider-labels">
                  <span className="slider-label-left">☀ Happy Moments</span>
                  <span className="slider-label-right">Separation 🌧</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={timeValue}
                  onChange={(e) => setTimeValue(Number(e.target.value))}
                  className="time-slider"
                  id="time-shift-slider"
                />
                <AnimatePresence mode="wait">
                  {moments.length > 0 && (
                    <motion.p
                      key={momentIndex}
                      className="time-moment-text"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.6 }}
                    >
                      {moments[Math.min(momentIndex, moments.length - 1)]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
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
              <h1 className="connection-title">The Question</h1>
              <p className="choice-prompt">Is this just a simple friendship, or is it something deeper?</p>
              <div className="choice-buttons">
                <button className="theme-btn" onClick={() => handleChoice('friendship')}>Friendship</button>
                <button className="theme-btn" onClick={() => handleChoice('fatherly')}>Fatherly Love</button>
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
              <h1 className="connection-title">The Outcome</h1>
              {choice === 'friendship' ? (
                <div className="outcome-box">
                  <p>At first, it appears as a surface-level bond between a peddler and a child...</p>
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 2 }}
                    className="outcome-highlight"
                  >
                    But slowly, the emotional layers reveal a connection that transcends simple play.
                  </motion.p>
                </div>
              ) : (
                <div className="outcome-box">
                  <p>It is a deep, fatherly love that knows no borders.</p>
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 1.5 }}
                    className="outcome-highlight"
                  >
                    Rahamat doesn't just see Mini; he sees his own daughter, far away in Kabul, whom he may never see again.
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
                Tagore shows us that human connection is not limited by shared blood or geography. 
                Emotional bonds can form in the most unexpected places, bridging the gap between a wealthy household in Calcutta and a poor peddler from the mountains of Afghanistan.
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
                <h2 className="final-tagline">“Some relationships are felt, not defined.”</h2>
              </div>
              <button className="complete-btn" onClick={() => onComplete(choice)}>Return to Portals</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
