import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, RoundedBox, Stars } from '@react-three/drei'
import { useMemo, useRef } from 'react'

function OrbitalForms() {
  const groupRef = useRef(null)
  const cards = useMemo(
    () => [
      { position: [-2.4, 0.9, -1.5], scale: 0.9, color: '#8ce8c4' },
      { position: [2.2, -0.5, -1], scale: 1.1, color: '#ffcf7d' },
      { position: [-0.2, -1.6, 0], scale: 0.75, color: '#74d6ff' },
    ],
    [],
  )

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.18
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.1, 12]} />
        <MeshDistortMaterial color="#0da39f" roughness={0.1} metalness={0.8} distort={0.35} speed={2.3} />
      </mesh>
      {cards.map((card) => (
        <Float key={card.position.join('-')} speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
          <RoundedBox args={[1.2 * card.scale, 0.78 * card.scale, 0.14]} radius={0.08} smoothness={4} position={card.position}>
            <meshStandardMaterial color={card.color} roughness={0.2} metalness={0.55} />
          </RoundedBox>
        </Float>
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 42 }}>
        <color attach="background" args={['#061328']} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 6, 6]} intensity={1.7} color="#f2f1d8" />
        <pointLight position={[-4, -2, 3]} intensity={28} color="#ff9a62" />
        <pointLight position={[4, 2, 4]} intensity={18} color="#5ae5d7" />
        <Stars radius={55} depth={35} count={1800} factor={4} saturation={0} fade speed={0.6} />
        <OrbitalForms />
      </Canvas>
    </div>
  )
}
