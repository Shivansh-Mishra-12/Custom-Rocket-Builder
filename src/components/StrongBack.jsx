import { useGLTF } from '@react-three/drei'
import React from 'react'
import { useRef } from 'react'

const StrongBack = ({Select_Handle , ...props}) => {
  const { scene } = useGLTF('../models/spacex_falcon_9_strongback.glb')
  return (
    <group {...props}>
      <primitive object={scene}
        onPointerOver={(e) => {
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default'
        }}
        onClick={(e) => {
          e.stopPropagation()
          Select_Handle(e.object)
        }} />
    </group>
  )
}

export default StrongBack