import { Canvas } from '@react-three/fiber'
import { Debug, Physics, RigidBody } from '@react-three/rapier'
import { CharacterControl } from '@sonhaaa/test-playground'
import { useState } from 'react'

// import { useEffect } from 'react'
import Boy from './Boy'

function App() {
  const [cC, set] = useState(true)

  return (
    <div className="app">
      <Canvas id="abc">
        <gridHelper />
        <ambientLight intensity={1} />

        <Physics gravity={[0, -9.82, 0]}>
          <Debug />
          <RigidBody
            type="fixed"
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -2, 0]}
          >
            <mesh>
              <planeGeometry args={[100, 100]} />
              <meshStandardMaterial color="pink" />
            </mesh>
          </RigidBody>
          <CharacterControl
            canControl={cC}
            targetListener="abc"
            polarAngle={[0.5, Math.PI / 2]}
            cameraPosition={[17, 6, 17]}
            initialPosition={[4, 5, 1]}
          >
            <Boy />
          </CharacterControl>
        </Physics>
      </Canvas>
      <button onClick={() => set(!cC)}>Off</button>
    </div>
  )
}

export default App
