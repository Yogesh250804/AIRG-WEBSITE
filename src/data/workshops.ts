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
    slug: "mudhoji-lab-launch",
    title: "Mudhoji High School Lab Launch",
    category: "Lab Inauguration",
    desc: "Official launch of AIR G's robotics & AI lab at Mudhoji High School, Phaltan — empowering rural students with hands-on STEM education.",
    url: "/extracted-hi/09462899-fd09-4dd9-9f48-a2ef7174280e.jpeg",
    detailedDesc: "The inauguration of the AIR G Innovation Lab at Mudhoji High School, Phaltan marked a significant milestone in bringing quality STEM education to rural Maharashtra. Institutional leaders, school principals, and district education officials attended the launch ceremony. Students were introduced to Arduino-based robotics kits, Scratch block-coding environments, and 3D printing workstations. The event set the foundation for AIR G's school lab mission across the Satara district.",
    location: "Mudhoji High School, Phaltan, Satara",
    date: "March 28, 2026",
    techStack: ["Arduino UNO", "Scratch Programming", "3D Printing", "STEM Robotics Kits", "Tinkercad"],
    stats: [
      { label: "Students Enrolled", value: "240+ Students" },
      { label: "Robotics Kits", value: "25+ Active Kits" },
      { label: "Completed Projects", value: "65+ Projects" }
    ],
    highlights: [
      "Inauguration attended by district education authority and AIR G leadership",
      "Live demonstration of student-built autonomous line-following robots",
      "Distribution of AIR G Junior Starter Kits to Grade 1–3 students"
    ]
  },
  {
    slug: "sakharwadi-agri-workshop",
    title: "Sakharwadi AgriTech Workshop",
    category: "Agriculture & IoT",
    desc: "Students built smart irrigation prototypes using soil sensors and Arduino — connecting technology with local farming at Sakharwadi High School.",
    url: "/extracted-hi/0d0a47da-fa16-46de-a21d-0535b434d063.jpeg",
    detailedDesc: "At Sakharwadi High School, AIR G conducted a hands-on AgriTech workshop bringing together students from surrounding farming communities. Participants learned to interface soil moisture sensors with automated micro-pump actuators using Arduino ESP32 boards. The workshop bridged the digital divide between rural agriculture and modern IoT technology, with students programming real-time soil monitoring dashboards to support local smallholder farmers.",
    location: "Sakharwadi High School, Satara District",
    date: "April 12, 2026",
    techStack: ["Arduino ESP32", "Soil Moisture Sensors", "Micro-Pump Actuators", "LED Displays", "IoT Dashboard"],
    stats: [
      { label: "Active Learners", value: "180+ Students" },
      { label: "Soil Telemetry Kits", value: "15+ Workstations" },
      { label: "Smart Irrigation Prototypes", value: "8 Built" }
    ],
    highlights: [
      "Students programmed sensor kits to automatically water school garden plants",
      "Created digital temperature and humidity alarms for classroom weather monitoring",
      "Live demonstration of smart watering system to village sarpanch and school management"
    ]
  },
  {
    slug: "rajendra-khandala-flight-lab",
    title: "Rajendra Khandala Flight Science Lab",
    category: "Aerodynamics & Physics",
    desc: "Students at Rajendra School, Khandala assembled gliders and explored aerodynamics — discovering flight physics through real hands-on experiments.",
    url: "/extracted-hi/12ed4d69-0743-419b-bc95-454d67ff7d5f.jpeg",
    detailedDesc: "The AIR G Flight Science Lab at Rajendra School in Khandala introduced students to fundamental aerodynamics through the construction and testing of model gliders. Students studied wing geometry, lift-to-drag ratios, and trajectory physics in a guided outdoor session. Using aero simulation software alongside physical models, students gained an intuitive understanding of aviation mechanics — a critical foundation for future engineering careers.",
    location: "Rajendra School, Khandala, Satara",
    date: "April 25, 2026",
    techStack: ["Model Glider Kits", "Aero Simulation Software", "Electronic Sensors", "Physics Measurement Tools"],
    stats: [
      { label: "Gliders Assembled", value: "50+ Models" },
      { label: "Students Enrolled", value: "150+ Students" },
      { label: "Physics Experiments", value: "30+ Logged" }
    ],
    highlights: [
      "Designed and launched micro-gliders with optimised wing ratios in outdoor field trials",
      "Used simulation software to compare airflow models against real physical results",
      "Conducted inter-class flight range and stability competition"
    ]
  },
  {
    slug: "sant-tukaram-electronics-bootcamp",
    title: "Sant Tukaram Electronics Bootcamp",
    category: "Electronics & Logic",
    desc: "Hands-on electronics bootcamp at Sant Tukaram School — students assembled logic gate circuits, LED arrays, and breadboard systems from scratch.",
    url: "/extracted-hi/13b605b2-a681-45de-911d-b3724780786c.jpeg",
    detailedDesc: "AIR G's Electronics Bootcamp at Sant Tukaram School gave students a foundational understanding of how computers work at the hardware level. Over a two-day intensive programme, students assembled AND, OR, and NOT logic gate circuits on breadboards, learned to read circuit schematics, and built light-sensing automation systems using photoresistors. The session was also attended by science teachers who received hands-on training as part of AIR G's Faculty Development Programme (FDP).",
    location: "Sant Tukaram School, Satara District",
    date: "May 2, 2026",
    techStack: ["Breadboards", "Logic Gate ICs (AND/OR/NOT)", "Multimeters", "LED Arrays", "Resistors & Capacitors"],
    stats: [
      { label: "Students Guided", value: "190+ Students" },
      { label: "Electronic Benches", value: "12 Stations" },
      { label: "Logic Circuits Built", value: "80+ Designs" }
    ],
    highlights: [
      "Built full-adder circuits on breadboards using discrete logic ICs",
      "Designed light-sensing night lights using photoresistors and relay switches",
      "8 science teachers trained in electronics as part of AIR G FDP"
    ]
  },
  {
    slug: "swami-ramanand-bioscience-workshop",
    title: "Swami Ramanand BioScience Workshop",
    category: "Biology & Sensors",
    desc: "Students used pulse sensors, temperature probes, and real-time dashboards to explore human biology — merging life sciences with IoT technology.",
    url: "/extracted-hi/15bb553a-5336-4d36-8c55-818efdfbac5f.jpeg",
    detailedDesc: "At the Swami Ramanand Lab, AIR G bridged biology and technology by equipping students with wearable-style sensors that recorded heart rate, body temperature, and respiratory data during physical activity. Students analysed their readings using Python-based data science tools, learning to plot graphs, identify patterns, and draw biological conclusions from real sensor data — transforming the traditional biology classroom into a dynamic laboratory experience.",
    location: "Swami Ramanand School, Satara District",
    date: "May 10, 2026",
    techStack: ["Heart Rate Monitors", "Temperature Probes", "Python Data Science", "Scratch UI Builder", "Arduino Nano"],
    stats: [
      { label: "Sensor Workstations", value: "10 Active Setups" },
      { label: "Students Trained", value: "140+ Students" },
      { label: "Biology Projects", value: "25+ Completed" }
    ],
    highlights: [
      "Mapped heart rate recovery curves using live sensor graphs during exercise sessions",
      "Built Scratch animations that responded to live temperature sensor readings",
      "Students presented findings and earned awards at district science fair"
    ]
  },
  {
    slug: "koteshwar-coding-olympiad",
    title: "Koteshwar Vidyalay Coding Olympiad",
    category: "Coding & Embedded",
    desc: "AIR G hosted an inter-school coding olympiad at Koteshwar Vidyalay, Wai — students programmed LED matrices, games, and timers on Arduino.",
    url: "/extracted-images/koteshwar/koteshwar_0.jpeg",
    detailedDesc: "Koteshwar Vidyalay in Wai hosted an exciting inter-school Coding Olympiad organised by AIR G. Competing students programmed Arduino Nano boards connected to 8x8 LED matrices and LCD screens to create retro games, scrolling messages, and digital countdown timers. The event drew participants from six surrounding schools and was judged by AIR G engineers and district education inspectors, spotlighting student coding talent from rural Maharashtra.",
    location: "Koteshwar Vidyalay, Wai, Satara",
    date: "May 18, 2026",
    techStack: ["Arduino Nano", "8x8 LED Matrices", "LCD Character Screens", "C++ Coding", "Buzzer Sounds"],
    stats: [
      { label: "Schools Participating", value: "6 Schools" },
      { label: "Students Engaged", value: "210+ Students" },
      { label: "Code Projects Submitted", value: "45+ Programmes" }
    ],
    highlights: [
      "Programmed a live school bell countdown timer on LCD screens",
      "Designed and coded retro 2D snake games using LED grids and tactile buttons",
      "Top 3 winners received AIR G Innovation Certificates and IoT starter kits"
    ]
  },
  {
    slug: "shauryasaihiki-cyber-safety-camp",
    title: "Shauryasaihiki Cyber Safety Camp",
    category: "Digital Literacy",
    desc: "AIR G's cyber literacy camp taught students safe browsing, password hygiene, and personal website building — creating digitally aware citizens.",
    url: "/extracted-hi/2b5a45d0-4af7-4af0-9ce7-050df50662f4.jpeg",
    detailedDesc: "The AIR G Cyber Safety Camp at Shauryasaihiki School addressed one of rural India's fastest-growing challenges — digital literacy and online safety. Students learned to build personal HTML/CSS portfolio websites on local servers, identify phishing threats, and create strong passwords. The camp's 'Student Ambassador' programme empowered top participants to teach safe internet practices to their peers and family members, creating a ripple effect of digital awareness in the community.",
    location: "Shauryasaihiki School, Satara District",
    date: "May 22, 2026",
    techStack: ["HTML5", "CSS3 Layouts", "Local Web Servers", "Browser Security Tools", "Google Safety Tools"],
    stats: [
      { label: "Websites Created", value: "80+ Portfolios" },
      { label: "Students Certified", value: "160+ Students" },
      { label: "Safety Seminars Held", value: "12 Sessions" }
    ],
    highlights: [
      "Every student built and deployed their own HTML biography website on a local server",
      "Trained 12 student ambassadors to lead cyber safety awareness in their classrooms",
      "Phishing simulation exercise — 94% of students correctly identified threats"
    ]
  },
  {
    slug: "airg-drone-field-day",
    title: "AIR G Drone Field Day",
    category: "Drone & Aviation",
    desc: "Students piloted and programmed drones, learning autonomous GPS navigation and obstacle avoidance at AIR G's annual outdoor field day.",
    url: "/extracted-hi/2dedec70-5df7-4417-a08f-16a09e3ba02a.jpeg",
    detailedDesc: "AIR G's Drone Field Day brought students from multiple partner schools together at an open outdoor venue for hands-on drone education. Students learned the fundamentals of quadcopter mechanics, GPS waypoint navigation, and basic autonomous flight programming using AIR G's drone kits. Senior students participated in a timed obstacle-course challenge, while younger grades observed flight demonstrations and received introductory lessons on aviation safety and drone regulations in India.",
    location: "Outdoor Field Campus, Satara District",
    date: "June 5, 2026",
    techStack: ["AIR G Drone Kits", "GPS Waypoint Navigation", "Obstacle Course Setup", "Flight Simulation App", "PX4 Autopilot Basics"],
    stats: [
      { label: "Students Participating", value: "300+ Students" },
      { label: "Drones in Operation", value: "8 Quadcopters" },
      { label: "Schools Represented", value: "10 Schools" }
    ],
    highlights: [
      "Live quadcopter demos showing autonomous waypoint navigation over school grounds",
      "Students programmed basic obstacle-avoidance flight paths using AIR G drone app",
      "Timed drone obstacle-course finals with top 3 teams receiving AIR G trophies"
    ]
  },
  {
    slug: "airg-robotics-assembly-bootcamp",
    title: "AIR G Robotics Assembly Bootcamp",
    category: "Robotics",
    desc: "Intensive bootcamp where students assembled, wired, and programmed autonomous robots from component level — from chassis to finished code.",
    url: "/extracted-hi/36ce59c9-c73c-4415-9b0b-9b3453af7866.jpeg",
    detailedDesc: "AIR G's Robotics Assembly Bootcamp was a two-day intensive programme where students built autonomous robots entirely from components. Starting from mechanical chassis assembly, students progressed to motor wiring, microcontroller interfacing, and finally programming motion sequences and sensor-based decisions. The bootcamp culminated in a maze-solving challenge where student robots had to navigate a custom obstacle track — testing every skill built over the two-day programme.",
    location: "AIR G Innovation Hub, Satara",
    date: "June 18, 2026",
    techStack: ["Arduino Microcontrollers", "DC Motors & Encoders", "Ultrasonic Sensors", "IR Sensors", "C++ Embedded Code"],
    stats: [
      { label: "Robots Assembled", value: "24 Working Models" },
      { label: "Students Trained", value: "90 Students" },
      { label: "Maze Completion Rate", value: "87%" }
    ],
    highlights: [
      "Students built complete autonomous robots from bare chassis to functional code in 2 days",
      "Maze-solving robot challenge judged by AIR G engineers and school principals",
      "Top-scoring robot demonstrated to media and district collector's office"
    ]
  },
  {
    slug: "bharat-ai-engine-school-deployment",
    title: "Bharat AI Engine School Deployment",
    category: "AI Education",
    desc: "AIR G deployed its flagship Bharat AI Engine platform across partner schools — bringing local-language AI, vision tools, and coding to rural classrooms.",
    url: "/extracted-hi/428fac04-8639-484f-bfe1-625d489fdaa1.jpeg",
    detailedDesc: "The Bharat AI Engine deployment programme represented a landmark event in AIR G's mission to democratise AI education in India. AIR G's proprietary offline-capable AI platform — featuring local-language models, vision AI, an LMS, and embedded coding tools — was installed across 10 partner school computer labs. Teachers received a 3-day Faculty Development Programme (FDP) to operate the system confidently, and students were introduced to conversational AI, image recognition, and Python scripting in regional languages.",
    location: "Multiple Partner Schools, Satara & Pune Districts",
    date: "July 2, 2026",
    techStack: ["Bharat AI Engine (Education Edition)", "Local Language AI Models", "Vision AI Modules", "LMS Platform", "Python Coding Environment"],
    stats: [
      { label: "Schools Deployed", value: "10 Schools" },
      { label: "Teachers Certified", value: "35 Instructors" },
      { label: "Students Accessing AI", value: "2,000+ Students" }
    ],
    highlights: [
      "First offline-capable AI education platform deployed in rural Maharashtra schools",
      "Students interacted with AI in Marathi and Hindi for the first time in a classroom",
      "Recognised by district education department as a model for state-wide adoption"
    ]
  }
];
