"use client";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { motion } from "framer-motion"
import { cn } from '@/lib/utils';

export function ContainerTextFlipDemo() {
  const words = ["estável", "organizada", "inteligente", "tranquila", "completa", "clara"];
  return (
    <motion.h1
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      className={cn(
        "relative mb-6 max-w-2xl text-left text-3xl leading-normal font-bold tracking-tight text-white md:text-5xl dark:text-zinc-100",
      )}
      layout
    >
      <div className="inline-block">
        Sua vida financeira bem mais <ContainerTextFlip words={words} />
        {/* <Blips /> */}
      </div>
    </motion.h1>
  );
}

export { ContainerTextFlipDemo as BannerText };