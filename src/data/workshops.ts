export interface Workshop {
  slug: string;
  title: string;
  category: string;
  desc: string;
  url: string;
  detailedDesc: string;
  location: string;
  date: string;
  techStack: string[];
  stats: { label: string; value: string }[];
  highlights: string[];
}

export const workshopsData: Workshop[] = [
  {
    slug: "exhibition-display",
    title: "Exhibition Display",
    category: "Highlights",
    desc: "Showcase of latest industrial prototypes to institutional leaders and stakeholders.",
    url: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.01.02-PM.jpeg",
    detailedDesc: "The Exhibition Display served as a high-fidelity demonstration of AIR G's latest deep-tech and industrial automation systems. Institutional leaders, academic partners, and local stakeholders gathered to witness live operations of next-generation hardware. The showcase included cyber-physical systems communicating in real-time with our neural architectures, demonstrating how modern factories can run with zero-latency synchronization.",
    location: "AIG Strategic Hub, Satara",
    date: "March 28, 2026",
    techStack: ["Neural Networks", "Cyber-Physical Systems", "IoT Gateway", "Industrial Automation"],
    stats: [
      { label: "Demos Conducted", value: "12 Live" },
      { label: "VIP Attendees", value: "45+" },
      { label: "System Sync Rate", value: "99.98%" }
    ],
    highlights: [
      "Unveiling of the autonomous robotic sorting arm prototype",
      "Interactive dashboard showcasing real-time neural load metrics",
      "Strategic roundtable discussing implementation of advanced robotics in local industries"
    ]
  },
  {
    slug: "strategic-briefing",
    title: "Strategic Briefing",
    category: "Partnerships",
    desc: "High-level presentation of AI-driven roadmaps to government and corporate partners.",
    url: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.04.07-PM-1.jpeg",
    detailedDesc: "During this high-level session, our senior architects presented the long-term technological roadmaps to government representatives and corporate delegates. The briefing focused on establishing private edge-cloud infrastructure to power decentralized computing nodes across the region, securing critical communication lines, and integrating deep-learning algorithms into civic services.",
    location: "Corporate Briefing Room, Pune HQ",
    date: "April 12, 2026",
    techStack: ["Private Cloud", "Decentralized Edge", "Cryptographic Mesh", "Civic AI Solutions"],
    stats: [
      { label: "Delegates", value: "30+" },
      { label: "States Engaged", value: "3 Regional" },
      { label: "Active Nodes Projected", value: "250 Nodes" }
    ],
    highlights: [
      "Detailed walk-through of the cryptographic communication protocol",
      "Signing of MoU for regional AI development and incubation centers",
      "Overview of cybersecurity defense layers for state infrastructure"
    ]
  },
  {
    slug: "industrial-expo",
    title: "Industrial Expo",
    category: "Exhibition",
    desc: "Large-scale demonstration of automated robotics and smart-factory ecosystems.",
    url: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.04.08-PM.jpeg",
    detailedDesc: "The Industrial Expo brought together tech enthusiasts, manufacturing partners, and engineering students to view automated workflows in action. We set up an entire simulated smart-factory floor where autonomous mobile robots (AMRs) navigated dynamic paths, synchronized their loads, and communicated with central logistics software without any human intervention.",
    location: "Central Expo Ground, Maharashtra",
    date: "April 25, 2026",
    techStack: ["Autonomous Mobile Robots (AMRs)", "LiDAR Mapping", "Centralized Logistics Suite", "ROS2"],
    stats: [
      { label: "Total Footfall", value: "1,200+" },
      { label: "AMRs Operational", value: "5 Active" },
      { label: "Pathfinding Efficiency", value: "98.4%" }
    ],
    highlights: [
      "Dynamic obstacle avoidance demonstrations using real-time LiDAR inputs",
      "Live packaging automation flow controlled via smart-contracts",
      "Open-panel discussion with industrial engineers regarding smart-factory migrations"
    ]
  },
  {
    slug: "robotics-lab",
    title: "Robotics Lab",
    category: "Bootcamp",
    desc: "Hands-on development and testing of autonomous hardware and neural-link systems.",
    url: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
    detailedDesc: "A grueling, intensive bootcamp where students and researchers built robotic systems from the ground up. Participants learned how to interface microcontrollers with complex motor systems, write custom hardware drivers, and implement feedback loops using sensor arrays. The workshop culminated in a dynamic maze-solving competition using miniature autonomous rovers.",
    location: "Sakharwadi R&D Center",
    date: "May 2, 2026",
    techStack: ["Microcontrollers", "C++ / Embedded C", "Sensor Integration", "Feedback Control Loops"],
    stats: [
      { label: "Participants", value: "80 Students" },
      { label: "Rovers Created", value: "16 Working" },
      { label: "Average Code Coverage", value: "92%" }
    ],
    highlights: [
      "Step-by-step soldering and assembly of custom autonomous rovers",
      "Hands-on tutorial on writing PID controller logic for path alignment",
      "Exciting maze-solving challenge with active telemetry streaming"
    ]
  },
  {
    slug: "xr-immersive-lab",
    title: "XR Immersive Lab",
    category: "Future Tech",
    desc: "Testing environment for virtual reality interfaces and spatial computing applications.",
    url: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.36-PM-1.jpeg",
    detailedDesc: "The XR Immersive Lab focused on the intersection of physical space and digital interfaces. Attendees wore advanced headsets to manipulate virtual models of manufacturing machines, simulating complex repairs and assembly procedures. The event highlighted how spatial computing can dramatically reduce training time and increase safety in heavy industries.",
    location: "Holy Convent XR Space",
    date: "May 10, 2026",
    techStack: ["Unity 3D", "WebXR", "Spatial Computing", "Meta Quest API"],
    stats: [
      { label: "Headsets Configured", value: "10 Devices" },
      { label: "Simulated Tasks", value: "8 Modules" },
      { label: "User Immersion Rating", value: "4.9/5" }
    ],
    highlights: [
      "Multi-user shared virtual workspace testing",
      "Interactive tutorial on CAD model rendering in spatial computing environments",
      "Live diagnostic simulation of a micro-turbine engine in virtual reality"
    ]
  },
  {
    slug: "hardware-logic",
    title: "Hardware Logic",
    category: "Workshop",
    desc: "Deep-dive sessions into silicon architecture, circuit design, and IoT protocols.",
    url: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.36-PM.jpeg",
    detailedDesc: "A masterclass in hardware description languages (HDLs) and electronic circuit design. Participants explored the fundamentals of silicon logic, programmed Field Programmable Gate Arrays (FPGAs) to perform mathematical computations, and designed custom PCB layouts using state-of-the-art schematic capture tools.",
    location: "Koteshwar Silicon Center",
    date: "May 15, 2026",
    techStack: ["Verilog / VHDL", "FPGA Programming", "KiCad PCB Design", "Digital Logic Synthesis"],
    stats: [
      { label: "FPGA Boards", value: "24 Units" },
      { label: "PCBs Designed", value: "12 Custom Layouts" },
      { label: "Synthesized Gates", value: "2.4M Gates" }
    ],
    highlights: [
      "Programming FPGAs to run real-time hardware encryption/decryption",
      "PCB routing workshop focusing on high-speed signal integrity and shielding",
      "Analysis of logic analyzer data to debug transmission glitches in serial communication"
    ]
  },
  {
    slug: "ai-classrooms",
    title: "AI Classrooms",
    category: "Training",
    desc: "Implementing advanced neural network models in modern educational environments.",
    url: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.35-PM-1.jpeg",
    detailedDesc: "Focusing on the democratization of AI, this training session equipped local educators and senior university students with the tools to teach machine learning models. The curriculum covered fine-tuning open-weight language models, training basic convolutional networks for image classification, and deploying models using simple API endpoints.",
    location: "Birla Academic Innovation Center",
    date: "May 18, 2026",
    techStack: ["PyTorch", "Hugging Face Hub", "Transformers API", "Docker Containerization"],
    stats: [
      { label: "Educators Certified", value: "35 Instructors" },
      { label: "AI Models Deployed", value: "15 REST APIs" },
      { label: "Data Records Tuned", value: "50k+ Rows" }
    ],
    highlights: [
      "Fine-tuning a localized question-answering assistant on custom textbook data",
      "Demonstrating image-based attendance tracking algorithms using custom edge cameras",
      "Distributing open-source educational modules for immediate classroom integration"
    ]
  },
  {
    slug: "tactical-expo",
    title: "Tactical Expo",
    category: "Highlights",
    desc: "Live deployment of tactical technology and field surveillance systems.",
    url: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-12.48.28-PM-1.jpeg",
    detailedDesc: "The Tactical Expo demonstrated high-performance field equipment, including synchronized drone squads, mesh networking units, and real-time surveillance processing systems. This exhibition showed how rugged, portable hardware can be deployed rapidly in disaster scenarios to establish contact, run thermal analytics, and map terrain under challenging atmospheric conditions.",
    location: "Shauryasaihiki Testing Grounds",
    date: "May 20, 2026",
    techStack: ["Thermal Imaging", "Mesh Networking", "Drone Fleet Coordination", "RTK GPS Localization"],
    stats: [
      { label: "Drones in Fleet", value: "6 Copters" },
      { label: "Mesh Range Covered", value: "4.5 Kilometers" },
      { label: "Image Analytics Latency", value: "35ms" }
    ],
    highlights: [
      "Autonomous search-and-rescue mission simulation using localized heat signatures",
      "Stress-testing mesh networking ranges in dense forested environments",
      "Deploying solar-powered relay modules designed for long-term field installation"
    ]
  }
];
