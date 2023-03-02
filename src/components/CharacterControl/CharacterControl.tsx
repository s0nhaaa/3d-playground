import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useEffect, useMemo, useRef } from 'react'
import { Group, Quaternion, Vector3 } from 'three'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

import { directionOffset } from '../../helpers'
import { useControls } from '../../hooks/useControls'
import { usePlayerStore } from '../../stores/player'

const walkDirection = new Vector3()
const rotateAngle = new Vector3(0, 1, 0)
const rotateQuaternion = new Quaternion()
const cameraTarget = new Vector3()

const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()

type CharacterControlProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
  speed?: number
  distance?: [number, number]
  polarAngle?: [number, number]
  cameraPosition?: [number, number, number]
  collider?: [number, number, number]
  near?: number
  far?: number
  initialPosition?: [number, number, number]
  canControl: boolean
  onCharacterMove?: (character: Group) => void
  onAnimationChange?: () => void
  frameOffset?: number
}

export const CharacterControl = ({
  children,
  speed = 15,
  distance = [17, 17],
  polarAngle = [Math.PI / 4, Math.PI / 2 - 0.05],
  cameraPosition = [17, 6, 17],
  collider = [1, 2, 1],
  near = 0.1,
  far = 300,
  initialPosition = [0, 0, 0],
  canControl = true,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onCharacterMove = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onAnimationChange = () => {},
  frameOffset = 5,
}: CharacterControlProps) => {
  const playerRef = useRef<Group>(null)
  const orbitControlRef = useRef<OrbitControlsImpl>(null)
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const [setCanControl] = usePlayerStore((state) => [state.setCanControl])
  const frameCount = useRef(0)

  const { forward, backward, left, right } = useControls()

  useEffect(() => {
    setCanControl(canControl)
  }, [canControl])

  useEffect(() => {
    onAnimationChange()
  }, [forward, backward, left, right])

  useFrame(({ camera }) => {
    if (rigidBodyRef.current && playerRef.current) {
      const velocity = rigidBodyRef.current.linvel()
      frameCount.current += 1

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

        if (frameCount.current % frameOffset === 0) {
          onCharacterMove(playerRef.current)
          frameCount.current = 0
        }
      }

      frontVector.set(0, 0, Number(backward) - Number(forward))
      sideVector.set(Number(left) - Number(right), 0, 0)
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(speed)
        .applyEuler(camera.rotation)
      rigidBodyRef.current.setLinvel(
        { x: direction.x, y: velocity.y, z: direction.z },
        true,
      )

      const translation = rigidBodyRef.current.translation()

      const cameraPositionOffset = camera.position.sub(
        playerRef.current.position,
      )

      playerRef.current.position.set(
        translation.x,
        translation.y,
        translation.z,
      )
      cameraTarget.set(
        translation.x,
        playerRef.current.position.y,
        translation.z,
      )

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
        minDistance={distance[0]}
        maxDistance={distance[1]}
        minPolarAngle={polarAngle[0]}
        maxPolarAngle={polarAngle[1]}
      />
      <PerspectiveCamera
        makeDefault
        near={near}
        far={far}
        position={cameraPosition}
      />
      <group name="player">
        <RigidBody
          type="dynamic"
          ref={rigidBodyRef}
          position={initialPosition}
          colliders={false}
          enabledRotations={[false, false, false]}
          canSleep={true}
        >
          <CuboidCollider args={collider} />
        </RigidBody>
        <group ref={playerRef}>{children}</group>
      </group>
    </group>
  )
}
