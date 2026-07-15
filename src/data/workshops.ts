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
    slug: "school-level-robotics-1",
    title: "AIRG Junior Robotics & Circuit Designing",
    category: "School Level",
    desc: "Introducing fundamental electronics, logic gates, and breadboard circuitry to school students through interactive hands-on builds.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00.jpg",
    detailedDesc: "Our school-level workshops establish foundational skills in hardware and software design. Working directly with breadboards, logic gate ICs, resistors, and solar-power components, young learners understand how physical inputs control digital systems. These sessions empower students to design autonomous line-following cars and smart LDR lighting prototypes, making science education practical and engaging.",
    location: "Satara & Pune District Schools",
    date: "Ongoing Program",
    techStack: ["Breadboards", "Logic Gate ICs", "LEDs", "LDR Sensors", "Solar Panels"],
    stats: [
      { label: "Schools Covered", value: "15+ Schools" },
      { label: "Students Trained", value: "3,000+ Students" },
      { label: "Projects Completed", value: "500+ Builds" }
    ],
    highlights: [
      "Students build and present fully functional solar-powered smart light setups",
      "Hands-on breadboard assembly workshops teaching discrete AND/OR/NOT logic gates",
      "Weekly block-coding and robotics sessions integrated directly into school hours"
    ]
  },
  {
    slug: "industry-level-automation-2",
    title: "Industrial Automation & Applied AI Bootcamps",
    category: "Industry Level",
    desc: "Practical training bootcamps for industry professionals focusing on autonomous systems, manufacturing automation, and custom robotic solutions.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(1).jpg",
    detailedDesc: "Our professional bootcamps bridge the gap between academic theory and active industrial deployment. Working with high-grade robotic actuators, vision sensors, programmable logic controllers (PLCs), and deep-learning models, participants build solutions for smart manufacturing, quality-control automation, and autonomous navigation — equipping them to lead innovation in production environments.",
    location: "AIRG Corporate Training Centers",
    date: "Active Program",
    techStack: ["Applied AI Engines", "Robot Operating System (ROS)", "PLC Systems", "Computer Vision"],
    stats: [
      { label: "Professionals Trained", value: "500+ Candidates" },
      { label: "Corporate Partners", value: "12+ Companies" },
      { label: "Placement Success", value: "92% Placed" }
    ],
    highlights: [
      "Intensive 6-week bootcamps focusing on machine vision algorithms for manufacturing lines",
      "Direct integration trials with autonomous navigation and obstacle-avoidance robots",
      "Hands-on work building custom industrial sensor nodes for production-level diagnostics"
    ]
  },
  {
    slug: "international-stem-outreach-3",
    title: "AIRG International STEM & Robotics Outreach",
    category: "Institute Level",
    desc: "Bringing world-class STEM education, low-cost robotics kits, and digital literacy tools to international students across global communities.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(2).jpg",
    detailedDesc: "The AIRG International Outreach program extends modern tech education to global schools and partner centers. By designing modular, cost-efficient robotics kits and local-language digital curriculums, we enable children in developing communities to build autonomous car models, configure smart sensors, and write block-based scripts — sparking creative thinking and equipping them for a digital future.",
    location: "Global Schools & Partner Centers",
    date: "Active Outreach",
    techStack: ["Robotic Car Kits", "Visual Block Coding", "STEM Pedagogy", "Offline Learning Kits"],
    stats: [
      { label: "Countries Covered", value: "3+ Global Regions" },
      { label: "Outreach Centers", value: "15+ Centers" },
      { label: "Students Engaged", value: "2,500+ Worldwide" }
    ],
    highlights: [
      "Deployment of custom offline-capable learning kits to support regions with low connectivity",
      "Interactive coding and robotics workshops for young learners utilizing physical cars",
      "Special training programs conducted for local educators to sustain STEM education long-term"
    ]
  },
  {
    slug: "ai-ml-innovation-setup-4",
    title: "AI & Machine Learning Innovation Setup",
    category: "Academic Level",
    desc: "Deploying high-performance compute resources, vision models, and custom educational frameworks in higher academic systems.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(3).jpg",
    detailedDesc: "Our academic setup programs enable universities and engineering colleges to host advanced artificial intelligence laboratories. Deploying local GPU resources, edge nodes, and visual classification systems, we empower students to train, test, and package machine learning solutions directly within campus borders.",
    location: "National Partner Institutes",
    date: "Active Program",
    techStack: ["GPU Clusters", "Visual Models", "Local Server Edge Nodes", "Python SDKs"],
    stats: [
      { label: "Centers Implemented", value: "8+ Innovation Labs" },
      { label: "Active Researchers", value: "450+ Engineers" },
      { label: "Models Deployed", value: "120+ AI Models" }
    ],
    highlights: [
      "Integration of real-time computer vision classifiers inside standard class formats",
      "Hands-on server management training focusing on edge AI models and private networks",
      "Dedicated access to custom Python development SDKs for hardware integrations"
    ]
  },
  {
    slug: "robotics-integration-logic-5",
    title: "Robotics Integration & Logic Design",
    category: "School Level",
    desc: "Interactive workshops teaching logic gate combinations, sensor interfaces, and robotic control flow design to secondary schools.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(4).jpg",
    detailedDesc: "We provide comprehensive equipment, kits, and training for students to master logical control boards, actuators, and signal interfaces. These hands-on labs teach the foundations of modern robotics, preparing students for advanced electronics fields.",
    location: "Partner High Schools",
    date: "Active Program",
    techStack: ["Robotics Boards", "Actuators", "Logic Design", "Sensor Matrices"],
    stats: [
      { label: "Participating Schools", value: "20+ Schools" },
      { label: "Kits Distributed", value: "800+ Kits" },
      { label: "Workshops Hosted", value: "40+ Events" }
    ],
    highlights: [
      "Building multi-sensor collision prevention systems with visual feedback",
      "Analyzing signal logic diagrams and tracing circuit connections interactively",
      "Creating custom automated behaviors based on physical environment triggers"
    ]
  },
  {
    slug: "edge-computing-iot-6",
    title: "Edge Computing & IoT Lab Deployment",
    category: "Institute Level",
    desc: "Advanced networking and processing configurations at the edge of active IoT infrastructures.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(5).jpg",
    detailedDesc: "Our IoT lab systems enable student developers to deploy microchip networks running telemetry, MQTT servers, and database bridges locally. These setups prepare engineering candidates for modern distributed system architectures.",
    location: "State Incubation Centers",
    date: "Active Program",
    techStack: ["Edge Nodes", "MQTT Servers", "IoT Network Bridges", "Telemetry"],
    stats: [
      { label: "Incubators Equipped", value: "6+ Centers" },
      { label: "Nodes Active", value: "150+ Nodes" },
      { label: "Certified Candidates", value: "300+ Engineers" }
    ],
    highlights: [
      "Deploying local broker grids and testing transmission speed of telemetry packets",
      "Securing device communication lines via local credential verification standards",
      "Familiarizing students with cloud synchronization protocols and data backup structures"
    ]
  },
  {
    slug: "applied-ai-center-7",
    title: "Applied Artificial Intelligence Center",
    category: "Industry Level",
    desc: "Professional AI infrastructure and computer vision packages built for deployment in commercial environments.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(6).jpg",
    detailedDesc: "Providing edge computing solutions, smart camera grids, and visual diagnostic tools for commercial operations and industrial manufacturing pipelines, ensuring high efficiency and precision.",
    location: "Corporate Innovation Centers",
    date: "Ongoing Program",
    techStack: ["Edge Compute Units", "Smart Cameras", "Visual Diagnostics", "Predictive ML"],
    stats: [
      { label: "Deployment Settings", value: "15+ Sites" },
      { label: "Sensors Managed", value: "500+ Active Units" },
      { label: "Precision Rate", value: "99.2% Accuracy" }
    ],
    highlights: [
      "Configuring smart visual sorting scripts for production line objects",
      "Implementing low-latency data streams to local monitoring consoles",
      "Optimizing deep neural networks to run efficiently on low-power hardware"
    ]
  },
  {
    slug: "autonomous-systems-drone-8",
    title: "Autonomous Systems & Drone Telemetry",
    category: "Institute Level",
    desc: "Configuring flight controllers, navigation sensors, and real-time telemetry systems for autonomous robotics.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(7).jpg",
    detailedDesc: "Empowering university candidates with technical flight controller configurations, GPS positioning systems, and sensor integrations to construct and pilot fully autonomous rovers and drones.",
    location: "Global Outreach Centers",
    date: "Active Program",
    techStack: ["Flight Controllers", "GPS Modules", "Real-Time Telemetry", "Autonomous Rover Build"],
    stats: [
      { label: "Outreach Facilities", value: "12+ Hubs" },
      { label: "Systems Deployed", value: "200+ Rover Units" },
      { label: "Students Engaged", value: "1,500+ Worldwide" }
    ],
    highlights: [
      "Building quadcopter telemetry networks and monitoring real-time flight patterns",
      "Setting up GPS path navigation coordinates for off-road rover platforms",
      "Applying sensor fusion algorithms to combine gyro, compass, and laser measurements"
    ]
  },
  {
    slug: "digital-literacy-hardware-9",
    title: "Digital Literacy & Hardware Foundations",
    category: "School Level",
    desc: "Hands-on basic hardware assemblies, component sorting, and electronic circuit logic training.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(8).jpg",
    detailedDesc: "We provide early education modules helping school students build fundamental understandings of wires, batteries, switches, resistors, and basic logic gates via color-coded visual blocks.",
    location: "Rural Development Schools",
    date: "Ongoing Program",
    techStack: ["Basic Circuits", "Component Sorting", "Electronic Blocks", "Visual Logic"],
    stats: [
      { label: "Rural Schools", value: "35+ Schools" },
      { label: "Students Reached", value: "8,000+ Students" },
      { label: "Blocks Distributed", value: "1,200+ Packs" }
    ],
    highlights: [
      "Assembling battery-powered motor assemblies with physical switches",
      "Learning component sorting based on resistance and function markings",
      "Writing logic flow diagrams on paper and testing them with physical logic blocks"
    ]
  },
  {
    slug: "embedded-systems-microcontroller-10",
    title: "Embedded Systems & Microcontroller Lab",
    category: "Institute Level",
    desc: "Practical coding and wiring sessions on development boards (ESP32 / Arduino UNO) for university students.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(9).jpg",
    detailedDesc: "Designed to provide mechanical, electrical, and computer engineering students with hands-on practice in writing low-level firmware, managing interrupts, and configuring GPIO interfaces.",
    location: "Engineering Partner Colleges",
    date: "Active Program",
    techStack: ["ESP32", "Arduino IDE", "Interrupt Management", "GPIO Wiring"],
    stats: [
      { label: "Engineering Labs", value: "14+ Centers" },
      { label: "Active Student Boards", value: "600+ Units" },
      { label: "Research Projects", value: "90+ Submissions" }
    ],
    highlights: [
      "Programming dual-core ESP32 microcontrollers to handle concurrent sensor tasks",
      "Interfacing LCD panels and physical keypad arrays for user inputs",
      "Testing serial communication protocols like SPI and I2C on breadboards"
    ]
  },
  {
    slug: "smart-manufacturing-robotics-11",
    title: "Smart Manufacturing & Robotics Training",
    category: "Industry Level",
    desc: "High-grade industrial arm training, custom sorting robots, and automated production system simulators.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(10).jpg",
    detailedDesc: "Training courses for senior students and professionals to operate, program, and maintain multi-axis robotic arms, pneumatic sorting grids, and manufacturing line simulators.",
    location: "AIRG Technical Hubs",
    date: "Active Program",
    techStack: ["Multi-Axis Robotic Arms", "Pneumatics", "Manufacturing Simulators", "Robot Safety Protocols"],
    stats: [
      { label: "Technical Hubs", value: "4+ Main Hubs" },
      { label: "Industrial Robots", value: "24+ Units" },
      { label: "Certified Operators", value: "180+ Candidates" }
    ],
    highlights: [
      "Writing path execution programs for 6-axis robotic arms",
      "Integrating pneumatic grippers and suction cups into automated pipelines",
      "Implementing safe emergency-stop loops and checking proximity sensor boundaries"
    ]
  }
];
