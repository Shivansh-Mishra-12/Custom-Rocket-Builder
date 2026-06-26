import { useGLTF } from '@react-three/drei'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
const Model = ({Select_Handle, ...props}) => {
    const modelRef = useRef()
    const { scene } = useGLTF('../models/falcon_9_spacex_rocket.glb')
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