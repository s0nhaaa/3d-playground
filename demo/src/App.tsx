import { Canvas } from '@react-three/fiber'
import { Debug, Physics, RigidBody } from '@react-three/rapier'
import { CharacterControl, CustomBox } from '@sonhaaa/test-playground'

function App() {
  return (
    <div className="app">
      <Canvas>
        <gridHelper />
        <Physics gravity={[0, -9.82, 0]}>
          <Debug />
          <RigidBody rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
            <mesh>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color="pink" />
            </mesh>
          </RigidBody>
          <CharacterControl>
            <mesh>
              <boxGeometry />
              <meshNormalMaterial />
            </mesh>
          </CharacterControl>
          {/* <CharacterContext><Character /></CharacterContext> */}
        </Physics>
        <CustomBox>
          <mesh>
            <boxGeometry />
            <meshNormalMaterial />
          </mesh>
        </CustomBox>
      </Canvas>
    </div>
  )
}

export default App
