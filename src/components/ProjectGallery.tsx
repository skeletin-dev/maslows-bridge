import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

type ProjectGalleryProps = {
  images: ProjectImage[];
  title: string;
};

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

const arrowButton =
  "focus-ring absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/90 text-mb-ink shadow-lg ring-1 ring-black/5 backdrop-blur transition-[background-color,transform] duration-200 hover:bg-white motion-safe:active:scale-95";

/**
 * Swipeable photo carousel for a project page. Uses native scroll-snap so touch swiping
 * feels natural on phones; arrows, dots, thumbnails and arrow keys drive the same scroller.
 */
export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const count = images.length;

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track || count === 0) return;
      const wrapped = (next + count) % count;
      track.scrollTo({
        left: wrapped * track.clientWidth,
        behavior: prefersReducedMotion() ? "auto" : "smooth",
      });
    },
    [count],
  );

  function onScroll() {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track || !track.clientWidth) return;
      indexRef.current = Math.round(track.scrollLeft / track.clientWidth);
      setIndex(indexRef.current);
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  }

  // Keep the active thumbnail visible without moving the page vertically.
  useEffect(() => {
    const strip = thumbsRef.current;
    const thumb = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !thumb) return;
    const left = thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2;
    strip.scrollTo({ left, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [index]);

  // Stay on the same photo when the viewport is resized or rotated.
  useEffect(() => {
    const track = trackRef.current;
    if (!track || count < 2) return;
    let width = track.clientWidth;
    const observer = new ResizeObserver(() => {
      if (track.clientWidth === width) return;
      width = track.clientWidth;
      track.scrollTo({ left: indexRef.current * width, behavior: "auto" });
    });
    observer.observe(track);
    return () => observer.disconnect();
  }, [count]);

  if (count === 0) return null;
  const multiple = count > 1;

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`Photos of ${title}`}
      onKeyDown={multiple ? onKeyDown : undefined}
    >
      <div className="relative overflow-hidden rounded-2xl bg-mb-surface shadow-[0_30px_60px_-25px_rgba(20,29,46,0.55)] ring-1 ring-black/5">
        <div
          ref={trackRef}
          onScroll={multiple ? onScroll : undefined}
          tabIndex={multiple ? 0 : undefined}
          aria-label={multiple ? "Photo carousel. Use the left and right arrow keys to browse." : undefined}
          className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-mb-accent [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, i) => (
            <div
              key={image.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={multiple && i !== index ? true : undefined}
              className="relative aspect-[4/3] w-full shrink-0 snap-center snap-always overflow-hidden sm:aspect-[16/10] lg:aspect-[16/9]"
            >
              {/* Blurred copy fills the frame so portrait and landscape photos both look intentional. */}
              <img
                src={image.url}
                alt=""
                aria-hidden="true"
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full scale-110 object-cover opacity-55 blur-2xl"
              />
              <img
                src={image.url}
                alt={`${title}, photo ${i + 1} of ${count}`}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                decoding="async"
                draggable={false}
                className="relative h-full w-full select-none object-contain"
              />
            </div>
          ))}
        </div>

        {multiple ? (
          <>
            <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous photo" className={`${arrowButton} left-3 sm:left-4`}>
              <ChevronIcon direction="left" />
            </button>
            <button type="button" onClick={() => goTo(index + 1)} aria-label="Next photo" className={`${arrowButton} right-3 sm:right-4`}>
              <ChevronIcon direction="right" />
            </button>

            <p className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-mb-surface/75 px-2.5 py-1 text-xs font-semibold tabular-nums text-mb-text-on-dark backdrop-blur sm:right-4 sm:top-4" aria-hidden="true">
              {index + 1} / {count}
            </p>

            {/* Dots on phones (thumbnails take over from sm up). */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center bg-linear-to-t from-mb-surface/60 to-transparent pb-3 pt-8 sm:hidden">
              <div className="pointer-events-auto flex max-w-[80%] flex-wrap justify-center gap-1">
                {images.map((image, i) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    className="flex h-6 min-w-6 cursor-pointer items-center justify-center"
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all duration-300 ${
                        i === index ? "w-5 bg-mb-accent" : "w-1.5 bg-white/70"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>

      {multiple ? (
        <div
          ref={thumbsRef}
          className="mt-3 hidden gap-2.5 overflow-x-auto p-1 [scrollbar-width:thin] sm:flex"
        >
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={`focus-ring relative aspect-[4/3] w-24 shrink-0 cursor-pointer overflow-hidden rounded-lg transition-[opacity,box-shadow] duration-200 lg:w-28 ${
                i === index
                  ? "opacity-100 ring-2 ring-mb-accent ring-offset-2 ring-offset-mb-cream"
                  : "opacity-60 ring-1 ring-mb-mist hover:opacity-100"
              }`}
            >
              <img src={image.url} alt="" loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {multiple ? `Photo ${index + 1} of ${count}` : ""}
      </p>
    </section>
  );
}
