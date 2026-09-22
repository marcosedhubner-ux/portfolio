"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Ambient WebGL backdrop: a sparse node graph drifting in slow 3D space,
 * with lines connecting nearby nodes. Reads as a systems/network motif
 * (fitting a backend-leaning portfolio) rather than a decorative particle
 * blast — low density, low opacity, additive glow, gentle mouse parallax.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const isSmall = width < 640;
    const COUNT = isSmall ? 60 : 130;
    const LINK_DIST = isSmall ? 3.4 : 4.2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    const positions = new Float32Array(COUNT * 3);
    const velocities: [number, number, number][] = [];
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 34;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
      velocities.push([
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
        (Math.random() - 0.5) * 0.004,
      ]);
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointMaterial = new THREE.PointsMaterial({
      color: 0x9db6ff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const points = new THREE.Points(pointGeometry, pointMaterial);
    scene.add(points);

    const maxLines = COUNT * 6;
    const linePositions = new Float32Array(maxLines * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5b7fe0,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const mouse = { x: 0, y: 0 };
    function onMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener("mousemove", onMouseMove);

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", onResize);

    let running = true;
    function onVisibility() {
      running = document.visibilityState === "visible";
    }
    document.addEventListener("visibilitychange", onVisibility);

    let frameId: number;

    function animate() {
      frameId = requestAnimationFrame(animate);
      if (!running) return;

      const posAttr = pointGeometry.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < COUNT; i++) {
        const v = velocities[i];
        arr[i * 3] += v[0];
        arr[i * 3 + 1] += v[1];
        arr[i * 3 + 2] += v[2];
        if (Math.abs(arr[i * 3]) > 17) v[0] *= -1;
        if (Math.abs(arr[i * 3 + 1]) > 10) v[1] *= -1;
        if (Math.abs(arr[i * 3 + 2]) > 7) v[2] *= -1;
      }
      posAttr.needsUpdate = true;

      let lineIdx = 0;
      const threshold = LINK_DIST * LINK_DIST;
      for (let i = 0; i < COUNT && lineIdx < maxLines; i++) {
        for (let j = i + 1; j < COUNT && lineIdx < maxLines; j++) {
          const dx = arr[i * 3] - arr[j * 3];
          const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
          const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;
          if (distSq < threshold) {
            const base = lineIdx * 6;
            linePositions[base] = arr[i * 3];
            linePositions[base + 1] = arr[i * 3 + 1];
            linePositions[base + 2] = arr[i * 3 + 2];
            linePositions[base + 3] = arr[j * 3];
            linePositions[base + 4] = arr[j * 3 + 1];
            linePositions[base + 5] = arr[j * 3 + 2];
            lineIdx++;
          }
        }
      }
      (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIdx * 2);

      camera.position.x += (mouse.x * 2.2 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 1.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      pointGeometry.dispose();
      pointMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 opacity-70"
      style={{ zIndex: -1 }}
    />
  );
}
