import { Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { RotatingLines } from 'react-loader-spinner'
import { Navigation } from './navigation/Navigation'

function App() {
  return (
    <Suspense
      fallback={
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="100"
            visible={true}
          />
        </div>
      }
    >
      <Router>
        <Navigation />
      </Router>
    </Suspense>
  )
}

export default App
