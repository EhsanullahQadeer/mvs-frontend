import { useEffect, useRef, useState } from "react";

const ScrollableContainer = ({
  children,
  jumpAmount = 200,
  scrollInterval = 2000,
  scrollDuration = 600,
  scrollAutomatically = false,
}) => {
  const ref = useRef(null);
  const [scrolling, setScrolling] = useState(false);
  const [wrapToStart, setWrapToStart] = useState(false);

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
    <div
      ref={ref}
      className="horizontal-scroll-wrapper overflow-auto whitespace-nowrap"
    >
      {children}
    </div>
  );
};

export default ScrollableContainer;
