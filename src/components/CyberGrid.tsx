import React, { useEffect, useRef } from 'react';

export function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // Grid parameters
    const horizonY = height * 0.5; // Horizon at center
    const fov = 300; // Field of view
    const speed = 2; // Base speed
    let offsetZ = 0; // Movement offset

    // Floating objects
    const shapes: { x: number; y: number; z: number; type: 'cube' | 'pyramid'; rotation: number }[] = [];
    for(let i=0; i<20; i++) {
        shapes.push({
            x: (Math.random() - 0.5) * width * 2,
            y: (Math.random() - 0.5) * height * 2,
            z: Math.random() * 2000 + 500,
            type: Math.random() > 0.5 ? 'cube' : 'pyramid',
            rotation: Math.random() * Math.PI * 2
        });
    }

    let animationFrameId: number;

    const draw = () => {
      // Clear with fade effect for trails? No, clean clear for crisp lines
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, '#050505');
      gradient.addColorStop(0.5, '#1a1a1a'); // Horizon glow
      gradient.addColorStop(1, '#050505');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const scrollY = window.scrollY;
      const scrollSpeed = 1 + scrollY * 0.005; // Speed up on scroll
      offsetZ = (offsetZ + speed * scrollSpeed) % 200;

      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;

      // Draw Floor Grid
      // Vertical lines
      for (let x = -width; x < width * 2; x += 100) {
        ctx.beginPath();
        // Perspective projection
        // x_screen = (x_world / z_world) * fov + center_x
        // We want lines to converge to center
        
        // Simple perspective: line from bottom to center
        // But we want a floor.
        // Floor is y > horizonY
        
        // Let's use a simpler 3D projection for lines
        // Point 1: at z=near, x=x
        // Point 2: at z=far, x=x
        
        const x1 = (x - width/2) * (fov / 100) + width/2; // Near
        const y1 = height;
        
        const x2 = width/2; // Far (vanishing point)
        const y2 = horizonY;
        
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Horizontal lines (moving)
      for (let z = 0; z < 2000; z += 200) {
        const currentZ = z - offsetZ;
        if (currentZ <= 0) continue; // Behind camera
        
        // Project z to y
        // y_screen = (y_world / z_world) * fov + center_y
        // Floor is at y_world = 200 (arbitrary)
        const yWorld = 200;
        const projectedY = (yWorld / currentZ) * fov + horizonY;
        
        if (projectedY > height || projectedY < horizonY) continue;

        ctx.beginPath();
        ctx.moveTo(0, projectedY);
        ctx.lineTo(width, projectedY);
        ctx.stroke();
      }

      // Draw Ceiling Grid (Mirror of floor)
      for (let z = 0; z < 2000; z += 200) {
        const currentZ = z - offsetZ;
        if (currentZ <= 0) continue;
        
        const yWorld = -200; // Ceiling
        const projectedY = (yWorld / currentZ) * fov + horizonY;
        
        if (projectedY < 0 || projectedY > horizonY) continue;

        ctx.beginPath();
        ctx.moveTo(0, projectedY);
        ctx.lineTo(width, projectedY);
        ctx.stroke();
      }
      
      // Draw Floating Shapes
      shapes.forEach(shape => {
          // Move shape towards camera
          shape.z -= speed * scrollSpeed;
          if (shape.z < 100) shape.z = 2500; // Reset to far
          
          // Rotate shape
          shape.rotation += 0.01;
          
          const scale = fov / shape.z;
          const x2d = shape.x * scale + width/2;
          const y2d = shape.y * scale + horizonY;
          const size = 50 * scale;
          
          ctx.save();
          ctx.translate(x2d, y2d);
          ctx.rotate(shape.rotation + scrollY * 0.002);
          
          ctx.strokeStyle = '#ffffff';
          ctx.globalAlpha = Math.min(1, scale * 2); // Fade in/out
          ctx.lineWidth = 2;
          
          if (shape.type === 'cube') {
              ctx.strokeRect(-size/2, -size/2, size, size);
          } else {
              ctx.beginPath();
              ctx.moveTo(0, -size/2);
              ctx.lineTo(size/2, size/2);
              ctx.lineTo(-size/2, size/2);
              ctx.closePath();
              ctx.stroke();
          }
          
          ctx.restore();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
    />
  );
}
