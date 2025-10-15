import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Link from "next/link";

const Background3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 10, 50);
    scene.add(pointLight);

    // Group for black hole and accretion disk
    const group = new THREE.Group();
    scene.add(group);

  
    const blackHoleGeom = new THREE.SphereGeometry(1, 128, 128);
    const blackHoleMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const blackHole = new THREE.Mesh(blackHoleGeom, blackHoleMat);
    group.add(blackHole);

    const diskParticlesGeom = new THREE.BufferGeometry();
    const diskParticlesCount = 20000;
    const diskPosArray = new Float32Array(diskParticlesCount * 3);
    const diskColors = new Float32Array(diskParticlesCount * 3);
    const colorHot = new THREE.Color(0xffd700); 
    const colorCool = new THREE.Color(0x8a2be2); 

    for (let i = 0; i < diskParticlesCount; i++) {
      const i3 = i * 3;
      const radius = Math.random() * 3.5 + 1.2;
      const angle = Math.random() * Math.PI * 4;
      diskPosArray[i3] = Math.cos(angle) * radius;
      diskPosArray[i3 + 1] = (Math.random() - 0.5) * 0.2; 
      diskPosArray[i3 + 2] = Math.sin(angle) * radius;

      const color = colorCool.clone().lerp(colorHot, (radius - 1.2) / 2.5);
      color.toArray(diskColors, i3);
    }
    diskParticlesGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(diskPosArray, 3)
    );
    diskParticlesGeom.setAttribute(
      "color",
      new THREE.BufferAttribute(diskColors, 3)
    );
    const diskParticlesMat = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.8,
    });
    const accretionDisk = new THREE.Points(
      diskParticlesGeom,
      diskParticlesMat
    );
    group.add(accretionDisk);

    // Starfield ?true :false
    const starGeom = new THREE.BufferGeometry();
    const starCount = 5000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 100;
    }
    starGeom.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.05, color: 0xaaaaaa });
    const starField = new THREE.Points(starGeom, starMat);
    scene.add(starField);

    //depends whole movement on thisss bruh
    const cameraPath = [
      { pos: new THREE.Vector3(3, 3, 2), lookAt: new THREE.Vector3(4, -1, 0) },
      { pos: new THREE.Vector3(-8, 4, 6), lookAt: new THREE.Vector3(1, 2, -2) },
      { pos: new THREE.Vector3(5, 12, -10), lookAt: new THREE.Vector3(-3, 3, 2) },
      { pos: new THREE.Vector3(20, 2, -5), lookAt: new THREE.Vector3(0, 5, -10) },
      { pos: new THREE.Vector3(0, 5, 14), lookAt: new THREE.Vector3(2, 2, 0) },
    ];
    const tempLookAt = new THREE.Vector3();


    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent =
        scrollableHeight > 0 ? scrollY / scrollableHeight : 0;

      const pathIndexFloat = scrollPercent * (cameraPath.length - 1);
      const pathIndex = Math.floor(pathIndexFloat);
      const segmentProgress = pathIndexFloat - pathIndex;

      const start = cameraPath[pathIndex];
      const end = cameraPath[pathIndex + 1] || start;

      camera.position.lerpVectors(start.pos, end.pos, segmentProgress);
      tempLookAt.lerpVectors(start.lookAt, end.lookAt, segmentProgress);
      camera.lookAt(tempLookAt);
    };
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

//looper
    let animationFrameId: number;
    const animate = () => {
      accretionDisk.rotation.y -= 0.002;
      group.rotation.y += 0.0005;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (object.geometry) object.geometry.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" />;
};

const Typewriter: React.FC<{ text: string; speed?: number }> = ({ text, speed = 150 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingTimeout: ReturnType<typeof setTimeout>;

    const handleTyping = () => {
      const fullText = text;
      
      if (isDeleting) {
        if (displayText.length > 0) {
          setDisplayText(current => current.substring(0, current.length - 1));
        } else {
          setIsDeleting(false);
        }
      } else {
        if (displayText.length < fullText.length) {
          setDisplayText(current => fullText.substring(0, current.length + 1));
        } else {
          typingTimeout = setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    };

    typingTimeout = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(typingTimeout);
  }, [displayText, isDeleting, text, speed]);

  return <h2 className="typewriter">{displayText}</h2>;
};


const ContentCard: React.FC<{ title: string; children: React.ReactNode; className?: string; id?: string }> = ({
  title,
  children,
  className = "",
  id,
}) => (
  <section className={`content-card ${className}`} id={id}>
    <h2>{title}</h2>
    <div>{children}</div>
  </section>
);

export default function App() {
  return (
    <>
    <div className="hero-section">
      <Background3D />

      {/* Hero Header */}
      <section className="hero-header">
        <div>
          <Typewriter text="Welcome to quantum computing club of IIT Indore" speed={150}  />
        </div>
      </section>

      <div>
        {/* About Us Section */}
        <ContentCard title="About Us" className="transparent-card" id="about">
          we are a student-led community advancing quantum computation and information theory, bridging the gap between fundamental principles and real-world applications. Our mission is to foster an inclusive and collaborative space where beginners, enthusiasts, and researchers come together to learn, experiment, and build: contributing to the evolving landscape of quantum technologies.
        </ContentCard>

        {/* Pathway Section */}
        <ContentCard title="Know More" className="glass-card">
          <div className="pathway-boxes">
            <Link href="/projects"><div className="box box-red">Projects</div></Link>
            <Link href="/team"><div className="box box-blue">Our Team</div></Link>
            <Link href="/team"><div className="box box-green">Resources</div></Link>
            <Link href="/team"><div className="box box-yellow">Collabs</div></Link>
          </div>
        </ContentCard>
      </div>
    </div>
    </>
  );
}