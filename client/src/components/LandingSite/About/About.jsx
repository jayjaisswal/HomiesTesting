import { TeamCard } from "./TeamMember";
import Raushan from "/src/assets/RaushanImage.jpg";
import Utkarsh from "/src/assets/utkarsh.png";
import Ankush from "/src/assets/ankush.jpg";
function About() {
  const utkarsh = {
    name: "Utkarsh",
    designation: "Full Stack Developer",
    image: Utkarsh,
    linkedin: "https://www.linkedin.com/in/utkarsh-kumar-a3806b2b8/",
  };
  const raushan = {
    name: "Raushan",
    designation: "Full Stack Developer",
    image: Raushan,
    linkedin: "https://www.linkedin.com/in/raushan-kumar-964a75255/",
  };
  const jay = {
    name: "Jay",
    designation: "Full Stack Developer",
    image:
      "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
    linkedin: "https://www.linkedin.com/in/jay-kumar-b9b29125b/",
  };
  const ankush = {
    name: "Ankush",
    designation: "Full Stack Developer",
    image: Ankush,
    linkedin: "https://www.linkedin.com/in/ankushsingh374/",
  };

  return (
    <div style={{ backgroundColor: "#f3e8ff" }} className="min-h-screen ">
     <h1 
  className="font-bold text-center text-2xl sm:text-4xl lg:text-5xl pt-11  mt-16
    text-black hover:scale-105 transition-transform duration-300
    tracking-tight leading-tight
    mb-4 relative z-10"
>
   Meet Our Team!
</h1>
      <div className="py-2 sm:py-2 flex gap-10 flex-wrap justify-center items-center mt-0 ">
        <TeamCard member={utkarsh} />
        <TeamCard member={raushan} />
        <TeamCard member={jay} />
        <TeamCard member={ankush} />
      </div>
    </div>
  );
}

export { About };
