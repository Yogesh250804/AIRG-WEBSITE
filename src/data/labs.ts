export interface Lab {
  slug: string;
  name: string;
  icon: string;
  sIcon: string;
  desc: string;
  detailedDesc: string;
  status: string;
  img: string; // Keep for backwards compatibility
  images: string[];
  techStack: string[];
  stats: { label: string; value: string }[];
  highlights: string[];
}

export const labsData: Lab[] = [
  {
    slug: "mudhoji-lab",
    name: "Mudhoji Lab",
    icon: "precision_manufacturing",
    sIcon: "radar",
    desc: "Advanced Robotics & AI Strategy. Focusing on the integration of student robotics with coding education.",
    detailedDesc: "Mudhoji Lab, located at Mudhoji High School in Phaltan, is a dedicated space for hands-on learning. Students learn to program Arduino boards, build block-based and C++ robotics models, and design parts using 3D printers, fostering early interest in engineering and computer science.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.01.02-PM.jpeg"
    ],
    techStack: ["Arduino UNO", "Scratch Programming", "3D Printing", "STEM Robotics Kits", "Tinkercad"],
    stats: [
      { label: "Students Trained", value: "240+ Students" },
      { label: "Robotics Kits", value: "25+ Active Kits" },
      { label: "Completed Projects", value: "65+ Projects" }
    ],
    highlights: [
      "Built autonomous line-following robot models for regional exhibitions",
      "Designed and 3D-printed custom mechanical gears in class",
      "Hosted weekly block-coding bootcamps for middle school grades"
    ]
  },
  {
    slug: "sakharwadi-lab",
    name: "Sakharwadi Lab",
    icon: "agriculture",
    sIcon: "potted_plant",
    desc: "Agricultural Tech & Science. Automated irrigation prototypes and soil moisture telemetry developed by students.",
    detailedDesc: "Located at Sakharwadi High School, this lab leverages technology to understand local agriculture. Students write code to interface soil sensors with automated water pumps, building practical smart-watering systems and weather monitoring stations.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.04.08-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg"
    ],
    techStack: ["Soil Moisture Sensors", "Arduino ESP32", "Micro-Pump Actuators", "LED Displays"],
    stats: [
      { label: "Active Learners", value: "180+ Students" },
      { label: "Soil Telemetry Kits", value: "15+ Workstations" },
      { label: "School Greenhouses", value: "2 Monitored Zones" }
    ],
    highlights: [
      "Programmed soil sensor kits to automatically water school plants",
      "Created digital temperature alarms for classroom weather monitoring",
      "Conducted agricultural science workshops using real-time data kits"
    ]
  },
  {
    slug: "rajendra-khandala",
    name: "Rajendra Khandala Lab",
    icon: "rocket_launch",
    sIcon: "flight_takeoff",
    desc: "Aerodynamics & Flight Science. Assembly of educational gliders and model rockets to teach physics.",
    detailedDesc: "Situated at Rajendra School in Khandala, this lab introduces students to aviation science. Through constructing model gliders, studying wind resistance, and mapping flight paths, physics concepts are made active and engaging.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.04.07-PM-1.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.36-PM-1.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg"
    ],
    techStack: ["Model Glider Kits", "Aero Simulation Software", "Electronic Sensors", "Physics Measurement Tools"],
    stats: [
      { label: "Gliders Assembled", value: "50+ Models" },
      { label: "Students Enrolled", value: "150+ Students" },
      { label: "Physics Experiments", value: "30+ Logged" }
    ],
    highlights: [
      "Designed and launched micro-gliders with optimal wing ratios",
      "Used software to simulate airflow over wings and understand lift",
      "Conducted outdoor flight competitions testing range and stability"
    ]
  },
  {
    slug: "sant-tukaram",
    name: "Sant Tukaram Lab",
    icon: "hub",
    sIcon: "lan",
    desc: "Electronics & Logic Circuitry. Breadboard circuit assembly and digital logic gate demonstrations.",
    detailedDesc: "The Sant Tukaram Lab provides a solid foundation in electronics. Students learn to assemble fundamental logic gates on breadboards, utilize resistors, transistors, and LEDs, and understand the core hardware components that make up modern computers.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.36-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.35-PM-1.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg"
    ],
    techStack: ["Breadboards", "Logic Gate ICs (AND/OR/NOT)", "Multimeters", "LED Arrays", "Resistors & Capacitors"],
    stats: [
      { label: "Students Guided", value: "190+ Students" },
      { label: "Electronic Benches", value: "12 Stations" },
      { label: "Logic Circuits Built", value: "80+ Designs" }
    ],
    highlights: [
      "Built full adder circuits on breadboards using discrete ICs",
      "Designed light-sensing night lights using photoresistors",
      "Programmed simple blinking pattern matrices using 555 timers"
    ]
  },
  {
    slug: "swami-ramanand",
    name: "Swami Ramanand Lab",
    icon: "biotech",
    sIcon: "vital_signs",
    desc: "Biology Sensors & STEM. Interfacing pulse sensors and thermal nodes to teach human anatomy.",
    detailedDesc: "At Swami Ramanand Lab, biology meets technology. Students use heart-rate monitors, temperature probes, and respiratory telemetry kits to map physical responses during exercise, learning biological systems through interactive sensor data.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-12.48.28-PM-1.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg"
    ],
    techStack: ["Heart Rate Monitors", "Temperature Probes", "Python Data Science", "Scratch UI Builder"],
    stats: [
      { label: "Sensor Workstations", value: "10 Active Setups" },
      { label: "Active Classrooms", value: "140+ Students" },
      { label: "Anatomy Projects", value: "25+ Completed" }
    ],
    highlights: [
      "Mapped classmates' heart recovery times using digital sensor graphs",
      "Programmed interactive scratch animations responsive to temperature sensors",
      "Conducted educational biology workshops during science fair week"
    ]
  },
  {
    slug: "koteshwar-vidyaly",
    name: "Koteshwar Vidyaly Lab",
    icon: "memory",
    sIcon: "microchip",
    desc: "Microcontrollers & Displays. Coding LED pixel panels and running simple games on Arduino.",
    detailedDesc: "Koteshwar Vidyaly Lab in Wai focuses on embedded software. Students connect microchips with LED matrices, programming basic snake games, countdown timers, and scrolling message displays.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.36-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.36-PM-1.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg"
    ],
    techStack: ["Arduino Nano", "8x8 LED Matrices", "LCD Character Screens", "C++ Coding", "Buzzer Sounds"],
    stats: [
      { label: "Microchip Kits", value: "20+ Boards" },
      { label: "Students Engaged", value: "210+ Students" },
      { label: "Game Code Programs", value: "45+ Uploaded" }
    ],
    highlights: [
      "Programmed a school bell countdown timer displayed on LCD screens",
      "Designed and coded retro 2D games using tactile buttons and LED grids",
      "Conducted inter-school programming competitions on Arduino IDE"
    ]
  },
  {
    slug: "shauryasaihiki",
    name: "Shauryasaihiki Lab",
    icon: "shield",
    sIcon: "policy",
    desc: "Cyber Literacy & Web Basics. Teaching safe browsing, local web building, and internet safety.",
    detailedDesc: "Shauryasaihiki Lab teaches students HTML/CSS essentials and basic internet hygiene. Topics include strong password creation, identifying phishing emails, and building personal static website portfolios.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.35-PM-1.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.01.02-PM.jpeg"
    ],
    techStack: ["HTML5", "CSS3 Layouts", "Local Web Servers", "Browser Security Tools"],
    stats: [
      { label: "Websites Deployed", value: "80+ Portfolios" },
      { label: "Students Certified", value: "160+ Students" },
      { label: "Safety Seminars", value: "12 Conducted" }
    ],
    highlights: [
      "Helped every student build and run their own local HTML biography page",
      "Conducted school-wide training on password management and safety",
      "Trained student ambassadors on checking website SSL certificates"
    ]
  },
  {
    slug: "kshitij-hub",
    name: "Kshitij Hub",
    icon: "eco",
    sIcon: "solar_power",
    desc: "Renewable Energy Models. Building mini solar trackers and studying green energy sources.",
    detailedDesc: "Kshitij Hub focuses on ecological science. Students build mini solar panels that follow the light, assemble wind turbine toys, and track daily energy generated by clean models around the classroom.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.04.08-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg"
    ],
    techStack: ["Mini Solar Panels", "Light Dependent Resistors (LDR)", "Servomotors", "Clean Energy Kits"],
    stats: [
      { label: "Solar Trackers", value: "14 Built" },
      { label: "Active Students", value: "130+ Learners" },
      { label: "Green Experiments", value: "35 Completed" }
    ],
    highlights: [
      "Built working solar tracking mounts using light sensors and motors",
      "Assembled mini-wind generators that light up LEDs when spun",
      "Compiled daily school solar radiation charts to locate optimum panel spots"
    ]
  },
  {
    slug: "shivtej-aare",
    name: "Shivtej Aare Lab",
    icon: "directions_car",
    sIcon: "sensors",
    desc: "Autonomous Mobile Models. Coding line-following cars and ultrasonic obstacle avoidance.",
    detailedDesc: "Shivtej Aare Lab teaches spatial mechanics. Students mount ultrasonic rangefinders to miniature smart cars, programming them to navigate around walls and complete small maze courses without crashing.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.36-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.35-PM-1.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg"
    ],
    techStack: ["Smart Car Chassis", "Ultrasonic Sensors", "Infrared Line Trackers", "Arduino Code"],
    stats: [
      { label: "Navigating Cars", value: "18 Smart Cars" },
      { label: "Classroom Enrollees", value: "170+ Students" },
      { label: "Maze Runs Logged", value: "110+ Runs" }
    ],
    highlights: [
      "Successfully coded smart cars to solve simple cardboard mazes",
      "Programmed emergency brake features responsive to ultrasonic distance",
      "Hosted line-following racing challenges on track sheets in the hallway"
    ]
  },
  {
    slug: "birla-innovation",
    name: "Birla Innovation Lab",
    icon: "home_work",
    sIcon: "architecture",
    desc: "Design & Construction. 3D modeling and evaluating geometric bridge models.",
    detailedDesc: "Birla Innovation Lab combines structural arts with physics. Students create bridge and dome models using 3D CAD design tools, testing their strength under weights to study compression, tension, and load limits.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.36-PM-1.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.01.02-PM.jpeg"
    ],
    techStack: ["3D CAD Design", "3D Printing Filament", "Bridge Model Testers", "Structural Blueprints"],
    stats: [
      { label: "Bridges Tested", value: "30+ Models" },
      { label: "Student Designers", value: "120+ Students" },
      { label: "CAD Designs Saved", value: "85+ Models" }
    ],
    highlights: [
      "Built truss bridge structures that carried 5x their own weight",
      "Created customized 3D models of historical monuments in CAD classes",
      "Analyzed structural support failures using weight testing frames"
    ]
  },
  {
    slug: "s-s-nikam-lab",
    name: "S.S. Nikam Lab",
    icon: "settings_input_component",
    sIcon: "factory",
    desc: "Weather Telemetry & IoT. Running connected weather stations to record local temperature.",
    detailedDesc: "S.S. Nikam Lab introduces internet-connected devices. Middle schoolers configure temperature, humidity, and barometric sensors, uploading live local weather charts to a shared campus web page.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.04.08-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg"
    ],
    techStack: ["DHT11 Temperature Sensor", "Wi-Fi ESP8266 Microchips", "IoT dashboards", "Weather APIs"],
    stats: [
      { label: "Weather Nodes", value: "8 Connected Stations" },
      { label: "Logs Streamed", value: "5000+ Records" },
      { label: "Enrolled Students", value: "140+ Learners" }
    ],
    highlights: [
      "Connected school weather arrays to broadcast local heat indexes",
      "Programmed Wi-Fi chips to email daily classroom humidity summaries",
      "Coded web-dashboards that show daily climate patterns to all teachers"
    ]
  },
  {
    slug: "shoran-tech",
    name: "Shoran Tech Lab",
    icon: "translate",
    sIcon: "record_voice_over",
    desc: "Local Language Software. Building simple scratch-based translation tools for learning.",
    detailedDesc: "Shoran Tech Lab teaches computer software integration with languages. Students build voice translation apps, regional language dictionaries, and interactive scratch games that speak Marathi and Hindi.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.36-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.35-PM-1.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg"
    ],
    techStack: ["Scratch Audio Blocks", "Block Translation APIs", "Voice Recording Tools", "Storytelling Software"],
    stats: [
      { label: "Apps Developed", value: "35+ Scratch Apps" },
      { label: "Middle Schoolers", value: "160+ Students" },
      { label: "Language Modules", value: "3 Dialects Mapped" }
    ],
    highlights: [
      "Coded interactive bilingual vocabulary cards using Scratch text-to-speech",
      "Designed regional storytelling games with voice-activated paths",
      "Conducted educational game showcases during parent-teacher meetings"
    ]
  },
  {
    slug: "venurai-chavan",
    name: "Venurai Chavan Lab",
    icon: "air",
    sIcon: "waves",
    desc: "Fluid Flow Models. Building automatic school water level regulators and tank alerts.",
    detailedDesc: "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.01.02-PM.jpeg"
    ],
    techStack: ["Ultrasonic Depth Sensors", "Relay Cutoffs", "Arduino boards", "Water Flowmeters"],
    stats: [
      { label: "Systems Installed", value: "2 Campus Setups" },
      { label: "Active Classes", value: "110+ Students" },
      { label: "Gallons Conserved", value: "Estimated 1000+ Gal" }
    ],
    highlights: [
      "Programmed ultrasonic tank alarms warning of school tank overflows",
      "Constructed flowmeter sensors showing real-time water usage speeds",
      "Created classroom models explaining how residential pipes manage water flow"
    ]
  },
  {
    slug: "holy-convent",
    name: "Holy Convent Lab",
    icon: "vr_video",
    sIcon: "visibility",
    desc: "Immersive VR Education. Navigating solar systems and organic cells in virtual headsets.",
    detailedDesc: "Located at Holy Convent in Karad, this lab utilizes VR to teach complex sciences. Students take virtual field trips to space, examine microscopic cells, and manipulate virtual organs to bring textbooks to life.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-12.48.28-PM-1.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg"
    ],
    techStack: ["VR Educational Suites", "Spatial WebXR", "3D Solar Maps", "Human Anatomy VR"],
    stats: [
      { label: "VR Headsets", value: "8 Setups" },
      { label: "Interactive Trips", value: "12 Modules" },
      { label: "Engaged Learners", value: "260+ Students" }
    ],
    highlights: [
      "Guided students through a shared virtual tour inside a human blood vessel",
      "Configured web-based astronomy maps so students could select stars",
      "Conducted class-wide science lessons using immersive VR anatomy models"
    ]
  },
  {
    slug: "eon-hub",
    name: "EON Hub",
    icon: "psychology",
    sIcon: "neurology",
    desc: "Coding & Algorithms. Basic Python workshops and logic puzzles to teach computational thinking.",
    detailedDesc: "EON Hub focuses on computer programming fundamentals. Through solving logic puzzles, writing basic Python algorithms, and sorting lists, students develop strong computational thinking skills.",
    status: "Active Lab Center",
    img: "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
    images: [
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.37-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.36-PM.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/04/WhatsApp-Image-2023-03-28-at-1.19.35-PM-1.jpeg",
      "https://gurujiair.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-18-at-6.11.15-PM-2.jpeg"
    ],
    techStack: ["Python 3", "Visual Logic Puzzles", "Algorithms Training", "Jupyter Notebooks"],
    stats: [
      { label: "Python Projects", value: "90+ Scripts" },
      { label: "Students Certified", value: "180+ Learners" },
      { label: "Code Competitions", value: "6 Hosted" }
    ],
    highlights: [
      "Helped every student code a basic command-line word puzzle game in Python",
      "Programmed sorting algorithms showing visual arrays rearrange themselves",
      "Conducted logic code battles that teach clean and efficient syntax"
    ]
  }
];
