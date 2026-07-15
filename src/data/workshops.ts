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
    slug: "rajendra-khandala",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00.jpg",
    detailedDesc: "Situated at Rajendra School in Khandala, this lab introduces students to aviation science. Through constructing model gliders, studying wind resistance, and mapping flight paths, physics concepts are made active and engaging.",
    location: "Khandala, Maharashtra",
    date: "Active Lab",
    techStack: ["Model Glider Kits", "Aero Simulation Software", "Electronic Sensors", "Physics Measurement Tools"],
    stats: [
      { label: "Gliders Assembled", value: "50+ Models" },
      { label: "Students Enrolled", value: "300+ Students" },
      { label: "Physics Experiments", value: "30+ Logged" }
    ],
    highlights: [
      "Designed and launched micro-gliders with optimal wing ratios",
      "Used software to simulate airflow over wings and understand lift",
      "Conducted outdoor flight competitions testing range and stability"
    ]
  },
  {
    slug: "venurai-chavan",
    title: "AIRG Yashwantrao & Sou Venutai Chavan Lab",
    category: "School Lab",
    desc: "Experiential learning hub combining emerging technologies to inspire creative thinking and problem-solving.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(1).jpg",
    detailedDesc: "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    location: "Karad, Maharashtra",
    date: "Active Lab",
    techStack: ["Ultrasonic Depth Sensors", "Relay Cutoffs", "Arduino boards", "Water Flowmeters"],
    stats: [
      { label: "Systems Installed", value: "2 Campus Setups" },
      { label: "Active Classes", value: "300+ Students" },
      { label: "Gallons Conserved", value: "Estimated 1000+ Gal" }
    ],
    highlights: [
      "Programmed ultrasonic tank alarms warning of school tank overflows",
      "Constructed flowmeter sensors showing real-time water usage speeds",
      "Created classroom models explaining how residential pipes manage water flow"
    ]
  },
  {
    slug: "birla-innovation",
    title: "AIRG Birla Innovation Lab",
    category: "School Lab",
    desc: "Engaging learning environment offering hands-on training in IoT, Drones, VR, and 3D printing.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(2).jpg",
    detailedDesc: "Birla Innovation Lab combines structural arts with physics. Students create bridge and dome models using 3D CAD design tools, testing their strength under weights to study compression, tension, and load limits.",
    location: "Pune, Maharashtra",
    date: "Active Lab",
    techStack: ["3D CAD Design", "3D Printing Filament", "Bridge Model Testers", "Structural Blueprints"],
    stats: [
      { label: "Bridges Tested", value: "30+ Models" },
      { label: "Student Designers", value: "300+ Students" },
      { label: "CAD Designs Saved", value: "85+ Models" }
    ],
    highlights: [
      "Built truss bridge structures that carried 5x their own weight",
      "Created customized 3D models of historical monuments in CAD classes",
      "Analyzed structural support failures using weight testing frames"
    ]
  },
  {
    slug: "eon-hub",
    title: "AIRG Eon Lab",
    category: "School Lab",
    desc: "Immersive workspace for building, experimenting, and innovating with advanced digital technologies.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(3).jpg",
    detailedDesc: "EON Hub focuses on computer programming fundamentals. Through solving logic puzzles, writing basic Python algorithms, and sorting lists, students develop strong computational thinking skills.",
    location: "Pune, Maharashtra",
    date: "Active Lab",
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
  },
  {
    slug: "holy-convent",
    title: "AIRG Holy Convent Lab",
    category: "School Lab",
    desc: "Empowering young minds with robotics assemblies, automation, coding, and engineering design foundations.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(4).jpg",
    detailedDesc: "Located at Holy Convent in Karad, this lab utilizes VR to teach complex sciences. Students take virtual field trips to space, examine microscopic cells, and manipulate virtual organs to bring textbooks to life.",
    location: "Karad, Maharashtra",
    date: "Active Lab",
    techStack: ["Meta Quest VR Headsets", "Spatial WebXR Software", "3D Solar System Map VR", "Human Anatomy VR Suite"],
    stats: [
      { label: "VR Headsets", value: "8 Setups" },
      { label: "Interactive Trips", value: "12 Modules" },
      { label: "Engaged Learners", value: "300+ Students" }
    ],
    highlights: [
      "Guided students through a shared virtual tour inside a human blood vessel",
      "Configured web-based astronomy maps so students could select stars",
      "Conducted class-wide science lessons using immersive VR anatomy models"
    ]
  },
  {
    slug: "shauryasaihiki",
    title: "AIRG Shaurya Sainiki Lab",
    category: "School Lab",
    desc: "Ecosystem of innovation fostering tech leadership, collaboration, and creative logic development.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(5).jpg",
    detailedDesc: "Shauryasaihiki Lab teaches students HTML/CSS essentials and basic internet hygiene. Topics include strong password creation, identifying phishing emails, and building personal static website portfolios.",
    location: "Satara, Maharashtra",
    date: "Active Lab",
    techStack: ["HTML5", "CSS3 Layouts", "Local Web Servers", "Browser Security Tools"],
    stats: [
      { label: "Websites Deployed", value: "80+ Portfolios" },
      { label: "Students Certified", value: "300+ Students" },
      { label: "Safety Seminars", value: "12 Conducted" }
    ],
    highlights: [
      "Helped every student build and run their own local HTML biography page",
      "Conducted school-wide training on password management and safety",
      "Trained student ambassadors on checking website SSL certificates"
    ]
  },
  {
    slug: "mudhoji-lab",
    title: "AIRG Mudhoji Lab",
    category: "School Lab",
    desc: "Practical workspace for C++ coding, robotics kits programming, and active engineering basics.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(6).jpg",
    detailedDesc: "Mudhoji Lab, located at Mudhoji High School in Phaltan, is a dedicated space for hands-on learning. Students learn to program Arduino boards, build block-based and C++ robotics models, and design parts using 3D printers, fostering early interest in engineering and computer science.",
    location: "Phaltan, Maharashtra",
    date: "Active Lab",
    techStack: ["Arduino UNO", "Scratch Programming", "3D Printing", "STEM Robotics Kits", "Tinkercad"],
    stats: [
      { label: "Students Trained", value: "300+ Students" },
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
    title: "AIRG Sakharwadi Lab",
    category: "School Lab",
    desc: "Agricultural science lab focusing on soil moisture sensors, weather telemetry, and Industry 4.0.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(7).jpg",
    detailedDesc: "Located at Sakharwadi High School, this lab leverages technology to understand local agriculture. Students write code to interface soil sensors with automated water pumps, building practical smart-watering systems and weather monitoring stations.",
    location: "Sakharwadi, Maharashtra",
    date: "Active Lab",
    techStack: ["Soil Moisture Sensors", "Arduino ESP32", "Micro-Pump Actuators", "LED Displays"],
    stats: [
      { label: "Active Learners", value: "300+ Students" },
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
    slug: "sant-tukaram",
    title: "AIRG Sant Tukaram Lab",
    category: "School Lab",
    desc: "Electronics and digital fabrication lab teaching logic gates assembly and circuit logic.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(8).jpg",
    detailedDesc: "The Sant Tukaram Lab provides a solid foundation in electronics. Students learn to assemble fundamental logic gates on breadboards, utilize resistors, transistors, and LEDs, and understand the core hardware components that make up modern computers.",
    location: "Pune, Maharashtra",
    date: "Active Lab",
    techStack: ["Breadboards", "Logic Gate ICs (AND/OR/NOT)", "Multimeters", "LED Arrays", "Resistors & Capacitors"],
    stats: [
      { label: "Students Guided", value: "300+ Students" },
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
    title: "AIRG Swami Ramanand Lab",
    category: "School Lab",
    desc: "Biology-tech sensor laboratory monitoring heart-rate logs, temperature telemetry, and exercise data.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(9).jpg",
    detailedDesc: "At Swami Ramanand Lab, biology meets technology. Students use heart-rate monitors, temperature probes, and respiratory telemetry kits to map physical responses during exercise, learning biological systems through interactive sensor data.",
    location: "Satara, Maharashtra",
    date: "Active Lab",
    techStack: ["Heart Rate Monitors", "Temperature Probes", "Python Data Science", "Scratch UI Builder"],
    stats: [
      { label: "Sensor Workstations", value: "10 Active Setups" },
      { label: "Active Classrooms", value: "300+ Students" },
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
    title: "AIRG Koteshwar Vidyaly Lab",
    category: "School Lab",
    desc: "Embedded software lab specializing in Arduino programming, LED matrices, and game programming.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(10).jpg",
    detailedDesc: "Koteshwar Vidyaly Lab in Wai focuses on embedded software. Students connect microchips with LED matrices, programming basic snake games, countdown timers, and scrolling message displays.",
    location: "Wai, Maharashtra",
    date: "Active Lab",
    techStack: ["Arduino Nano", "8x8 LED Matrices", "LCD Character Screens", "C++ Coding", "Buzzer Sounds"],
    stats: [
      { label: "Microchip Kits", value: "20+ Boards" },
      { label: "Students Engaged", value: "300+ Students" },
      { label: "Game Code Programs", value: "45+ Uploaded" }
    ],
    highlights: [
      "Programmed a school bell countdown timer displayed on LCD screens",
      "Designed and coded retro 2D games using tactile buttons and LED grids",
      "Conducted inter-school programming competitions on Arduino IDE"
    ]
  }
];
