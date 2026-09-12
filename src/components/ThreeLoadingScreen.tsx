import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowRight, Volume2, VolumeX, Clapperboard, Sparkles } from "lucide-react";

export interface ThreeLoadingScreenProps {
  /** Target progress (0 to 100). If not provided or if autoSimulate is true, simulates progress */
  progress?: number;
  /** Whether to simulate progress smoothly from 0 to 100 */
  autoSimulate?: boolean;
  /** Speed multiplier for simulation */
  simulationDurationMs?: number;
  /** Callback when loading reaches 100% and finishes */
  onComplete?: () => void;
  /** Text to display prominently */
  displayText?: string;
  /** Fullscreen overlay */
  fullscreen?: boolean;
  /** Callback to skip directly */
  onRedirect?: () => void;
  /** Optional redirect URL */
  redirectUrl?: string;
  /** Custom status or subtitle */
  subtitle?: string;
  /** Legacy props compatibility */
  title?: string;
  showControls?: boolean;
  statusMessage?: string;
}

// 12 High-Impact Marvel-style Mathematical Comic Panels
const COMIC_PANEL_DATA = [
  {
    issue: "ISSUE #01 • THE CALCULUS PROTOCOL",
    caption: "DISCOVER THE TANGENT!",
    formula: "f'(x) = lim_{h→0} [f(x+h) - f(x)] / h",
    quote: "CALCULUS ASSEMBLE!",
    bg: "#b91c1c",
    accent: "#fca5a5",
    type: "curve",
  },
  {
    issue: "ISSUE #02 • THE GAUSSIAN DEFENDERS",
    caption: "AREA UNDER THE CURVE",
    formula: "∫_{-∞}^{∞} e^{-x²} dx = √π",
    quote: "INTEGRAL UNLEASHED!",
    bg: "#1d4ed8",
    accent: "#93c5fd",
    type: "integral",
  },
  {
    issue: "ISSUE #03 • THE GOLDEN RATIO SAGA",
    caption: "THE DIVINE PROPORTION",
    formula: "φ = (1 + √5) / 2 = 1.618033...",
    quote: "FIBONACCI FOREVER!",
    bg: "#b45309",
    accent: "#fde047",
    type: "spiral",
  },
  {
    issue: "ISSUE #04 • EULER'S SECRET IDENTITY",
    caption: "MOST BEAUTIFUL EQUATION",
    formula: "e^{iπ} + 1 = 0",
    quote: "Q.E.D.!",
    bg: "#6d28d9",
    accent: "#d8b4fe",
    type: "euler",
  },
  {
    issue: "ISSUE #05 • MATRIX INVASION",
    caption: "EIGENVALUES & VECTORS",
    formula: "det(A - λI) = 0",
    quote: "TRANSFORMATION COMPLETE!",
    bg: "#047857",
    accent: "#6ee7b7",
    type: "matrix",
  },
  {
    issue: "ISSUE #06 • 4D HYPERSPACE EXPEDITION",
    caption: "TESSERACT PROJECTION",
    formula: "V_4 = (1/2)π² r⁴",
    quote: "BEYOND THREE DIMENSIONS!",
    bg: "#0e7490",
    accent: "#67e8f9",
    type: "cube",
  },
  {
    issue: "ISSUE #07 • TRIGONOMETRIC RECKONING",
    caption: "UNIT CIRCLE SYMMETRY",
    formula: "sin²(θ) + cos²(θ) = 1",
    quote: "HARMONIC WAVE OSCILLATION!",
    bg: "#c2410c",
    accent: "#fdba74",
    type: "trig",
  },
  {
    issue: "ISSUE #08 • SIGMA STANDARD DEVIATION",
    caption: "GAUSSIAN BELL CURVE",
    formula: "σ = √[ (1/N) Σ (x_i - μ)² ]",
    quote: "SIGMA SUPREME!",
    bg: "#be123c",
    accent: "#fda4af",
    type: "bell",
  },
  {
    issue: "ISSUE #09 • MAS DARUNNAJAH 9 ACADEMY",
    caption: "ISLAMIC GEOMETRIC STARS",
    formula: "8-FOLD ROTATIONAL SYMMETRY",
    quote: "THE MATHEMATICAL HERITAGE!",
    bg: "#0f766e",
    accent: "#5eead4",
    type: "star",
  },
  {
    issue: "ISSUE #10 • CHAOS & MANDELBROT",
    caption: "FRACTAL ITERATION",
    formula: "z_{n+1} = z_n² + c",
    quote: "INFINITE RECURSION!",
    bg: "#4338ca",
    accent: "#a5b4fc",
    type: "fractal",
  },
  {
    issue: "ISSUE #11 • SCHRÖDINGER WAVE MECHANICS",
    caption: "QUANTUM PROBABILITY",
    formula: "iℏ ∂Ψ/∂t = ĤΨ",
    quote: "WAVE-PARTICLE DUALITY!",
    bg: "#831843",
    accent: "#f472b6",
    type: "quantum",
  },
  {
    issue: "ISSUE #12 • PYTHAGORAS LEGACY",
    caption: "RIGHT TRIANGLE THEOREM",
    formula: "a² + b² = c²",
    quote: "ANCIENT WISDOM AWAKENS!",
    bg: "#374151",
    accent: "#d1d5db",
    type: "pythagoras",
  },
];

