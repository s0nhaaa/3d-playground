import { useAnimations, useGLTF } from '@react-three/drei'
import { useCharacterControl } from '@sonhaaa/test-playground'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Body: THREE.SkinnedMesh
    cap: THREE.SkinnedMesh
    Ear004: THREE.SkinnedMesh
    Head: THREE.SkinnedMesh
    Horn001: THREE.SkinnedMesh
    khabanh: THREE.SkinnedMesh
    Leg005: THREE.SkinnedMesh
    Nose: THREE.SkinnedMesh
    ['police-hat']: THREE.SkinnedMesh
    ring: THREE.SkinnedMesh
    Ring005: THREE.SkinnedMesh
    ['shirt-body']: THREE.SkinnedMesh
    Hand: THREE.SkinnedMesh
    ['short-body']: THREE.SkinnedMesh
    Bone: THREE.Bone
    neutral_bone: THREE.Bone
    neutral_bone_1: THREE.Bone
    neutral_bone_2: THREE.Bone
    neutral_bone_3: THREE.Bone
    neutral_bone_4: THREE.Bone
    neutral_bone_5: THREE.Bone
    neutral_bone_6: THREE.Bone
    neutral_bone_7: THREE.Bone
    neutral_bone_8: THREE.Bone
    neutral_bone_9: THREE.Bone
    neutral_bone_10: THREE.Bone
    neutral_bone_11: THREE.Bone
    neutral_bone_12: THREE.Bone
    neutral_bone_13: THREE.Bone
  }
  materials: {
    Head: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    Material: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
  }
}

type ActionName = 'Armature.001|mixamo.com|Layer0' | 'idle' | 'run'
type GLTFActions = Record<ActionName, THREE.AnimationAction>

export default function Boy({
  anim,
  ...props
}: JSX.IntrinsicElements['group'] & { anim: string }) {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials, animations } = useGLTF(
    '/character-v2-transformed.glb',
  ) as GLTFResult
  const { actions } = useAnimations<GLTFActions>(animations, group)
  // type StatusKey = keyof typeof actions;
  // const anim = useCharacterControl(['idle', 'run'], () => {
  //   console.log('anim change')
  // })

  useEffect(() => {
    actions[anim].reset().fadeIn(0.2).play()
    return () => actions[anim].fadeOut(0.2)
  }, [anim])

  return (
    <group ref={group} {...props} dispose={null} position={[0, -2, 0]}>
      <group name="Armature" rotation={[0.13, 0, 0.01]}>
        <primitive object={nodes.Bone} />
        <primitive object={nodes.neutral_bone} />
        <primitive object={nodes.neutral_bone_1} />
        <primitive object={nodes.neutral_bone_2} />
        <primitive object={nodes.neutral_bone_3} />
        <primitive object={nodes.neutral_bone_4} />
        <primitive object={nodes.neutral_bone_5} />
        <primitive object={nodes.neutral_bone_6} />
        <primitive object={nodes.neutral_bone_7} />
        <primitive object={nodes.neutral_bone_8} />
        <primitive object={nodes.neutral_bone_9} />
        <primitive object={nodes.neutral_bone_10} />
        <primitive object={nodes.neutral_bone_11} />
        <primitive object={nodes.neutral_bone_12} />
        <primitive object={nodes.neutral_bone_13} />
        <skinnedMesh
          geometry={nodes.Body.geometry}
          material={nodes.Body.material}
          skeleton={nodes.Body.skeleton}
        />
        {/* <skinnedMesh
          geometry={nodes.cap.geometry}
          material={nodes.cap.material}
          skeleton={nodes.cap.skeleton}
        /> */}
        <skinnedMesh
          geometry={nodes.Ear004.geometry}
          material={nodes.Ear004.material}
          skeleton={nodes.Ear004.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Head.geometry}
          material={nodes.Head.material}
          skeleton={nodes.Head.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Horn001.geometry}
          material={nodes.Horn001.material}
          skeleton={nodes.Horn001.skeleton}
        />
        <skinnedMesh
          geometry={nodes.khabanh.geometry}
          material={materials['Material.002']}
          skeleton={nodes.khabanh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Leg005.geometry}
          material={nodes.Leg005.material}
          skeleton={nodes.Leg005.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Nose.geometry}
          material={nodes.Nose.material}
          skeleton={nodes.Nose.skeleton}
        />
        {/* <skinnedMesh
          geometry={nodes['police-hat'].geometry}
          material={nodes['police-hat'].material}
          skeleton={nodes['police-hat'].skeleton}
        /> */}
        <skinnedMesh
          geometry={nodes.ring.geometry}
          material={materials['Material.003']}
          skeleton={nodes.ring.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Ring005.geometry}
          material={materials.Material}
          skeleton={nodes.Ring005.skeleton}
        />
        <skinnedMesh
          geometry={nodes['shirt-body'].geometry}
          material={materials['Material.004']}
          skeleton={nodes['shirt-body'].skeleton}
        />
        <skinnedMesh
          geometry={nodes.Hand.geometry}
          material={nodes.Hand.material}
          skeleton={nodes.Hand.skeleton}
        />
        {/* <skinnedMesh
          geometry={nodes['short-body'].geometry}
          material={nodes['short-body'].material}
          skeleton={nodes['short-body'].skeleton}
        /> */}
      </group>
    </group>
  )
}

useGLTF.preload('/character-v2-transformed.glb')
