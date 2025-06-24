// src/components/ui/provider.jsx
'use client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  // Customize your theme here if needed
});

export function Provider({ children }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
