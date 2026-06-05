-- SAARA Earthing Live Database Setup SQL Dump
-- Generated from local JSON database files

-- --------------------------------------------------------
-- Table structure for table `submissions`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `submissions`;
CREATE TABLE IF NOT EXISTS `submissions` (
  `id` VARCHAR(50) PRIMARY KEY,
  `type` VARCHAR(50) NOT NULL,
  `data` JSON NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'new',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- --------------------------------------------------------
-- Table structure for table `products`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `slug` VARCHAR(100) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `desc` TEXT,
  `image` VARCHAR(255),
  `hoverImage` VARCHAR(255),
  `features` JSON,
  `specs` JSON,
  `applications` JSON,
  `longDesc` JSON,
  `highlights` JSON,
  `detailedTabs` JSON,
  PRIMARY KEY (`slug`)
);

-- Dumping data for table `products`
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'gi-earthing',
        'earthing-products',
        'GI Earthing',
        'A dependable, cost-effective galvanized iron system treated with a heavy zinc coating to prevent oxidation in stable soil environments. hello',
        '/images/VIEW/GI Earthing Electrode.JPG',
        '/images/VIEW/GI Earthing Electrode.JPG',
        '["Low Resistance Path","Fault Current Dissipation","Industrial Standard"]',
        '{"Type":"Galvanized Iron","Process":"Gel Earthing System","Coating":"Hot Dip Galvanized","Durability":"Long-term underground life"}',
        '["Lightning protection systems","Prevention of accidents caused by static charge and stray currents","Protection of central communications, electronics, and AC power systems","Meeting grounding safety requirements for electrical substations","Ground fault neutralization","Safeguarding critical instrumentation and process control equipment",""]',
        '["GI Earthing or Gel earthing system is the process of creating an alternative path for the flow of excessive/fault current safely into the ground in the presence of minimal resistance.","Our GI earthing system offers superior product life, cost effective, maintenance free as well as reduces the maintenance cost.","Gel earthing electrodes easily install with less space required compared to conventional GI earthing and yet has longer life. Earthing materials which surrounds gi earth electrode is hygroscopic and conductive that helps the longer period of effective earthing. A GI earthing material has the quality of absorbing and retaining moisture content for a very long period."]',
        '[{"title":"Low-Impedance Grounding","desc":"Designed using high end raw materials to ensure a constant, low-impedance electrical link with the earth even in adverse conditions."},{"title":"Soil Augmentation","desc":"Utilizes Back Fill Compound (BFC), a mixture of organic materials that optimizes soil conductivity and reduces overall system resistance."},{"title":"Maintenance-Free","desc":"No need to pour extra water from time to time as in conventional earthing since it retains moisture over a long period."},{"title":"Designed for Lightning","desc":"Designed with four times more surface area than traditional rods, assisting in creating low-impedance links to safely channel currents."}]',
        '{"features":{"desc":"GI (Galvanized iron) Ground Electrode provides a low-impedance ground in locations of high soil resistivity. Together with SI Back fill Compound, the system dissipates lightning energy and other dangerous electrical fault currents, even in sandy or rocky soil conditions.","list":["High working life","Reliability","Require minimal maintenance","Maintenance free","Longevity","Adequate galvanization","No corrosion","Eco-friendly","Fit and Forget"]},"advantages":[{"title":"Low-Impedance Grounding","desc":"The Gel Earthing electrode is designed using high end raw materials to ensure a constant, low-impedance electrical link with the earth even in adverse and varying ground conditions."},{"title":"Large Surface Area","desc":"GI Earthing Electrode is designed with large surface to make sure the better connection with the Earth, typically offered with 2 5/8 inch diameter."},{"title":"Electrolytic Salts","desc":"Moisture makes electrolytic salts dissolved. After dissolving, these salts seep out of leach holes and the electrode that enhance the soil conductivity, reduce impedance and resistance."},{"title":"Soil Augmentation","desc":"BFC is a mixture of organic soil material that optimizes the soil conductivity level around the Earthing Electrode, decreasing system resistance."},{"title":"Maintenance-Free","desc":"There is no need to pour extra water from time to time as it was done in conventional Earthing because it can retain the moisture."},{"title":"Consistency","desc":"Continually maintains the same earth resistance value even in the adverse soil as well as climate conditions over a long period of time."},{"title":"Easy Installation","desc":"Easy to install, our array of electrodes can be installed instantly and effortlessly indoors or outdoors, requiring less time and space."},{"title":"Improved Safety","desc":"Reduces the risks of stray currents and lightning hits. Meets or exceeds applicable design codes and safety standards to protect personnel and property."}],"specTable":{"headers":["Model","Electrode Diameter (MM)","Length (MM)","Internal Dia (MM)","Connection Terminal (MM)","M.O.C","Compound Filled"],"rows":[["SI 19/1","46-50","1000","22-25","10 X 02","HDGI","Yes"],["SI 19/2","46-50","2000","22-25","10 X 02","HDGI","Yes"],["SI 19/3","46-50","3000","22-25","10 X 02","HDGI","Yes"],["SI 39/1","76-80","1000","37-40","10 X 02","HDGI","Yes"],["SI 39/2","76-80","2000","37-40","10 X 02","HDGI","Yes"],["SI 39/3","76-80","3000","37-40","10 X 02","HDGI","Yes"]]}}'
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'copper-bonded-electrode',
        'earthing-products',
        'Copper Bonded Electrode',
        'A heavy-duty steel core molecularly bonded with a thick outer layer of uniform copper to handle intense fault currents.',
        '/images/VIEW/Copper Bonded Electrode.JPG',
        '/images/VIEW/Copper Bonded Electrode.JPG',
        '["High Conductivity","Customizable Sizes","Advanced Fabrication"]',
        '{"Core":"Low Carbon Steel","Bonding":"Molecular Copper","Resistance":"Minimal Ohmic Value","Technology":"Pipe-in-Pipe / Strip-in-Pipe"}',
        '["Petrochemical, LNG and nuclear facilities","Data centers, telecom and broadcasters","Process control and automation","Corrections, hospitals and 911 centers","Government, military and defense installations","R&D operations, substations and wind turbines"]',
        '["Saara Earthing India Pvt. Ltd is one of the foremost manufacturer of Copper Bonded Electrode. Our Highly experienced team and state of art techniques help us to serve you with customizable units of Copper Bonded Electrode for your valuable utilities. Our Copper Bonded Electrodes are RDSO comply - RDSO/PE/SPEC/PSO109-2008 with different dimensions and sizes.","Copper Bonded Electrode is a highly advanced product, which is based on global technology and provides superior resistance against oxidation; it also has better product life than a simple GI Electrodes.","Its uniformly coated thickness ensures stable performance, making it a cost effective option for users."]',
        '[{"title":"Superior Corrosion Resistance","desc":"The thickness of copper on the copper bonded earthing electrode is 100 / 250 micron; ensuring an incredibly long product life."},{"title":"Excellent Electrical Capability","desc":"With electrical conductivity of 20%, our copper bonded earth electrode effectively dissipates high fault currents."},{"title":"Wide Applications","desc":"Can be used widely to ground buildings and foundations under changing soil temperature, humidity, and pH value conditions."},{"title":"Easy to Install","desc":"We provide professional grounding attachment parts for easy and quick installation with minimum cost."}]',
        '{"features":{"desc":"Copper Bonded Earthing Electrode is considered to be the most apt equipment for Earthing purpose owing to excellent resistance to oxidization. Designed on the principle of Pipe-in-Pipe technology, we coat copper earth electrode using 100/250 micron of copper. With a crystalline mixture, the annular space between the inner conductor and the external conductor is filled and sealed from both ends.","list":["CPRI Tested","Continuous electroplating processing","Variable choices are manufactured as required by the customers","Great value over the life of the product","Reduced installation area and time"]},"advantages":[{"title":"Upto 250 micron Cu Bonded","desc":"Coated with a thick layer of molecular copper bonded on steel, giving it superior longevity compared to GI."},{"title":"Life Span","desc":"Due to the thick copper bonding, the life span is significantly higher than that of traditional GI electrodes."},{"title":"High Conductivity & Strength","desc":"Provides high electrical conductivity of copper while maintaining high structural strength of the steel core."},{"title":"Cost Effective","desc":"Highly economical when compared to the lifespan and the price of pure copper rods."},{"title":"Highly Reliable","desc":"Provides safe and reliable grounding over long spans of service life under aggressive soil conditions."},{"title":"Tensile Strength","desc":"Average tensile strength of 80,000 psi and straightness tolerance of .010\\" per linear foot."}],"specTable":{"headers":["Model","Outer Diameter (MM)","Length (MM)","Internal Dia (MM)","Connection Terminal (MM)","M.O.C","Compound Filled"],"rows":[["SICB-19/1","46-50","1000","27","10 X 02","Copper Bonded","Yes"],["SICB-19/2","46-50","2000","27","10 X 02","Copper Bonded","Yes"],["SICB-19/3","46-50","3000","27","12 X 02","Copper Bonded","Yes"],["SICB-39/1","76-80","1000","41","12 X 02","Copper Bonded","Yes"],["SICB-39/2","76-80","2000","41","12 X 02","Copper Bonded","Yes"],["SICB-39/3","76-80","3000","41","12 X 02","Copper Bonded","Yes"]]}}'
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'copper-bonded-rods',
        'earthing-products',
        'Copper Bonded Rods',
        'Precision driving rods are designed for deep vertical soil penetration to access lower, naturally damp earth layers.',
        '/images/VIEW/Copper Bonded Rods.JPG',
        '/images/VIEW/Copper Bonded Rods.JPG',
        '["250+ Micron Coating","Molecularly Bonded","99.9% Pure Copper"]',
        '{"Material":"High Tensile Steel","Copper Purity":"99.9% Electrolytic","Standard Coating":"254 Microns (UL 467)","Tensile Strength":"600 N/mm²"}',
        '["Substations","Data Centers","Telecommunications"]',
        NULL,
        NULL,
        NULL
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'copper-electrode',
        'earthing-products',
        'Copper Electrode',
        'A premium, solid copper grounding unit designed for specialized installations demanding the absolute highest thermal and electrical conductivity.',
        '/images/VIEW/20-08-2025 Sara Earthing1035 f.JPG',
        '/images/VIEW/20-08-2025 Sara Earthing1035 f.JPG',
        '["Maintenance Free","Constant Resistance","Safe Discharge"]',
        '{"Material":"High Conductivity Copper","Filling":"Chemical Enhancement Material","Connection":"Threaded / Flanged","Standard":"IEEE / IEC Compliance"}',
        '["Hospitals","Lifts/Elevators","Computer Centers","malls"]',
        NULL,
        NULL,
        NULL
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'lightning-arrester',
        'earthing-products',
        'Lightning Arrester',
        'A high-altitude interception system designed to handle the immediate thermal and physical stress of direct current strikes.',
        '/images/pylon_tower.jpg',
        '/images/pylon_tower.jpg',
        '["Direct Strike Protection","High Altitude Capable","Thermal Stress Resistant"]',
        '{"Application":"Lightning Protection","Type":"Active / Passive Arrester","Installation":"High Point Interception"}',
        '["Commercial Buildings","Transmission Towers","Telecommunications"]',
        NULL,
        NULL,
        NULL
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'back-fill-compound',
        'earthing-products',
        'BFC - Back Fill Compound',
        'An advanced moisture retaining mixture engineered to permanently lower soil resistivity without washing away during heavy seasonal monsoons.',
        '/images/VIEW/Back Fill Compound.JPG',
        '/images/VIEW/Back Fill Compound.JPG',
        '["SI Gel Core Competency","Lower Ohmic Value","Soil Enhancement"]',
        '{"Resistivity":"< 0.12 Ohm-m","Standard Bag":"25kg / 50kg","Soil Type":"Rocky, Sandy, High Resistivity","Composition":"Bentonite & Graphite with SI Gel"}',
        '["High Soil Resistivity Areas","Industrial Grounding","Sensitive Electronics"]',
        NULL,
        NULL,
        NULL
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'thread-couplings',
        'earthing-accessories',
        'Thread Couplings',
        'Bronze threads with both ends chamfered, made from corrosion-resistant alloys used to ensure low resistance in copper-to-copper connections.',
        '/images/products/thread-couplings.png',
        '/images/products/thread-couplings.png',
        '["Corrosion Resistant","Bronze Alloy","Low Resistance"]',
        '{"Material":"High Strength Bronze","Design":"Dual-End Chamfered","Compatibility":"Sectional Ground Rods"}',
        NULL,
        NULL,
        NULL,
        NULL
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'threaded-driving-stud',
        'earthing-accessories',
        'Threaded Driving Stud',
        'High strength carbon steel designed for driving sectional rods that can withstand hammer impacts during installation.',
        '/images/products/threaded-driving-stud.png',
        '/images/products/threaded-driving-stud.png',
        '["Hammer Impact Resistant","High Strength Steel","Thread Protection"]',
        '{"Material":"High Strength Carbon Steel","Application":"Sectional Rod Driving","Durability":"Multi-use capable"}',
        NULL,
        NULL,
        NULL,
        NULL
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'driving-spike',
        'earthing-accessories',
        'Driving Spike',
        'Designed to suit Copper bond Earth Rods so the ground can be penetrated and the Earth Rod can be driven with ease in dense soil.',
        '/images/products/driving-spike.png',
        '/images/products/driving-spike.png',
        '["Easy Penetration","Dense Soil Specialist","Rod Protection"]',
        '{"Compatibility":"Standard Copper Bonded Rods","Application":"Dense / High Density Soil"}',
        NULL,
        NULL,
        NULL,
        NULL
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'dowels',
        'earthing-accessories',
        'Dowels',
        'Precision joining components used to join copper rods together to achieve variable lengths for deep grounding.',
        '/images/products/dowels.png',
        '/images/products/dowels.png',
        '["Variable Length Capability","Precision Fit","Deep Grounding"]',
        '{"Material":"Conductive Copper Alloy","Function":"Rod Joining"}',
        NULL,
        NULL,
        NULL,
        NULL
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'earth-rod-to-cable-clamp',
        'earthing-accessories',
        'Earth Rod To Cable Clamp',
        'High-strength bronze alloy clamps, suitable for direct burial, providing low resistance copper to copper connections.',
        '/images/products/earth-rod-to-cable-clamp.png',
        '/images/products/earth-rod-to-cable-clamp.png',
        '["Direct Burial Rated","Bronze Alloy","Non-Ferrous Screws"]',
        '{"Material":"Bronze Alloy","Fasteners":"Non-Ferrous Screws","Service Life":"Extended Underground"}',
        NULL,
        NULL,
        NULL,
        NULL
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'earth-rod-to-tape-clamps',
        'earthing-accessories',
        'Earth Rod To Tape Clamps',
        'Corrosion resistive clamps with high conductivity and mechanical strength essential for long-term earthing system operation.',
        '/images/products/earth-rod-to-tape-clamps.png',
        '/images/products/earth-rod-to-tape-clamps.png',
        '["Mechanical Strength","Corrosion Resistive","Long Life"]',
        '{"Standard":"BS 7430 Compliance","Material":"Naval Brass / Gunmetal"}',
        NULL,
        NULL,
        NULL,
        NULL
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'ground-rod-clamp-u-bolt-saddle',
        'earthing-accessories',
        'Ground Rod Clamp U Bolt Saddle',
        'Allows a conductor to connect to a ground rod in both parallel and perpendicular orientations.',
        '/images/products/ground-rod-clamp-u-bolt-saddle.png',
        '/images/products/ground-rod-clamp-u-bolt-saddle.png',
        '["Dual Orientation","U-Bolt Security","Multi-Conductor"]',
        '{"Type":"U-Bolt Saddle","Orientation":"Parallel / Perpendicular"}',
        NULL,
        NULL,
        NULL,
        NULL
      );
