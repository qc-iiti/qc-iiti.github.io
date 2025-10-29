import React, { useRef, useEffect, useState, FC } from 'react';
// Papa is now loaded via a script tag in the HTML wrapper, 
// We assert its global presence later.

// NOTE: Since this environment cannot access local files like '/team.csv',
// the fetch logic will likely fail. I've added a mock CSV to ensure the 
// component renders correctly and demonstrates the parsing logic.

// --- STYLES (Maroon & White Theme - Refactored to match Image Layout) ---
const TeamPageStyles = () => (
  <>
    {/* Load PapaParse globally via CDN script tag */}
    <script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js"></script>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');

      .pageContainer {
        color: #111111;
        font-family: 'Orbitron', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 0; 
        box-sizing: border-box;
        background-color: #f0f2f5; 
      }

      
      .titleBanner {
        width: 100%;
        background-color: #600000; 
        color: #fff;
        text-align: center;
        padding: 4rem 1rem;
        margin-bottom: 2rem;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      }

      .titleBanner h1 {
        font-size: 3rem;
        font-weight: 900;
        margin: 0;
        letter-spacing: 2px;
      }

      .titleBanner p {
        font-size: 1.1rem;
        color: rgba(255, 255, 255, 0.85);
        max-width: 600px;
        margin: 0.5rem auto 0;
      }

      .teamSection {
        width: 100%;
        max-width: 1200px;
        padding: 2rem 1rem 4rem;
      }

      .memberGrid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem; /* Reduced gap for a tighter, cleaner look */
        justify-items: center;
      }

      /* Member Card: Flat, block-style card matching the image aesthetic */
      .memberCard {
        width: 100%;
        min-height: 250px; /* Reduced height for content focus */
        padding: 1.5rem;
        box-sizing: border-box;
        background: #ffffff;
        color: #111111;
        border-radius: 8px; /* Clean rounded corners */
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
      }

      .memberCard:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(128, 0, 0, 0.2); /* Maroon shadow on hover */
      }

      .memberAvatar {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background: #800000; /* Maroon solid background for initials */
        color: #fff; /* White text */
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        border: 3px solid #f0f2f5; /* Clean white border */
      }

      .memberInfo h3 {
        margin: 0;
        font-size: 1.4rem;
        font-weight: 700;
        color: #4c0000; /* Darker maroon for name */
      }

      .memberInfo p {
        margin: 0.5rem 0 0;
        font-size: 1rem;
        color: #800000; /* Maroon accent for role */
        font-weight: 400;
      }
      
      /* CSS responsiveness improvements */
      @media (max-width: 768px) {
        .titleBanner h1 {
          font-size: 2.2rem;
        }
        .titleBanner {
          padding: 3rem 1rem;
        }
      }
    `}</style>
  </>
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

const MOCK_CSV_DATA = `name,role,initials,team_title
Jane Doe,President,JD,Leadership
John Smith,Co-President,JS,Leadership
Anya Taylor,Head of Development,AT,Tech
Marcus Chen,Marketing Lead,MC,Marketing
Elara Vance,Community Manager,EV,Marketing
Leo Johnson,Financial Officer,LJ,Leadership`;


const MemberCard: FC<{ member: Member }> = ({ member }) => {
  return (
    <div className="memberCard">
      <div className="memberAvatar">{member.initials}</div>
      <div className="memberInfo">
        <h3>{member.name}</h3>
        <p>{member.role}</p>
      </div>
    </div>
  );
};

const TeamPage: FC = () => {
  const [teamData, setTeamData] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    if (typeof (window as any).Papa === 'undefined') {
        setError("Error: PapaParse library is not available. Check script loading.");
        setLoading(false);
        return;
    }
    
    const Papa = (window as any).Papa;

    const fetchData = async () => {
      let csvText = MOCK_CSV_DATA; 

      try {
        
        const response = await fetch('/team.csv');
        if (response.ok) {
          csvText = await response.text();
        } else {
          console.warn("Could not fetch 'team.csv', using mock data for demonstration.");
        }
        
        // Parse CSV data
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => { 
            const parsedData = results.data as CsvRow[];
            
            // Map all rows to the Member interface
            const allMembers: Member[] = parsedData.map(row => ({
                initials: row.initials,
                name: row.name,
                role: row.role, 
            }));
            
            setTeamData(allMembers.sort((a, b) => a.name.localeCompare(b.name)));
          },
          error: (err: Error) => {
            throw new Error(err.message);
          }
        });

      } catch (e: any) {
        setError(`Failed to process team data. Please ensure 'team.csv' is correctly formatted. Error: ${e.message}`);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TeamPageStyles />
      <div className="pageContainer">
        
        <div className="titleBanner">
          <h1>Club Leadership and Core Team</h1>
          <p>Meet the talented individuals driving our club forward. Their specific roles are listed on their cards.</p>
        </div>


        <section className="teamSection">
          {loading && <p style={{ textAlign: 'center' }}>Loading team members...</p>}
          {error && <p style={{ color: '#800000', fontWeight: 'bold', textAlign: 'center' }}>{error}</p>}
          
          {!loading && !error && (
            <div className="memberGrid">
              {teamData.map((member) => (
                <MemberCard key={member.name} member={member} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default TeamPage;
