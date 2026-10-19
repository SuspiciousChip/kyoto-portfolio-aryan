import { useEffect, useRef } from "react";
import * as THREE from "three";

const BASE =
  "https://ublctyddhtbgaersvxxb.supabase.co/storage/v1/object/public/threeui-media/scene-images/35388445965f970fa28af333/";

const LAYERS = [
  { src: "temple-wall.webp", z: -14, y: 0, scale: 18, oy: 0.15 },
  { src: "hill.webp", z: -10, y: -1, scale: 14, oy: 0.3 },
  { src: "shrine-ruins.webp", z: -7, y: 0, scale: 11, oy: 0.4 },
  { src: "pine-tree.webp", z: -4, y: 0, scale: 8, oy: 0.6 },
  { src: "stone-lantern.webp", z: -1.5, y: -1.5, scale: 5, oy: 0.8 },
  { src: "garden-bush.webp", z: 0, y: -1, scale: 6, oy: 0.9 },
  { src: "basalt-stones.webp", z: 1, y: -0.5, scale: 5, oy: 1.0 },
  { src: "tall-grass.webp", z: 2.5, y: -0.5, scale: 7, oy: 1.1 },
  { src: "maple-leaves.webp", z: 4, y: 2, scale: 5, oy: 1.3 },
  { src: "sakura-branch.webp", z: 5, y: 1.8, scale: 5, oy: 1.5 },
];

export default function KageScene({ onProgress, onLoaded }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x06090e, 3, 22);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    // Vermilion moon
    const moon = new THREE.Mesh(
      new THREE.CircleGeometry(2.2, 64),
      new THREE.MeshBasicMaterial({ color: 0x7a1a1a, transparent: true, opacity: 0.35 })
    );
    moon.position.set(0.5, 1.5, -15);
    scene.add(moon);

    const moonGlow = new THREE.Mesh(
      new THREE.CircleGeometry(4.5, 64),
      new THREE.MeshBasicMaterial({ color: 0x7a1a1a, transparent: true, opacity: 0.08 })
    );
    moonGlow.position.set(0.5, 1.5, -16);
    scene.add(moonGlow);

    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    const meshes = [];
    let loaded = 0;
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      if (onLoaded) onLoaded();
    };

    LAYERS.forEach((layer) => {
      loader.load(
        BASE + layer.src,
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          const aspect =
            tex.image.width && tex.image.height ? tex.image.height / tex.image.width : 1;
          const mat = new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 0.82,
            depthWrite: false,
          });
          const geo = new THREE.PlaneGeometry(layer.scale, layer.scale * aspect);
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(0, layer.y, layer.z);
          mesh.userData = { ...layer, baseY: layer.y };
          scene.add(mesh);
          meshes.push(mesh);

          loaded++;
          if (onProgress) onProgress(loaded / LAYERS.length);
          if (loaded === LAYERS.length) finish();
        },
        undefined,
        () => {
          loaded++;
          if (onProgress) onProgress(loaded / LAYERS.length);
          if (loaded === LAYERS.length) finish();
        }
      );
    });

    const fallback = setTimeout(finish, 4000);

    let scrollY = 0;
    let targetScrollY = 0;
    let mouseX = 0,
      mouseY = 0;
    let targetMouseX = 0,
      targetMouseY = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onMouse = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const clock = new THREE.Clock();
    let raf;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      scrollY += (targetScrollY - scrollY) * 0.06;
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;

      const sf = 0.0028;
      camera.position.y = scrollY * sf + mouseY * 0.25;
      camera.position.x = mouseX * 0.35;
      camera.lookAt(0, scrollY * sf, 0);

      meshes.forEach((m) => {
        const ud = m.userData;
        m.position.y = ud.baseY + Math.sin(t * 0.4 + ud.z) * 0.06 * ud.oy;
        m.position.x = Math.cos(t * 0.3 + ud.z * 1.5) * 0.03 * ud.oy;
      });

      moonGlow.material.opacity = 0.06 + Math.sin(t * 0.5) * 0.025;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fallback);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      meshes.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}