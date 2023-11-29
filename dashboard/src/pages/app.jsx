import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NextUIProvider } from '@nextui-org/react';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard </title>
      </Helmet>
      <NextUIProvider>
        <AppView />
      </NextUIProvider>
    </>
  );
}
