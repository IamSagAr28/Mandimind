import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

/* ── Rotating wireframe globe ── */
function GlobeWireframe() {
    const meshRef = useRef();
    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.18;
            meshRef.current.rotation.x += delta * 0.04;
        }
    });
    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1.55, 28, 28]} />
            <meshBasicMaterial color="#34D399" wireframe opacity={0.18} transparent />
        </mesh>
    );
}

/* ── Glowing inner sphere ── */
function CoreSphere() {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.12;
        }
    });
    return (
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
            <Sphere ref={meshRef} args={[1.2, 64, 64]}>
                <MeshDistortMaterial
                    color="#059669"
                    emissive="#059669"
                    emissiveIntensity={0.5}
                    distort={0.35}
                    speed={1.8}
                    roughness={0.1}
                    metalness={0.6}
                    transparent
                    opacity={0.85}
                />
            </Sphere>
        </Float>
    );
}

/* ── Orbiting data points (mandi locations) ── */
function DataPoints() {
    const points = useMemo(() => {
        const pts = [];
        const count = 14;
        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;
            pts.push({
                x: 1.65 * Math.cos(theta) * Math.sin(phi),
                y: 1.65 * Math.sin(theta) * Math.sin(phi),
                z: 1.65 * Math.cos(phi),
                scale: 0.04 + Math.random() * 0.05,
                color: Math.random() > 0.5 ? '#34D399' : '#10B981',
            });
        }
        return pts;
    }, []);

    const groupRef = useRef();
    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {points.map((pt, i) => (
                <mesh key={i} position={[pt.x, pt.y, pt.z]}>
                    <sphereGeometry args={[pt.scale, 8, 8]} />
                    <meshBasicMaterial color={pt.color} />
                </mesh>
            ))}
        </group>
    );
}

/* ── Orbiting ring ── */
function Ring({ radius, speed, color, tiltX = 0, tiltZ = 0 }) {
    const ref = useRef();
    useFrame((_, delta) => {
        if (ref.current) ref.current.rotation.z += delta * speed;
    });
    return (
        <mesh ref={ref} rotation={[tiltX, 0, tiltZ]}>
            <torusGeometry args={[radius, 0.008, 6, 80]} />
            <meshBasicMaterial color={color} transparent opacity={0.45} />
        </mesh>
    );
}

/* ── Floating price tags ── */
function PriceParticles() {
    const count = 60;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const r = 2.2 + Math.random() * 1.2;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    const ref = useRef();
    useFrame((state) => {
        if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial color="#86efac" size={0.04} transparent opacity={0.7} sizeAttenuation />
        </points>
    );
}

/* ── Main 3D Scene ── */
export default function Globe3D() {
    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            <Canvas
                camera={{ position: [0, 0, 4.5], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
                <pointLight position={[-3, -3, -3]} intensity={0.8} color="#34D399" />
                <pointLight position={[3, 3, 0]} intensity={0.5} color="#059669" />

                <Stars radius={60} depth={30} count={1200} factor={2} fade speed={0.5} />

                <CoreSphere />
                <GlobeWireframe />
                <DataPoints />
                <PriceParticles />

                <Ring radius={2.0} speed={0.25} color="#34D399" tiltX={Math.PI / 6} />
                <Ring radius={2.3} speed={-0.18} color="#059669" tiltX={Math.PI / 3} tiltZ={Math.PI / 5} />
                <Ring radius={1.8} speed={0.3} color="#10B981" tiltZ={Math.PI / 4} />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.6}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
}
