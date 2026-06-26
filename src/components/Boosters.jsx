import { useFBX } from '@react-three/drei'
import React from 'react'

const Boosters = ({Select_Handle , ...props}) => {
    const fbx = useFBX('../models/booster.fbx')
    return (
        <group {...props}>
            <primitive object={fbx}
                onPointerOver={(e) => {
                    document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'default'
                }}
                onClick={(e) => {
                    e.stopPropagation()
                    Select_Handle(e.object)
                }}
            />
        </group>
    )
}

export default Boosters