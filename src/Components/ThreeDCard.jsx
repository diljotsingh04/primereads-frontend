import { cn } from "../Utils/cn";
import {Link} from 'react-router-dom'
import React, { createContext, useState, useContext, useRef, useEffect, useMemo } from "react";

const MouseEnterContext = createContext(undefined);

export const CardContainer = ({ children, className, containerClassName }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15;
    const y = (e.clientY - top - height / 2) / 15;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = (e) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = (e) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };
  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-20 flex items-center justify-center",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export const CardBody = ({ children, className }) => {
  const bodyRef = useRef(null);
  return (
    <div
      ref={bodyRef}
      className={cn(
        "w-96 transform-style:preserve-3d  &>*:transform-style:preserve-3d relative group/card border-black/[0.1] h-auto rounded-xl p-6",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  const ref = useRef(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
  }, [isMouseEntered]);

  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// hook to use the context
export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

export const ThreeDCard = ({ cardInfo, variant, glowColor }) => {
  
  if(variant === null || variant === undefined) variant = "default";

  let shadowAttributes = " ";
  // const color = (glowColor) ? glowColor : null;
  // if(color){
  //   let hoverShadow = `hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_${color},0_0_15px_${color},0_0_30px_${color}]`;
  //   shadowAttributes = hoverShadow;
  // };

  return (
    <CardContainer className="inter-var">
      <CardBody className={`sm:w-[30rem] md:w-[40rem] hover:shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#084,0_0_30px_#08f]  ${shadowAttributes}`}>

        {variant === "default" && (
          <>
            <CardItem translateZ="50" className="text-3xl font-bold text-black">
              {cardInfo.title}
            </CardItem>

            <CardItem as="p" translateZ="60" className="text-neutral-700 text-sm max-w-sm mt-2 dark:text-neutral-300">
              {cardInfo.description}
            </CardItem>

            <CardItem translateZ="100" className="w-full mt-4">
              <img
                src={cardInfo.image}
                height={cardInfo.imageHeight || "1000"}
                width={cardInfo.imageWidth || "1000"}
                className="w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt={cardInfo.imageAlt || "thumbnail"}
              />
            </CardItem>
          </>
        )}

        {variant === "inverted" && (
          <>
            <CardItem translateZ="100" className="w-full">
              <img
                src={cardInfo.image}
                height={(cardInfo.imageHeight)? cardInfo.imageHeight : "1000"}
                width={(cardInfo.imageWidth)? cardInfo.imageWidth : "1000"}
                className="w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt={(cardInfo.imageAlt) ? cardInfo.imageAlt : "thumbnail"}
              />
            </CardItem>

            <CardItem translateZ="50" className="text-3xl font-bold text-black mt-4">
              {cardInfo.title}
            </CardItem>
            
            <CardItem as="p" translateZ="60"
              className="text-neutral-700 text-sm max-w-sm mt-2 dark:text-neutral-300">
              {cardInfo.description}
            </CardItem>
          </>
        )}

        {variant === "image" && (
          <CardItem translateZ="100" className="w-full">
            <img
              src={cardInfo.image}
              height={cardInfo.imageHeight || "1000"}
              width={cardInfo.imageWidth || "1000"}
              className="w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={cardInfo.imageAlt || "thumbnail"}
            />
          </CardItem>
        )}

        {variant === "imageWithButton" && (
          <>
            <CardItem translateZ="100" className="w-full mb-3">
              <img
                src={cardInfo.image}
                height={cardInfo.imageHeight || "1000"}
                width={cardInfo.imageWidth || "1000"}
                className="w-full object-cover rounded-xl group-hover/card:shadow-xl"
                alt={cardInfo.imageAlt || "thumbnail"}
              />
            </CardItem>
            <CardItem translateZ="100" className="w-full text-center">
              <Link to={cardInfo.link} className="bg-blue-600 px-5 py-2 rounded-lg text-white text-md hover:bg-slate-700">
                {cardInfo.linkText}
              </Link>
            </CardItem>
          </>
        )}
      </CardBody>
    </CardContainer>
  );
};
