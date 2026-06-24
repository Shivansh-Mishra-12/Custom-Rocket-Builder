import { useLoader } from '@react-three/fiber';
import React from 'react'
import { TextureLoader } from 'three';

const Stand = ({ Scale , IsMobile }) => {
  let position=[];
  if(IsMobile==true){
    position=[0,-0.1,0]
  }
  else{
    position=[0,-0.19,0]
  }
  const roadTexture=useLoader(TextureLoader, '../6.jpg')
  return (
    <group scale={Scale} position={position}>
      <mesh >
        <cylinderGeometry args={[1.5, 1.5, 0.2, 64]} />
        <meshStandardMaterial map={roadTexture}/>
      </mesh>
    </group>
  )
}

export default Stand