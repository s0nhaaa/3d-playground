import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Group } from 'three'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const CustomBox = ({ children }: { children: any }) => {
  const ref = useRef<Group>(null)

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.x += delta
  })

  return <group ref={ref}>{children}</group>
}
