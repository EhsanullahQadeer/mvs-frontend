import { useEffect, useRef, useState } from "react";

const ScrollableContainer = ({
  children,
  jumpAmount = 200,
  scrollInterval = 2000,
  scrollDuration = 600,
  scrollAutomatically = false,
  showScrollArrows = false,
  title = null,
  desc = null,
}) => {
  const ref = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const [scrolling, setScrolling] = useState(false);
  const [wrapToStart, setWrapToStart] = useState(false);



  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setIsScrollable(ref.current.scrollWidth > ref.current.clientWidth);
      }
    };
  
    // Initial check and window resize
    handleResize();
    window.addEventListener('resize', handleResize);
  
    // Mutation observer to watch for content changes
    const observer = new MutationObserver(handleResize);
    if (ref.current) {
      observer.observe(ref.current, { childList: true, subtree: true });
    }
  
    return () => {
      window.removeEventListener('resize', handleResize);
      if (ref.current) {
        observer.disconnect();
      }
    };
  }, []);

  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };



  useEffect(() => {
    const el = ref.current;
    if (!el) return;


    // Add manual scrolling
    const onPointerDown = (e) => {
      e.preventDefault();
      el.style.scrollBehavior = "auto";
      const startX = e.pageX - el.offsetLeft;
      const scrollLeft = el.scrollLeft;

      const onPointerMove = (e) => {
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 2; // Adjust the multiplier for scrolling speed
        el.scrollLeft = scrollLeft - walk;
      };

      const onPointerUpOrLeave = () => {
        el.style.scrollBehavior = "smooth";
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUpOrLeave);
        document.removeEventListener("pointerleave", onPointerUpOrLeave);
      };

      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUpOrLeave);
      document.addEventListener("pointerleave", onPointerUpOrLeave);
    };

    el.addEventListener("pointerdown", onPointerDown);

    // Add automatic scrolling only if scrollAutomatically is true
    let interval;
    if (scrollAutomatically) {
      const smoothScroll = (start, end, duration) => {
        let startTime = null;

        const easeInOutQuad = (t, b, c, d) => {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t + b;
          t--;
          return (-c / 2) * (t * (t - 2) - 1) + b;
        };

        const animateScroll = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;

          const nextScrollLeft = easeInOutQuad(
            elapsed,
            start,
            end - start,
            duration
          );
          el.scrollLeft = nextScrollLeft;

          if (elapsed < duration) {
            requestAnimationFrame(animateScroll);
          } else {
            setScrolling(false);
          }
        };

        requestAnimationFrame(animateScroll);
      };

      interval = setInterval(() => {
        if (scrolling) return;
        setScrolling(true);

        const start = el.scrollLeft;
        let end;

        if (wrapToStart) {
          end = 0; // Reset to start if previously wrapped
          setWrapToStart(false);
        } else {
          end = start + jumpAmount;
          const maxScrollLeft = el.scrollWidth - el.clientWidth;

          // If about to exceed the max scroll limit
          if (end >= maxScrollLeft) {
            end = maxScrollLeft;
            setWrapToStart(true); // Flag for next interval to wrap to start
          }
        }

        smoothScroll(start, end, scrollDuration);
      }, scrollInterval);
    }

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      if (interval) clearInterval(interval);
    };
  }, [jumpAmount, scrollInterval, scrollDuration, scrollAutomatically, scrolling, wrapToStart]);

  return (
    <div>
      {(title || showScrollArrows) && (
        <div className="flex justify-between items-center">
          {title && (
            <p className="text-[#fff] text-[20px] font-['Mona-Sans-B']">
              {title}
            </p>
          )}

          {showScrollArrows && (
            <div className="flex space-x-2">
              {isScrollable && (
                <button onClick={scrollLeft}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#C4FF48"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              )}
              {isScrollable && (
                <button onClick={scrollRight}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#C4FF48"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {desc && (
        <p className="text-[#6e6e6e] pb-[14px] font-['Mona-Sans-R']">{desc}</p>
      )}

      <div
        ref={ref}
        className="horizontal-scroll-wrapper overflow-auto whitespace-nowrap"
      >
        {children}
      </div>
    </div>
  );
};
export default ScrollableContainer;
