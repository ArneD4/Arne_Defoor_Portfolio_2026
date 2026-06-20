import { useRef, useState, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { ArrowRightIcon } from "../icons/ArrowRightIcon";

interface Project {
  title: string;
  images?: string[]; 
  link?: string;
}

interface BlobCanvasProps {
  projects: Project[];
}

const BlobShaderMaterial = {
  vertexShader: `
    uniform float uTime;
    uniform float uHover;
    uniform float uTransition;
    varying vec2 vUv;
    varying float vWarp;

    void main() {
      vUv = uv;
      vec3 pos = position;

      float wave1 = sin(pos.x * 3.0 + uTime * 0.4) * cos(pos.y * 2.2 + uTime * 0.3);
      float wave2 = sin(pos.y * 4.5 - uTime * 0.2) * cos(pos.x * 3.5 + uTime * 0.4);
      float wave3 = sin((pos.x + pos.y) * 2.0 + uTime * 0.5);

      float idleWarp = (wave1 * 0.08) + (wave2 * 0.05) + (wave3 * 0.03);
      float hoverWarp = (wave1 * 0.06 + wave2 * 0.04) * uHover;

      float totalWarp = idleWarp + hoverWarp;
      
      pos.z += totalWarp;
      vWarp = totalWarp;

      // Master scale transition factor
      pos.xyz *= uTransition;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform float uMaskRadius;
    uniform float uTransition;
    varying vec2 vUv;
    varying float vWarp;

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      float dist = distance(vUv, vec2(0.5));
      float deformedDist = dist - (vWarp * 0.5);
      
      float edgeSmoothness = 0.18; 
      float dynamicRadius = uMaskRadius * uTransition;
      float alpha = 1.0 - smoothstep(dynamicRadius - edgeSmoothness, dynamicRadius, deformedDist);
      
      gl_FragColor = vec4(texColor.rgb, texColor.a * alpha * uTransition);
    }
  `,
};

function BlobMesh({ project, isChanging }: { project: Project | null; isChanging: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const { viewport } = useThree();

  const isMobile = viewport.width < 3;
  const dynamicScale = isMobile ? viewport.width * 0.75 : 3.6;
  
  const sampleImg = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600";
  const texture = useTexture(project?.images?.[0] || sampleImg);

  useEffect(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.needsUpdate = true;
    }
  }, [texture]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uHover: { value: 0 },
      uTransition: { value: 0 }, // Let it bloom up smoothly on initial mount
      uTexture: { value: texture },
      uMaskRadius: { value: 0.44 },
    }),
    [], // Drop dependencies to prevent rebuilding uniform references mid-flight
  );

  // Directly swap out texture unit without tearing down uniforms
  useEffect(() => {
    if (materialRef.current && texture) {
      materialRef.current.uniforms.uTexture.value = texture;
    }
  }, [texture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      
      materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHover.value,
        hovered ? 1.0 : 0.0,
        0.07,
      );

      // Tightened interpolation factor (0.12) ensures a snappy down-and-up timing sequence
      materialRef.current.uniforms.uTransition.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uTransition.value,
        isChanging ? 0.0 : 1.0,
        0.12,
      );
    }

    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.04;
    }
  });

  return (
    <mesh
      ref={meshRef}
      scale={dynamicScale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        args={[BlobShaderMaterial]}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />

      <Html
        position={isMobile ? [-0.45, 0.45, 0.1] : [0.2, 0.55, 0]}
        center
        distanceFactor={6}
        className="pointer-events-none"
      >
        {/* CSS transition hooks are completely mirrored with WebGL states here */}
        <div className={`project-pinpoint-wrapper ${isChanging ? "is-changing" : ""}`}>
          <svg className="pinpoint-svg-line" width="120" height="120" viewBox="0 0 120 120">
            <line 
              x1="120" y1="0" 
              x2="20" y2="100" 
              className={`pinpoint-line-path ${hovered ? "is-hovered" : ""}`}
            />
            <circle cx="120" cy="0" r="3" className="pinpoint-dot" />
          </svg>

          <div className={`project-pinpoint ${hovered ? "is-hovered" : ""}`}>
            <h2 className="pinpoint-title">{project?.title || "Project Name"}</h2>
            <a
              href={
                project?.title
                  ? `./projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`
                  : "#"
              }
              className="pinpoint-link button button-secondary"
            >
              View Project
              <ArrowRightIcon size={16}></ArrowRightIcon>
            </a>
          </div>
        </div>
      </Html>
    </mesh>
  );
}

function TexturePreloader({ images }: { images: string[] }) {
  useTexture(images);
  return null;
}

export function BlobCanvas({ projects }: BlobCanvasProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const allImages = useMemo(() => {
    const sampleImg = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600";
    if (!projects || projects.length === 0) return [sampleImg];
    return projects.map((p) => p.images?.[0] || sampleImg);
  }, [projects]);

  useEffect(() => {
    if (!projects || projects.length <= 1) return;

    const interval = setInterval(() => {
      // 1. Tell everything to fold inward / fade out
      setIsChanging(true);

      // 2. Wait 600ms for everything to completely disappear out of sight
      setTimeout(() => {
        // 3. Swap indices in pitch blackness
        setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length);
        
        // 4. Give the texture a brief 50ms frame update breather, then unfold everything
        setTimeout(() => {
          setIsChanging(false);
        }, 50);

      }, 600);

    }, 20000);

    return () => clearInterval(interval);
  }, [projects]);

  const currentProject = useMemo(() => {
    if (!projects || projects.length === 0) return null;
    return projects[currentIndex];
  }, [projects, currentIndex]);

  return (
    <div className="hero-blob-container">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={1.5} />
        <Suspense fallback={null}>
          <TexturePreloader images={allImages} />
          {/* We keep the key fixed to prevent React from wiping out the component instances mid-animation loop */}
          <BlobMesh 
            project={currentProject} 
            isChanging={isChanging}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}