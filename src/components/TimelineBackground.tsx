import React, { useEffect, useRef } from 'react';

const TimelineBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;
        
        let width, height;
        let time = 0;

        const blocks = [
            { t: 40, l: 20,  w: 20, h: 9, r: 218, g: 178, b: 239 },
            { t: 55, l: 40, w: 20, h: 9, r: 245, g: 184, b: 103 },
            { t: 70, l: 60, w: 20, h: 9, r: 128, g: 178, b: 255 }
        ];

        function resize() {
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);
        }

        window.addEventListener('resize', resize);
        resize();

        function drawPixelFade(x: number, y: number, w: number, h: number, r: number, g: number, b: number) {
            const solidPct = 0.35;
            const solidW = w * solidPct;
            const fadeW = w * (1 - solidPct);
            
            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.fillRect(x, y, solidW, h);

            const blockSize = Math.max(6, Math.floor(h / 8));
            const cols = Math.ceil(fadeW / blockSize);
            const rows = Math.ceil(h / blockSize);

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const px = x + solidW + col * blockSize;
                    const py = y + row * blockSize;
                    
                    let normalizedDist = col / cols;
                    let noise = Math.sin(col * 12.9898 + row * 78.233 + time * 0.05) * 43758.5453;
                    noise = noise - Math.floor(noise); 
                    
                    let alpha = 1.0 - (normalizedDist * 1.2);
                    alpha += (noise - 0.5) * 0.4; 
                    let shimmer = Math.sin(time * 0.02 + col * 0.2 + row * 0.5) * 0.15;
                    alpha += shimmer;

                    alpha = Math.max(0, Math.min(1, alpha));

                    if (alpha > 0.05) {
                        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
                        ctx.fillRect(px, py, blockSize + 0.5, blockSize + 0.5);
                    }
                }
            }
        }

        function animate() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            
            blocks.forEach(b => {
                const px = (b.l / 100) * width;
                const py = (b.t / 100) * height;
                const pw = (b.w / 100) * width;
                const ph = (b.h / 100) * height;
                
                drawPixelFade(px, py, pw, ph, b.r, b.g, b.b);
            });

            time++;
            requestAnimationFrame(animate);
        }

        animate();
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full" />;
};

export default TimelineBackground;
