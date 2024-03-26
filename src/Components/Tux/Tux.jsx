import "./Tux.css";
import React, { Suspense, useRef } from "react";
import { Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

function Model(props) {
  const { nodes, materials } = useGLTF("/tux-transformed.glb");

  return (
    <group {...props} dispose={null} scale={0.05}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Tux-printable_0"].geometry}
          material={materials.black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Tux-printable_1"].geometry}
          material={materials.white}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Tux-printable_2"].geometry}
          material={materials.orange}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/tux-transformed.glb");





export default function Tux() {
  return (
    <>
      <div className="tuxcss">
        <Canvas>
          <ambientLight />
          <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={2}/>
          <Suspense fallback={null}>
            <Model position={[0, -2, 0]} />
          </Suspense>
          <Environment preset="sunset" />
        </Canvas>
      </div>
    </>
  );
}
