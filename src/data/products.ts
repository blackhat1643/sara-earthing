import { Zap, ShieldCheck, Flame, Settings } from 'lucide-react';

export interface Product {
  slug: string;
  category: string;
  title: string;
  desc: string;
  image: string;
  hoverImage?: string;
  features: string[];
  specs?: Record<string, string>;
  applications?: string[];
  
  // Rich Details (New)
  longDesc?: string[];
  highlights?: Array<{ title: string; desc: string }>;
  detailedTabs?: {
    features?: { desc: string; list: string[] };
    advantages?: Array<{ title: string; desc: string }>;
    specTable?: {
      headers: string[];
      rows: string[][];
    };
  };
}

export const allProducts: Product[] = [
  // Earthing Products
  {
    slug: 'gi-earthing',
    category: 'earthing-products',
    title: "GI Earthing",
    desc: "A dependable, cost-effective galvanized iron system treated with a heavy zinc coating to prevent oxidation in stable soil environments.",
    image: "/images/VIEW/GI Earthing Electrode.JPG",
    hoverImage: "/images/VIEW/GI Earthing Electrode.JPG",
    features: ["Low Resistance Path", "Fault Current Dissipation", "Industrial Standard"],
    specs: {
      "Type": "Galvanized Iron",
      "Process": "Gel Earthing System",
      "Coating": "Hot Dip Galvanized",
      "Durability": "Long-term underground life"
    },
    applications: [
      "Lightning protection systems",
      "Prevention of accidents caused by static charge and stray currents",
      "Protection of central communications, electronics, and AC power systems",
      "Meeting grounding safety requirements for electrical substations",
      "Ground fault neutralization",
      "Safeguarding critical instrumentation and process control equipment"
    ],
    longDesc: [
      "GI Earthing or Gel earthing system is the process of creating an alternative path for the flow of excessive/fault current safely into the ground in the presence of minimal resistance.",
      "Our GI earthing system offers superior product life, cost effective, maintenance free as well as reduces the maintenance cost.",
      "Gel earthing electrodes easily install with less space required compared to conventional GI earthing and yet has longer life. Earthing materials which surrounds gi earth electrode is hygroscopic and conductive that helps the longer period of effective earthing. A GI earthing material has the quality of absorbing and retaining moisture content for a very long period."
    ],
    highlights: [
      { title: "Low-Impedance Grounding", desc: "Designed using high end raw materials to ensure a constant, low-impedance electrical link with the earth even in adverse conditions." },
      { title: "Soil Augmentation", desc: "Utilizes Back Fill Compound (BFC), a mixture of organic materials that optimizes soil conductivity and reduces overall system resistance." },
      { title: "Maintenance-Free", desc: "No need to pour extra water from time to time as in conventional earthing since it retains moisture over a long period." },
      { title: "Designed for Lightning", desc: "Designed with four times more surface area than traditional rods, assisting in creating low-impedance links to safely channel currents." }
    ],
    detailedTabs: {
      features: {
        desc: "GI (Galvanized iron) Ground Electrode provides a low-impedance ground in locations of high soil resistivity. Together with SI Back fill Compound, the system dissipates lightning energy and other dangerous electrical fault currents, even in sandy or rocky soil conditions.",
        list: [
          "High working life",
          "Reliability",
          "Require minimal maintenance",
          "Maintenance free",
          "Longevity",
          "Adequate galvanization",
          "No corrosion",
          "Eco-friendly",
          "Fit and Forget"
        ]
      },
      advantages: [
        { title: "Low-Impedance Grounding", desc: "The Gel Earthing electrode is designed using high end raw materials to ensure a constant, low-impedance electrical link with the earth even in adverse and varying ground conditions." },
        { title: "Large Surface Area", desc: "GI Earthing Electrode is designed with large surface to make sure the better connection with the Earth, typically offered with 2 5/8 inch diameter." },
        { title: "Electrolytic Salts", desc: "Moisture makes electrolytic salts dissolved. After dissolving, these salts seep out of leach holes and the electrode that enhance the soil conductivity, reduce impedance and resistance." },
        { title: "Soil Augmentation", desc: "BFC is a mixture of organic soil material that optimizes the soil conductivity level around the Earthing Electrode, decreasing system resistance." },
        { title: "Maintenance-Free", desc: "There is no need to pour extra water from time to time as it was done in conventional Earthing because it can retain the moisture." },
        { title: "Consistency", desc: "Continually maintains the same earth resistance value even in the adverse soil as well as climate conditions over a long period of time." },
        { title: "Easy Installation", desc: "Easy to install, our array of electrodes can be installed instantly and effortlessly indoors or outdoors, requiring less time and space." },
        { title: "Improved Safety", desc: "Reduces the risks of stray currents and lightning hits. Meets or exceeds applicable design codes and safety standards to protect personnel and property." }
      ],
      specTable: {
        headers: ["Model", "Electrode Diameter (MM)", "Length (MM)", "Internal Dia (MM)", "Connection Terminal (MM)", "M.O.C", "Compound Filled"],
        rows: [
          ["SI 19/1", "46-50", "1000", "22-25", "10 X 02", "HDGI", "Yes"],
          ["SI 19/2", "46-50", "2000", "22-25", "10 X 02", "HDGI", "Yes"],
          ["SI 19/3", "46-50", "3000", "22-25", "10 X 02", "HDGI", "Yes"],
          ["SI 39/1", "76-80", "1000", "37-40", "10 X 02", "HDGI", "Yes"],
          ["SI 39/2", "76-80", "2000", "37-40", "10 X 02", "HDGI", "Yes"],
          ["SI 39/3", "76-80", "3000", "37-40", "10 X 02", "HDGI", "Yes"]
        ]
      }
    }
  },
  {
    slug: 'copper-bonded-electrode',
    category: 'earthing-products',
    title: "Copper Bonded Electrode",
    desc: "A heavy-duty steel core molecularly bonded with a thick outer layer of uniform copper to handle intense fault currents.",
    image: "/images/VIEW/Copper Bonded Electrode.JPG",
    hoverImage: "/images/VIEW/Copper Bonded Electrode.JPG",
    features: ["High Conductivity", "Customizable Sizes", "Advanced Fabrication"],
    specs: {
      "Core": "Low Carbon Steel",
      "Bonding": "Molecular Copper",
      "Resistance": "Minimal Ohmic Value",
      "Technology": "Pipe-in-Pipe / Strip-in-Pipe"
    },
    applications: [
      "Petrochemical, LNG and nuclear facilities",
      "Data centers, telecom and broadcasters",
      "Process control and automation",
      "Corrections, hospitals and 911 centers",
      "Government, military and defense installations",
      "R&D operations, substations and wind turbines"
    ],
    longDesc: [
      "Saara Earthing India Pvt. Ltd is one of the foremost manufacturer of Copper Bonded Electrode. Our Highly experienced team and state of art techniques help us to serve you with customizable units of Copper Bonded Electrode for your valuable utilities. Our Copper Bonded Electrodes are RDSO comply - RDSO/PE/SPEC/PSO109-2008 with different dimensions and sizes.",
      "Copper Bonded Electrode is a highly advanced product, which is based on global technology and provides superior resistance against oxidation; it also has better product life than a simple GI Electrodes.",
      "Its uniformly coated thickness ensures stable performance, making it a cost effective option for users."
    ],
    highlights: [
      { title: "Superior Corrosion Resistance", desc: "The thickness of copper on the copper bonded earthing electrode is 100 / 250 micron; ensuring an incredibly long product life." },
      { title: "Excellent Electrical Capability", desc: "With electrical conductivity of 20%, our copper bonded earth electrode effectively dissipates high fault currents." },
      { title: "Wide Applications", desc: "Can be used widely to ground buildings and foundations under changing soil temperature, humidity, and pH value conditions." },
      { title: "Easy to Install", desc: "We provide professional grounding attachment parts for easy and quick installation with minimum cost." }
    ],
    detailedTabs: {
      features: {
        desc: "Copper Bonded Earthing Electrode is considered to be the most apt equipment for Earthing purpose owing to excellent resistance to oxidization. Designed on the principle of Pipe-in-Pipe technology, we coat copper earth electrode using 100/250 micron of copper. With a crystalline mixture, the annular space between the inner conductor and the external conductor is filled and sealed from both ends.",
        list: [
          "CPRI Tested",
          "Continuous electroplating processing",
          "Variable choices are manufactured as required by the customers",
          "Great value over the life of the product",
          "Reduced installation area and time"
        ]
      },
      advantages: [
        { title: "Upto 250 micron Cu Bonded", desc: "Coated with a thick layer of molecular copper bonded on steel, giving it superior longevity compared to GI." },
        { title: "Life Span", desc: "Due to the thick copper bonding, the life span is significantly higher than that of traditional GI electrodes." },
        { title: "High Conductivity & Strength", desc: "Provides high electrical conductivity of copper while maintaining high structural strength of the steel core." },
        { title: "Cost Effective", desc: "Highly economical when compared to the lifespan and the price of pure copper rods." },
        { title: "Highly Reliable", desc: "Provides safe and reliable grounding over long spans of service life under aggressive soil conditions." },
        { title: "Tensile Strength", desc: "Average tensile strength of 80,000 psi and straightness tolerance of .010\" per linear foot." }
      ],
      specTable: {
        headers: ["Model", "Outer Diameter (MM)", "Length (MM)", "Internal Dia (MM)", "Connection Terminal (MM)", "M.O.C", "Compound Filled"],
        rows: [
          ["SICB-19/1", "46-50", "1000", "27", "10 X 02", "Copper Bonded", "Yes"],
          ["SICB-19/2", "46-50", "2000", "27", "10 X 02", "Copper Bonded", "Yes"],
          ["SICB-19/3", "46-50", "3000", "27", "12 X 02", "Copper Bonded", "Yes"],
          ["SICB-39/1", "76-80", "1000", "41", "12 X 02", "Copper Bonded", "Yes"],
          ["SICB-39/2", "76-80", "2000", "41", "12 X 02", "Copper Bonded", "Yes"],
          ["SICB-39/3", "76-80", "3000", "41", "12 X 02", "Copper Bonded", "Yes"]
        ]
      }
    }
  },
  {
    slug: 'copper-bonded-rods',
    category: 'earthing-products',
    title: "Copper Bonded Rods",
    desc: "Precision driving rods are designed for deep vertical soil penetration to access lower, naturally damp earth layers.",
    image: "/images/VIEW/Copper Bonded Rods.JPG",
    hoverImage: "/images/VIEW/Copper Bonded Rods.JPG",
    features: ["250+ Micron Coating", "Molecularly Bonded", "99.9% Pure Copper"],
    specs: {
      "Material": "High Tensile Steel",
      "Copper Purity": "99.9% Electrolytic",
      "Standard Coating": "254 Microns (UL 467)",
      "Tensile Strength": "600 N/mm²"
    },
    applications: ["Substations", "Data Centers", "Telecommunications"]
  },
  {
    slug: 'copper-electrode',
    category: 'earthing-products',
    title: "Copper Electrode",
    desc: "A premium, solid copper grounding unit designed for specialized installations demanding the absolute highest thermal and electrical conductivity.",
    image: "/images/VIEW/20-08-2025 Sara Earthing1035 f.JPG",
    hoverImage: "/images/VIEW/20-08-2025 Sara Earthing1035 f.JPG",
    features: ["Maintenance Free", "Constant Resistance", "Safe Discharge"],
    specs: {
      "Material": "High Conductivity Copper",
      "Filling": "Chemical Enhancement Material",
      "Connection": "Threaded / Flanged",
      "Standard": "IEEE / IEC Compliance"
    },
    applications: ["Hospitals", "Lifts/Elevators", "Computer Centers"]
  },
  {
    slug: 'lightning-arrester',
    category: 'earthing-products',
    title: "Lightning Arrester",
    desc: "A high-altitude interception system designed to handle the immediate thermal and physical stress of direct current strikes.",
    image: "/images/pylon_tower.jpg",
    hoverImage: "/images/pylon_tower.jpg",
    features: ["Direct Strike Protection", "High Altitude Capable", "Thermal Stress Resistant"],
    specs: {
      "Application": "Lightning Protection",
      "Type": "Active / Passive Arrester",
      "Installation": "High Point Interception"
    },
    applications: ["Commercial Buildings", "Transmission Towers", "Telecommunications"]
  },
  {
    slug: 'back-fill-compound',
    category: 'earthing-products',
    title: "BFC - Back Fill Compound",
    desc: "An advanced moisture retaining mixture engineered to permanently lower soil resistivity without washing away during heavy seasonal monsoons.",
    image: "/images/VIEW/Back Fill Compound.JPG",
    hoverImage: "/images/VIEW/Back Fill Compound.JPG",
    features: ["SI Gel Core Competency", "Lower Ohmic Value", "Soil Enhancement"],
    specs: {
      "Resistivity": "< 0.12 Ohm-m",
      "Standard Bag": "25kg / 50kg",
      "Soil Type": "Rocky, Sandy, High Resistivity",
      "Composition": "Bentonite & Graphite with SI Gel"
    },
    applications: ["High Soil Resistivity Areas", "Industrial Grounding", "Sensitive Electronics"]
  },

  // Earthing Accessories
  {
    slug: 'thread-couplings',
    category: 'earthing-accessories',
    title: "Thread Couplings",
    desc: "Bronze threads with both ends chamfered, made from corrosion-resistant alloys used to ensure low resistance in copper-to-copper connections.",
    image: "/images/products/thread-couplings.png",
    hoverImage: "/images/products/thread-couplings.png",
    features: ["Corrosion Resistant", "Bronze Alloy", "Low Resistance"],
    specs: {
      "Material": "High Strength Bronze",
      "Design": "Dual-End Chamfered",
      "Compatibility": "Sectional Ground Rods"
    }
  },
  {
    slug: 'threaded-driving-stud',
    category: 'earthing-accessories',
    title: "Threaded Driving Stud",
    desc: "High strength carbon steel designed for driving sectional rods that can withstand hammer impacts during installation.",
    image: "/images/products/threaded-driving-stud.png",
    hoverImage: "/images/products/threaded-driving-stud.png",
    features: ["Hammer Impact Resistant", "High Strength Steel", "Thread Protection"],
    specs: {
      "Material": "High Strength Carbon Steel",
      "Application": "Sectional Rod Driving",
      "Durability": "Multi-use capable"
    }
  },
  {
    slug: 'driving-spike',
    category: 'earthing-accessories',
    title: "Driving Spike",
    desc: "Designed to suit Copper bond Earth Rods so the ground can be penetrated and the Earth Rod can be driven with ease in dense soil.",
    image: "/images/products/driving-spike.png",
    hoverImage: "/images/products/driving-spike.png",
    features: ["Easy Penetration", "Dense Soil Specialist", "Rod Protection"],
    specs: {
      "Compatibility": "Standard Copper Bonded Rods",
      "Application": "Dense / High Density Soil"
    }
  },
  {
    slug: 'dowels',
    category: 'earthing-accessories',
    title: "Dowels",
    desc: "Precision joining components used to join copper rods together to achieve variable lengths for deep grounding.",
    image: "/images/products/dowels.png",
    hoverImage: "/images/products/dowels.png",
    features: ["Variable Length Capability", "Precision Fit", "Deep Grounding"],
    specs: {
      "Material": "Conductive Copper Alloy",
      "Function": "Rod Joining"
    }
  },
  {
    slug: 'earth-rod-to-cable-clamp',
    category: 'earthing-accessories',
    title: "Earth Rod To Cable Clamp",
    desc: "High-strength bronze alloy clamps, suitable for direct burial, providing low resistance copper to copper connections.",
    image: "/images/products/earth-rod-to-cable-clamp.png",
    hoverImage: "/images/products/earth-rod-to-cable-clamp.png",
    features: ["Direct Burial Rated", "Bronze Alloy", "Non-Ferrous Screws"],
    specs: {
      "Material": "Bronze Alloy",
      "Fasteners": "Non-Ferrous Screws",
      "Service Life": "Extended Underground"
    }
  },
  {
    slug: 'earth-rod-to-tape-clamps',
    category: 'earthing-accessories',
    title: "Earth Rod To Tape Clamps",
    desc: "Corrosion resistive clamps with high conductivity and mechanical strength essential for long-term earthing system operation.",
    image: "/images/products/earth-rod-to-tape-clamps.png",
    hoverImage: "/images/products/earth-rod-to-tape-clamps.png",
    features: ["Mechanical Strength", "Corrosion Resistive", "Long Life"],
    specs: {
      "Standard": "BS 7430 Compliance",
      "Material": "Naval Brass / Gunmetal"
    }
  },
  {
    slug: 'ground-rod-clamp-u-bolt-saddle',
    category: 'earthing-accessories',
    title: "Ground Rod Clamp U Bolt Saddle",
    desc: "Allows a conductor to connect to a ground rod in both parallel and perpendicular orientations.",
    image: "/images/products/ground-rod-clamp-u-bolt-saddle.png",
    hoverImage: "/images/products/ground-rod-clamp-u-bolt-saddle.png",
    features: ["Dual Orientation", "U-Bolt Security", "Multi-Conductor"],
    specs: {
      "Type": "U-Bolt Saddle",
      "Orientation": "Parallel / Perpendicular"
    }
  },
  {
    slug: 'cable-clamp-u-bolt-saddle',
    category: 'earthing-accessories',
    title: "Cable Clamp U Bolt Saddle",
    desc: "Used to connect copper conductors to earth rods, manufactured from copper alloy with a pure copper U-bolt.",
    image: "/images/products/cable-clamp-u-bolt-saddle.png",
    hoverImage: "/images/products/cable-clamp-u-bolt-saddle.png",
    features: ["Pure Copper U-Bolt", "Copper Alloy Body", "High Conductivity"],
    specs: {
      "Material": "Copper Alloy / Pure Copper",
      "Application": "Conductor to Rod Connection"
    }
  }
];
