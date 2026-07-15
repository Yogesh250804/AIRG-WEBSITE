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
    slug: "school-level-robotics",
    title: "AIRG Junior Robotics & Circuit Designing",
    category: "School Level",
    desc: "Introducing fundamental electronics, logic gates, and breadboard circuitry to school students through interactive hands-on builds.",
    url: "/centres/workshops/PHOTO-2026-07-14-21-51-43.jpg",
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
    slug: "industry-level-automation",
    title: "Industrial Automation & Applied AI Bootcamps",
    category: "Industry Level",
    desc: "Practical training bootcamps for industry professionals focusing on autonomous systems, manufacturing automation, and custom robotic solutions.",
    url: "/centres/workshops/PHOTO-2026-07-14-21-51-45.jpg",
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
    slug: "international-stem-outreach",
    title: "AIRG International STEM & Robotics Outreach",
    category: "Institute Level",
    desc: "Bringing world-class STEM education, low-cost robotics kits, and digital literacy tools to international students across global communities.",
    url: "/centres/workshops/PHOTO-2026-07-14-21-52-22.jpg",
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
  }
];