// Procedurally generate vintage comic canvas panels
function generateComicCanvas(index: number): HTMLCanvasElement {
  const item = COMIC_PANEL_DATA[index % COMIC_PANEL_DATA.length];
  const canvas = document.createElement("canvas");
  const W = 600;
  const H = 820;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  // Aged newsprint paper background
  ctx.fillStyle = "#fff8e7";
  ctx.fillRect(0, 0, W, H);

  // Halftone / Ben-Day comic dots
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  for (let x = 6; x < W; x += 14) {
    for (let y = 6; y < H; y += 14) {
      ctx.beginPath();
      ctx.arc(x, y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Dramatic black comic frame
  ctx.lineWidth = 16;
  ctx.strokeStyle = "#09090b";
  ctx.strokeRect(12, 12, W - 24, H - 24);

  // Top Issue Banner Box
  ctx.fillStyle = item.bg;
  ctx.fillRect(20, 20, W - 40, 56);
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 16px 'Arial Black', Impact, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.textAlign = "center";
  ctx.fillText(item.issue, W / 2, 54);

  // Speed lines radiating from center
  ctx.save();
  ctx.translate(W / 2, H / 2 - 30);
  ctx.strokeStyle = "rgba(0,0,0,0.08)";
  ctx.lineWidth = 2;
  for (let i = 0; i < 28; i++) {
    const angle = (i * Math.PI * 2) / 28;
    ctx.beginPath();
    ctx.moveTo(Math.cos(angle) * 120, Math.sin(angle) * 120);
    ctx.lineTo(Math.cos(angle) * 380, Math.sin(angle) * 380);
    ctx.stroke();
  }
  ctx.restore();

  // Central Comic Panel Frame
  ctx.save();
  ctx.translate(W / 2, H / 2 - 25);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(-230, -210, 460, 420);
  ctx.strokeStyle = "#09090b";
  ctx.lineWidth = 8;
  ctx.strokeRect(-230, -210, 460, 420);

  // Comic Graphics
  ctx.strokeStyle = item.bg;
  ctx.fillStyle = item.accent;
  ctx.lineWidth = 6;

  if (item.type === "spiral") {
    ctx.beginPath();
    for (let a = 0; a < Math.PI * 6.5; a += 0.1) {
      const r = 3.2 * Math.pow(1.19, a);
      const px = r * Math.cos(a);
      const py = r * Math.sin(a);
      if (a === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  } else if (item.type === "star") {
    // 8-pointed Islamic geometric star
    ctx.beginPath();
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8;
      const r = i % 2 === 0 ? 150 : 75;
      const px = Math.cos(a) * r;
      const py = Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  } else if (item.type === "curve") {
    // Coordinate axis
    ctx.strokeStyle = "#64748b";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-180, 130);
    ctx.lineTo(180, 130);
    ctx.moveTo(-130, 160);
    ctx.lineTo(-130, -150);
    ctx.stroke();

    // High velocity cubic curve
    ctx.strokeStyle = item.bg;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(-160, 110);
    ctx.bezierCurveTo(-70, 160, 10, -130, 160, -130);
    ctx.stroke();

    // Tangent slope
    ctx.strokeStyle = "#e11d48";
    ctx.setLineDash([10, 6]);
    ctx.beginPath();
    ctx.moveTo(-60, 150);
    ctx.lineTo(130, -150);
    ctx.stroke();
    ctx.setLineDash([]);
  } else {
    // Big Heroic Geometric Emblem
    ctx.beginPath();
    ctx.arc(0, 0, 130, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 110px 'Arial Black', Impact, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Σ", 0, 8);
  }

  // Comic Action Burst Speech Bubble: "CALCULUS ASSEMBLE!"
  ctx.fillStyle = "#fef08a";
  ctx.strokeStyle = "#09090b";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(-200, 140, 400, 50, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#09090b";
  ctx.font = "900 18px 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(item.quote, 0, 172);

  ctx.restore();

  // Bottom Comic Narration Box
  ctx.fillStyle = "#09090b";
  ctx.fillRect(28, H - 200, W - 56, 85);
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 24px 'Arial Black', Impact, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(item.caption, W / 2, H - 158);

  ctx.fillStyle = item.accent;
  ctx.font = "bold 15px monospace";
  ctx.fillText(item.formula, W / 2, H - 132);

  // Vintage Publisher Stamp & Barcode
  ctx.fillStyle = item.bg;
  ctx.fillRect(36, H - 85, 110, 55);
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 14px 'Arial Black', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("MAS", 91, H - 56);
  ctx.font = "900 12px sans-serif";
  ctx.fillText("DARUNNAJAH 9", 91, H - 40);

  ctx.fillStyle = "#09090b";
  ctx.font = "bold 12px monospace";
  ctx.textAlign = "right";
  ctx.fillText("SERIES 2026 • ISSUE #" + (index + 1).toString().padStart(2, "0"), W - 36, H - 60);
  ctx.fillText("AUTHENTIC MATHEMATICS", W - 36, H - 42);

  return canvas;
}

export const ThreeLoadingScreen: React.FC<ThreeLoadingScreenProps> = ({
  progress: externalProgress,
  autoSimulate = true,
  simulationDurationMs = 5200,
  onComplete,
  displayText = "SIGMA",
  fullscreen = true,
  onRedirect,
  redirectUrl,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const comicMaskRef = useRef<HTMLCanvasElement>(null);

  const [currentProgress, setCurrentProgress] = useState(externalProgress ?? 0);
  const [phase, setPhase] = useState<"closeFlipping" | "pullBack" | "boxLock" | "lensGleam" | "finished">(
    "closeFlipping"
  );
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeComicIdx, setActiveComicIdx] = useState(0);

  // Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const flutterTimerRef = useRef<number | null>(null);
  const fanfarePlayedRef = useRef<boolean>(false);

  // -------------------------------------------------------------
  // SIMULATE PROGRESS WITH TRUE MARVEL CINEMATIC PACING
  // -------------------------------------------------------------
  useEffect(() => {
    if (externalProgress !== undefined && !autoSimulate) {
      setCurrentProgress(Math.min(100, Math.max(0, externalProgress)));
      evaluatePhase(externalProgress);
      return;
    }

    const startTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(1, elapsed / simulationDurationMs);

      // Marvel pacing: fast initial flip, cinematic pull, dramatic slam
      const val = Math.min(100, Math.round(ratio * 100));
      setCurrentProgress(val);
      evaluatePhase(val);

      if (ratio < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        triggerFinishSequence();
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [autoSimulate, externalProgress, simulationDurationMs]);

  const evaluatePhase = (prog: number) => {
    if (prog < 45) {
      setPhase("closeFlipping");
    } else if (prog < 75) {
      setPhase("pullBack");
    } else if (prog < 88) {
      setPhase("boxLock");
      if (!fanfarePlayedRef.current && prog >= 75) {
        fanfarePlayedRef.current = true;
        playMarvelFanfare();
      }
    } else if (prog < 99) {
      setPhase("lensGleam");
    } else {
      setPhase("finished");
    }
  };

  const triggerFinishSequence = () => {
    setPhase("finished");
    setTimeout(() => {
      onComplete?.();
      if (onRedirect) onRedirect();
      else if (redirectUrl && typeof window !== "undefined") {
        window.location.href = redirectUrl;
      }
    }, 1100);
  };

  const handleSkip = () => {
    playCymbalHit();
    triggerFinishSequence();
  };

  // -------------------------------------------------------------
  // HIGH SPEED COMIC PANEL CYCLING (Inside the Letters)
  // -------------------------------------------------------------
  useEffect(() => {
    if (phase === "boxLock" || phase === "lensGleam" || phase === "finished") {
      return;
    }

    // 25 flips per second like authentic Marvel opening comic reel!
    const interval = window.setInterval(() => {
      setActiveComicIdx((prev) => (prev + 1) % COMIC_PANEL_DATA.length);
    }, 45);

    return () => clearInterval(interval);
  }, [phase]);

  // Render the cycling comic panel onto the letter mask canvas
  useEffect(() => {
    const canvas = comicMaskRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sourceCanvas = generateComicCanvas(activeComicIdx);
    ctx.drawImage(sourceCanvas, 0, 0, canvas.width, canvas.height);
  }, [activeComicIdx]);

  // -------------------------------------------------------------
  // MARVEL AUDIO: MECHANICAL FLUTTER & EXPLOSIVE BRASS FANFARE
  // -------------------------------------------------------------
  const getAudioContext = () => {
    if (typeof window === "undefined") return null;
    if (!audioCtxRef.current) {
      const AudioClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioClass) audioCtxRef.current = new AudioClass();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
    return audioCtxRef.current;
  };

  // Mechanical comic page flip click
  const playPageFlipClick = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Projector whir / high velocity paper flutter
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(380 + Math.random() * 240, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.028);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

      // Bandpass filter for mechanical projector click texture
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.Q.setValueAtTime(3.5, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Audio autoplay policy
    }
  };

  // Flutter rhythmic loop during flipping phase
  useEffect(() => {
    if (!soundEnabled || phase === "boxLock" || phase === "lensGleam" || phase === "finished") {
      if (flutterTimerRef.current) clearInterval(flutterTimerRef.current);
      return;
    }

    flutterTimerRef.current = window.setInterval(() => {
      playPageFlipClick();
    }, 55);

    return () => {
      if (flutterTimerRef.current) clearInterval(flutterTimerRef.current);
    };
  }, [soundEnabled, phase]);

  // Grand Marvel Orchestral Brass Fanfare
  const playMarvelFanfare = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // 1. Massive Sub Boom & Timpani Impact
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(110, now);
      subOsc.frequency.exponentialRampToValueAtTime(28, now + 1.2);
      subGain.gain.setValueAtTime(0.45, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.5);

      // 2. Brass Section Crescendo (The Marvel Horn Motive!)
      const fanfareChords = [
        // Chord 1 (Swell into lockup): Bb major
        { f: 116.54, t: 0, d: 0.6, g: 0.12 }, // Bb2
        { f: 233.08, t: 0, d: 0.6, g: 0.09 }, // Bb3
        { f: 293.66, t: 0, d: 0.6, g: 0.08 }, // D4
        { f: 349.23, t: 0, d: 0.6, g: 0.08 }, // F4
        { f: 466.16, t: 0, d: 0.6, g: 0.07 }, // Bb4

        // Chord 2 (The Triumphant Lockup Chord): Epic C Major 9
        { f: 65.41, t: 0.45, d: 2.2, g: 0.2 },   // Low C2 Bass
        { f: 130.81, t: 0.45, d: 2.2, g: 0.14 }, // C3 Horn
        { f: 261.63, t: 0.45, d: 2.2, g: 0.11 }, // C4 Trombone
        { f: 329.63, t: 0.45, d: 2.2, g: 0.1 },  // E4 Trumpet
        { f: 392.0, t: 0.45, d: 2.2, g: 0.1 },   // G4 Trumpet
        { f: 523.25, t: 0.45, d: 2.4, g: 0.12 }, // C5 High Trumpet
        { f: 587.33, t: 0.45, d: 2.4, g: 0.08 }, // D5 (Bright 9th)
        { f: 1046.5, t: 0.45, d: 2.5, g: 0.09 }, // C6 Shimmering Peak
      ];

      fanfareChords.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(note.f, now + note.t);

        gain.gain.setValueAtTime(0, now + note.t);
        gain.gain.linearRampToValueAtTime(note.g, now + note.t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + note.t + note.d);

        // Lowpass filter for warm cinematic orchestral brass weight
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2600, now + note.t);
        filter.Q.setValueAtTime(1.2, now + note.t);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + note.t);
        osc.stop(now + note.t + note.d + 0.1);
      });
    } catch {
      // Audio policy
    }
  };

  const playCymbalHit = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    } catch {
      // Audio policy
    }
  };

  // -------------------------------------------------------------
  // THREE.JS 3D SCENE: CINEMATIC VOLUMETRIC SPACE & FLYING PAGES
  // -------------------------------------------------------------
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.FogExp2(0x050505, 0.06);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(-2.5, 0.4, 2.8);
    camera.rotation.z = 0.18;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Dynamic Cinematic Marvel Lighting
    const ambientLight = new THREE.AmbientLight(0x27272a, 1.8);
    scene.add(ambientLight);

    // Deep Crimson Marvel Volumetric Key Light
    const redKeyLight = new THREE.DirectionalLight(0xe11d48, 4.5);
    redKeyLight.position.set(-5, 4, 6);
    scene.add(redKeyLight);

    // Golden Rim Light (Classic comic metallic gleam)
    const goldRimLight = new THREE.DirectionalLight(0xf59e0b, 3.2);
    goldRimLight.position.set(6, -3, 4);
    scene.add(goldRimLight);

    // 3D Flying Comic Pages Group
    const pagesGroup = new THREE.Group();
    scene.add(pagesGroup);

    // Pre-generate canvases for 3D textures
    const pageCanvases = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => generateComicCanvas(i));
    const textures = pageCanvases.map((c) => {
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    });

    const pageCount = 18;
    const pageMeshes: { mesh: THREE.Mesh; rotSpeed: number; initX: number; initY: number; initZ: number }[] = [];
    const pageGeom = new THREE.PlaneGeometry(2.4, 3.2, 4, 4);

    for (let i = 0; i < pageCount; i++) {
      const mat = new THREE.MeshStandardMaterial({
        map: textures[i % textures.length],
        roughness: 0.35,
        metalness: 0.15,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(pageGeom, mat);
      const angle = (i / pageCount) * Math.PI * 2;
      const radius = 3.5 + Math.random() * 2.0;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 2.8,
        (Math.random() - 0.5) * 6 - 1.5
      );
      mesh.rotation.set((Math.random() - 0.5) * 0.8, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 0.5);

      pagesGroup.add(mesh);
      pageMeshes.push({
        mesh,
        rotSpeed: (Math.random() - 0.5) * 8 + 6,
        initX: mesh.position.x,
        initY: mesh.position.y,
        initZ: mesh.position.z,
      });
    }

    // Floating cinematic embers / film dust particles
    const dustCount = 150;
    const dustGeom = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 16;
      dustPositions[i + 1] = (Math.random() - 0.5) * 12;
      dustPositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    dustGeom.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xfca5a5,
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const dustParticles = new THREE.Points(dustGeom, dustMat);
    scene.add(dustParticles);

    // Animation Loop with Marvel Camera Keyframes
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const ratio = Math.min(1, elapsed / (simulationDurationMs / 1000));

      // 1. Comic Pages High Velocity Spin & Flutter
      pageMeshes.forEach((p, idx) => {
        p.mesh.rotation.y += p.rotSpeed * 0.015;
        p.mesh.rotation.x = Math.sin(elapsed * 3 + idx) * 0.2;

        // When locking into position, pages scatter to outer edges
        if (ratio > 0.65) {
          const scatter = (ratio - 0.65) / 0.35;
          p.mesh.position.z = THREE.MathUtils.lerp(p.initZ, -8, scatter);
          p.mesh.scale.setScalar(THREE.MathUtils.lerp(1, 0.2, scatter));
        }
      });

      // 2. Camera Cinematic Swoop (Extreme Close-Up -> Majestic Pull-Back)
      if (ratio < 0.45) {
        // Phase 1: Extreme close-up tracking across the letters
        const localRatio = ratio / 0.45;
        camera.position.x = THREE.MathUtils.lerp(-2.8, 1.2, localRatio);
        camera.position.y = THREE.MathUtils.lerp(0.35, -0.15, localRatio);
        camera.position.z = THREE.MathUtils.lerp(2.6, 3.2, localRatio);
        camera.rotation.z = THREE.MathUtils.lerp(0.18, 0.08, localRatio);
      } else if (ratio < 0.78) {
        // Phase 2: Grand majestic pull back into center
        const pullRatio = (ratio - 0.45) / 0.33;
        const easedPull = Math.pow(pullRatio, 1.6);
        camera.position.x = THREE.MathUtils.lerp(1.2, 0, easedPull);
        camera.position.y = THREE.MathUtils.lerp(-0.15, 0, easedPull);
        camera.position.z = THREE.MathUtils.lerp(3.2, 8.5, easedPull);
        camera.rotation.z = THREE.MathUtils.lerp(0.08, 0, easedPull);
      } else {
        // Phase 3: Final heroic lockup with subtle forward drift
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = THREE.MathUtils.lerp(8.5, 7.8, (ratio - 0.78) / 0.22);
        camera.rotation.z = 0;
      }

      camera.lookAt(0, 0, 0);

      // Dust float
      dustParticles.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      textures.forEach((t) => t.dispose());
      pageGeom.dispose();
      dustGeom.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, [simulationDurationMs]);

  return (
    <div
      className={`${
        fullscreen ? "fixed inset-0 z-[9999]" : "relative w-full h-full min-h-[500px]"
      } bg-black overflow-hidden select-none flex flex-col justify-between transition-all duration-1000 ${
        phase === "finished" ? "opacity-0 scale-110 blur-lg pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* 3D Flying Comic Universe Background */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none" />

      {/* Hidden Offscreen Canvas for Comic Texture Masking */}
      <canvas ref={comicMaskRef} width={600} height={820} className="hidden" />

      {/* Film Projector Flicker & Vintage Grain Filter */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.92)_90%)] z-10" />
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_800px_at_50%_50%,rgba(225,29,72,0.15),transparent)] z-10" />

      {/* Top Header Bar: Studio Branding, Audio Toggle, Skip Pill */}
      <div className="relative z-20 w-full p-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/80 border border-white/20 text-white font-mono text-[11px] tracking-widest backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            <Clapperboard size={14} className="text-red-500 animate-pulse" />
            <span className="font-bold">MAS DARUNNAJAH 9 PICTURES</span>
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded bg-black/80 border border-white/20 text-white hover:bg-white/10 transition-colors cursor-pointer"
            title={soundEnabled ? "Audio Fanfare Aktif" : "Audio Dimatikan"}
          >
            {soundEnabled ? <Volume2 size={14} className="text-red-500" /> : <VolumeX size={14} />}
          </button>
        </div>

        <button
          onClick={handleSkip}
          className="group inline-flex items-center gap-2 px-4 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white font-black tracking-widest text-xs uppercase transition-all shadow-[0_0_25px_rgba(220,38,38,0.7)] cursor-pointer"
        >
          <span>LEWATI</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* CENTERPIECE: THE ULTRA-AUTHENTIC MARVEL-STYLE LOGO WITH COMIC PAGES INSIDE */}
      <div className="relative z-20 w-full flex flex-col items-center justify-center pointer-events-none px-4 mb-6">
        <div
          className={`relative flex flex-col items-center transition-transform duration-700 ease-out ${
            phase === "closeFlipping"
              ? "scale-125 rotate-[-4deg] translate-x-4"
              : phase === "pullBack"
              ? "scale-105 rotate-[-1deg] translate-x-0"
              : "scale-100 rotate-0 translate-x-0"
          }`}
        >
          {/* THE ICONIC MARVEL RED BOX WITH BEVELED EMBOSS */}
          <div
            className={`relative flex items-center justify-center border-4 border-white transition-all duration-500 ease-out overflow-hidden ${
              phase === "closeFlipping" || phase === "pullBack"
                ? "bg-transparent border-transparent shadow-none"
                : "bg-[#e23636] border-white shadow-[0_0_90px_rgba(226,54,54,0.85),0_15px_40px_rgba(0,0,0,0.9)]"
            }`}
            style={{
              padding: "18px 42px",
            }}
          >
            {/* THE GIANT LETTERS: SIGMA */}
            <h1
              className="relative text-7xl sm:text-9xl md:text-[10.5rem] lg:text-[12.5rem] font-black uppercase tracking-tighter leading-none select-none transition-all duration-300"
              style={{
                fontFamily: "'Impact', 'Arial Black', sans-serif",
                transform: "scaleY(1.12)",
                letterSpacing: "-0.04em",
                ...(phase === "closeFlipping" || phase === "pullBack"
                  ? {
                      // DURING FLIPPING: STREAMING COMIC ART DIRECTLY INSIDE THE LETTERS!
                      backgroundImage: `url(${comicMaskRef.current?.toDataURL() || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      filter: "drop-shadow(0 0 25px rgba(239,68,68,0.9))",
                    }
                  : {
                      // AT LOCKUP: BRILLIANT SOLID 3D CHROME WHITE LETTERS!
                      color: "#ffffff",
                      WebkitTextFillColor: "#ffffff",
                      textShadow: "0 6px 15px rgba(0,0,0,0.8), 0 0 25px rgba(255,255,255,0.4)",
                    }),
              }}
            >
              {displayText}
            </h1>

            {/* ANAMORPHIC HORIZONTAL LENS FLARE / SHOCKWAVE GLEAM */}
            <div
              className={`absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-white to-transparent -skew-x-25 pointer-events-none transition-transform duration-1000 ease-in-out ${
                phase === "lensGleam" || phase === "finished"
                  ? "translate-x-[900px] opacity-100"
                  : "-translate-x-[900px] opacity-0"
              }`}
            />
          </div>

          {/* THE MARVEL STUDIOS SUBTITLE PLATE: "MAS DARUNNAJAH 9" */}
          <div
            className={`w-full bg-black border-x-4 border-b-4 border-white py-2.5 flex items-center justify-center transition-all duration-700 ${
              phase === "closeFlipping" || phase === "pullBack"
                ? "opacity-0 -translate-y-6 scale-95"
                : "opacity-100 translate-y-0 scale-100 shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
            }`}
          >
            <div className="w-full flex items-center justify-between px-6">
              <div className="h-[2px] flex-1 bg-white/40" />
              <span
                className="px-4 text-xs sm:text-base md:text-lg font-black tracking-[0.45em] sm:tracking-[0.7em] text-white uppercase text-center"
                style={{
                  fontFamily: "'Arial Black', Impact, sans-serif",
                }}
              >
                MAS DARUNNAJAH 9
              </span>
              <div className="h-[2px] flex-1 bg-white/40" />
            </div>
          </div>

          {/* MATHEMATICAL COMIC TICKER SUB-BADGE */}
          <div
            className={`mt-4 flex items-center gap-2 text-xs font-mono tracking-[0.3em] text-red-500 uppercase transition-opacity duration-500 ${
              phase === "closeFlipping" || phase === "pullBack" ? "opacity-0" : "opacity-100"
            }`}
          >
            <Sparkles size={13} className="text-amber-400 animate-pulse" />
            <span>THE MATHEMATICAL UNIVERSE</span>
          </div>
        </div>
      </div>

      {/* BOTTOM PROGRESS REEL: TIMECODE & SCENE REEL */}
      <div className="relative z-20 w-full pb-6 px-8 flex flex-col items-center">
        <div className="w-full max-w-md flex items-center gap-3">
          <span className="font-mono text-[10px] text-zinc-500 tracking-wider">REEL 01</span>
          <div className="flex-1 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-amber-400 to-red-600 transition-all duration-150 shadow-[0_0_12px_rgba(239,68,68,0.8)]"
              style={{ width: `${currentProgress}%` }}
            />
          </div>
          <span className="font-mono text-[10px] font-bold text-red-400 tracking-wider">
            {currentProgress}%
          </span>
        </div>

        <p className="text-[10px] font-mono tracking-[0.3em] text-zinc-600 uppercase mt-2">
          {COMIC_PANEL_DATA[activeComicIdx].issue}
        </p>
      </div>
    </div>
  );
};
