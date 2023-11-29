import { Helmet } from 'react-helmet-async';

import { AddProduct } from 'src/sections/addProduct';

// ----------------------------------------------------------------------

export default function AddProducts() {
  return (
    <>
      <Helmet>
        <title> Add Products </title>
      </Helmet>

      <AddProduct />
    </>
  );
}