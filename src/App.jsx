import './App.css'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import { Perf } from 'r3f-perf'
import HTML from './components/HTML'
import Container from './components/Container'
import Moon from './components/Moon'
import Loader from './components/Loader'

const App = () => {
  return (
    <section className='w-screen h-screen overflow-hidden'>
      {/* Canvas */}
      <Loader />
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [2.5, 1, 3.8], rotation: [-0.5, 0.5, 0.3] }}
        className='z-10'
      >
        <Perf position="top-right" />

        <Moon position={[-30, 20, -25]} scale={1} />
        <Container />

        <Environment preset='sunset' />
        <OrbitControls />
      </Canvas>


    </section>
  )
}

export default App
