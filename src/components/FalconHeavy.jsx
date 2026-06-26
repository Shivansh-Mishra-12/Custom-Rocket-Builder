import { useTexture } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { OBJLoader } from 'three/examples/jsm/Addons.js'

const FalconHeavy = ({ Select_Handle, ...props }) => {
    const texture = useTexture('../textures/1.jpg')
    const scene = useLoader(OBJLoader, '../models/Falcon 9 Heavy LowPoly.obj')
    useEffect(() => {
        if(scene.children){
            scene.children.map((mesh)=>{
                mesh.material.map=texture
            })
        }
    }, [])
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

export default FalconHeavy