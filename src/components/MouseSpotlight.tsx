import { useEffect } from "react";

export function MouseSpotlight() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.className = "mouse-spotlight";
    document.body.appendChild(el);

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const update = () => {
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      raf = 0;
    };
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onEnter = () => el.classList.add("is-active");
    const onLeave = () => el.classList.remove("is-active");

    update();
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      el.remove();
    };
  }, []);

  return null;
}