import { Canvas, MeshProps, useFrame } from "@react-three/fiber/native"
import useControls from "r3f-native-orbitcontrols"
import { useRef, useState } from "react"
import { View } from "react-native"
import { Mesh } from "three"

export default function Model3DScreen() {
  const [OrbitControls, events] = useControls()

  return (
    <View style={{ flex: 1 }} {...events}>
      <Canvas>
        <OrbitControls
          minZoom={1}
          maxZoom={10}
          enablePan={false}
        />

        <ambientLight />
        <pointLight position={[0, 0, 1]} />
        <Box position={[-1, 0, 0]} />
        <Box position={[1, 0, 0]} />
      </Canvas>
    </View>
  )
}

function Box(props: MeshProps) {
  const mesh = useRef<Mesh>(null);

  const [active, setActive] = useState(false)

  // useFrame((_, delta) => mesh.current.rotation.x += delta)

  return (
    <mesh
      {...props}
      ref={mesh}
      onClick={() => setActive((active) => !active)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={active ? "hotpink" : "orange"} />
    </mesh>
  )
}