'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/* ═══════════════════════════════════════════════════════════
   VERTEX SHADER — Three.js compatible
  ═══════════════════════════════════════════════════════════ */
const VERT = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

/* ═══════════════════════════════════════════════════════════
   FRAGMENT SHADER — Hyper-Realistic 3D Volumetric Clouds
 ═══════════════════════════════════════════════════════════ */
const FRAG = `
precision highp float;

uniform vec2  u_res;
uniform float u_time;
uniform float u_flash;
uniform sampler2D u_tex;

/* ── High-quality Value Noise ── */
float h3(vec3 p){
  p = fract(p * vec3(0.1031, 1.1030, 0.0973));
  p += dot(p, p.yzx + 33.33);
  return fract((p.x + p.y) * p.z);
}
float vn(vec3 p){
  vec3 i = floor(p), f = fract(p);
  vec3 u = f*f*(3.0-2.0*f);
  return mix(
    mix(mix(h3(i),h3(i+vec3(1,0,0)),u.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),u.x),u.y),
    mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),u.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),u.x),u.y),u.z);
}

/* ── Storm Wall FBM — More detail for reference match ── */
float fbm(vec3 p){
  float v=0.0, a=0.5, f=1.0;
  p.xz *= 0.6; 
  for(int i=0;i<5;i++){ // Reduced octaves for performance
    v += a * vn(p * f);
    f *= 2.2; a *= 0.47;
    p += v * 0.15; 
  }
  return v;
}

/* ── 3D Density — Heavy Volumetric Feel ── */
float density(vec3 p){
  vec3 p_anim = p + vec3(u_time * 0.15, 0.0, -u_time * 0.7); 
  
  // More complex shelving for that layered look in the reference
  float shelves = sin(p.y * 1.8 + fbm(p_anim * 0.08) * 6.5) * 0.5 + 0.5;
  float noise = fbm(p_anim * 0.22 + shelves * 0.12);
  
  float base = smoothstep(0.5, 4.5, p.y);
  float top = smoothstep(11.5, 7.0, p.y);
  float envelope = base * top;
  
  float d = smoothstep(0.18, 0.85, noise * 0.9 + shelves * 0.15);
  return d * envelope * 6.2;
}

/* ── High-Contrast Shading ── */
const vec3 SUN_DIR = normalize(vec3(0.2, 1.0, 0.3)); 
float shadow(vec3 p){
  float s = 0.4, acc = 0.0;
  for(int i=0; i<5; i++){
    p += SUN_DIR * s;
    acc += density(p) * s;
    s *= 1.45;
  }
  return acc;
}

varying vec2 vUv;

void main(){
  vec2 uv = vUv * 2.0 - 1.0;
  uv.x *= u_res.x / u_res.y;

  // Zoomed in camera
  vec3 ro = vec3(uv.x * 0.5, 2.0, -2.5);
  vec3 rd = normalize(vec3(uv.x * 0.85, uv.y * 0.55 + 0.12, 1.0));

  // --- 1. CLOUD PASS (Ray March) ---
  vec3 bMin = vec3(-40.0, 4.2, -1.0); 
  vec3 bMax = vec3( 40.0, 14.5, 35.0);
  vec3 t0 = (bMin - ro) / rd, t1 = (bMax - ro) / rd;
  float tNear = max(max(min(t0.x, t1.x), min(t0.y, t1.y)), min(t0.z, t1.z));
  float tFar = min(min(max(t0.x, t1.x), max(t0.y, t1.y)), max(t0.z, t1.z));

  vec3 cSum = vec3(0.0);
  float cAlpha = 0.0;
  
  if(tNear < tFar && tFar > 0.0){
    float t = max(tNear, 0.0);
    float dt = (tFar - t) / 24.0; 
    float transmittance = 1.0;
    vec3 cloudBase = vec3(0.35, 0.38, 0.42); 
    vec3 lightEdge = vec3(0.95, 0.98, 1.0) * 1.8; 
    
    for(int i=0; i<24; i++){
      if(transmittance < 0.01) break;
      vec3 p = ro + rd * t;
      float d = density(p);
      if(d > 0.01){
        float sdw = shadow(p);
        float beer = exp(-sdw * 2.2);
        float illumination = beer * 1.4;
        float flash = u_flash * 2.5 * exp(-d * 0.3);
        
        vec3 ambient = mix(vec3(0.3, 0.32, 0.35), vec3(0.75, 0.8, 0.85), clamp((p.y - 4.2)/10.0, 0.0, 1.0));
        vec3 cCol = cloudBase * ambient + lightEdge * illumination * 0.7 + vec3(0.4, 0.6, 1.0) * flash;
        float alpha = d * dt * 0.95;
        cSum += cCol * transmittance * alpha;
        transmittance *= exp(-alpha);
      }
      t += dt;
    }
    cAlpha = 1.0 - transmittance;
  }

  // --- 2. COMPOSITE ---
  gl_FragColor = vec4(cSum, cAlpha);
}
`;

