"use client";

import React, { type FC, useState, useEffect } from "react";
import Image from "next/image";
import UserImage from "@/assets/images/user-image.jpg";
import ProductImage from "@/assets/images/car.jpeg";
import { type Product } from "@/app/data";

interface Props {
  product: Product;
}

interface Timer {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const getTimeRemaining = (endtime: string): Timer => {
  const total = Date.parse(endtime) - Date.parse(new Date().toString());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export const ProductCard: FC<Props> = ({ product }) => {
  // function to get the hours, minutes and seconds from the product's end timestamp
  const { days, hours, minutes, seconds } = getTimeRemaining(
    product.room.end.toString()
  );

  // implement a countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [days, hours, minutes, seconds]);

  return (
    <div className="card relative group shadow-md shadow-slate-300 overflow-hidden rounded-md min-h-[250px] max-w-xl hover:shadow-lg hover:shadow-slate-300 cursor-pointer">
      <Image
        className="user-image absolute top-2 right-2 w-10 rounded-full aspect-square object-cover"
        src={UserImage}
        alt="user-image"
      />
      <Image
        className="product-image h-32 group-hover:h-40 transition-all duration-500 object-cover w-full"
        src={ProductImage}
        alt="product-image"
      />

      <div className="details grid p-3 bg-white w-full">
        <p>
          <span className="font-semibold text-xs uppercase">Model Name: </span>
          <span className="font-normal text-sm">{product.model.name}</span>
        </p>
        <p>
          <span className="font-semibold text-xs uppercase">Brand: </span>
          <span className="font-normal text-sm">{product.model.brand.name}</span>
        </p>
        <p className="truncate">
          <span className="font-semibold text-xs uppercase">Description: </span>
          <span className="font-normal text-sm">{product.description}</span>
        </p>

        <div className="countdown my-3">
          <h1 className="headings text-sm font-light text-center grid grid-flow-col grid-cols-4 gap-5">
            <span>Days</span>
            <span>Hours</span>
            <span>Minutes</span>
            <span>Seconds</span>
          </h1>
          <h1 className="digits grid grid-flow-col grid-cols-4 gap-5 text-center text-2xl font-semibold">
            {/* display double digit number */}
            <span className="bg-primary text-accent p-2 rounded-lg">
              {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
            </span>
            <span className="bg-primary text-accent p-2 rounded-lg">
              {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
            </span>
            <span className="bg-primary text-accent p-2 rounded-lg">
              {timeLeft.minutes < 10
                ? `0${timeLeft.minutes}`
                : timeLeft.minutes}
            </span>
            <span className="bg-primary text-accent p-2 rounded-lg">
              {timeLeft.seconds < 10
                ? `0${timeLeft.seconds}`
                : timeLeft.seconds}
            </span>
          </h1>
        </div>
        {timeLeft.seconds >= 0 ? (
          <span className="text-red-600 text-sm">Bidding is Live</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
