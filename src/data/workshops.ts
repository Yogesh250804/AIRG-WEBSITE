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
    slug: "rajendra-khandala-lab",
    title: "AIRG Rajendra Khandala Lab",
    category: "Innovation Lab",
    desc: "The AIR G Innovation Lab at our school is a future-ready learning space where students explore Artificial Intelligence, Robotics, IoT, Drone Technology, 3D Printing, Virtual Reality, Coding, and Electronics through hands-on innovation.",
    url: "/centres/rajendra/PHOTO-2026-07-14-21-26-46.jpg",
    detailedDesc: "Situated at Rajendra School in Khandala, this lab introduces students to aviation science. Through constructing model gliders, studying wind resistance, and mapping flight paths, physics concepts are made active and engaging.",
    location: "Khandala, Satara",
    date: "Active Center",
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
    slug: "venurai-chavan-lab",
    title: "AIRG Yashwantrao & Sou Venutai Chavan Lab",
    category: "Innovation Lab",
    desc: "Our AIR G Innovation Lab inspires students to become creative thinkers, problem solvers, and future innovators by integrating emerging technologies with experiential learning.",
    url: "/centres/yashwantrao/PHOTO-2026-07-14-21-45-32.jpg",
    detailedDesc: "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    location: "Karad, Satara",
    date: "Active Center",
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
    slug: "mudhoji-lab-showcase",
    title: "AIRG Mudhoji Lab",
    category: "Innovation Lab",
    desc: "Built on the principles of experiential learning, the AIR G Innovation Lab encourages students to explore, invent, and solve real-world challenges using AI, Robotics, IoT, and emerging technologies.",
    url: "/centres/mudhoji/PHOTO-2026-07-14-21-09-31.jpg",
    detailedDesc: "Mudhoji Lab, located at Mudhoji High School in Phaltan, is a dedicated space for hands-on learning. Students learn to program Arduino boards, build block-based and C++ robotics models, and design parts using 3D printers, fostering early interest in engineering.",
    location: "Phaltan, Satara",
    date: "Active Center",
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
    slug: "sakharwadi-lab-showcase",
    title: "AIRG Sakharwadi Lab",
    category: "Innovation Lab",
    desc: "The AIR G Innovation Lab nurtures curiosity and innovation by combining technology, creativity, and practical learning to prepare students for Industry 4.0 and beyond.",
    url: "/centres/sakharwadi/PHOTO-2026-07-14-21-14-30.jpg",
    detailedDesc: "Located at Sakharwadi High School, this lab leverages technology to understand local agriculture. Students write code to interface soil sensors with automated water pumps, building practical smart-watering systems and weather monitoring stations.",
    location: "Sakharwadi, Satara",
    date: "Active Center",
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
    slug: "sant-tukaram-lab-showcase",
    title: "AIRG Sant Tukaram Lab",
    category: "Innovation Lab",
    desc: "Our AIR G Innovation Lab enables students to transform ideas into impactful projects through Artificial Intelligence, Robotics, Drone Technology, IoT, Electronics, and Digital Fabrication.",
    url: "/centres/sant-tukaram/PHOTO-2026-07-14-21-37-23(2).jpg",
    detailedDesc: "The Sant Tukaram Lab provides a solid foundation in electronics. Students learn to assemble fundamental logic gates on breadboards, utilize resistors, transistors, and LEDs, and understand the core hardware components that make up modern computers.",
    location: "Satara District",
    date: "Active Center",
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
    slug: "koteshwar-vidyaly-lab-showcase",
    title: "AIRG Koteshwar Vidyaly Lab",
    category: "Innovation Lab",
    desc: "The AIR G Innovation Lab bridges academic knowledge with practical application, helping students develop confidence, critical thinking, and innovation through advanced technologies.",
    url: "/centres/koteshwar/PHOTO-2026-07-14-21-46-58.jpg",
    detailedDesc: "Koteshwar Vidyaly Lab in Wai focuses on embedded software. Students connect microchips with LED matrices, programming basic snake games, countdown timers, and scrolling message displays.",
    location: "Wai, Satara",
    date: "Active Center",
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
  },
  {
    slug: "ss-nikam-lab-showcase",
    title: "AIRG S.S. Nikam Lab",
    category: "Innovation Lab",
    desc: "The AIR G Innovation Lab prepares students for future careers by integrating modern technologies with design thinking, problem-solving, teamwork, and experiential education.",
    url: "/centres/ss-nikam/PHOTO-2026-07-14-21-47-36.jpg",
    detailedDesc: "S.S. Nikam Lab introduces internet-connected devices. Middle schoolers configure temperature, humidity, and barometric sensors, uploading live local weather charts to a shared campus web page.",
    location: "Satara District",
    date: "Active Center",
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
  }
];
