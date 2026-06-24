import { useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
const Model = ({Select_Handle, ...props}) => {
    const modelRef = useRef()
    const { scene } = useGLTF('../models/falcon_9_spacex_rocket.glb')
    const fairing = scene.getObjectByName('Cylinder001_fairing_0')
    // const selected_part_Ref = useRef()
    if (fairing && fairing.parent) {
        fairing.visible = true
    }
    // const Select_Handle = (obj) => {
    //     if (selected_part_Ref.current) {
    //         selected_part_Ref.current.material.emissive?.set(0x000000)
    //     }

    //     obj.material.emissive?.set(0x00ff00)
    //     selected_part_Ref.current = obj
    // }

    return (
        <group ref={modelRef} {...props} >
            <primitive
                object={scene}
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

export default Model