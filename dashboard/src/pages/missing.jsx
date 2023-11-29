import { Helmet } from 'react-helmet-async';

import { MissingProd } from 'src/sections/missingProd';

// ----------------------------------------------------------------------

export default function MissingProds() {
  return (
    <>
      <Helmet>
        <title> Missing Products </title>
      </Helmet>

      <MissingProd />
    </>
  );
}
