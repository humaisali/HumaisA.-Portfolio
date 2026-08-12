import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import {
    FaGithub,
    FaWhatsapp,
    FaInstagram,
    FaLinkedin,
    FaEnvelope,
    FaDiscord,
} from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

import { personalInfo } from "../data/index";

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

const defaultItems = [
    { letter: "C", icon: <FaGithub />, label: "Github", href: personalInfo.github },
    { letter: "O", icon: <FaLinkedin />, label: "LinkedIn", href: personalInfo.linkedin },
    { letter: "N", icon: <SiLeetcode />, label: "LeetCode", href: personalInfo.leetcode },
    { letter: "T", icon: <FaInstagram />, label: "Instagram", href: "https://www.instagram.com/localhost.5173/" },
    { letter: "A", icon: <FaWhatsapp />, label: "WhatsApp", href: personalInfo.whatsapp || "#" },
    { letter: "C", icon: <FaEnvelope />, label: "Email", href: `mailto:${personalInfo.email}` },
    { letter: "T", icon: <FaDiscord />, label: "Discord", href: "https://discord.com/users/humais_ali" },
];

const SocialFlipNode = ({
    item,
    index,
    isHovered,
    setTooltipIndex,
    tooltipIndex,
    itemClassName,
    frontClassName,
    backClassName,
}) => {
    const Wrapper = item.href ? "a" : "div";
    const wrapperProps = item.href
        ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
        : { onClick: item.onClick };

    return (
        <Wrapper
            {...wrapperProps}
            className={cn("relative h-8 w-8 sm:h-10 sm:w-10 cursor-pointer flex-shrink-0", isHovered && tooltipIndex === index ? "z-[100]" : "z-10", itemClassName)}
            style={{ perspective: "1000px" }}
            onMouseEnter={() => setTooltipIndex(index)}
            onMouseLeave={() => setTooltipIndex(null)}
        >
            <AnimatePresence>
                {isHovered && tooltipIndex === index && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        animate={{ opacity: 1, y: -50, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-semibold text-white shadow-xl dark:bg-white dark:text-neutral-900"
                    >
                        {item.label}
                        {/* Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-neutral-900 dark:bg-white" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="relative h-full w-full"
                initial={false}
                animate={{ rotateY: isHovered ? 180 : 0 }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 120,
                    damping: 15,
                    delay: index * 0.08,
                }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Front - Letter */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-lg text-[13px] sm:text-lg font-bold text-white",
                        frontClassName
                    )}
                    style={{ 
                        backfaceVisibility: "hidden",
                        backgroundColor: "#101010",
                        border: "1px solid rgba(10, 132, 255, 0.2)",
                        boxShadow: `
                            inset 0px 1px 1px rgba(10, 132, 255, 0.2),
                            inset 0px 2px 2px rgba(10, 132, 255, 0.15),
                            inset 0px 4px 4px rgba(10, 132, 255, 0.1),
                            inset 0px 8px 8px rgba(10, 132, 255, 0.05),
                            0px -1px 1px rgba(0, 0, 0, 0.02),
                            0px -2px 2px rgba(0, 0, 0, 0.03),
                            0px -4px 4px rgba(0, 0, 0, 0.05)
                        `
                    }}
                >
                    {item.letter}
                </div>

                {/* Back - Icon */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center rounded-lg bg-[#0A84FF] text-[14px] sm:text-lg text-white shadow-[0_0_15px_rgba(10,132,255,0.5)]",
                        backClassName
                    )}
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                    }}
                >
                    {item.icon}
                </div>
            </motion.div>
        </Wrapper>
    );
};

export default function SocialFlipButton({
    items = defaultItems,
    className,
    itemClassName,
    frontClassName,
    backClassName,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [tooltipIndex, setTooltipIndex] = useState(null);

    return (
        <div className={cn("flex items-center justify-center gap-2 sm:gap-4 p-2 sm:p-4 w-full", className)}>
            <div
                className="group relative flex items-center justify-center gap-1 sm:gap-2 rounded-2xl p-2 sm:p-4 shadow-2xl max-w-full"
                style={{
                    backgroundColor: "#101010",
                    border: "1px solid rgba(10, 132, 255, 0.2)",
                    boxShadow: `
                        inset 0px 1px 1px rgba(10, 132, 255, 0.1),
                        inset 0px 2px 2px rgba(10, 132, 255, 0.05),
                        0 20px 25px -5px rgba(0, 0, 0, 0.5)
                    `
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => {
                    setIsHovered(false);
                    setTooltipIndex(null);
                }}
            >
                {items.map((item, index) => (
                    <SocialFlipNode
                        key={index}
                        item={item}
                        index={index}
                        isHovered={isHovered}
                        setTooltipIndex={setTooltipIndex}
                        tooltipIndex={tooltipIndex}
                        itemClassName={itemClassName}
                        frontClassName={frontClassName}
                        backClassName={backClassName}
                    />
                ))}
            </div>
        </div>
    );
}
