'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StarsCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Get initial dimensions
    const getViewportDimensions = () => ({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    let { width, height } = getViewportDimensions();
    
    // Create renderer with improved settings
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: window.devicePixelRatio <= 1 // Only use antialiasing on lower DPI screens
    });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    
    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 10;
    
    // Calculate responsive star count based on screen size
    const getStarCount = (w: number, h: number) => {
      const area = w * h;
      const baseCount = 300;
      const scaleFactor = Math.min(area / (1920 * 1080), 2); // Scale based on screen area
      return Math.floor(baseCount * scaleFactor);
    };
    
    // Generate star positions with responsive count
    let starCount = getStarCount(width, height);
    const starGeometry = new THREE.BufferGeometry();
    
    const generateStarPositions = (count: number) => {
      const positions = new Float32Array(count * 3);
      const spread = Math.max(width, height) / 50; // Responsive spread based on screen size
      
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * spread;
      }
      return positions;
    };
    
    const starPositions = generateStarPositions(starCount);
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    
    // Create circular texture using canvas
    const createCircleTexture = () => {
      const size = 64;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d')!;
      
      const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      gradient.addColorStop(0, 'white');
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
      
      return new THREE.CanvasTexture(canvas);
    };
    
    // Create star material with responsive size
    const getStarSize = (w: number, h: number) => {
      const baseSize = 0.25;
      const scaleFactor = Math.min(w / 1920, h / 1080); // Scale based on common desktop resolution
      return Math.max(baseSize * scaleFactor, 0.1); // Minimum size to ensure visibility
    };
    
    const starMaterial = new THREE.PointsMaterial({
      size: getStarSize(width, height),
      map: createCircleTexture(),
      transparent: true,
      alphaTest: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    
    // Animation loop with performance optimization
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Responsive rotation speed based on screen size
      const rotationSpeed = 0.0001;
      stars.rotation.x += rotationSpeed;
      stars.rotation.y += rotationSpeed;
      
      renderer.render(scene, camera);
    };
    animate();
    
    // Enhanced resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const newDimensions = getViewportDimensions();
        width = newDimensions.width;
        height = newDimensions.height;
        
        // Update camera
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        // Update renderer
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Update star material size
        starMaterial.size = getStarSize(width, height);
        starMaterial.needsUpdate = true;
        
        // Optionally regenerate stars for dramatic size changes
        const newStarCount = getStarCount(width, height);
        if (Math.abs(newStarCount - starCount) > 50) {
          starCount = newStarCount;
          const newPositions = generateStarPositions(starCount);
          starGeometry.setAttribute('position', new THREE.BufferAttribute(newPositions, 3));
          starGeometry.attributes.position.needsUpdate = true;
        }
      }, 100); // Debounce resize events
    };
    
    // Listen for resize and orientation change events
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Cleanup function
    return () => {
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      
      // Dispose of Three.js resources
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none bg-black"
      style={{
        display: 'block', // Ensure proper display
        width: '100vw',
        height: '100vh'
      }}
    />
  );
};

export default StarsCanvas;
