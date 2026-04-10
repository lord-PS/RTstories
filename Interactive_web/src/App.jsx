import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './index.css'
import './App.css'
import LandingPage from './components/LandingPage'
import WorldSelection from './components/WorldSelection'
import HumanConnection from './components/HumanConnection'
import Freedom from './components/Freedom'
import ChildhoodEmotion from './components/ChildhoodEmotion'
import Reflection from './components/Reflection'

const scenes = ['landing', 'selection', 'connection', 'freedom', 'childhood', 'reflection']

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 1.4, ease: 'easeInOut' }
}

export default function App() {
  const [scene, setScene] = useState('landing')
  const [completedThemes, setCompletedThemes] = useState({
    connection: false,
    freedom: false,
    childhood: false
  })
  const [userChoices, setUserChoices] = useState({
    connection: null,
    freedom: null,
    childhood: null
  })

  const goTo = (nextScene) => {
    setScene(nextScene)
  }

  const markComplete = (themeId, choice) => {
    setCompletedThemes(prev => ({ ...prev, [themeId]: true }))
    if (choice) {
      setUserChoices(prev => ({ ...prev, [themeId]: choice }))
    }
  }

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {scene === 'landing' && (
          <motion.div key="landing" className="scene-wrapper" {...pageTransition}>
            <LandingPage onBegin={() => goTo('selection')} />
          </motion.div>
        )}
        {scene === 'selection' && (
          <motion.div key="selection" className="scene-wrapper" {...pageTransition}>
            <WorldSelection 
              onSelect={goTo} 
              completedThemes={completedThemes}
              allCompleted={Object.values(completedThemes).every(v => v)}
            />
          </motion.div>
        )}
        {scene === 'connection' && (
          <motion.div key="connection" className="scene-wrapper" {...pageTransition}>
            <HumanConnection 
              onBack={() => goTo('selection')} 
              onComplete={(choice) => {
                markComplete('connection', choice)
                goTo('selection')
              }} 
            />
          </motion.div>
        )}
        {scene === 'freedom' && (
          <motion.div key="freedom" className="scene-wrapper" {...pageTransition}>
            <Freedom 
              onBack={() => goTo('selection')} 
              onComplete={(choice) => {
                markComplete('freedom', choice)
                goTo('selection')
              }}
            />
          </motion.div>
        )}
        {scene === 'childhood' && (
          <motion.div key="childhood" className="scene-wrapper" {...pageTransition}>
            <ChildhoodEmotion 
              onBack={() => goTo('selection')} 
              onComplete={(choice) => {
                markComplete('childhood', choice)
                goTo('selection')
              }}
            />
          </motion.div>
        )}
        {scene === 'reflection' && (
          <motion.div key="reflection" className="scene-wrapper" {...pageTransition}>
            <Reflection 
              onRestart={() => {
                setCompletedThemes({ connection: false, freedom: false, childhood: false })
                setUserChoices({ connection: null, freedom: null, childhood: null })
                goTo('landing')
              }} 
              userChoices={userChoices}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
