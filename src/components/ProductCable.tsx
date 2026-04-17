'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ProductCable() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();

    // Adjusted FOV and position to be more resilient to narrow containers
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 15); // Slightly closer

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(container.clientWidth || 300, container.clientHeight || 800);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // ... (rest of points and texture code)

    // Create a straighter, industrial cable path
    const points = [];
    const height = 30;
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      const y = (i / segments) * height - height / 2;
      const x = 0; // No left/right movement — perfectly straight
      const z = 0;
      points.push(new THREE.Vector3(x, y, z));
    }

    // Create a high-resolution CanvasTexture for the text AND SURFACE TEXTURE
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 2048; // Taller to fit long text along the length
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#15803d'; // Global insulation color
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- Create Industrial Braided/Twisted Texture ---
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 4;
      const spacing = 16;
      for (let i = -canvas.height; i < canvas.width + canvas.height; i += spacing) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + canvas.height, canvas.height); ctx.stroke();
      }

      // --- Create Industrial Braided/Twisted Texture ---
    }
    const baseTexture = new THREE.CanvasTexture(canvas);
    baseTexture.wrapS = THREE.RepeatWrapping;
    baseTexture.wrapT = THREE.RepeatWrapping;
    baseTexture.anisotropy = 16;
    baseTexture.repeat.set(2, 20); // Repeat tightly across the 30-unit tube
    baseTexture.colorSpace = THREE.SRGBColorSpace;
    baseTexture.needsUpdate = true;

    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 100, 0.20, 32, false);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: baseTexture,
      bumpMap: baseTexture, // Subtly bump the braid lines
      bumpScale: 0.05,
      metalness: 0.1, 
      roughness: 0.6,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
    });

    const cable = new THREE.Mesh(geometry, material);
    scene.add(cable);

    // --- SARA EARTHING TEXT OVERLAY (Printed seamlessly on the cable) ---
    // Using an overlay cylinder so it prints exactly once without stretching the repeating base
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 512;
    textCanvas.height = 4096; // Long canvas to fit sharp text vertically
    const tCtx = textCanvas.getContext('2d');
    if (tCtx) {
      // Completely transparent background
      tCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
      
      tCtx.fillStyle = '#ffffff'; // Pristine White Text as per the image
      tCtx.font = 'bold 200px Georgia, "Times New Roman", serif'; // Classic serif font
      tCtx.textAlign = 'center';
      tCtx.textBaseline = 'middle';
      
      tCtx.save();
      // Translate to center, rotate to draw downwards
      tCtx.translate(textCanvas.width / 2, textCanvas.height / 2);
      tCtx.rotate(Math.PI / 2); // Text reads from top down
      
      // Offset positive X to shift the text heavily towards the bottom of the canvas (near the copper core)
      const textToDraw = 'Sara Earthing';
      tCtx.fillText(textToDraw, 1000, 0); // 1000 pixels down!
      tCtx.restore();
    }
    const textTexture = new THREE.CanvasTexture(textCanvas);
    textTexture.colorSpace = THREE.SRGBColorSpace;
    textTexture.anisotropy = 16;
    textTexture.needsUpdate = true;

    // Cylinder overlay that slightly hugs the cable (0.201 radius vs 0.20 base)
    const textLength = 12; // Adjusted length to fit the serif text beautifully
    const overlayGeo = new THREE.CylinderGeometry(0.201, 0.201, textLength, 32); 
    const overlayMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      map: textTexture,
      transparent: true, // Invisible background!
      alphaTest: 0.1,    // Cuts out background sharply without blending issues
      roughness: 0.5,
      metalness: 0,
      clearcoat: 0.5,
    });
    const overlayMesh = new THREE.Mesh(overlayGeo, overlayMat);

    // Position it at the BOTTOM of the cable right above the copper core
    // Total cable length is 30. Bottom is at y = -15.
    // So the bottom edge of overlay (length 12) should be at y = -15.
    // Cylinder origin is in the middle, so center is at: -15 + 12/2 = -9.
    overlayMesh.position.y = -9;
    
    // Rotate firmly so the text faces camera
    overlayMesh.rotation.y = Math.PI; 
    cable.add(overlayMesh);

    // Add Copper Core "Caps" for industrial realism - PARENTED to cable
    const coreGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.6, 16);
    const coreMat = new THREE.MeshStandardMaterial({ color: 0xb87333, metalness: 1, roughness: 0.2 });

    const topCore = new THREE.Mesh(coreGeo, coreMat);
    topCore.position.copy(points[points.length - 1]);
    cable.add(topCore);

    const bottomCore = new THREE.Mesh(coreGeo, coreMat);
    bottomCore.position.copy(points[0]);
    // Push the raw copper out slightly so it protrudes well
    bottomCore.position.y -= 0.1;
    cable.add(bottomCore);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xffffff, 100);
    keyLight.position.set(10, 10, 10);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xffffff, 50);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    let scrollY = 0;
    let progress = 0;
    const onScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const winH = window.innerHeight;

      // Super slow descent: Start when section is comfortably in view (60%)
      const startTrigger = winH * 0.6;
      const endTrigger = winH * -1.5;
      const range = startTrigger - endTrigger;

      progress = Math.min(1, Math.max(0, (startTrigger - rect.top) / range));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const animate = () => {
      const raf = requestAnimationFrame(animate);

      // Entrance Animation: Cable comes down from above (progress: 0 to 1)
      const entranceY = 20 * (1 - progress);

      // Apply entrance offset - children follow automatically
      cable.position.y = entranceY;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      overlayGeo.dispose();
      overlayMat.dispose();
      baseTexture.dispose();
      textTexture.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div ref={containerRef} className="w-full h-full z-10" />
    </div>
  );
}
