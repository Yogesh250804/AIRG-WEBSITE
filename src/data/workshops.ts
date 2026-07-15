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
    slug: "rajendra-khandala-1",
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
    slug: "rajendra-khandala-2",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(1).jpg",
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
    slug: "venurai-chavan-1",
    title: "AIRG Yashwantrao & Sou Venutai Chavan Lab",
    category: "School Lab",
    desc: "Experiential learning hub combining emerging technologies to inspire creative thinking and problem-solving.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(2).jpg",
    detailedDesc: "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    location: "Phaltan, Maharashtra",
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
    slug: "venurai-chavan-2",
    title: "AIRG Yashwantrao & Sou Venutai Chavan Lab",
    category: "School Lab",
    desc: "Experiential learning hub combining emerging technologies to inspire creative thinking and problem-solving.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(3).jpg",
    detailedDesc: "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    location: "Phaltan, Maharashtra",
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
    slug: "rajendra-khandala-3",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(4).jpg",
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
    slug: "rajendra-khandala-4",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(5).jpg",
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
    slug: "venurai-chavan-3",
    title: "AIRG Yashwantrao & Sou Venutai Chavan Lab",
    category: "School Lab",
    desc: "Experiential learning hub combining emerging technologies to inspire creative thinking and problem-solving.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(6).jpg",
    detailedDesc: "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    location: "Phaltan, Maharashtra",
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
    slug: "venurai-chavan-4",
    title: "AIRG Yashwantrao & Sou Venutai Chavan Lab",
    category: "School Lab",
    desc: "Experiential learning hub combining emerging technologies to inspire creative thinking and problem-solving.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(7).jpg",
    detailedDesc: "The Venurai Chavan Lab introduces water conservation tech. Students program ultrasonic depth sensors to read school water levels, building automatic pump cutoff switches to prevent overflow.",
    location: "Phaltan, Maharashtra",
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
    slug: "rajendra-khandala-5",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(8).jpg",
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
    slug: "rajendra-khandala-6",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(9).jpg",
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
    slug: "rajendra-khandala-7",
    title: "AIRG Rajendra Khandala Lab",
    category: "School Lab",
    desc: "A future-ready learning space for Artificial Intelligence, Robotics, 3D printing, and Drone Technology.",
    url: "/centres/gallery/PHOTO-2026-07-14-21-54-00(10).jpg",
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
  }
];
