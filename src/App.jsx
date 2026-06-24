import './App.css'
import gsap from 'gsap'

import Stand from './components/Stand'
import { Canvas } from '@react-three/fiber'
import { Environment, Html, OrbitControls } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { Perf } from 'r3f-perf'
import HTML from './components/HTML'
import Container from './components/Container'


const App = () => {
  const [CarScale, setCarScale] = useState(1)
  const [StandScale, setStandScale] = useState(1)
  const [IsMobile, setIsMobile] = useState(false)
  const [PanelOpen, setPanelOpen] = useState(false)

  const panelRef = useRef(null)
  const arrowRef = useRef(null)


  // RESPONSIVENESS
  useEffect(() => {
    const resize_handler = () => {
      if (window.innerWidth < 540) {
        setCarScale(0.5)
        setStandScale(1)
        setIsMobile(true)
      } else {
        setCarScale(1)
        // setStandPosition(0, -0.3, 0)
        setStandScale(2)
        setIsMobile(false)
      }
    }
    resize_handler()
    window.addEventListener('resize', resize_handler)
    return () => window.removeEventListener('resize', resize_handler)
  }, [])




  // DATA
  const changebles = [
    { id: 1, name: 'Body', obj: 0 },
    { id: 3, name: 'GlassHouse', obj: 5 },
    { id: 4, name: 'Alloys', obj: 22 },
    { id: 5, name: 'Ext. Parts', obj: 10 },
  ]



  // MAIN LOGIC
  const [SelectedPart, setSelectedPart] = useState(null)
  const [SelectedColor, setSelectedColor] = useState('#FF0000')




  // ANIMATIONS
    // Initial mount: hide panel offscreen on mobile
  useGSAP(() => {
    if (!panelRef.current) return
    if (IsMobile) {
      gsap.set(panelRef.current, { x: '-100%' })
    } else {
      gsap.set(panelRef.current, { x: '0%' })
    }
  }, [IsMobile])

    // Animate panel + arrow whenever PanelOpen or IsMobile changes
  useGSAP(() => {
    if (!panelRef.current || !arrowRef.current) return

    if (!IsMobile) {
      // Desktop: always visible, no arrow
      gsap.to(panelRef.current, { x: '0%', duration: 0.35, ease: 'power2.out' })
      return
    }

    if (PanelOpen) {
      // Slide panel in
      gsap.to(panelRef.current, {
        x: '0%',
        duration: 0.4,
        ease: 'power3.out',
      })
      // Rotate arrow image to point left
      gsap.to(arrowRef.current, {
        rotate: 180,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    } else {
      // Slide panel out
      gsap.to(panelRef.current, {
        x: '-100%',
        duration: 0.35,
        ease: 'power3.in',
      })
      // Rotate arrow back to point right
      gsap.to(arrowRef.current, {
        rotate: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      })
    }
  }, [PanelOpen, IsMobile])

  return (
    <section className='w-screen h-screen overflow-hidden'>
      {/* Canvas */}
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [2.5, 1, 3.8], rotation: [-0.5, 0.5, 0.3] }}
        className='z-10'
      >
        <Perf position="top-right" />


        <Container />

        <Environment preset='sunset'   />
        <EffectComposer />
        <OrbitControls />
      </Canvas>


    </section>
  )
}

export default App
