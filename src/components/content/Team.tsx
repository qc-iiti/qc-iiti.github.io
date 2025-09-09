import React, { useRef, useEffect, useState, FC } from 'react';
import Papa from 'papaparse';

// --- STYLES (with responsiveness improvements) ---
const TeamPageStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

    .pageContainer {
      color: #111111;
      font-family: 'Orbitron', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      padding: 4rem 1rem;
      box-sizing: border-box;
      background-color: #f0f2f5;
      background-image: 
        radial-gradient(circle at 10% 20%, rgba(255, 0, 72, 0.1), transparent 30%),
        radial-gradient(circle at 80% 90%, rgba(0, 114, 255, 0.1), transparent 40%),
        radial-gradient(circle at 50% 50%, rgba(155, 89, 182, 0.05), transparent 40%);
      animation: backgroundPan 30s linear infinite;
    }

    @keyframes backgroundPan {
      0% { background-position: 0% 0%; }
      100% { background-position: 200% 200%; }
    }

    .header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .header h1 {
      font-size: 3.5rem;
      font-weight: 900;
      margin: 0;
      background: linear-gradient(45deg, #333, #000);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .header p {
      font-size: 1.1rem;
      color: #555;
      max-width: 600px;
      margin-top: 0.5rem;
    }

    .teamSection {
      width: 100%;
      max-width: 1200px;
      margin-bottom: 4rem;
    }

    .teamSection h2 {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 2.5rem;
      position: relative;
    }

    .teamSection h2::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #555, #111);
      border-radius: 2px;
    }

    .memberGrid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2.5rem;
      justify-items: center;
    }

    .memberCardContainer {
      perspective: 1500px;
      position: relative;
    }

    .memberCard {
      height: 350px;
      width: 280px;
      cursor: pointer;
      position: relative;
      transform-style: preserve-3d;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      box-sizing: border-box;
      background: #ffffff;
      color: #111111;
      box-shadow: 0 15px 35px rgba(0,0,0,0.1);
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      clip-path: polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%);
      transform: rotateY(var(--rotateY, 0deg)) rotateX(var(--rotateX, 0deg)) scale(1);
    }

    .memberCardContainer:hover .memberCard {
      transform: rotateY(var(--rotateY, 0deg)) rotateX(var(--rotateX, 0deg)) scale(1.1);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
    }

    .memberCard::before {
      content: '';
      position: absolute;
      inset: 2px;
      background: rgba(248, 249, 250, 0.8);
      clip-path: polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%);
      transition: all 0.5s ease;
      backdrop-filter: blur(2px);
    }

    .memberCardContainer:hover .memberCard::before {
      background: radial-gradient(circle 200px at var(--mouseX, 50%) var(--mouseY, 50%), rgba(0, 0, 0, 0.1), transparent);
      backdrop-filter: blur(5px);
    }

    .memberAvatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: #e0e0e0;
      border: 4px solid #fff;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      transform: translateZ(50px);
      position: relative;
      z-index: 2;
    }

    .memberCardContainer:hover .memberAvatar {
      transform: translateZ(80px);
      border-color: rgba(255,255,255,0.8);
      background: rgba(255,255,255,0.2);
      box-shadow: 0 0 20px rgba(0,0,0,0.2);
    }

    .memberInfo {
      text-align: center;
      transform: translateZ(30px);
      transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
      position: relative;
      z-index: 2;
    }

    .memberCardContainer:hover .memberInfo {
        transform: translateZ(50px);
    }

    .memberInfo h3 {
      margin: 0;
      font-size: 1.5rem;
    }

    .memberInfo p {
      margin: 0.25rem 0 0;
      font-size: 1rem;
      opacity: 0.7;
    }

    .memberCard::after {
      content: '';
      position: absolute;
      inset: -2px;
      clip-path: polygon(0 25px, 25px 0, 100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%);
      background: linear-gradient(90deg, transparent, rgba(0,0,0,0.5), transparent);
      background-size: 400% 100%;
      opacity: 0;
      transition: opacity 0.5s ease;
      z-index: -1;
      animation: sweep 3s linear infinite;
    }

    .memberCardContainer:hover .memberCard::after {
      opacity: 1;
    }

    @keyframes sweep {
      from { background-position: 200% 0; }
      to { background-position: -200% 0; }
    }
    
    /* CSS responsiveness improvements */
    @media (max-width: 768px) {
      .header h1 {
        font-size: 2.8rem;
      }
      .teamSection h2 {
        font-size: 2rem;
      }
      .pageContainer {
        padding: 2rem 1rem;
      }
    }
  `}</style>
);

// --- INTERFACES ---
interface Member {
  initials: string;
  name: string;
  role: string;
}

interface TeamSection {
  title: string;
  members: Member[];
}

interface CsvRow {
  name: string;
  role: string;
  initials: string;
  team_title: string;
}

// --- HOOKS and COMPONENTS (unchanged) ---
const use3DTilt = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateY = -1 * ((x - rect.width / 2) / (rect.width / 2)) * 15;
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * 15;

      element.style.setProperty('--rotateX', `${rotateX}deg`);
      element.style.setProperty('--rotateY', `${rotateY}deg`);
      element.style.setProperty('--mouseX', `${x}px`);
      element.style.setProperty('--mouseY', `${y}px`);
    };

    const handleMouseLeave = () => {
      element.style.setProperty('--rotateX', '0deg');
      element.style.setProperty('--rotateY', '0deg');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return ref;
};

const MemberCard: FC<{ member: Member }> = ({ member }) => {
  const cardRef = use3DTilt<HTMLDivElement>();

  return (
    <div className="memberCardContainer" ref={cardRef}>
      <div className="memberCard">
        <div className="memberAvatar">{member.initials}</div>
        <div className="memberInfo">
          <h3>{member.name}</h3>
          <p>{member.role}</p>
        </div>
      </div>
    </div>
  );
};

// EEEE MAIN PAGE COMPONENT (with fetching logic) 
const TeamPage: FC = () => {
  const [teamData, setTeamData] = useState<TeamSection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/team.csv');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        
        // Parse CSV data
        Papa.parse<CsvRow>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsedData = results.data;
            
            // Group members by team_title
            const groupedByTeam = parsedData.reduce((acc, member) => {
              const { team_title, ...restOfMember } = member;
              if (!acc[team_title]) {
                acc[team_title] = [];
              }
              acc[team_title].push(restOfMember);
              return acc;
            }, {} as Record<string, Member[]>);
            
            // Transform into the structure needed by the component
            const finalTeamData = Object.entries(groupedByTeam).map(([title, members]) => ({
              title,
              members,
            }));
            
            setTeamData(finalTeamData);
          },
          error: (err: Error) => {
            throw new Error(err.message);
          }
        });

      } catch (e: any) {
        setError(`Failed to load team data: ${e.message}`);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <TeamPageStyles />
      <div className="pageContainer">
        <header className="header">
          <h1>Our Team</h1>
          <p>Meet the talented individuals who are pushing the boundaries of technology and innovation.</p>
        </header>

        {loading && <p>Loading team members...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {!loading && !error && teamData.map((section) => (
          <section key={section.title} className="teamSection">
            <h2>{section.title}</h2>
            <div className="memberGrid">
              {section.members.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default TeamPage;