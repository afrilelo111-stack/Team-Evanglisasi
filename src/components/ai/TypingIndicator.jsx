// src/components/ai/TypingIndicator.jsx
import { motion } from "framer-motion";

export default function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -6 }
  };

  const dotTransition = (delay) => ({
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
    delay: delay
  });

  return (
    <div className="flex items-center gap-4 bg-white border border-stone-100 px-4 py-3.5 rounded-2xl rounded-tl-none shadow-sm max-w-[80px]">
      <div className="flex gap-1 justify-center items-center h-2 w-full">
        <motion.span 
          variants={dotVariants} 
          initial="initial" 
          animate="animate" 
          transition={dotTransition(0)} 
          className="w-1.5 h-1.5 bg-[#8B6347] rounded-full" 
        />
        <motion.span 
          variants={dotVariants} 
          initial="initial" 
          animate="animate" 
          transition={dotTransition(0.15)} 
          className="w-1.5 h-1.5 bg-[#8B6347] rounded-full" 
        />
        <motion.span 
          variants={dotVariants} 
          initial="initial" 
          animate="animate" 
          transition={dotTransition(0.3)} 
          className="w-1.5 h-1.5 bg-[#8B6347] rounded-full" 
        />
      </div>
    </div>
  );
}