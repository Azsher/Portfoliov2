'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeTunnelProps {
  isDark: boolean;
}

export default function ThreeTunnel({ isDark }: ThreeTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || 500;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark ? 0x0a0a0a : 0xfcfcfc, 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 100;

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(isDark ? 0x0a0a0a : 0xfcfcfc, 0);
    containerRef.current.appendChild(renderer.domElement);

    // 3. TUNNEL GEOMETRY (Curve & Tube)
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 50; i++) {
      points.push(new THREE.Vector3(
        Math.sin(i * 0.1) * 8,
        Math.cos(i * 0.1) * 8,
        i * 12
      ));
    }

    const curve = new THREE.CatmullRomCurve3(points);
    const geometry = new THREE.TubeGeometry(curve, 100, 4.5, 12, false);

    // Wireframe Material reflecting Geometric Balance
    const color = isDark ? 0x2a2a2a : 0xcccccc;
    const material = new THREE.MeshBasicMaterial({
      color: color,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const tunnel = new THREE.Mesh(geometry, material);
    scene.add(tunnel);

    // Add glowing points along the tunnel lines
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1500;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Generate particles along the tube
      const t = Math.random();
      const point = curve.getPoint(t);
      const normal = curve.getTangent(t).cross(new THREE.Vector3(0, 1, 0)).normalize();
      const angle = Math.random() * Math.PI * 2;
      
      const radius = 4.2 + Math.random() * 0.5;
      positions[i] = point.x + Math.sin(angle) * normal.x * radius;
      positions[i + 1] = point.y + Math.cos(angle) * normal.y * radius;
      positions[i + 2] = point.z;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: isDark ? 0xffffff : 0x222222,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. ANIMATION LOOP
    let animId: number;
    let progress = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Travel down the tunnel
      progress += 0.0006;
      if (progress > 1) progress = 0;

      // Update camera along the curve
      const camPos = curve.getPointAt(progress);
      const lookAtPos = curve.getPointAt((progress + 0.02) % 1);
      
      camera.position.copy(camPos);
      camera.lookAt(lookAtPos);

      // Rotate tunnel slightly for dynamics
      tunnel.rotation.z += 0.002;
      particles.rotation.z -= 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // 5. WINDOW RESIZE
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 6. CLEANUP
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (containerRef.current && renderer.domElement) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
