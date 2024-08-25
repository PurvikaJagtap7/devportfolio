"use client";
import { cn } from "@/lib/utils";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

interface CanvasRevealEffectProps {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}

export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize,
  showGradient = true,
}) => {
  return (
    <div className={cn("h-full relative bg-white w-full", containerClassName)}>
      <div className="h-full w-full">
        <DotMatrix
          colors={colors}
          dotSize={dotSize ?? 3}
          opacities={opacities}
          shader={`
              float animation_speed_factor = ${animationSpeed.toFixed(1)};
              float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
              opacity *= step(intro_offset, u_time * animation_speed_factor);
              opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
            `}
          center={["x", "y"]}
        />
      </div>
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-[84%]" />
      )}
    </div>
  );
};

interface DotMatrixProps {
  colors?: number[][];
  opacities?: number[];
  totalSize?: number;
  dotSize?: number;
  shader?: string;
  center?: ("x" | "y")[];
}

const DotMatrix: React.FC<DotMatrixProps> = ({
  colors = [[0, 0, 0]],
  opacities = [0.04, 0.04, 0.04, 0.04, 0.04, 0.08, 0.08, 0.08, 0.08, 0.14],
  totalSize = 4,
  dotSize = 2,
  shader = "",
  center = ["x", "y"],
}) => {
  const uniforms = useMemo(() => {
    let colorsArray = [
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
      colors[0],
    ];
    if (colors.length === 2) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[1],
      ];
    } else if (colors.length === 3) {
      colorsArray = [
        colors[0],
        colors[0],
        colors[1],
        colors[1],
        colors[2],
        colors[2],
      ];
    }

    return {
      u_colors: {
        value: colorsArray.map(
          (color) =>
            new THREE.Color(color[0] / 255, color[1] / 255, color[2] / 255)
        ),
      },
      u_opacities: { value: opacities },
      u_total_size: { value: totalSize },
      u_dot_size: { value: dotSize },
    };
  }, [colors, opacities, totalSize, dotSize]);

  return (
    <Shader
      fragmentShader={`
        precision mediump float;
        uniform float u_time;
        uniform float u_opacities[10];
        uniform vec3 u_colors[6];
        uniform float u_total_size;
        uniform float u_dot_size;
        uniform vec2 u_resolution;
        
        float PHI = 1.61803398874989484820459;
        
        float random(vec2 xy) {
            return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
        }
        
        void main() {
            vec2 st = gl_FragCoord.xy;
            ${
              center.includes("x")
                ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
            ${
              center.includes("y")
                ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));"
                : ""
            }
            
            float opacity = step(0.0, st.x) * step(0.0, st.y);
            vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
            
            float frequency = 5.0;
            float show_offset = random(st2);
            float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
            opacity *= u_opacities[int(rand * 10.0)];
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
            opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));
            
            vec3 color = u_colors[int(show_offset * 6.0)];
            
            ${shader}
            
            gl_FragColor = vec4(color, opacity);
            gl_FragColor.rgb *= gl_FragColor.a;
        }`}
      uniforms={uniforms}
    />
  );
};

interface ShaderProps {
  fragmentShader: string;
  uniforms: { [uniform: string]: THREE.IUniform };
}

const Shader: React.FC<ShaderProps> = ({ fragmentShader, uniforms }) => {
  return (
    <Canvas className="absolute inset-0 h-full w-full">
      <ShaderMaterial fragmentShader={fragmentShader} uniforms={uniforms} />
    </Canvas>
  );
};

interface ShaderMaterialProps {
  fragmentShader: string;
  uniforms: { [uniform: string]: THREE.IUniform };
}

const ShaderMaterial: React.FC<ShaderMaterialProps> = ({
  fragmentShader,
  uniforms,
}) => {
  const mesh = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        ...uniforms,
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(size.width, size.height) },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: fragmentShader,
    });
  }, [fragmentShader, uniforms, size]);

  useFrame(({ clock }) => {
    if (mesh.current && mesh.current.material instanceof THREE.ShaderMaterial) {
      mesh.current.material.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  useEffect(() => {
    if (mesh.current && mesh.current.material instanceof THREE.ShaderMaterial) {
      mesh.current.material.uniforms.u_resolution.value.set(
        size.width,
        size.height
      );
    }
  }, [size]);

  return (
    <mesh ref={mesh}>
      <planeBufferGeometry args={[2, 2]} />
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  );
};

export default CanvasRevealEffect;
