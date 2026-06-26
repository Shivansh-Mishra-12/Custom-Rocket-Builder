import React from 'react'
import StrongBack from '../components/StrongBack'
import Model from '../components/Model'
import { BoxGeometry, TextureLoader } from 'three'
import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import SLS1 from './SLS1'
const Container = () => {
    const nMap = useLoader(TextureLoader, '../textures/coast_land_rocks_01_diff_2k.jpg')
    const Select_Handle = (obj) => {
        if (selected_part_Ref.current) {
            selected_part_Ref.current.material.emissive?.set(0x000000)
        }

        obj.material.emissive?.set(0x00ff00)
        selected_part_Ref.current = obj
    }
    return (
        <>
            <group position={[0, -4, 0]}>
                <group onPointerMissed={() => {
                    if (selected_part_Ref.current) {
                        selected_part_Ref.current.material.emissive?.set(0x000000)
                        selected_part_Ref.current = null
                    }
                }}>

                    <SLS1 Select_Handle={Select_Handle} position={[0,.5,0]} />
                    <StrongBack position={[0,-1,0]} rotation={[0, (Math.PI / 2), 0]} scale={5} Select_Handle={Select_Handle} />

                </group>
                <group rotation={[Math.PI / 2, 0, 0]} position={[0, -1, 0]} >
                    <mesh >
                        <boxGeometry args={[100, 100, .001]} />
                        <meshBasicMaterial map={nMap} />
                    </mesh>
                </group>
            </group>
        </>
    )
}

export default Container