INSERT INTO `products` (`slug`, `category`, `title`, `desc`, `image`, `hoverImage`, `features`, `specs`, `applications`, `longDesc`, `highlights`, `detailedTabs`) VALUES (
        'cable-clamp-u-bolt-saddle',
        'earthing-accessories',
        'Cable Clamp U Bolt Saddle',
        'Used to connect copper conductors to earth rods, manufactured from copper alloy with a pure copper U-bolt.',
        '/images/products/cable-clamp-u-bolt-saddle.png',
        '/images/products/cable-clamp-u-bolt-saddle.png',
        '["Pure Copper U-Bolt","Copper Alloy Body","High Conductivity"]',
        '{"Material":"Copper Alloy / Pure Copper","Application":"Conductor to Rod Connection"}',
        NULL,
        NULL,
        NULL,
        NULL
      );

-- --------------------------------------------------------
-- Table structure for table `metadata`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `metadata`;
CREATE TABLE IF NOT EXISTS `metadata` (
  `path` VARCHAR(255) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL
);

-- Dumping data for table `metadata`
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/', 'SAARA Earthing | Premium Earthing & Lightning Protection Solutions', 'India''s leading engineering company for earthing, exothermic welding, and lightning protection system for industries, refineries, power plants and more.');
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/company', 'About Us | SAARA Earthing', 'Learn about SAARA Earthing India Pvt. Ltd., our history, vision, mission, and leading earthing solutions.');
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/products', 'Product Catalog | SAARA Earthing', 'Explore our premium range of GI earthing, copper bonded electrodes, lightning arresters, and earthing accessories.');
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/products/earthing-products', 'Earthing Products | SAARA Earthing', 'Discover our high conductivity earthing electrodes, rods, and backfill compound solutions.');
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/products/earthing-accessories', 'Earthing Accessories | SAARA Earthing', 'Precision engineered couplers, driving studs, dowels, and clamps for grounding systems.');
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/earthing', 'Earthing System Design | SAARA Earthing', 'Technical guidance and system design details for chemical gel earthing and lightning protection.');
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/applications', 'Industrial Applications | SAARA Earthing', 'Grounding solutions for substations, data centers, oil & gas refineries, telecom towers, and malls.');
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/clients', 'Our Clients & Partners | SAARA Earthing', 'Trusted by leading public and private sector companies across India for safe grounding installations.');
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/quality', 'Quality Assurance | SAARA Earthing', 'Our commitment to CPRI certifications, rigorous testing standards, and premium raw materials.');
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/quote', 'Earthing Calculator & Quote | SAARA Earthing', 'Calculate earthing electrode and backfill quantity requirements for your project site and request a quote.');
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/contact', 'Contact Us | SAARA Earthing', 'Get in touch with our engineering team for technical support, product inquiries, and custom grounding designs.');
INSERT INTO `metadata` (`path`, `title`, `description`) VALUES ('/blog', 'Blog & Earthing Guides | SAARA Earthing', 'Read technical guides, case studies, and safety updates regarding chemical earthing systems, galvanized iron grounding, and lightning protection.');

