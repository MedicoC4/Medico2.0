import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------


const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'product',
    path: '/product-overview',
    icon: icon('ic_products'),
  },
  {
    title: 'Orders',
    path: '/orders',
    icon: icon('ic_cart'),
  },
  {
    title: 'Missing Products',
    path: '/missing-product',
    icon: icon('missing'),
  },
  {
    title: 'Statistics',
    path: '/blog',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
