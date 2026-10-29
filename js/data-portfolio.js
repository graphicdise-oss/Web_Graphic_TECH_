/* ============================================================
   DATA-PORTFOLIO.JS — Graphic Tech
   Centralised portfolio data. Add new work here — main.js
   reads this array to render the grid automatically.
   ============================================================ */

const PORTFOLIO_ITEMS = [
  // --- Original 8 Items ---
  {
    id: 'portfolio-1',
    title: 'Kinto Coffee - New System',
    category: 'Branding',
    image: 'assets/images/brand/3.2.1.png',
    tags: ['Branding', 'Design'],
    year: 2024,
    ratio: 1.500
  },
  {
    id: 'portfolio-2',
    title: 'ArtSpace Gallery App',
    category: 'Web Development',
    image: 'assets/images/brand/3.2.2.png',
    tags: ['Web App', 'Development'],
    year: 2024,
    ratio: 1.500
  },
  {
    id: 'portfolio-3',
    title: 'ReBank Mobile App',
    category: 'UI/UX Design',
    image: 'assets/images/brand/3.2.3.png',
    tags: ['UI/UX', 'Mobile App'],
    year: 2024,
    ratio: 1.500
  },
  {
    id: 'portfolio-4',
    title: 'Digital Brand Identity',
    category: 'Graphic Design',
    image: 'assets/images/brand/magnific_9ZAL1kiNYZ.png',
    tags: ['Brand Identity', 'Digital'],
    year: 2024,
    ratio: 1.000
  },
  {
    id: 'portfolio-5',
    title: 'Modern Cross-platform UX/UI',
    category: 'ERP System',
    image: 'assets/images/brand/magnific_modern-crossplatform-uxui_s7OQb7Bl8e.png',
    tags: ['Cross-platform', 'Mobile', 'Web'],
    year: 2024,
    ratio: 1.000
  },
  {
    id: 'portfolio-6',
    title: 'Modern E-Commerce Platform',
    category: 'Web Development',
    image: 'assets/images/brand/magnific_modern-ecommerce-uxui-lay_Cq5dqW4EEy.png',
    tags: ['E-Commerce', 'Web', 'UX/UI'],
    year: 2024,
    ratio: 1.000
  },
  {
    id: 'portfolio-7',
    title: 'E-Commerce Layout System',
    category: 'Digital Marketing',
    image: 'assets/images/brand/magnific_modern-ecommerce-uxui-lay_ovfWv3Q829.png',
    tags: ['Layout', 'System', 'E-Commerce'],
    year: 2024,
    ratio: 1.000
  },
  {
    id: 'portfolio-8',
    title: 'Creative Dashboard Interface',
    category: 'UI/UX Design',
    image: 'assets/images/brand/magnific_vQHM2XCa47.png',
    tags: ['Dashboard', 'Creative', 'Interface'],
    year: 2024,
    ratio: 1.000
  },
  
  // --- New 6 Items (Added) ---
  {
    id: 'portfolio-9',
    title: 'Product Concept 1 (Concept Design)',
    category: 'Branding',
    image: 'assets/images/brand/product1.png',
    tags: ['Branding', 'Concept Project'],
    year: 2024,
    ratio: 1.333
  },
  {
    id: 'portfolio-10',
    title: 'Product Concept 2 (Concept Design)',
    category: 'Web Development',
    image: 'assets/images/brand/product2.png',
    tags: ['Web', 'Concept Project'],
    year: 2024,
    ratio: 1.340
  },
  {
    id: 'portfolio-11',
    title: 'Product Concept 3 (Concept Design)',
    category: 'UI/UX Design',
    image: 'assets/images/brand/product3.png',
    tags: ['UI/UX', 'Concept Project'],
    year: 2024,
    ratio: 1.333
  },
  {
    id: 'portfolio-12',
    title: 'Product Concept 4 (Concept Design)',
    category: 'Graphic Design',
    image: 'assets/images/brand/product4.png',
    tags: ['Graphic', 'Concept Project'],
    year: 2024,
    ratio: 1.333
  },
  {
    id: 'portfolio-13',
    title: 'Product Concept 5 (Concept Design)',
    category: 'ERP System',
    image: 'assets/images/brand/product5.png',
    tags: ['ERP', 'Concept Project'],
    year: 2024,
    ratio: 1.333
  },
  {
    id: 'portfolio-14',
    title: 'Product Concept 6 (Concept Design)',
    category: 'Digital Marketing',
    image: 'assets/images/brand/product6.png',
    tags: ['Marketing', 'Concept Project'],
    year: 2024,
    ratio: 1.350
  }
];

/* Number of items shown per page load */
const PORTFOLIO_PAGE_SIZE = 6;
