import { Helmet } from 'react-helmet-async';

import { UpdateProdut } from 'src/sections/updataProduct';

// ----------------------------------------------------------------------

export default function UpdateProduts() {
  return (
    <>
      <Helmet>
        <title> Add Products </title>
      </Helmet>

      <UpdateProdut />
    </>
  );
}