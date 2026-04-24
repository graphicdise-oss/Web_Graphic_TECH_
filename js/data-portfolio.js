/* ============================================================
   DATA-PORTFOLIO.JS — Graphic Tech
   Centralised portfolio data. Add new work here — main.js
   reads this array to render the grid automatically.
   ============================================================ */

const PORTFOLIO_ITEMS = [
  {
    id: 'web-mandarin',
    title: 'Mandarin Oriental E-Commerce',
    category: 'Web Development',
    image: 'assets/images/portfolio/web-mandarin.jpg',
    tags: ['React', 'Node.js', 'E-Commerce'],
    year: 2024,
  },
  {
    id: 'logo-novae',
    title: 'Novae Brand Identity',
    category: 'Branding',
    image: 'assets/images/portfolio/logo-novae.jpg',
    tags: ['Logo', 'Brand Identity', 'Stationery'],
    year: 2024,
  },
  {
    id: 'uiux-flowmed',
    title: 'FlowMed Patient App',
    category: 'UI/UX Design',
    image: 'assets/images/portfolio/uiux-flowmed.jpg',
    tags: ['Figma', 'Mobile App', 'Healthcare'],
    year: 2024,
  },
  {
    id: 'erp-logipro',
    title: 'LogiPro ERP Dashboard',
    category: 'ERP System',
    image: 'assets/images/portfolio/erp-logipro.jpg',
    tags: ['ERP', 'Dashboard', 'Logistics'],
    year: 2023,
  },
  {
    id: 'graphic-siam',
    title: 'Siam Collection Campaign',
    category: 'Graphic Design',
    image: 'assets/images/portfolio/graphic-siam.jpg',
    tags: ['Campaign', 'Print', 'Digital'],
    year: 2023,
  },
  {
    id: 'marketing-bloom',
    title: 'Bloom Beauty Digital Campaign',
    category: 'Digital Marketing',
    image: 'assets/images/portfolio/marketing-bloom.jpg',
    tags: ['Social Media', 'Ads', 'Content'],
    year: 2023,
  },
  {
    id: 'web-artspace',
    title: 'ArtSpace Gallery Website',
    category: 'Web Development',
    image: 'assets/images/portfolio/web-artspace.jpg',
    tags: ['CMS', 'Gallery', 'Animation'],
    year: 2023,
  },
  {
    id: 'branding-kinto',
    title: 'Kinto Coffee Brand System',
    category: 'Branding',
    image: 'assets/images/portfolio/branding-kinto.jpg',
    tags: ['Packaging', 'Brand System', 'F&B'],
    year: 2023,
  },
  {
    id: 'uiux-rebank',
    title: 'ReBank Mobile Banking UX',
    category: 'UI/UX Design',
    image: 'assets/images/portfolio/uiux-rebank.jpg',
    tags: ['Fintech', 'Mobile', 'UX Research'],
    year: 2022,
  },
];

/* Number of items shown per page load */
const PORTFOLIO_PAGE_SIZE = 6;
