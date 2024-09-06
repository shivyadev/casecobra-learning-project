"use server";

import { db } from "@/db";
import { ShippingAddress } from "@prisma/client";

export type UpdateOrderArgs = {
  shippingAddress: ShippingAddress;
  orderId: string;
};

export async function updateOrderStatus({
  shippingAddress: address,
  orderId,
}: UpdateOrderArgs) {
  try {
    await db.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        shippingAddress: {
          create: {
            name: address.name,
            city: address.city,
            country: address.country,
            postalCode: address.postalCode,
            street: address.street,
            state: address.state,
            phoneNumber: address.phoneNumber,
          },
        },
        billingAddress: {
          create: {
            name: address.name,
            city: address.city,
            country: address.country,
            postalCode: address.postalCode,
            street: address.street,
            state: address.state,
            phoneNumber: address.phoneNumber,
          },
        },
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong");
  }

  return {
    url: `/thank-you?orderId=${orderId}`,
  };
}
