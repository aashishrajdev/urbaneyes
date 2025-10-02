import { useEffect, useRef, useState } from 'react';

export function useMap() {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const whenCreated = (mapInstance) => {
    if (mapRef.current) {
      mapRef.current.remove();
    }
    mapRef.current = mapInstance;
    setMap(mapInstance);
  };

  return {
    map,
    isMounted,
    whenCreated,
  };
} 