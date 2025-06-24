// src/components/ClientOnly.jsx
import { useEffect, useState } from 'react';

const ClientOnly = ({ children, fallback = null }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? children : fallback;
};

export default ClientOnly;
