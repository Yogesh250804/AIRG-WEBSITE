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
    url: "/extracted-hi/09462899-fd09-4dd9-9f48-a2ef7174280e.jpeg",
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
    slug: "industrial-expo",
    title: "Industrial Expo",
    category: "Exhibition",
    desc: "Large-scale demonstration of automated robotics and smart-factory ecosystems.",
    url: "/extracted-hi/0d0a47da-fa16-46de-a21d-0535b434d063.jpeg",
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
    url: "/extracted-hi/12ed4d69-0743-419b-bc95-454d67ff7d5f.jpeg",
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
    url: "/extracted-hi/13b605b2-a681-45de-911d-b3724780786c.jpeg",
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
    url: "/extracted-hi/15bb553a-5336-4d36-8c55-818efdfbac5f.jpeg",
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
    url: "/extracted-hi/1b6ad0f0-e1bb-4ef7-b799-60d07bbc9800.jpeg",
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
    url: "/extracted-hi/2b5a45d0-4af7-4af0-9ce7-050df50662f4.jpeg",
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
  },
  {
    slug: "drone-navigation",
    title: "Autonomous Drone Navigation",
    category: "Aviation",
    desc: "Autonomous flight path computing and real-time obstacle avoidance systems.",
    url: "/extracted-hi/2dedec70-5df7-4417-a08f-16a09e3ba02a.jpeg",
    detailedDesc: "Learn key pathfinding and navigation algorithms used to fly autonomous drones in complex, unmapped environments.",
    location: "AIG Aero Lab, Satara",
    date: "June 5, 2026",
    techStack: ["ROS2", "SLAM", "Computer Vision", "PX4 Autopilot"],
    stats: [
      { label: "Hours of Flight", value: "120 Hrs" },
      { label: "Algorithms Tested", value: "8 Active" },
      { label: "Sync Latency", value: "18ms" }
    ],
    highlights: [
      "Real-time LiDAR mapping using ROS2 nodes",
      "Hands-on obstacle avoidance flight trials",
      "Point-cloud data visualisations"
    ]
  },
  {
    slug: "robotics-assembly",
    title: "Robotics Assembly Bootcamp",
    category: "Robotics",
    desc: "Industrial-grade robot arm design, kinematics, and motor calibration.",
    url: "/extracted-hi/36ce59c9-c73c-4415-9b0b-9b3453af7866.jpeg",
    detailedDesc: "A hands-on engineering masterclass focused on the assembly, wiring, and kinematic calibration of 6-axis industrial robotic arms.",
    location: "AIG Robotics Lab, Pune",
    date: "June 18, 2026",
    techStack: ["Inverse Kinematics", "CAN Bus communication", "Calibrators", "MCU Programming"],
    stats: [
      { label: "Axes Calibrated", value: "6 Axis" },
      { label: "Custom Arm Designs", value: "12 Assemblies" },
      { label: "Joint Precision", value: "0.02mm" }
    ],
    highlights: [
      "Assembling high-torque actuator joints",
      "Programming servo motors via CAN Bus protocols",
      "Configuring forward and inverse kinematic coordinates"
    ]
  },
  {
    slug: "deep-learning-core",
    title: "Deep Learning Core",
    category: "Machine Learning",
    desc: "Training neural networks from scratch, matrix calculations, and backpropagation.",
    url: "/extracted-hi/428fac04-8639-484f-bfe1-625d489fdaa1.jpeg",
    detailedDesc: "Deep dive into backpropagation, custom loss functions, and optimizing layers to build enterprise-grade neural models from scratch.",
    location: "AI Innovation Lab, Satara",
    date: "July 2, 2026",
    techStack: ["PyTorch", "NumPy Matrix Operations", "Gradient Optimization", "CUDA Compilation"],
    stats: [
      { label: "Epochs Run", value: "10,000+" },
      { label: "Models Synthesized", value: "4 Frameworks" },
      { label: "Accuracy Achieved", value: "98.7%" }
    ],
    highlights: [
      "Deriving gradient descents manually",
      "Optimizing layers for CUDA-based hardware acceleration",
      "Deploying model endpoints using Docker"
    ]
  }
];
