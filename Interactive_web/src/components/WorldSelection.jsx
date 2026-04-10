import { motion, AnimatePresence } from 'framer-motion'
import './WorldSelection.css'

const worlds = [
  {
    id: 'connection',
    emoji: '❤',
    title: 'Human Connection',
    subtitle: 'Inspired by Kabuliwala',
    hint: 'A bond that defies borders, blood, and time.',
    color: '#c4713a',
    gradient: 'linear-gradient(135deg, rgba(196,113,58,0.3), rgba(139,69,19,0.5))',
    border: 'rgba(218,165,32,0.5)',
    glow: 'rgba(196,113,58,0.5)',
  },
  {
    id: 'freedom',
    emoji: '🌿',
    title: 'Freedom',
    subtitle: 'Inspired by The Guest / Atithi',
    hint: 'The soul that refuses every cage.',
    color: '#5a8f6e',
    gradient: 'linear-gradient(135deg, rgba(90,143,110,0.3), rgba(40,80,60,0.5))',
    border: 'rgba(90,200,120,0.4)',
    glow: 'rgba(90,143,110,0.5)',
  },
  {
    id: 'childhood',
    emoji: '🏠',
    title: 'Childhood Emotion',
    subtitle: 'Inspired by Holiday / Chhuti',
    hint: 'A child who just wants to go home.',
    color: '#7b99c4',
    gradient: 'linear-gradient(135deg, rgba(123,153,196,0.3), rgba(60,80,120,0.5))',
    border: 'rgba(123,153,196,0.4)',
    glow: 'rgba(123,153,196,0.5)',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.4 }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
}

export default function WorldSelection({ onSelect, completedThemes, allCompleted }) {
  const completedCount = Object.values(completedThemes).filter(Boolean).length

  return (
    <div className="selection-root">
      <div className="selection-bg-gradient" />

      <motion.div
        className="selection-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <p className="selection-label">Choose Your World</p>
        <h2 className="selection-title">Three Doors. Three Emotions.</h2>
        <p className="selection-subtitle">Step through the one that calls to you.</p>
        <div className="progress-indicator">
          Completed {completedCount} of 3 steps
        </div>
      </motion.div>

      <motion.div
        className="portals-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {worlds.map((world) => {
          const isCompleted = completedThemes[world.id]
          
          return (
            <motion.div
              key={world.id}
              className={`portal-card ${isCompleted ? 'completed' : ''}`}
              id={`portal-${world.id}`}
              style={{
                '--card-gradient': world.gradient,
                '--card-border': world.border,
                '--card-glow': world.glow,
                '--card-color': world.color,
              }}
              variants={cardVariants}
              whileHover={!isCompleted ? {
                y: -12,
                scale: 1.04,
                transition: { duration: 0.35, ease: 'easeOut' }
              } : {}}
              onClick={() => onSelect(world.id)}
            >
              <div className="portal-inner">
                {isCompleted && <div className="completed-badge">✓</div>}
                <div className="portal-orb" style={isCompleted ? { animation: 'none', filter: 'grayscale(0.8)' } : {}}>
                  <span className="portal-emoji" style={isCompleted ? { filter: 'saturate(0)' } : {}}>{world.emoji}</span>
                </div>
                <h3 className="portal-title">{world.title}</h3>
                <p className="portal-source">{world.subtitle}</p>
                <p className="portal-hint">{isCompleted ? 'Memory experienced.' : world.hint}</p>
                <button className="portal-enter-btn" id={`enter-${world.id}-btn`}>
                  {isCompleted ? 'Revisit →' : 'Enter →'}
                </button>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <AnimatePresence>
        {allCompleted && (
          <motion.div
            className="final-reflection-prompt"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p>You have walked the paths of memory.</p>
            <button className="enter-reflection-btn" onClick={() => onSelect('reflection')}>
              Enter Final Reflection
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
