import React from "react";
import { motion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

const container = (stagger, delay) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

const item = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.6, ease: EASE },
  },
};

const StaggerText = ({
  children,
  delay = 0,
  divideBy = "word",
}) => {
  const stagger = divideBy === "letter" ? 0.02 : 0.05;

  const parts = [];
  React.Children.toArray(children).forEach(child => {
    if (typeof child === "string" || typeof child === "number") {
      const text = String(child);
      const splitParts = divideBy === "letter" ? text.split("") : text.split(" ");
      
      splitParts.forEach((part) => {
        parts.push({ type: "text", content: part });
      });
    } else {
      parts.push({ type: "node", content: child });
    }
  });

  return (
    <motion.span
      variants={container(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      style={{ display: "inline-block" }}
    >
      {parts.map((part, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden relative"
          style={{ verticalAlign: "top" }}
        >
          <motion.span
            variants={item}
            className="inline-block will-change-transform"
          >
            {part.type === "text"
              ? (divideBy === "letter"
                  ? (part.content === " " ? "\u00A0" : part.content)
                  : part.content + "\u00A0")
              : part.content}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default StaggerText;
