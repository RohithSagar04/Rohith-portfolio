import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text3D, OrbitControls, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function FloatingTechSphere({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 32, 32]} scale={scale} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function RotatingText() {
  const textRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <group ref={textRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          position={[-2, 0, 0]}
        >
          DevOps
          <meshStandardMaterial color="#60a5fa" metalness={0.8} roughness={0.2} />
        </Text3D>
      </Float>
    </group>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#a78bfa" />
      
      <FloatingTechSphere position={[-3, 2, -2]} color="#60a5fa" scale={0.8} />
      <FloatingTechSphere position={[3, -1, -1]} color="#a78bfa" scale={0.6} />
      <FloatingTechSphere position={[0, 1, -3]} color="#f0abfc" scale={0.7} />
      <FloatingTechSphere position={[-2, -2, 0]} color="#22d3ee" scale={0.5} />
      
      <RotatingText />
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export function Hero3D() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  )
}
