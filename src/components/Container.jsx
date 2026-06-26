import React from 'react'
import StrongBack from '../components/StrongBack'
import Model from '../components/Model'
import { BoxGeometry, TextureLoader } from 'three'
import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import Boosters from './Boosters'
import FalconHeavy from './FalconHeavy'
const Container = () => {
    const nMap = useLoader(TextureLoader, '../textures/coast_land_rocks_01_diff_2k.jpg')
    const selected_part_Ref = useRef()
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
                    <FalconHeavy position={[0, .7, 1.3]}  scale={.009} Select_Handle={Select_Handle} />
                    <StrongBack position={[0,0,-5]} rotation={[0,Math.PI/2,0]} scale={.12} Select_Handle={Select_Handle} />
                    {/* <Boosters position={[0,0,-.21]} scale={0.02} rotation={[-Math.PI/2,0,0]}  Select_Handle={Select_Handle}/> */}
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