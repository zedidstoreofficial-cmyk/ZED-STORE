import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export  function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: false });
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
      },
      vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec2 uResolution;

        float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
        vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
        vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

        float noise(vec3 p){
            vec3 a = floor(p);
            vec3 d = p - a;
            d = d * d * (3.0 - 2.0 * d);

            vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
            vec4 k1 = perm(b.xyxy);
            vec4 k2 = perm(k1.xyxy + b.zzww);

            vec4 c = k2 + a.zzzz;
            vec4 k3 = perm(c);
            vec4 k4 = perm(c + 1.0);

            vec4 o1 = fract(k3 * (1.0 / 41.0));
            vec4 o2 = fract(k4 * (1.0 / 41.0));

            vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
            vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

            return o4.y * d.y + o4.x * (1.0 - d.y);
        }

        const int bayerMatrix[16] = int[](
            0, 8, 2, 10,
            12, 4, 14, 6,
            3, 11, 1, 9,
            15, 7, 13, 5
        );

        int getBayer(int x, int y) {
            return bayerMatrix[x + y * 4];
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / uResolution.xy;
            float t = uTime * 0.15;
            float n1 = noise(vec3(uv.x * 2.0 + t, uv.y * 1.5 - t * 0.5, t));
            float n2 = noise(vec3(uv.x * 6.0 - t * 1.2, uv.y * 3.0, t * 1.5));
            float intensity = (n1 * 0.6 + n2 * 0.4);
            vec2 focalPoint = vec2(0.8, 0.2);
            float dist = distance(uv, focalPoint);
            float glow = smoothstep(1.2, 0.0, dist);
            float luminance = intensity * glow * 1.8;
            float pixelScale = 3.0;
            int dX = int(mod(gl_FragCoord.x / pixelScale, 4.0));
            int dY = int(mod(gl_FragCoord.y / pixelScale, 4.0));
            float ditherThreshold = float(getBayer(dX, dY)) / 16.0;
            float ditheredOutput = step(ditherThreshold, luminance);
            vec3 baseColor = vec3(0.02, 0.025, 0.03);
            vec3 midColor = vec3(0.08, 0.12, 0.15);
            vec3 highlightColor = vec3(0.8, 0.9, 0.95);
            vec3 atmosphericColor = mix(baseColor, midColor, luminance);
            vec3 finalColor = mix(atmosphericColor, highlightColor, ditheredOutput * luminance * 0.5);
            float vignette = smoothstep(1.5, 0.3, length(uv - vec2(0.5)));
            finalColor *= vignette;
            gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      material.uniforms.uResolution.value.set(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      material.uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />;
}
