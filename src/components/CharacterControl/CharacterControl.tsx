import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { GroupProps, useFrame } from '@react-three/fiber'
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { ReactNode, useRef } from 'react'
import { Group, Quaternion, Vector3 } from 'three'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

import { directionOffset } from '../../helpers'
import { useControls } from '../../hooks/useControls'

const walkDirection = new Vector3()
const rotateAngle = new Vector3(0, 1, 0)
const rotateQuaternion = new Quaternion()
const cameraTarget = new Vector3()

const SPEED = 15
const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()

// type Props = {
//   children: any
// }

export const CharacterControl = ({ children }: { children: any }) => {
  const playerRef = useRef<Group>(null)
  const orbitControlRef = useRef<OrbitControlsImpl>(null)
  const rigidBodyRef = useRef<RapierRigidBody>(null)

  const { forward, backward, left, right } = useControls()

  // const anim = useMemo(() => {
  //   let a = ''
  //   if (forward || backward || left || right) a = 'run'
  //   else a = 'idle'

  //   return a
  // }, [forward, backward, left, right])

  useFrame(({ camera }) => {
    if (rigidBodyRef.current && playerRef.current) {
      const velocity = rigidBodyRef.current.linvel()

      if (forward || backward || left || right) {
        const angleYCameraDirection = Math.atan2(
          camera.position.x - playerRef.current.position.x,
          camera.position.z - playerRef.current.position.z,
        )
        const dO = directionOffset({ forward, backward, left, right })
        rotateQuaternion.setFromAxisAngle(
          rotateAngle,
          angleYCameraDirection + dO,
        )
        playerRef.current.quaternion.rotateTowards(rotateQuaternion, 0.2)
        camera.getWorldDirection(walkDirection)
        walkDirection.y = 0
        walkDirection.normalize()
        walkDirection.applyAxisAngle(rotateAngle, dO)
      }

      frontVector.set(0, 0, Number(backward) - Number(forward))
      sideVector.set(Number(left) - Number(right), 0, 0)
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(camera.rotation)
      rigidBodyRef.current.setLinvel(
        { x: direction.x, y: velocity.y, z: direction.z },
        true,
      )

      const translation = rigidBodyRef.current.translation()
      const cameraPositionOffset = camera.position.sub(
        playerRef.current.position,
      )

      playerRef.current.position.set(translation.x, 0, translation.z)
      cameraTarget.set(translation.x, translation.y, translation.z)

      if (orbitControlRef.current) orbitControlRef.current.target = cameraTarget

      camera.position.z = translation.z + cameraPositionOffset.z
      camera.position.x = translation.x + cameraPositionOffset.x
      camera.updateProjectionMatrix()
    }
  })

  return (
    <group>
      <OrbitControls
        ref={orbitControlRef}
        enableZoom={false}
        enablePan={true}
        enableDamping={true}
        maxDistance={17}
        minDistance={17}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minPolarAngle={Math.PI / 4}
      />
      <PerspectiveCamera
        makeDefault
        near={0.1}
        far={300}
        position={[17, 6, 17]}
      />
      <group name="player">
        <RigidBody
          type="dynamic"
          ref={rigidBodyRef}
          // position={[mainPlayer.position.x, 1, mainPlayer.position.z]}
          colliders={false}
          enabledRotations={[false, false, false]}
        >
          <CuboidCollider args={[1.5, 4, 1.5]} />
        </RigidBody>
        <group ref={playerRef}>{children}</group>
      </group>
    </group>
  )
}
