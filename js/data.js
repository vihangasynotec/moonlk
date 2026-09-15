/**
 * MoonLK Clothing - Atelier Catalog & Curated Editorial Data
 * Kurunegala, Sri Lanka
 */

const MOONLK_DATA = {
  brand: {
    name: "MOONLK",
    tagline: "Contemporary Atelier & Island Silhouettes",
    origin: "Kurunegala, Sri Lanka",
    address: "No. 48, Colombo Road, Kurunegala, North Western Province, Sri Lanka",
    phone: "+94 37 222 8490",
    email: "atelier@moonlk.com",
    established: "2024",
    hours: "Tuesday – Sunday: 10:00 AM – 7:30 PM (Poya Days Closed)",
    currencyRateUSD: 0.0033 // 1 LKR approx 0.0033 USD (or 1 USD = 305 LKR)
  },

  products: [
    {
      id: "mlk-w-01",
      name: "Aura Silk Charmeuse Slip Gown",
      category: "women",
      subCategory: "Gowns",
      edition: "Edition 04 / Tropical Minimalism",
      priceLKR: 32500,
      badge: "NEW ARRIVAL",
      rating: 4.9,
      reviewCount: 28,
      featured: true,
      material: "100% Organic Island Mulberry Silk",
      colorOptions: [
        { name: "Blush Champagne", hex: "#E8C8C4", class: "blush" },
        { name: "Porcelain Ivory", hex: "#F7F5F0", class: "ivory" },
        { name: "Obsidian Noir", hex: "#1A1A1A", class: "noir" }
      ],
      sizes: ["XS", "S", "M", "L"],
      images: [
        "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "Draped by master artisans in our Kurunegala atelier, this floor-grazing slip gown honors clean verticality. Featuring bias-cut mulberry silk with a subtle liquid luster that catches the warm tropical light.",
      details: [
        "Bias cut for a natural body-skimming drape",
        "Adjustable delicate micro-rouleau straps",
        "Deep cowl neckline with reinforced French seams",
        "Dry clean only or cold hand wash with silk detergent",
        "Ethically tailored in Kurunegala, Sri Lanka"
      ],
      inStock: true,
      stockCount: 6
    },
    {
      id: "mlk-w-02",
      name: "Sylvan Tailored Linen Blazer",
      category: "women",
      subCategory: "Tailoring",
      edition: "Edition 04 / Tropical Minimalism",
      priceLKR: 28900,
      badge: "BESTSELLER",
      rating: 5.0,
      reviewCount: 42,
      featured: true,
      material: "100% Hand-Spun Belgian-Sri Lankan Linen",
      colorOptions: [
        { name: "Soft Petal Pink", hex: "#F3DCDA", class: "petal" },
        { name: "Raw Ecru", hex: "#EFECE6", class: "ecru" },
        { name: "Smoked Sage", hex: "#C2C9BF", class: "sage" }
      ],
      sizes: ["S", "M", "L", "XL"],
      images: [
        "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "A relaxed, boyfriend-cut single-breasted blazer constructed from breathable, dense-weave linen. Perfect for balmy evening vernissages or smart office tailoring in Colombo and Kurunegala.",
      details: [
        "Horn button front closure with notched lapel",
        "Lightweight cupro half-lining for equatorial breathability",
        "Dual jetted welt flap pockets",
        "Pre-washed for a buttery, broken-in feel",
        "Designed and hand-finished in Kurunegala"
      ],
      inStock: true,
      stockCount: 9
    },
    {
      id: "mlk-m-01",
      name: "Ceylon Cuban Relaxed Camp Shirt",
      category: "men",
      subCategory: "Shirts",
      edition: "Heritage Edition",
      priceLKR: 18500,
      badge: "NEW",
      rating: 4.8,
      reviewCount: 31,
      featured: true,
      material: "Pure Washed Organic Linen",
      colorOptions: [
        { name: "Ivory Mist", hex: "#F5F3EF", class: "ivory" },
        { name: "Blush Sand", hex: "#EBD8D4", class: "sand" },
        { name: "Charcoal Slate", hex: "#2B2B2C", class: "charcoal" }
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
      images: [
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "An effortless sartorial essential designed for the tropical climate. Features an open Cuban camp collar, relaxed boxy cut, and mother-of-pearl buttons hand-sewn in our studio.",
      details: [
        "Relaxed boxy silhouette with drop shoulder",
        "Authentic shell mother-of-pearl buttons",
        "Side split hem with bar-tack reinforcement",
        "Naturally thermoregulating linen fibers",
        "Handcrafted in Sri Lanka"
      ],
      inStock: true,
      stockCount: 14
    },
    {
      id: "mlk-m-02",
      name: "Atelier Pleated Tropical Trousers",
      category: "men",
      subCategory: "Trousers",
      edition: "Tailoring Series",
      priceLKR: 24500,
      badge: "LIMITED",
      rating: 4.9,
      reviewCount: 19,
      featured: false,
      material: "Linen & Tencel Suiting Twill",
      colorOptions: [
        { name: "Dune Sand", hex: "#D9CEC5", class: "dune" },
        { name: "Pale Rose Ash", hex: "#DFD2D0", class: "roseash" },
        { name: "Midnight Ink", hex: "#1C1C1E", class: "ink" }
      ],
      sizes: ["30", "32", "34", "36"],
      images: [
        "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "Combining European tailoring precision with Sri Lankan casual ease. Double reverse pleats create a fluid drape down to a subtly tapered cuff.",
      details: [
        "Double reverse front pleats for fluid drape",
        "Side adjusters with antique brass buckles (no belt needed)",
        "Deep pocket bags crafted from organic cotton muslin",
        "Blind stitched hems with 2-inch extension allowance",
        "Tailored in Kurunegala"
      ],
      inStock: true,
      stockCount: 7
    },
    {
      id: "mlk-w-03",
      name: "Seraphina Organza Tiered Sundress",
      category: "women",
      subCategory: "Dresses",
      edition: "Edition 04 / Tropical Minimalism",
      priceLKR: 36000,
      badge: "ATELIER EXCLUSIVE",
      rating: 5.0,
      reviewCount: 18,
      featured: true,
      material: "Hand-Loomed Cotton Organza",
      colorOptions: [
        { name: "Ethereal Blush", hex: "#F6E5E3", class: "ethereal" },
        { name: "Alabaster White", hex: "#FAFAFA", class: "alabaster" }
      ],
      sizes: ["XS", "S", "M", "L"],
      images: [
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "An architectural marvel of sheer layers and airy tiered volume. Features an open back tied with exaggerated silk ribbons and hidden side seam pockets.",
      details: [
        "Hand-gathered tier panels for romantic volume",
        "Self-tie grosgrain back sash ribbons",
        "Built-in 100% fine cotton slip lining",
        "Discrete in-seam pockets",
        "Kurunegala Atelier bespoke edition"
      ],
      inStock: true,
      stockCount: 4
    },
    {
      id: "mlk-k-01",
      name: "Heirloom Linen Smocked Romper",
      category: "kids",
      subCategory: "Toddler & Baby",
      edition: "Little Moon Atelier",
      priceLKR: 12500,
      badge: "NEW",
      rating: 4.9,
      reviewCount: 15,
      featured: false,
      material: "Hypoallergenic Certified Organic Linen",
      colorOptions: [
        { name: "Dusty Blossom", hex: "#EBCFCF", class: "blossom" },
        { name: "Porcelain Cream", hex: "#F5F2EC", class: "cream" }
      ],
      sizes: ["6-12M", "12-18M", "2-3Y", "4-5Y"],
      images: [
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "Crafted for precious milestones. Delicately hand-smocked across the chest by artisanal women embroiderers in the Kurunegala district, using chemical-free botanical dyes.",
      details: [
        "Hand-smocked yoke with subtle rose gold threading",
        "Wooden coconut shell snap closures for easy dressing",
        "Gentle elasticated leg cuffs that never pinch",
        "Pre-softened to protect sensitive young skin",
        "Community handcrafted in Kurunegala"
      ],
      inStock: true,
      stockCount: 11
    },
    {
      id: "mlk-k-02",
      name: "Petit Voyageur Cotton Set",
      category: "kids",
      subCategory: "Sets",
      edition: "Little Moon Atelier",
      priceLKR: 14800,
      badge: "POPULAR",
      rating: 4.8,
      reviewCount: 22,
      featured: false,
      material: "GOTS Certified Pima Cotton Rib",
      colorOptions: [
        { name: "Almond & Petal", hex: "#EEDAD7", class: "almond" },
        { name: "Cloud Mist", hex: "#F3F5F7", class: "cloud" }
      ],
      sizes: ["2-3Y", "4-5Y", "6-7Y"],
      images: [
        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "A two-piece leisure set comprising a mock-neck pullover and relaxed drawstring shorts. Durable yet cloud-soft for young exploratory spirits.",
      details: [
        "Two-piece coordinated top and bloomer short",
        "Flat-locked sensory friendly interior seams",
        "Natural drawstring waist with contrast pink tassels",
        "Machine wash gentle, tumble dry low",
        "Made in Sri Lanka"
      ],
      inStock: true,
      stockCount: 15
    },
    {
      id: "mlk-a-01",
      name: "The Luna Woven Raffia & Calfskin Tote",
      category: "accessories",
      subCategory: "Bags",
      edition: "Artisan Leathercraft",
      priceLKR: 26500,
      badge: "BESTSELLER",
      rating: 5.0,
      reviewCount: 54,
      featured: true,
      material: "Natural Talipot Palm Fiber & Full Grain Leather",
      colorOptions: [
        { name: "Blush Nude Leather", hex: "#DDB8B4", class: "nude" },
        { name: "Caramel Sienna", hex: "#B87C52", class: "caramel" }
      ],
      sizes: ["One Size"],
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "Woven by generational artisans using indigenous Sri Lankan palm weave techniques, trimmed with supple Italian-tanned blush calfskin and gold-toned MoonLK hardware.",
      details: [
        "Removable internal canvas zip pouch",
        "Reinforced hand-stitched leather handles",
        "Gold foil debossed MoonLK atelier monogram",
        "Protective brass feet on base",
        "Includes bespoke silk dustbag"
      ],
      inStock: true,
      stockCount: 8
    },
    {
      id: "mlk-a-02",
      name: "Solstice Sculpted Pink Quartz Choker",
      category: "accessories",
      subCategory: "Fine Jewellery",
      edition: "Ceylon Gem Collection",
      priceLKR: 19800,
      badge: "LIMITED EDITION",
      rating: 4.9,
      reviewCount: 37,
      featured: false,
      material: "18K Vermeil Gold & Raw Sri Lankan Rose Quartz",
      colorOptions: [
        { name: "Vermeil Rose Gold", hex: "#E8B2A7", class: "rosegold" },
        { name: "Sterling Silver", hex: "#DCDDE1", class: "silver" }
      ],
      sizes: ["Adjustable (38-44cm)"],
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "Ethically mined in the gem-rich valleys of Ratnapura and sculpted in our North Western atelier. Each natural pink quartz stone possesses a unique crystalline formation.",
      details: [
        "Authentic Ceylon natural rose quartz cabochon",
        "Heavy 2.5 micron 18k gold over 925 sterling silver",
        "Custom MoonLK crescent toggle clasp",
        "Hypoallergenic and nickel-free",
        "Hand-polished in Sri Lanka"
      ],
      inStock: true,
      stockCount: 5
    },
    {
      id: "mlk-w-04",
      name: "Kandyan Sculpted Wrap Trench",
      category: "women",
      subCategory: "Outerwear",
      edition: "Edition 04 / Tropical Minimalism",
      priceLKR: 44000,
      badge: "RUNWAY PIECE",
      rating: 5.0,
      reviewCount: 16,
      featured: true,
      material: "Heavy Tropical Cotton Gabardine",
      colorOptions: [
        { name: "Pale Blush Sand", hex: "#EBDAD7", class: "blushsand" },
        { name: "Stone White", hex: "#F2EFEB", class: "stone" }
      ],
      sizes: ["XS", "S", "M", "L"],
      images: [
        "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "A showstopping deconstructed trench coat celebrating modern architectural silhouettes. Features exaggerated storm flaps, wide lapels, and an obi-style sash belt.",
      details: [
        "Water-resistant dense weave cotton gabardine",
        "Exaggerated storm flap and deep raglan shoulder cut",
        "Double-layer sash belt with tortoiseshell D-rings",
        "Ventilated back yoke with silk bound interior seams",
        "Hand-tailored in Kurunegala"
      ],
      inStock: true,
      stockCount: 3
    },
    {
      id: "mlk-m-03",
      name: "Elysian Raw Silk Kimono Cardigan",
      category: "men",
      subCategory: "Knitwear & Layering",
      edition: "Heritage Edition",
      priceLKR: 27500,
      badge: "NEW",
      rating: 4.7,
      reviewCount: 14,
      featured: false,
      material: "100% Raw Spun Matka Silk",
      colorOptions: [
        { name: "Chalk Oat", hex: "#EAE6DF", class: "chalk" },
        { name: "Muted Blossom", hex: "#E0CAC7", class: "blossom" },
        { name: "Coal Black", hex: "#1A1A1A", class: "black" }
      ],
      sizes: ["S-M (Relaxed)", "L-XL (Relaxed)"],
      images: [
        "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "Subtly textured Matka silk handwoven on traditional looms. An airy open-front silhouette designed to drape effortlessly over tees and trousers.",
      details: [
        "Textured raw slub silk with natural irregularities",
        "Clean dropped shoulders and wide kimono sleeves",
        "Hidden interior chest pocket for cards or phone",
        "Breathable, lightweight, and seasonless",
        "Atelier crafted in Kurunegala"
      ],
      inStock: true,
      stockCount: 8
    },
    {
      id: "mlk-a-03",
      name: "Serenade Hand-Rolled Silk Scarf",
      category: "accessories",
      subCategory: "Scarves",
      edition: "Atelier Art Series",
      priceLKR: 13900,
      badge: "POPULAR",
      rating: 4.9,
      reviewCount: 47,
      featured: false,
      material: "100% Island Silk Twill (16mm)",
      colorOptions: [
        { name: "Blush Flora", hex: "#ECCDCB", class: "blushflora" },
        { name: "Ivory Minimalist", hex: "#F7F6F2", class: "ivory" }
      ],
      sizes: ["90cm x 90cm"],
      images: [
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000&auto=format&fit=crop"
      ],
      description: "Original botanical watercolor prints inspired by the endemic flora of the Kurunegala Bathalagala rock fortress. Finished with meticulous hand-rolled edges.",
      details: [
        "Hand-rolled French hem hand-stitched over 4 hours",
        "16mm heavyweight silk twill for structured folds",
        "Vibrant eco-friendly archival dye print",
        "Gift boxed in MoonLK embossed packaging",
        "Handmade in Sri Lanka"
      ],
      inStock: true,
      stockCount: 12
    }
  ],

  lookbook: [
    {
      id: "look-01",
      title: "Look 01: The Dawn of Solitude",
      season: "Edition 04 / Spring-Summer",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop",
      quote: "Linen shaped by morning breeze over the Kurunegala ridge.",
      hotspots: [
        {
          x: 48,
          y: 35,
          productId: "mlk-w-02",
          productName: "Sylvan Tailored Linen Blazer",
          price: "LKR 28,900"
        },
        {
          x: 52,
          y: 72,
          productId: "mlk-w-01",
          productName: "Aura Silk Charmeuse Slip Gown",
          price: "LKR 32,500"
        }
      ]
    },
    {
      id: "look-02",
      title: "Look 02: Architectural Ease",
      season: "Edition 04 / Menswear",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1400&auto=format&fit=crop",
      quote: "Sharp tailoring meets tropical serenity in pure unbleached fiber.",
      hotspots: [
        {
          x: 50,
          y: 40,
          productId: "mlk-m-01",
          productName: "Ceylon Cuban Relaxed Camp Shirt",
          price: "LKR 18,500"
        },
        {
          x: 48,
          y: 78,
          productId: "mlk-m-02",
          productName: "Atelier Pleated Tropical Trousers",
          price: "LKR 24,500"
        }
      ]
    },
    {
      id: "look-03",
      title: "Look 03: The Evening Sculpture",
      season: "Edition 04 / Haute Couture",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop",
      quote: "Delicate organza catching the golden hour in the central province.",
      hotspots: [
        {
          x: 45,
          y: 45,
          productId: "mlk-w-03",
          productName: "Seraphina Organza Tiered Sundress",
          price: "LKR 36,000"
        },
        {
          x: 58,
          y: 30,
          productId: "mlk-a-02",
          productName: "Solstice Sculpted Pink Quartz Choker",
          price: "LKR 19,800"
        }
      ]
    },
    {
      id: "look-04",
      title: "Look 04: The Island Wanderer",
      season: "Edition 04 / Resort",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1400&auto=format&fit=crop",
      quote: "Modern silhouettes crafted for mindful wanderlust.",
      hotspots: [
        {
          x: 52,
          y: 55,
          productId: "mlk-w-04",
          productName: "Kandyan Sculpted Wrap Trench",
          price: "LKR 44,000"
        },
        {
          x: 38,
          y: 70,
          productId: "mlk-a-01",
          productName: "The Luna Woven Raffia & Calfskin Tote",
          price: "LKR 26,500"
        }
      ]
    }
  ],

  journal: [
    {
      id: "journal-01",
      slug: "architecture-of-sri-lankan-linen",
      title: "The Architecture of Sri Lankan Linen: Breathability Meets Form",
      category: "Fabric & Heritage",
      date: "September 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=900&auto=format&fit=crop",
      excerpt: "How our Kurunegala atelier balances the humid tropical climate with structured silhouettes reminiscent of high Parisian couture."
    },
    {
      id: "journal-02",
      slug: "kurunegala-atelier-story",
      title: "Inside the Kurunegala Atelier: Generational Hands, Modern Lines",
      category: "Atelier Notes",
      date: "August 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=900&auto=format&fit=crop",
      excerpt: "Step behind our stone-walled workshop on Colombo Road where local master patternmakers translate island poetry into wearable art."
    },
    {
      id: "journal-03",
      slug: "sustainable-silk-dyeing",
      title: "Botanical Blush: Natural Dye Formulations from Central Ceylon",
      category: "Sustainability",
      date: "July 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1507553532144-b9df5e38c8d1?q=80&w=900&auto=format&fit=crop",
      excerpt: "The chemistry behind our signature blush pink hue, derived from madder roots, hibiscus petals, and clean rainwater reservoirs."
    }
  ],

  instagram: [
    {
      handle: "@moonlk_official",
      likes: "1,420",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=600&auto=format&fit=crop",
      caption: "Muted mornings in Kurunegala. Draped in Edition 04."
    },
    {
      handle: "@moonlk_official",
      likes: "982",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop",
      caption: "Silk organza catching the dusk breeze."
    },
    {
      handle: "@moonlk_official",
      likes: "2,130",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop",
      caption: "Menswear tailoring tailored for island humidity."
    },
    {
      handle: "@moonlk_official",
      likes: "1,754",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=600&auto=format&fit=crop",
      caption: "Artisan woven palm totes, handcrafted with Italian calfskin."
    },
    {
      handle: "@moonlk_official",
      likes: "1,890",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
      caption: "The Aura Slip Gown in Blush Champagne. Bespoke fittings available."
    },
    {
      handle: "@moonlk_official",
      likes: "1,240",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop",
      caption: "Architectural lapels. Designed in Kurunegala, worn worldwide."
    }
  ]
};
