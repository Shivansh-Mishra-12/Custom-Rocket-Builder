import { useGLTF } from '@react-three/drei'
import React from 'react'

const SLS1 = ({ Select_Handle, ...props }) => {
    const { scene } = useGLTF('../models/SLS-Artemis2/sls1.glb')
    return (
        <group {...props}>
            <primitive object={scene}
            onPointerOver={(e)=>{
                document.body.style.cursor='pointer'
            }}
            onPointerout={(e)=>{
                document.body.style.cursor='default'
            }}
            onClick={(e)=>{
                e.stopPropagation()
                Select_Handle(e.object)
            }}
            />
        </group>
    )
}

export default SLS1