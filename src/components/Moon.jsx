import { useGLTF } from '@react-three/drei'
import React, { useEffect } from 'react'

const Moon = (props) => {
    const { scene } = useGLTF('../models/moon.glb')
    return (
        <group {...props} >
            <primitive object={scene} />
        </group>
    )
}

export default Moon