import React from "react";
import { motion } from "framer-motion";

interface CheckboxProps {
  fillColor?: string;
  text?: string;
  delay?: boolean;
}

const DURATION = 3;
export const Checkbox: React.FC<CheckboxProps> = ({
  fillColor = "#CC0001",
  text = "",
  delay = false,
}) => {
  return (
    <svg
      width="100%"
      // height="59"
      viewBox="0 0 174 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="174" height="59" fill={fillColor} />
      <rect x="93" y="3" width="78" height="53" fill="white" />
      <text
        x="48"
        y="42"
        fill="white"
        fontSize="36"
        textAnchor="middle"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        {text}
      </text>
      {/* <motion.path
        initial={{ pathLength: 0.001 }}
        animate={{ pathLength: 1 }}
        transition={transition}
        d="M93 3C116.667 12.5 164.7 35.2 167.5 50M98.5 53C114.167 36.5 148.9 4.1 162.5 6.5"
        stroke="#1409B9"
        strokeLinecap="round"
      /> */}
      <motion.path
        initial={{ pathLength: 0.001 }}
        animate={{ pathLength: [0.001, 1, 1, 1, 1, 1] }}
        transition={{
          pathLength: {
            duration: DURATION,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: delay ? 1 : 0,
          },
        }}
        d="M93 3C116.667 12.5 164.7 35.2 167.5 50"
        stroke="#1409B9"
        strokeLinecap="round"
      />
      <motion.path
        initial={{ pathLength: 0.001 }}
        animate={{ pathLength: [0.001, 0.001, 1, 1, 1, 1] }}
        transition={{
          pathLength: {
            duration: DURATION,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
            delay: delay ? 1 : 0,
          },
        }}
        d="M98.5 53C114.167 36.5 148.9 4.1 162.5 6.5"
        stroke="#1409B9"
        strokeLinecap="round"
      />
    </svg>
  );
};
