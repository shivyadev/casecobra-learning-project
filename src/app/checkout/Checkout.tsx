"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS, MODELS, COUNTRIES } from "@/validators/option-validators";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/products";
import { Configuration, Order } from "@prisma/client";
import { ArrowLeft, Check, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Checkout = ({
  order,
  configuration,
}: {
  order: Order;
  configuration: Configuration;
}) => {
  const { color, model, finish, material } = configuration;

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;

  const [country, setCountry] = useState<string>(COUNTRIES[0]);

  return (
    <MaxWidthWrapper className="grid grid-cols-8">
      <div className="mt-16 col-span-4 mr-10">
        <Link
          href={`/configure/preview?id=${configuration.id}`}
          className="col-span-6 flex items-center gap-2"
        >
          <ArrowLeft className="size-4 text-gray-400 flex-shrink-0" />
          <h2 className="leading-none">
            case<span className="text-primary">cobra</span>
          </h2>
        </Link>

        <div className="mt-10 grid grid-cols-8">
          <div className="col-span-8">
            <h2 className="font-bold text-3xl">Your {modelLabel} Case</h2>
          </div>
          <div className="mt-5 col-span-3">
            <Phone
              className={cn(`bg-${tw}`)}
              imgSrc={configuration.croppedImageUrl!}
            />
          </div>

          <div className="mt-10 col-span-8 h-px bg-gray-200" />

          <div className="mt-2 col-span-8">
            <div className="flex items-center justify-between py-1 mt-2">
              <p className="text-gray-600">Base price</p>
              <p className="font-medium text-gray-900">
                {formatPrice(BASE_PRICE / 100)}
              </p>
            </div>

            {finish === "textured" ? (
              <div className="flex items-center justify-between py-1 mt-2">
                <p className="text-gray-600">Textured finish</p>
                <p className="font-medium text-gray-900">
                  {formatPrice(PRODUCT_PRICES.finish.texture / 100)}
                </p>
              </div>
            ) : null}

            {material === "polycarbonate" ? (
              <div className="flex items-center justify-between py-1 mt-2">
                <p className="text-gray-600">Soft polycarbonate material</p>
                <p className="font-medium text-gray-900">
                  {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                </p>
              </div>
            ) : null}

            <div className="my-2 h-px bg-gray-200" />
            <div className="flex items-center justify-between py-2">
              <p className="font-semibold text-gray-900">Order total</p>
              <p className="font-semibold text-gray-900">
                {formatPrice(order.amount)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 mx-10 col-span-4 shadow-sm">
        <h2 className="text-xl">Shipping Information</h2>

        <div className="mt-8 flex flex-col">
          <label htmlFor="mail" className="text-md text-gray-500">
            Email
          </label>
          <input
            id="mail"
            type="email"
            className="mt-2 px-4 h-11 font-sans border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-950"
          />
        </div>

        <div className="mt-8 flex flex-col">
          <label className="text-gray-500">Shipping Address</label>
          <input
            id="address"
            type="text"
            placeholder="Full name"
            className="mt-2 px-4 h-11 font-sans border border-gray-300 border-b-0 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:z-50"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                role="combobox"
                className="h-11 px-4 text-lg justify-between border-gray-300 border-b-0 rounded-none font-sans focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-zinc-950"
              >
                {country}
                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full bg-gray-100">
              {COUNTRIES.map((c) => (
                <DropdownMenuItem
                  key={c}
                  className={cn(
                    "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-300 font-sans",
                    {
                      "bg-zinc-100": c === country,
                    }
                  )}
                  onClick={() => setCountry(c)}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      c === country ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <input
            id="line-1"
            type="text"
            placeholder="Address"
            className="px-4 h-11 font-sans border border-gray-300 border-b-0 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:z-50"
          />
          <input
            id="line-2"
            type="text"
            placeholder="Address line 2"
            className="px-4 h-11 font-sans border border-gray-300 border-b-0 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:z-50"
          />
          <div className="grid grid-cols-2">
            <input
              id="postal code"
              type="number"
              placeholder="Postal code"
              className="p-4 h-11 font-sans border border-gray-300 border-b-0 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:z-50"
            />
            <input
              id="city"
              type="text"
              placeholder="City"
              className="p-4 h-11 font-sans border border-gray-300 border-b-0 border-l-0 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:z-50"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"outline"}
                role="combobox"
                className="h-11 font-sans px-4 text-lg justify-between border-gray-300 rounded-t-none rounded-b-lg font-sans focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-zinc-950"
              >
                {country}
                <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-100">
              {COUNTRIES.map((c) => (
                <DropdownMenuItem
                  key={c}
                  className={cn(
                    "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-300 font-sans",
                    {
                      "bg-zinc-100": c === country,
                    }
                  )}
                  onClick={() => setCountry(c)}
                >
                  <Check
                    className={cn(
                      "mr-2 size-4",
                      c === country ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {c}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Checkout;
