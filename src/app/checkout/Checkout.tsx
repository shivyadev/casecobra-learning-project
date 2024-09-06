"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Phone from "@/components/Phone";
import { cn, formatPrice } from "@/lib/utils";
import { COLORS, MODELS, COUNTRIES } from "@/validators/option-validators";
import { BASE_PRICE, PRODUCT_PRICES, SHIPPING_COST } from "@/config/products";
import {
  BillingAddress,
  Configuration,
  Order,
  ShippingAddress,
} from "@prisma/client";
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
import {
  Description,
  Radio,
  RadioGroup,
  Label as RadioLabel,
} from "@headlessui/react";
import { useMutation } from "@tanstack/react-query";
import { updateOrderStatus as updateOrder } from "./action";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

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

  type CountryWithStates = (typeof COUNTRIES)[number];
  type Country = CountryWithStates["country"];
  type StatesOfCountry<T extends Country> = (typeof COUNTRIES)[number] extends {
    country: T;
    states: infer S;
  }
    ? S
    : never;

  const [country, setCountry] = useState<{
    name: Country;
    state: StatesOfCountry<(typeof COUNTRIES)[number]["country"]>[number];
  }>({
    name: COUNTRIES[0].country,
    state: COUNTRIES[0].states[0],
  });

  const onChangeCountry = (c: CountryWithStates) => {
    setCountry({
      name: c.country,
      state: c.states[0],
    });
    setShippingAddress((prev) => ({
      ...prev,
      country: c.country,
      state: c.states[0],
    }));
  };

  const [shippingMethod, setShippingMethod] =
    useState<keyof typeof SHIPPING_COST>("Free Shipping");

  const [amount, setAmount] = useState(order.amount);

  const handleChange = (val: keyof typeof SHIPPING_COST) => {
    setShippingMethod(val);
    const shippingCost = order.amount + SHIPPING_COST[val].cost;
    setAmount(shippingCost);
  };

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    id: order.id,
    name: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    state: "",
    phoneNumber: "",
  });

  const { toast } = useToast();
  const router = useRouter();

  const { mutate: updateOrderStatus } = useMutation({
    mutationKey: ["update-order-status"],
    mutationFn: updateOrder,
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "There was an error on our end. Please try again",
        variant: "destructive",
      });
    },
    onSuccess({ url }) {
      if (url) router.push(url);
      else throw new Error("Unable to complete checkout");
    },
  });

  const handleClick = () => {
    updateOrderStatus({ shippingAddress, orderId: order.id });
  };

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

            {shippingMethod != "Free Shipping" ? (
              <div className="flex items-center justify-between py-1 mt-2">
                <p className="text-gray-600">Shipping Cost</p>
                <p className="font-medium text-gray-900">
                  {formatPrice(SHIPPING_COST["Next day air"].cost)}
                </p>
              </div>
            ) : null}

            <div className="my-2 h-px bg-gray-200" />
            <div className="flex items-center justify-between py-2">
              <p className="font-semibold text-gray-900">Order total</p>
              <p className="font-semibold text-gray-900">
                {formatPrice(amount)}
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
            className="mt-2 px-4 h-11 font-sans border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-950"
          />
        </div>

        <div className="mt-8 flex flex-col">
          <label className="text-gray-500">Shipping Address</label>
          <div className="flex flex-col shadow-md rounded-lg">
            <input
              id="name"
              type="text"
              value={shippingAddress!.name}
              onChange={(e) =>
                setShippingAddress((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Full name"
              className="mt-2 px-4 h-11 font-sans border border-gray-300 border-b-0 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:z-50"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  role="combobox"
                  className="h-11 px-4 text-lg justify-between border-gray-300 border-b-0 rounded-none font-sans focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-zinc-950 focus-visible:z-50"
                >
                  {country.name}
                  <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full bg-gray-100">
                {COUNTRIES.map((c) => (
                  <DropdownMenuItem
                    key={c.country}
                    className={cn(
                      "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-300 font-sans",
                      {
                        "bg-zinc-100": c.country === country.name,
                      }
                    )}
                    onClick={() => {
                      onChangeCountry(c);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        c.country === country.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {c.country}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              id="line-1"
              type="text"
              placeholder="Street"
              value={shippingAddress.street}
              onChange={(e) =>
                setShippingAddress((prev) => ({
                  ...prev,
                  street: e.target.value,
                }))
              }
              className="px-4 h-11 font-sans border border-gray-300 border-b-0 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:z-50"
            />
            <input
              id="line-2"
              type="text"
              placeholder="City"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
              className="px-4 h-11 font-sans border border-gray-300 border-b-0 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:z-50"
            />
            <input
              id="postal code"
              type="text"
              placeholder="Postal code"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress((prev) => ({
                  ...prev,
                  postalCode: e.target.value,
                }))
              }
              className="p-4 h-11 font-sans border border-gray-300 border-b-0 focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:z-50"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"outline"}
                  role="combobox"
                  className="h-11 px-4 text-lg justify-between border-gray-300 border-b-0 rounded-none font-sans focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-zinc-950 focus-visible:z-50"
                >
                  {country.state}
                  <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-100">
                {COUNTRIES.find((o) => o.country === country.name)?.states.map(
                  (c) => (
                    <DropdownMenuItem
                      key={c}
                      className={cn(
                        "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-300 font-sans",
                        {
                          "bg-zinc-100": c === country.state,
                        }
                      )}
                      onClick={() => {
                        setCountry((prev) => ({ ...prev, state: c }));
                        setShippingAddress((prev) => ({ ...prev, state: c }));
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          c === country.state ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {c}
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <input
              id="number"
              type="string"
              placeholder="Phone number"
              value={shippingAddress.phoneNumber!}
              onChange={(e) =>
                setShippingAddress((prev) => ({
                  ...prev,
                  phoneNumber: e.target.value,
                }))
              }
              className="p-4 h-11 font-sans border border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:z-50"
            />
          </div>

          <div className="mt-5 flex flex-col">
            <label className="text-gray-500">Shipping method</label>
            <RadioGroup
              value={shippingMethod}
              onChange={(val) => handleChange(val)}
            >
              <div className="mt-2 flex justify-between items-center border border-gray-300 border-b-0 rounded-t-lg p-3">
                <div className="ml-1 mr-2 flex gap-4 justify-center items-center">
                  <div className="">
                    <Radio
                      value={Object.keys(SHIPPING_COST)[0]}
                      className="flex size-3 items-center justify-center rounded-full border border-gray-500 bg-white data-[checked]:white data-[disabled]:bg-gray-100 transition-all duration-700 data-[checked]:ring-4 data-[checked]:ring-black"
                    />
                  </div>
                  <div className="">
                    <RadioLabel>{Object.keys(SHIPPING_COST)[0]}</RadioLabel>
                    <Description className="text-sm text-gray-500">
                      {SHIPPING_COST["Free Shipping"].desc}
                    </Description>
                  </div>
                </div>
                <div className="mr-2">Free</div>
              </div>
              <div className="flex justify-between items-center border border-gray-300 rounded-b-lg p-3">
                <div className="ml-1 mr-2 flex gap-4 justify-center items-center">
                  <div className="">
                    <Radio
                      value={Object.keys(SHIPPING_COST)[1]}
                      className="flex size-3 items-center justify-center rounded-full border border-gray-500 bg-white data-[checked]:white data-[disabled]:bg-gray-100 transition-all duration-700 data-[checked]:ring-4 data-[checked]:ring-black"
                    />
                  </div>
                  <div className="">
                    <RadioLabel>{Object.keys(SHIPPING_COST)[1]}</RadioLabel>
                    <Description className="text-sm text-gray-500">
                      {SHIPPING_COST["Next day air"].desc}
                    </Description>
                  </div>
                </div>
                <div className="mr-2">Free</div>
              </div>
            </RadioGroup>
          </div>

          <Button
            onClick={handleClick}
            className="my-8 text-lg p-4 bg-primary hover:opacity-90 hover:duration-700"
          >
            Pay
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Checkout;