/* ═══════════════════════════════════════════════════════════
   LIGHTNING — 2-D canvas
 ═══════════════════════════════════════════════════════════ */
function genBolt(x1: number, y1: number, x2: number, y2: number, r = 80, d = 0, max = 9): { x: number, y: number }[] {
  if (d >= max) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
  const j = r * Math.pow(0.55, d); // Tapered jitter for more realistic detail
  const mx = (x1 + x2) / 2 + (Math.random() - .5) * j;
  const my = (y1 + y2) / 2 + (Math.random() - .5) * j * 0.4;
  return [...genBolt(x1, y1, mx, my, r, d + 1, max), ...genBolt(mx, my, x2, y2, r, d + 1, max).slice(1)];
}
function drawBolt(ctx: CanvasRenderingContext2D, pts: { x: number, y: number }[], al: number, lw: number, col: string, p = 1) {
  const v = pts.slice(0, Math.max(2, Math.floor(pts.length * p)));
  const passes = [
    { blur: 80, a: .1, lw: lw * 12, col: '#77aaff' },  // Far atmosphere glow
    { blur: 40, a: .2, lw: lw * 6, col: '#99ccff' },   // Mid glow
    { blur: 15, a: .5, lw: lw * 3, col: '#ffffff' },   // Tight glow
    { blur: 2, a: 1, lw: lw * 1, col: '#ffffff' },     // Core
  ];

  for (const pass of passes) {
    ctx.save();
    ctx.globalAlpha = al * pass.a;
    ctx.shadowColor = pass.col;
    ctx.shadowBlur = pass.blur;
    ctx.strokeStyle = pass.col;
    ctx.lineWidth = pass.lw;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(v[0].x, v[0].y);
    for (let i = 1; i < v.length; i++) ctx.lineTo(v[i].x, v[i].y);
    ctx.stroke();
    ctx.restore();
  }
}
function playThunder() {
  try {
    const ac = new AudioContext(), dur = 3.5, sr = ac.sampleRate;
    const buf = ac.createBuffer(1, sr * dur, sr), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++)d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (sr * .8));
    for (let i = 4; i < d.length; i++)d[i] = (d[i] + d[i - 1] * 2 + d[i - 2] * 2 + d[i - 3] + d[i - 4]) / 7;
    const src = ac.createBufferSource(); src.buffer = buf;
    const bpf = ac.createBiquadFilter(); bpf.type = 'bandpass'; bpf.frequency.value = 65; bpf.Q.value = .5;
    const g = ac.createGain(); g.gain.setValueAtTime(0, ac.currentTime);
    g.gain.linearRampToValueAtTime(.78, ac.currentTime + .06);
    g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + dur);
    src.connect(bpf); bpf.connect(g); g.connect(ac.destination); src.start();
    setTimeout(() => ac.close(), (dur + .5) * 1000);
  } catch (e) { }
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lCanvasRef = useRef<HTMLCanvasElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const lCanvas = lCanvasRef.current;
    if (!lCanvas) return;

    /* ── Three.js setup ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060a14, 0.0005); // Much more subtle fog to prevent blurriness

    const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 4000);
    camera.position.set(0, 40, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.setClearColor(0x060a14);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    /* ── Cloud Plane ── */
    const cloudGeo = new THREE.PlaneGeometry(1500, 1000);
    const cloudUniforms = {
      u_res: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      u_time: { value: 0 },
      u_flash: { value: 0 }
    };
    const cloudMat = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: cloudUniforms,
      transparent: true,
      depthWrite: false,
    });
    const cloudPlane = new THREE.Mesh(cloudGeo, cloudMat);
    cloudPlane.position.z = -150;
    scene.add(cloudPlane);

    /* ── Lights ── */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Lower ambient to prevent washing out colors
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    scene.add(hemiLight);

    // Stronger sunlight for reflections
    const sunLight = new THREE.DirectionalLight(0xffffff, 5.0);
    sunLight.position.set(100, 100, 100);
    scene.add(sunLight);

    const backLight = new THREE.DirectionalLight(0x88bfff, 3.0);
    backLight.position.set(-100, 50, -100);
    scene.add(backLight);

    const lightningLight = new THREE.PointLight(0x88bfff, 0, 200);
    lightningLight.position.set(0, 20, -10);
    scene.add(lightningLight);

    /* ── Load City GLB ── */
    const manager = new THREE.LoadingManager();
    manager.setURLModifier((url) => {
      // Intercept missing texture reference from model.glb to prevent console error
      if (url.includes('__Metal_Silver_1.jpg')) {
        // Return a 1x1 transparent PNG data URI
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      }
      return url;
    });
    const loader = new GLTFLoader(manager);

    loader.load('/images/future_city_1.glb', (gltf) => {
      console.log('City model loaded successfully');
      const city = gltf.scene;

      city.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.side = THREE.DoubleSide;

          // Re-enable original GLB colors and metalness for that "shine"
          if (material.map) material.map.anisotropy = 16;
          material.envMapIntensity = 2.5;
        }
      });

      const box = new THREE.Box3().setFromObject(city);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.z);
      const scale = 240 / maxDim;
      city.scale.set(scale, scale * 0.9, scale);

      city.position.set(0, -16, -45);
      scene.add(city);

      const leftCity = city.clone();
      leftCity.position.x = -220;
      scene.add(leftCity);

      const rightCity = city.clone();
      rightCity.position.x = 220;
      scene.add(rightCity);
    },
      undefined,
      (error) => console.error('Error loading city.glb:', error));

    /* ── Load Model GLB ── */
    loader.load('/images/LA.glb', (gltf) => {
      const la = gltf.scene;

      la.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;

          // Crucial fix: some GLBs have embedded vertex colors that override materials 
          // and cause weird static/dots. We must delete them.
          if (mesh.geometry && mesh.geometry.attributes.color) {
            mesh.geometry.deleteAttribute('color');
          }

          // Obliterate whatever complex/multi-materials were packed into the GLB 
          // and forcefully apply a brand new, pure solid copper material to everything.
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0xcc6633, // Rich copper base
            metalness: 0.9,  // Never set to 1 without an HDRI, or it reflects white!
            roughness: 0.1, // Smooth but not a perfect mirror
            emissive: 0xb85020, // Subtle warm glow
            emissiveIntensity: 0.4
          });
        }
      });

      // Position it on the top of the focal building roof
      // Based on the camera target (0, 36, -60)
      // Increase scale for visibility in the new city
      la.scale.set(3.8, 3.8, 3.8); // Reduced from 5.0 to 3.8 for medium size
      la.position.set(0, 50, 52); // Moved even closer to 15
      scene.add(la);

      // Add a small point light at the tip of the LA for effect
      const laLight = new THREE.PointLight(0xd98645, 2, 10); // Warm copper-ish aura
      laLight.position.set(0, 55, 52); // Matched with the new model position
      scene.add(laLight);

      console.log('Model loaded and positioned on roof');
      (window as any).laModel = la;
      (window as any).laLight = laLight;
    },
      undefined,
      (error) => console.error('Error loading model.glb:', error));

    /* ── Click to Place ── */
    const raycaster = new THREE.Raycaster();
    const clickMouse = new THREE.Vector2();
    const onClick = (e: MouseEvent) => {
      clickMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      clickMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(clickMouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      const hit = intersects.find(i => {
        let obj: any = i.object;
        while (obj) {
          if (obj === (window as any).laModel || obj.type === 'Scene') return false;
          obj = obj.parent;
        }
        return true;
      });
      if (hit && (window as any).laModel && (window as any).laLight) {
        const laObj = (window as any).laModel;
        const lightObj = (window as any).laLight;
        laObj.position.copy(hit.point);
        lightObj.position.copy(hit.point);
        lightObj.position.y += 6;
        alert(`Model placed on roof!\nCoordinates:\nX=${hit.point.x.toFixed(2)}, Y=${hit.point.y.toFixed(2)}, Z=${hit.point.z.toFixed(2)}\n\nPlease tell me these coordinates so I can lock it in permanently!`);
      }
    };
    window.addEventListener('click', onClick);

    /* ── Mouse Parallax ── */
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const resize = () => {
      const W = window.innerWidth, H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
      cloudUniforms.u_res.value.set(W, H);
      lCanvas.width = W; lCanvas.height = H;
    };
    window.addEventListener('resize', resize);
    resize();

    /* ── Lightning logic ── */
    const lCtx = lCanvas.getContext('2d')!;
    interface Strike {
      pts: { x: number, y: number }[]; branches: { pts: { x: number, y: number }[]; w: number }[];
      ox: number; oy: number; phase: 'leader' | 'return' | 'fade'; prog: number; col: string;
    }
    let strike: Strike | null = null;
    let lFlash = 0;
    const setFlash = (v: number) => {
      if (flashRef.current) flashRef.current.style.opacity = String(v);
      cloudUniforms.u_flash.value = v;
      lightningLight.intensity = v * 200;
      ambientLight.intensity = 1.5 + v * 8.0;
      
      // Flash the LA model's tip light as well
      if ((window as any).laLight) {
        (window as any).laLight.intensity = 2 + v * 150;
      }
    };

    const newStrike = () => {
      const W = lCanvas.width, H = lCanvas.height;
      const ox = W * .12 + Math.random() * W * .76, oy = H * .16 + Math.random() * H * .10;

      let tx = ox + (Math.random() - .5) * W * .34;
      let ty = H * .50 + Math.random() * H * .36;

      // Make the thunder drop directly on the LA model
      if ((window as any).laModel) {
        const laObj = (window as any).laModel;
        
        // Calculate the highest point among all meshes in the model for precision
        let maxY = -Infinity;
        let centerX = 0;
        let centerZ = 0;

        laObj.traverse((child: any) => {
          if (child.isMesh && child.geometry) {
            if (!child.geometry.boundingBox) child.geometry.computeBoundingBox();
            const worldBox = new THREE.Box3().copy(child.geometry.boundingBox).applyMatrix4(child.matrixWorld);
            if (worldBox.max.y > maxY) {
              maxY = worldBox.max.y;
              centerX = (worldBox.min.x + worldBox.max.x) / 2;
              centerZ = (worldBox.min.z + worldBox.max.z) / 2;
            }
          }
        });

        const tipPos = new THREE.Vector3(centerX, maxY, centerZ);

        // Make the point light snap precisely to this tip
        if ((window as any).laLight) {
          (window as any).laLight.position.copy(tipPos);
        }

        tipPos.project(camera);

        // Only strike if it's on screen (in front of camera)
        if (tipPos.z < 1.0) {
          tx = (tipPos.x * 0.5 + 0.5) * W;
          ty = (-(tipPos.y * 0.5) + 0.5) * H;
        }
      }

      const pts = genBolt(ox, oy, tx, ty, 74, 0, 8);
      const col = ['#88bfff', '#aad4ff', '#c4e2ff'][Math.floor(Math.random() * 3)];
      const branches: { pts: { x: number, y: number }[]; w: number }[] = [];
      for (let b = 0; b < 1 + Math.floor(Math.random() * 2); b++) {
        const si = Math.floor(pts.length * (.18 + Math.random() * .48));
        const sp = pts[Math.min(si, pts.length - 1)];
        branches.push({ pts: genBolt(sp.x, sp.y, sp.x + (Math.random() - .5) * W * .24, sp.y + Math.random() * (ty - sp.y) * .85, 40, 0, 6), w: .4 + Math.random() * .9 });
      }
      strike = { pts, branches, ox, oy, phase: 'leader', prog: 0, col };
      setTimeout(playThunder, 400 + Math.random() * 300);
    };
    const schedule = () => setTimeout(() => { if (!strike) newStrike(); timerRef.current = schedule(); }, 3500 + Math.random() * 2000);
    const timerRef = { current: schedule() };

    /* ── Render loop ── */
    const LEADER = 0.05, RETURN = 0.22, FADE = 0.07;
    const startTime = performance.now();
    let raf: number;
    let paused = false;
    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (paused) return;
      const elapsed = (now - startTime) / 1000;

      // --- FIXED CAMERA (No Scroll) ---
      const baseX = mouseX * 2;
      const baseY = 55; // Lowered further to 55
      const baseZ = 85; // Keeping the closer zoom
      
      const targetX = 0;
      const targetY = 50; // Look at model center
      const targetZ = 52; // Model Z pos

      camera.position.x += (baseX - camera.position.x) * 0.04;
      camera.position.y += (baseY - camera.position.y) * 0.04;
      camera.position.z += (baseZ - camera.position.z) * 0.04;

      camera.lookAt(targetX, targetY, targetZ);

      cloudUniforms.u_time.value = elapsed;
      renderer.render(scene, camera);

      /* ── 2D Lightning ── */
      lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height);
      if (strike) {
        const s = strike;
        if (s.phase === 'leader') {
          s.prog = Math.min(1, s.prog + LEADER);
          lFlash = s.prog * .08; setFlash(lFlash * .05);
          drawBolt(lCtx, s.pts, s.prog * .26, 1, s.col, s.prog);
          for (const br of s.branches) drawBolt(lCtx, br.pts, s.prog * .16, br.w * .6, s.col, s.prog);
          if (s.prog >= 1) { s.phase = 'return'; s.prog = 0; }
        } else if (s.phase === 'return') {
          s.prog = Math.min(1, s.prog + RETURN);
          lFlash = s.prog < .3 ? s.prog / .3 : 1 - (s.prog - .3) / .7;
          setFlash(lFlash * .42);
          const W = lCanvas.width, H = lCanvas.height;
          const grd = lCtx.createRadialGradient(s.ox, s.oy, 0, s.ox, s.oy, W * .40);
          grd.addColorStop(0, `rgba(120,175,255,${lFlash * .28})`); grd.addColorStop(1, 'transparent');
          lCtx.save(); lCtx.fillStyle = grd; lCtx.fillRect(0, 0, W, H); lCtx.restore();
          const tip = s.pts[s.pts.length - 1];
          const g2 = lCtx.createRadialGradient(tip.x, tip.y, 0, tip.x, tip.y, 80);
          g2.addColorStop(0, `rgba(180,215,255,${lFlash * .40})`); g2.addColorStop(1, 'transparent');
          lCtx.save(); lCtx.fillStyle = g2; lCtx.fillRect(0, 0, W, H); lCtx.restore();
          drawBolt(lCtx, s.pts, lFlash, 2.8, s.col);
          for (const br of s.branches) drawBolt(lCtx, br.pts, lFlash * .78, br.w * 1.3, s.col);
          if (s.prog >= 1) { s.phase = 'fade'; s.prog = 0; }
        } else {
          s.prog = Math.min(1, s.prog + FADE);
          lFlash = Math.max(0, lFlash - .06);
          setFlash(lFlash * .10);
          if (s.prog > .62 && s.prog < .76) { lFlash = .20; drawBolt(lCtx, s.pts, .28, 1.6, s.col); setFlash(.07); }
          if (lFlash <= 0 && s.prog >= 1) { strike = null; lCtx.clearRect(0, 0, lCanvas.width, lCanvas.height); setFlash(0); }
        }
      } else { lFlash = Math.max(0, lFlash - .04); setFlash(lFlash); }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timerRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('visibilitychange', onVisibility);
      container.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative h-screen bg-[#060a14]">
      {/* Sticky container for the 3D scene */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none" />

        {/* Lightning canvas */}
        <canvas ref={lCanvasRef}
          style={{ position: 'absolute', inset: 0, zIndex: 20, width: '100%', height: '100%', pointerEvents: 'none' }} />

        {/* Full-scene lightning flash overlay */}
        <div ref={flashRef}
          style={{
            position: 'absolute', inset: 0, zIndex: 50, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 0%,rgba(155,200,255,0.95) 0%,rgba(90,145,255,0.38) 42%,transparent 72%)',
            opacity: 0, transition: 'opacity 0.03s ease-out',
          }} />

      </div>
    </section>
  );
}
