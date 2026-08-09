import { useState } from "react";

/**
 * VengeanceButton — faithful adaptation of VengenceUI "Generate Button".
 *
 * Changes from original:
 *   - Converted from TypeScript to JSX
 *   - Removed cn() dependency
 *   - Customizable text via children prop (no sparkle SVG icon)
 *   - Supports rendering as <a> via href prop
 *   - White glow shadows replaced with portfolio blue (#0A84FF) tint
 *   - Scoped CSS class names per-instance to avoid collisions
 *
 * Behavior (matches original exactly):
 *   - Hover: CSS-only border glow + bottom gradient reveal (NO scale)
 *   - Focus/Click: triggers "generating" letter animation state
 *   - Blur: exits generating state
 */
export default function VengeanceButton({
  children = "Button",
  hue = 210,
  href,
  download,
  target,
  rel,
  icon,
  type = "button",
  disabled = false,
  onClick,
  className = "",
  fullWidth = false,
  size = "md",
}) {
  var [isFocused, setIsFocused] = useState(false);

  var text = typeof children === "string" ? children : "";
  var letters = text.split("");

  // Unique scoped class to avoid CSS collisions between multiple instances
  var btnId = "vb-" + text.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().slice(0, 14);

  var sizeMap = {
    sm: { fontSize: "0.85em", padding: "0.45em 0.85em" },
    md: { fontSize: "1em", padding: "0.5em 1em" },
    lg: { fontSize: "1.1em", padding: "0.6em 1.2em" },
  };
  var sz = sizeMap[size] || sizeMap.md;

  // Blue accent color for shadows (replaces white in original)
  // Using portfolio blue: #0A84FF → rgb(10, 132, 255)
  var cssBlock = `
    .${btnId} {
      --border-radius: 8px;
      --padding: 4px;
      --transition: 0.4s;
      --button-color: #101010;
      --highlight-color-hue: ${hue}deg;

      user-select: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5em;
      padding: ${sz.padding};
      font-family: "Inter", "Poppins", "Segoe UI", sans-serif;
      font-size: ${sz.fontSize};
      font-weight: 400;
      text-decoration: none;
      position: relative;

      background-color: var(--button-color);

      box-shadow:
        inset 0px 1px 1px rgba(10, 132, 255, 0.2),
        inset 0px 2px 2px rgba(10, 132, 255, 0.15),
        inset 0px 4px 4px rgba(10, 132, 255, 0.1),
        inset 0px 8px 8px rgba(10, 132, 255, 0.05),
        inset 0px 16px 16px rgba(10, 132, 255, 0.05),
        0px -1px 1px rgba(0, 0, 0, 0.02),
        0px -2px 2px rgba(0, 0, 0, 0.03),
        0px -4px 4px rgba(0, 0, 0, 0.05),
        0px -8px 8px rgba(0, 0, 0, 0.06),
        0px -16px 16px rgba(0, 0, 0, 0.08);

      border: solid 1px rgba(10, 132, 255, 0.2);
      border-radius: var(--border-radius);
      cursor: pointer;

      transition: box-shadow var(--transition), border var(--transition), background-color var(--transition);
    }

    .${btnId}:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .${btnId}::before {
      content: "";
      position: absolute;
      top: calc(0px - var(--padding));
      left: calc(0px - var(--padding));
      width: calc(100% + var(--padding) * 2);
      height: calc(100% + var(--padding) * 2);
      border-radius: calc(var(--border-radius) + var(--padding));
      pointer-events: none;
      background-image: linear-gradient(0deg, rgba(0,0,0,0.267), rgba(0,0,0,0.667));

      z-index: -1;
      transition: box-shadow var(--transition), filter var(--transition);
      box-shadow: 0 -8px 8px -6px rgba(0,0,0,0) inset,
        0 -16px 16px -8px rgba(0,0,0,0) inset,
        1px 1px 1px rgba(10, 132, 255, 0.133),
        2px 2px 2px rgba(10, 132, 255, 0.067),
        -1px -1px 1px rgba(0,0,0,0.133),
        -2px -2px 2px rgba(0,0,0,0.067);
    }

    .${btnId}::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      pointer-events: none;
      background-image: linear-gradient(
        0deg,
        #fff,
        hsl(var(--highlight-color-hue), 100%, 70%),
        hsla(var(--highlight-color-hue), 100%, 70%, 50%),
        8%,
        transparent
      );
      background-position: 0 0;
      opacity: 0;
      transition: opacity var(--transition), filter var(--transition);
    }

    .${btnId}-letter {
      position: relative;
      display: inline-block;
      color: rgba(255,255,255,0.333);
      animation: ${btnId}-letter-anim 2s ease-in-out infinite;
      transition: color var(--transition), text-shadow var(--transition), opacity var(--transition);
    }

    @keyframes ${btnId}-letter-anim {
      50% {
        text-shadow: 0 0 3px rgba(10, 132, 255, 0.533);
        color: #fff;
      }
    }

    .${btnId}-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #e8e8e8;
      animation: ${btnId}-flicker 2s linear infinite;
      animation-delay: 0.5s;
      filter: drop-shadow(0 0 2px rgba(10, 132, 255, 0.6));
      transition: color var(--transition), filter var(--transition), opacity var(--transition);
    }

    @keyframes ${btnId}-flicker {
      50% { opacity: 0.3; }
    }

    /* Generating (Focus/Click) state — matches original exactly */
    .${btnId}[data-generating="true"] .${btnId}-letter {
      animation: ${btnId}-focused-letter-anim 1s ease-in-out forwards, ${btnId}-letter-anim 1.2s ease-in-out infinite;
      animation-delay: 0s, 1s;
    }

    @keyframes ${btnId}-focused-letter-anim {
      0%, 100% { filter: blur(0px); }
      50% {
        transform: scale(2);
        filter: blur(10px) brightness(150%) drop-shadow(-36px 12px 12px hsl(var(--highlight-color-hue), 100%, 70%));
      }
    }

    .${btnId}[data-generating="true"] .${btnId}-icon {
      animation-duration: 1.2s;
      animation-delay: 0.2s;
    }

    .${btnId}[data-generating="true"]::before {
      box-shadow: 0 -8px 12px -6px rgba(10, 132, 255, 0.2) inset,
        0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 20%) inset,
        1px 1px 1px rgba(10, 132, 255, 0.2),
        2px 2px 2px rgba(10, 132, 255, 0.067),
        -1px -1px 1px rgba(0,0,0,0.133),
        -2px -2px 2px rgba(0,0,0,0.067);
    }

    .${btnId}[data-generating="true"]::after {
      opacity: 0.6;
      mask-image: linear-gradient(0deg, #fff, transparent);
      filter: brightness(100%);
    }

    /* Letter animation delays — matches original */
    ${letters.map(function(_, i) {
      return `.${btnId}-letter:nth-child(${i + 1}), .${btnId}[data-generating="true"] .${btnId}-letter:nth-child(${i + 1}) { animation-delay: ${(i * 0.08).toFixed(2)}s; }`;
    }).join("\n    ")}

    /* Hover state — CSS only, NO transform/scale (matches original) */
    .${btnId}:not(:disabled):hover {
      border: solid 1px hsla(var(--highlight-color-hue), 100%, 80%, 40%);
    }
    .${btnId}:not(:disabled):hover::before {
      box-shadow: 0 -8px 8px -6px rgba(10, 132, 255, 0.667) inset,
        0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 30%) inset,
        1px 1px 1px rgba(10, 132, 255, 0.133),
        2px 2px 2px rgba(10, 132, 255, 0.067),
        -1px -1px 1px rgba(0,0,0,0.133),
        -2px -2px 2px rgba(0,0,0,0.067);
    }
    .${btnId}:not(:disabled):hover::after {
      opacity: 1;
      mask-image: linear-gradient(0deg, #fff, transparent);
    }
    .${btnId}:not(:disabled):hover .${btnId}-icon {
      color: #fff;
      filter: drop-shadow(0 0 3px hsl(var(--highlight-color-hue), 100%, 70%)) drop-shadow(0 -4px 6px rgba(0,0,0,0.6));
      animation: none;
    }

    /* Active state — matches original */
    .${btnId}:not(:disabled):active {
      border: solid 1px hsla(var(--highlight-color-hue), 100%, 80%, 70%);
      background-color: hsla(var(--highlight-color-hue), 50%, 20%, 0.5);
    }
    .${btnId}:not(:disabled):active::before {
      box-shadow: 0 -8px 12px -6px rgba(10, 132, 255, 0.667) inset,
        0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 80%) inset,
        1px 1px 1px rgba(10, 132, 255, 0.267),
        2px 2px 2px rgba(10, 132, 255, 0.133),
        -1px -1px 1px rgba(0,0,0,0.133),
        -2px -2px 2px rgba(0,0,0,0.067);
    }
    .${btnId}:not(:disabled):active::after {
      opacity: 1;
      mask-image: linear-gradient(0deg, #fff, transparent);
      filter: brightness(200%);
    }
    .${btnId}:not(:disabled):active .${btnId}-letter {
      text-shadow: 0 0 1px hsla(var(--highlight-color-hue), 100%, 90%, 90%);
      animation: none;
    }
  `;

  var fullWidthClass = fullWidth ? " vb-fullwidth" : "";

  var content = (
    <>
      <style>{cssBlock}</style>
      {icon && <span className={btnId + "-icon"}>{icon}</span>}
      <span style={{ display: "inline-flex", alignItems: "center" }}>
        {letters.map(function(letter, i) {
          return (
            <span key={i} className={btnId + "-letter"}>
              {letter === " " ? "\u00A0" : letter}
            </span>
          );
        })}
      </span>
    </>
  );

  // Render as <a> if href is provided
  if (href) {
    return (
      <div className={"relative inline-block" + fullWidthClass}>
        <a
          href={href}
          download={download || undefined}
          target={target}
          rel={rel}
          className={btnId + (className ? " " + className : "")}
          data-generating={isFocused}
          onFocus={function() { setIsFocused(true); }}
          onBlur={function() { setIsFocused(false); }}
          onClick={function(e) {
            setIsFocused(true);
            if (onClick) onClick(e);
          }}
          style={fullWidth ? { width: "100%" } : undefined}
        >
          {content}
        </a>
      </div>
    );
  }

  // Render as <button>
  return (
    <div className={"relative inline-block" + fullWidthClass}>
      <button
        type={type}
        className={btnId + (className ? " " + className : "")}
        data-generating={isFocused}
        disabled={disabled}
        onFocus={function() { setIsFocused(true); }}
        onBlur={function() { setIsFocused(false); }}
        onClick={function(e) {
          setIsFocused(true);
          if (onClick) onClick(e);
        }}
        style={fullWidth ? { width: "100%" } : undefined}
      >
        {content}
      </button>
    </div>
  );
}
