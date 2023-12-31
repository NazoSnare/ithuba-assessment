import './App.scss'

import Analysis from './components/Analysis/Analysis';
import Update from '@/components/update'
import logoElectron from './assets/logo-electron.svg'
import logoVite from './assets/logo-vite.svg'
import { useState } from 'react'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const [count, setCount] = useState(0);
  const [isTest, setTest] = useState<boolean>(true);
  return (
    <>
    {
      (isTest) ? (
      <Analysis />
    ) : (
    
    <div className='App'>
      <div className='logo-box'>
        <a href='https://github.com/electron-vite/electron-vite-react' target='_blank'>
          <img src={logoVite} className='logo vite' alt='Electron + Vite logo' />
          <img src={logoElectron} className='logo electron' alt='Electron + Vite logo' />
        </a>
      </div>
      <h1>Electron + Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Electron + Vite logo to learn more
      </p>
      <div className='flex-center'>
        Place static files into the<code>/public</code> folder <img style={{ width: '5em' }} src='./node.svg' alt='Node logo' />
      </div>

      <Update />
    </div>
  )
    }
    </>
  )
}

export default App
