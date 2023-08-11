"use client";

import React, { type FC, useState, useEffect } from "react";
import Image from "next/image";
import UserImage from "@/assets/images/user-image.jpg";
import ProductImage from "@/assets/images/car.jpeg";
import { type Product } from "./ProductList";

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
    <div className="card relative shadow-md shadow-slate-300 overflow-hidden rounded-md min-h-[250px] max-w-xl hover:shadow-lg cursor-pointer">
      <Image
        className="product-image -z-10 absolute top-0 left-0 h-32 object-cover w-full"
        src={ProductImage}
        alt="product-image"
      />
      <Image
        className="user-image z-10 absolute top-2 right-2 w-10 rounded-full aspect-square object-cover"
        src={UserImage}
        alt="user-image"
      />

      <div className="details grid mt-32 p-3 bg-card h-full w-full">
        <h1>
          <span className="font-bold">Model Name:</span> {product.model.name}
        </h1>
        <h2>
          <span className="font-bold">Brand:</span> {product.model.brand.name}
        </h2>
        <h3 className="truncate">
          <span className="font-bold">Description:</span> {product.description}
        </h3>

        <div className="countdown my-3">
          <h1 className="headings text-sm font-light text-center grid grid-flow-col grid-cols-4 gap-5">
            <span>Days</span>
            <span>Hours</span>
            <span>Minutes</span>
            <span>Seconds</span>
          </h1>
          <h1 className="digits grid grid-flow-col grid-cols-4 gap-5 text-center text-2xl font-semibold">
            {/* display double digit number */}
            <span className="bg-primary text-primary-foreground p-2 rounded-lg after:contents ">
              {timeLeft.days < 10 ? `0${timeLeft.days}` : timeLeft.days}
            </span>
            <span className="bg-primary text-primary-foreground p-2 rounded-lg">
              {timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}
            </span>
            <span className="bg-primary text-primary-foreground p-2 rounded-lg">
              {timeLeft.minutes < 10
                ? `0${timeLeft.minutes}`
                : timeLeft.minutes}
            </span>
            <span className="bg-primary text-primary-foreground p-2 rounded-lg">
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
