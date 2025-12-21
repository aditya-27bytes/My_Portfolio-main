import { motion, Transition, Variants } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

// Break open transition for landing -> portfolio
const breakOpenVariants: Variants = {
  initial: {
    clipPath: "circle(0% at 50% 50%)",
    opacity: 0,
  },
  in: {
    clipPath: "circle(150% at 50% 50%)",
    opacity: 1,
  },
  out: {
    clipPath: "circle(0% at 50% 50%)",
    opacity: 0,
  },
};

// Standard page variants for other transitions
const standardVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
  },
  in: {
    opacity: 1,
    scale: 1,
  },
  out: {
    opacity: 0,
    scale: 1.05,
  },
};

// Landing page exit - doors opening effect
const landingExitVariants: Variants = {
  initial: {
    opacity: 1,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
    scale: 1.2,
    filter: "blur(10px)",
  },
};

const breakOpenTransition: Transition = {
  type: "tween",
  ease: [0.22, 1, 0.36, 1],
  duration: 0.8,
};

const standardTransition: Transition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isPortfolio = location.pathname === "/portfolio";

  // Use break open effect when entering portfolio
  const variants = isPortfolio ? breakOpenVariants : isLanding ? landingExitVariants : standardVariants;
  const transition = isPortfolio ? breakOpenTransition : standardTransition;

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;