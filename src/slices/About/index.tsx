"use client";

import Slider, { Settings } from "react-slick";

import style from "./styles.module.css";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import clsx from "clsx";
import content from "./content.json";
import Image from "next/image";

const About = (): JSX.Element => {
  const data = content;

  const settings: Settings = {
    className: style.sliderWrapper,
    centerMode: true,
    infinite: true,
    centerPadding: "230px",
    slidesToShow: 1,
    speed: 400,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: false,
          className: style.sliderWrapper,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 400,
          autoplay: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: false,
          className: style.sliderWrapper,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 400,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerMode: false,
          className: style.sliderWrapper,
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 400,
          autoplay: true,
        },
      },
    ],
    appendDots: (dots: ReactNode[]) => (
      <div
        style={{
          bottom: -90,
        }}
      >
        <div className="flex items-center justify-center gap-5 px-5">
          {dots?.map((item: any, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  "h-0.5 w-[4.8125rem] rounded-full",
                  item?.props?.className === "slick-active"
                    ? "bg-white-0 h-1"
                    : "bg-gray-1"
                )}
              />
            );
          })}
        </div>
      </div>
    ),
  };

  return (
    <div
      className="flex w-full flex-col items-center px-2 pb-[2.5rem] pt-[0rem] sm:pb-[6.25rem] sm:pt-[9rem]"
      id="section-2"
    >
      <div className="w-full gap-4">
        <Slider {...settings}>
          {data?.map((item, i) => {
            return (
              <div
                key={i}
                className="border-[1px] border-yellow-1 min-w-[200px] rounded-[60px] p-4 sm:p-[3.75rem]"
              >
                <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
                  <Image
                    src={item.aboutimg.url}
                    width={320}
                    height={320}
                    className="lightgray 50% / cover no-repeat, h-40 w-40 rounded-lg sm:h-80 sm:w-[480px]"
                    alt=""
                  />

                  <div className="flex flex-col items-center justify-center gap-3 self-stretch sm:items-start sm:gap-6">
                    <div className="text-yellow-1 self-stretch text-center text-[1.6rem] font-semibold leading-none sm:text-start sm:text-[3.25rem] sm:leading-[62px]">
                      {item.abouttitle[0].text}
                    </div>
                    <div className="text-yellow-1 text-[14px] leading-6 sm:text-[16px]">
                      {item.aboutdecs[0].text}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-yellow-1 w-40 text-center text-[4rem] font-semibold leading-[100px] sm:w-80 sm:text-[6.25rem]">
                    {i + 1}
                  </div>
                  {/* <div className="flex items-center gap-4">
                    <div className="text-white-0 text-[12px] font-semibold leading-6 sm:text-[16px]">
                      {item.linktitle[0].text}
                    </div>
                    <Button>
                      <ArrowRight height={24} width={24} />
                    </Button>
                  </div> */}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default About;
