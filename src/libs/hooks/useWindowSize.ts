import { useEffect, useState } from 'react';

// Define a type for the window size
interface WindowSize {
  width: number;
  height: number;
}

function useWindowSize(): WindowSize {
  // Initialize state with undefined width/height so server-side rendering works
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Handler function to update window size
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener on mount
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup to prevent memory leaks
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default useWindowSize;