-- --------------------------------------------------------
-- Table structure for table `blogs`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE IF NOT EXISTS `blogs` (
  `slug` VARCHAR(100) PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `excerpt` TEXT,
  `content` JSON,
  `image` VARCHAR(255),
  `author` VARCHAR(100),
  `readTime` VARCHAR(50),
  `date` VARCHAR(50),
  `metaTitle` VARCHAR(255),
  `metaDescription` TEXT
);

-- Dumping data for table `blogs`
INSERT INTO `blogs` (`slug`, `title`, `excerpt`, `content`, `image`, `author`, `readTime`, `date`, `metaTitle`, `metaDescription`) VALUES (
        'why-copper-grounding-essential',
        'Why Copper Grounding Is Essential for Industrial Facilities',
        'Grounding systems are vital for protecting personnel and equipment. Learn why pure copper is the gold standard for industrial applications.',
        '["Industrial plants operate with large machinery and high-voltage power networks. Under these environments, even minor faults can trigger catastrophic failures, destruction of equipment, or fatal electrical shock. To maintain operations and guarantee human safety, selecting the highest quality grounding materials is key.","Pure copper provides the highest electrical conductivity of all non-precious metals. Solid copper electrodes possess extremely low resistance path, meaning fault currents are channeled safely and instantly into the deep earth before damage occurs.","Moreover, solid copper does not corrode when placed in acidic soils. While galvanized iron rods degrade over several years requiring routine excavation and replacements, pure copper grounding units can survive 30+ years with zero maintenance. This makes it the most cost-effective solution for refineries, nuclear plants, and data centers."]',
        '/images/VIEW/20-08-2025 Sara Earthing1035 f.JPG',
        'Bhavik Kadia',
        '4 min read',
        'May 20, 2026',
        'Why Copper Grounding is Essential | SAARA Earthing',
        'Learn the key benefits of solid copper earthing electrodes for industrial plants, data centers, and refineries. High conductivity vs GI.'
      );
