import { useState } from 'react'
import GetCurrentUrl from './components/scrap'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GetCurrentUrl />
    </>
  )
}

export default App
