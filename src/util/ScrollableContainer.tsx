import { useEffect, useRef } from "react";

const ScrollableContainer = ({ children }) => {
    const ref = useRef(null);
    
    useEffect(() => {
      const el = ref.current;
      if (!el) {
        return;
      }
  
      const onPointerDown = (e) => {
        e.preventDefault();
        el.style.scrollBehavior = 'auto';
        const startX = e.pageX - el.offsetLeft;
        const scrollLeft = el.scrollLeft;
  
        const onPointerMove = (e) => {
          const x = e.pageX - el.offsetLeft;
          const walk = (x - startX) * 2; // the *2 is the scroll speed
          el.scrollLeft = scrollLeft - walk;
        };
  
        const onPointerUpOrLeave = () => {
          el.style.scrollBehavior = 'smooth';
          document.removeEventListener('pointermove', onPointerMove);
          document.removeEventListener('pointerup', onPointerUpOrLeave);
          document.removeEventListener('pointerleave', onPointerUpOrLeave);
        };
  
        document.addEventListener('pointermove', onPointerMove);
        document.addEventListener('pointerup', onPointerUpOrLeave);
        document.addEventListener('pointerleave',onPointerUpOrLeave);
  };

    el.addEventListener('pointerdown', onPointerDown);
  
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);
  
  return (
    <div ref={ref} className="horizontal-scroll-wrapper">
      {children}
    </div>
  );
  };
  
  export default ScrollableContainer;