INSERT INTO `blogs` (`slug`, `title`, `excerpt`, `content`, `image`, `author`, `readTime`, `date`, `metaTitle`, `metaDescription`) VALUES (
        'gi-vs-copper-bonded-electrodes',
        'Galvanized Iron vs. Copper Bonded Electrodes: A Technical Comparison',
        'Uncover the mechanical and electrical differences between cost-effective GI grounding and high-durability copper bonded electrodes.',
        '["Choosing between Galvanized Iron (GI) and Copper Bonded earthing electrodes is a common challenge for project consultants. While price is a factor, understanding their metallurgical behavior is essential to select the correct specification.","Galvanized Iron electrodes rely on a hot-dip zinc coating to resist corrosion. In normal, stable soil conditions, GI is highly cost-effective and provides standard security. However, in aggressive soils containing salts and high moisture, the zinc layer dissolves, exposing raw iron to rust.","Copper Bonded electrodes utilize a molecularly bonded outer copper layer over a high-tensile steel core. The steel provides superior mechanical strength for hammer driving, while the copper layer provides 250+ micron thickness. This thick barrier guarantees UL 467 compliance and superior conductivity. For heavy-duty grid installations, copper bonded strikes the perfect balance of cost and longevity."]',
        '/images/VIEW/Copper Bonded Electrode.JPG',
        'Technical Team',
        '6 min read',
        'May 25, 2026',
        'Galvanized Iron vs Copper Bonded Electrodes | SAARA',
        'Detailed technical comparison between GI and Copper Bonded earthing electrodes. Learn about conductivity, life span, and cost difference.'
      );
