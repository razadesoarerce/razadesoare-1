import './App.css'
import Topbar from './components/Topbar'
import Navbar from './components/Navbar'
import FeatureGrid from './components/FeatureGrid'

function App() {
  return (
    <>
      <header className="site-header">
        <Topbar />
        <Navbar />
      </header>

      <main>
        <FeatureGrid />
      </main>
    </>
  )
}

export default App

