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
}

export const allProducts: Product[] = [
  // Earthing Products
  {
    slug: 'gi-earthing-electrode',
    category: 'earthing-products',
    title: "GI Earthing Electrode",
    desc: "A process of creating an alternative path for the flow of excessive/fault current safely into the ground in the presence of minimal resistance.",
    image: "/images/VIEW/GI Earthing Electrode.JPG",
    hoverImage: "/images/VIEW/GI Earthing Electrode.JPG",
    features: ["Low Resistance Path", "Fault Current Dissipation", "Industrial Standard"],
    specs: {
      "Type": "Galvanized Iron",
      "Process": "Gel Earthing System",
      "Coating": "Hot Dip Galvanized",
      "Durability": "Long-term underground life"
    },
    applications: ["Industrial Power Systems", "Lightning Protection", "General Grounding"]
  },
  {
    slug: 'copper-bonded-rods',
    category: 'earthing-products',
    title: "Copper Bonded Rods",
    desc: "Molecularly bonded with 99.9% pure electrolytic copper on low carbon high tensile steel rods, manufactured in accordance with international standards like UL.",
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
    slug: 'copper-bonded-electrode',
    category: 'earthing-products',
    title: "Copper Bonded Electrode",
    desc: "Customizable units of Copper Bonded Electrodes manufactured using state-of-the-art techniques to serve valuable utilities.",
    image: "/images/VIEW/Copper Bonded Electrode.JPG",
    hoverImage: "/images/VIEW/Copper Bonded Electrode.JPG",
    features: ["High Conductivity", "Customizable Sizes", "Advanced Fabrication"],
    specs: {
      "Core": "Low Carbon Steel",
      "Bonding": "Molecular Copper",
      "Resistance": "Minimal Ohmic Value",
      "Technology": "Pipe-in-Pipe / Strip-in-Pipe"
    },
    applications: ["Power Plants", "Petrochemical Refineries", "Railway Infrastructure"]
  },
  {
    slug: 'back-fill-compound',
    category: 'earthing-products',
    title: "Back Fill Compound",
    desc: "A supreme quality Chemical Earthing Combination which achieves lower ohmic value in tricky soil like rocky or sandy soil with high resistivity.",
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
  {
    slug: 'chemical-copper-electrodes',
    category: 'earthing-products',
    title: "Chemical Copper Electrodes",
    desc: "An electrical system making a connection with the ground through a hidden conductive electrode linked to exposed metal parts of equipment.",
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
