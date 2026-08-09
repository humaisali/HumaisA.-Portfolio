import React, { useMemo } from "react";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function FlipText({
    className,
    children,
    duration = 3,
    delay = 0.5,
    loop = true,
    separator = " ",
    together = false,
}) {
    const words = useMemo(() => children.split(separator), [children, separator]);
    const totalChars = children.length;

    // Calculate character index for each position
    const getCharIndex = (wordIndex, charIndex) => {
        let index = 0;
        for (let i = 0; i < wordIndex; i++) {
            index += words[i].length + (separator === " " ? 1 : separator.length);
        }
        return index + charIndex;
    };

    return (
        <div
            className={cn(
                "flip-text-wrapper inline-block leading-none",
                className
            )}
            style={{ perspective: "1000px" }}
        >
            <style>{`
                .flip-char {
                    /* Total duration 12s = 2s animation + 10s pause */
                    animation: flip-text-anim 12s ease-in-out var(--flip-delay) var(--flip-iteration);
                }
                @keyframes flip-text-anim {
                    0% { transform: rotateX(0deg); opacity: 1; filter: blur(0px); }
                    8% { transform: rotateX(180deg); opacity: 0; filter: blur(10px); }
                    16%, 100% { transform: rotateX(360deg); opacity: 1; filter: blur(0px); }
                }
            `}</style>
            {words.map((word, wordIndex) => {
                const chars = word.split("");

                return (
                    <span
                        key={wordIndex}
                        className="word inline-block whitespace-nowrap"
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {chars.map((char, charIndex) => {
                            const currentGlobalIndex = getCharIndex(wordIndex, charIndex);

                            // Consecutive stagger: 0.1s delay per character
                            let calculatedDelay = delay;
                            if (!together) {
                                calculatedDelay = delay + (currentGlobalIndex * 0.1);
                            }

                            return (
                                <span
                                    key={charIndex}
                                    className="flip-char inline-block relative"
                                    data-char={char}
                                    style={{
                                        "--flip-delay": `${calculatedDelay}s`,
                                        "--flip-iteration": loop ? "infinite" : "1",
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    {char}
                                </span>
                            );
                        })}
                        {separator === " " && wordIndex < words.length - 1 && (
                            <span className="whitespace inline-block">&nbsp;</span>
                        )}
                        {separator !== " " && wordIndex < words.length - 1 && (
                            <span className="separator inline-block">{separator}</span>
                        )}
                    </span>
                );
            })}
        </div>
    );
}

export default FlipText;
