import { useEffect, useRef } from "react";

export default function Cursor() {
  var dotRef = useRef(null);
  var ringRef = useRef(null);
  var mousePos = useRef({ x: 0, y: 0 });
  var ringPos = useRef({ x: 0, y: 0 });
  var rafRef = useRef(null);

  useEffect(function() {
    function onMouseMove(e) {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = "translate(" + (e.clientX - 4) + "px, " + (e.clientY - 4) + "px)";
      }
    }

    function animate() {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = "translate(" + (ringPos.current.x - 18) + "px, " + (ringPos.current.y - 18) + "px)";
      }
      rafRef.current = requestAnimationFrame(animate);
    }

    function onMouseEnterLink() {
      if (ringRef.current) ringRef.current.classList.add("hovering");
      if (dotRef.current) dotRef.current.style.transform += " scale(0)";
    }
    function onMouseLeaveLink() {
      if (ringRef.current) ringRef.current.classList.remove("hovering");
    }

    window.addEventListener("mousemove", onMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    var links = document.querySelectorAll("a, button");
    links.forEach(function(el) {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return function() {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
