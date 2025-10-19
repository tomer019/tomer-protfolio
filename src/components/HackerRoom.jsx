// src/components/HackerRoom.jsx
import { useGLTF } from "@react-three/drei";

export function HackerRoom(props) {
  // Load the model from public/models
  const { scene } = useGLTF("/models/hacker-room.glb");

  // Render the entire GLTF scene as-is
  return <primitive object={scene} {...props} />;
}

useGLTF.preload("/models/hacker-room.glb");
