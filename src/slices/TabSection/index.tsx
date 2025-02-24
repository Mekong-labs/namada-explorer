"use client";

import { useState } from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import { wrap } from "popmotion";
import { Button } from "@/components/ui/button";
import content from "./content.json";
import clsx from "clsx";
import Image from "next/image";
import { EXPLORER } from "@/contants";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 500;

const BigSection = (): JSX.Element => {
  const [[page, direction], setPage] = useState([0, 0]);

  const data = content;
  const tabIndex = wrap(0, data.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div
      className="w-full px-3 pt-[8rem] sm:px-[6.25rem] sm:pt-[200px]"
      id="section-3"
    >
      <div className="text-yellow-1 pb-[2rem] text-center text-[1.5rem] font-semibold leading-none sm:pb-0 sm:text-[3.25rem] sm:leading-[76px]">
        <span id="section-1">{"Features"}</span>
        <span className="text-green-0 ">.</span>
      </div>
      <div className="flex flex-col items-center gap-[2rem]  sm:gap-[100px] sm:pl-[10.3125rem] sm:pr-[10.3125rem] sm:pt-[6.25rem]">
        <div className="bg-gray-8 flex w-full max-w-[900px] items-start gap-2.5 rounded-[1.25rem]">
          <div className="flex flex-1 items-start gap-2.5">
            {data.map((item, i) => (
              <button
                key={i}
                className={clsx(
                  "text-yellow-1 hover:text-gray-2 relative flex flex-1 items-center justify-center gap-2 rounded-[1.25rem] px-3 py-2 text-center font-medium leading-6 transition"
                )}
                onClick={() => {
                  setPage([i, direction]);
                }}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {tabIndex === i && (
                  <motion.span
                    layoutId="bubble"
                    className="bg-white-0 absolute inset-0"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span
                  className={clsx("z-[9999]", {
                    "text-black-0": tabIndex === i,
                  })}
                >
                  {item.tabname[0].text}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="relative flex h-[800px] w-full overscroll-x-none sm:h-[500px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              className="absolute bottom-0 top-0 m-auto flex flex-col-reverse items-center justify-between gap-[5rem] sm:flex-row sm:gap-0"
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.1 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
            >
              <div className="flex flex-1 items-center justify-center ">
                <Image
                  src={data?.[tabIndex].sectionimg.url}
                  width={320}
                  height={320}
                  className="lightgray 50% / cover no-repeat, h-40 w-40 sm:h-80 sm:w-80"
                  alt=""
                />
              </div>
              <div className="flex flex-1 flex-col items-center gap-[1rem] sm:items-start sm:gap-8">
                <div className="flex flex-col items-start gap-1 sm:gap-6">
                  <div className="investing text-yellow-1  w-[13.25rem] font-medium leading-6">
                    {data?.[tabIndex]?.sectionsub[0].text}
                  </div>
                  <div className="text-yellow-1 text-[1.5rem] font-semibold leading-[62px] sm:text-[3.25rem]">
                    {data?.[tabIndex]?.sectiontitle[0].text}
                  </div>
                  <div className="text-yellow-1  self-stretch text-lg leading-7">
                    {data?.[tabIndex]?.sectiondecs[0].text}
                  </div>
                </div>
                <Link href={EXPLORER.MAIN} className="w-full">
                  <Button>{"Get started"}</Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default BigSection;
