"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { AnimatedGroup } from "@/components/ui/animated-group";
import RoleSelectModal from "@/components/ui/role-select-modal";


interface Iphone15ProProps extends React.SVGProps<SVGSVGElement> {
  width?: string | number;
  height?: string | number;
  src?: string;
  alt?: string;
}

const Iphone15Pro: React.FC<Iphone15ProProps> = ({
  width = "100%",
  height = "auto",
  src,
  alt = "iPhone screen content",
  className,
  ...props
}) => {
  return (
    <div className={cn("relative", className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 433 882"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-500 ease-in-out"
        {...props}
      >
        <path
          d="M2 73C2 32.6832 34.6832 0 75 0H357C397.317 0 430 32.6832 430 73V809C430 849.317 397.317 882 357 882H75C34.6832 882 2 849.317 2 809V73Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />
        <path
          d="M0 171C0 170.448 0.447715 170 1 170H3V204H1C0.447715 204 0 203.552 0 203V171Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />
        <path
          d="M1 234C1 233.448 1.44772 233 2 233H3.5V300H2C1.44772 300 1 299.552 1 299V234Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />
        <path
          d="M1 319C1 318.448 1.44772 318 2 318H3.5V385H2C1.44772 385 1 384.552 1 384V319Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />
        <path
          d="M430 279H432C432.552 279 433 279.448 433 280V384C433 384.552 432.552 385 432 385H430V279Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />
        <path
          d="M6 74C6 35.3401 37.3401 4 76 4H356C394.66 4 426 35.3401 426 74V808C426 846.66 394.66 878 356 878H76C37.3401 878 6 846.66 6 808V74Z"
          className="fill-[#262626] dark:fill-black"
        />
        <path
          opacity="0.5"
          d="M174 5H258V5.5C258 6.60457 257.105 7.5 256 7.5H176C174.895 7.5 174 6.60457 174 5.5V5Z"
          className="dark:fill-[#DADADA] fill-[#404040]"
        />
        <path
          d="M21.25 75C21.25 44.2101 46.2101 19.25 77 19.25H355C385.79 19.25 410.75 44.2101 410.75 75V807C410.75 837.79 385.79 862.75 355 862.75H77C46.2101 862.75 21.25 837.79 21.25 807V75Z"
          className="fill-[#111] dark:fill-[#F5F5F5]"
        />
        {src && (
          <foreignObject
            x="21.25"
            y="19.25"
            width="389.5"
            height="843.5"
            clipPath="url(#roundedCorners)"
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "55.75px",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#111",
              }}
              className="dark:bg-[#F5F5F5]"
            >
              <Image
                src={src}
                alt={alt}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </foreignObject>
        )}
        <path
          d="M154 48.5C154 38.2827 162.283 30 172.5 30H259.5C269.717 30 278 38.2827 278 48.5C278 58.7173 269.717 67 259.5 67H172.5C162.283 67 154 58.7173 154 48.5Z"
          className="fill-[#262626] dark:fill-[#F0F0F0]"
        />
        <path
          d="M249 48.5C249 42.701 253.701 38 259.5 38C265.299 38 270 42.701 270 48.5C270 54.299 265.299 59 259.5 59C253.701 59 249 54.299 249 48.5Z"
          className="fill-[#111] dark:fill-[#D1D1D1]"
        />
        <path
          d="M254 48.5C254 45.4624 256.462 43 259.5 43C262.538 43 265 45.4624 265 48.5C265 51.5376 262.538 54 259.5 54C256.462 54 254 51.5376 254 48.5Z"
          className="fill-white/30 dark:fill-black"
        />
        <defs>
          <clipPath id="roundedCorners">
            <rect
              x="21.25"
              y="19.25"
              width="389.5"
              height="843.5"
              rx="55.75"
              ry="55.75"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

const navItems = [
  { name: "Product", href: "#" },
  { name: "For Students", href: "#" },
  { name: "For Industry", href: "#" },
  { name: "For Faculty", href: "#" },
  { name: "Pricing", href: "#" },
];

export default function HeroSection() {
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const textVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 1,
      },
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(125%_125%_at_50%_10%,#0a0a0a_40%,#4c1d95_100%)]" />

            {/* Navbar */}
      <nav className="w-full flex justify-between items-center py-4 px-4 sm:px-8 border-b border-white/10 relative z-10">
        <div className="font-bold text-lg tracking-tight">SkillBridge</div>

        <div className="items-center gap-6 hidden md:flex">
          {navItems.map((item) => (
            <Link href={item.href} key={item.name}>
              <span className="text-sm text-white/60 hover:text-white transition-colors">
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="px-4 py-1.5 text-sm font-medium border border-white/20 text-white hover:bg-white/10 transition-colors rounded-md"
          >
            Log in
          </button>
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="px-4 py-1.5 text-sm font-medium bg-violet-600 text-white hover:bg-violet-500 transition-colors rounded-md"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex flex-col items-center justify-start text-center pt-16 md:pt-20 px-4 pb-0 max-w-7xl mx-auto z-10 relative">
        <AnimatedGroup
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
          variants={{
            container: {
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            },
            item: textVariants,
          }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Bridge the Gap Between
            <br />
            Classroom and Career
          </h1>
          <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-8">
            AI-powered skill assessment, personalized internship matching, and
            faculty development — all in one platform for students, industry &
            academia.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => setIsRoleModalOpen(true)}
              className="px-6 py-3 text-base font-medium rounded-md bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/20 transition-all"
            >
              Get Started Free
            </button>
            <button className="px-6 py-3 text-base font-medium rounded-md border border-white/20 hover:bg-white/10 transition-colors">
              Book a Demo
            </button>
          </div>
        </AnimatedGroup>

        {/* Hero Images Section */}
        <div className="relative w-full mx-auto z-20 max-w-5xl">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="relative w-full rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900"
            >
              <div className="w-full h-[300px] md:h-[420px] bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center">
                <p className="text-white/40 text-lg">SkillBridge Dashboard Preview</p>
              </div>
            </motion.div>

            {/* iPhone Frame */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] md:-translate-y-[45%] w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              >
                <Iphone15Pro
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop"
                  className="w-full"
                />
              </motion.div>
            </div>
          </div>

          {/* Fade Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="absolute -bottom-2 left-0 right-0 h-40 md:h-60 bg-gradient-to-t from-black via-black/80 to-transparent z-30 pointer-events-none"
          />
        </div>
      </div>

      <RoleSelectModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </div>
  );
}