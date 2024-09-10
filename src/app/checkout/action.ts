"use server";

import OrderReceivedEmail from "@/components/emails/OrderReceivedEmail";
import { db } from "@/db";
import { ShippingAddress } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export type UpdateOrderArgs = {
  email: string;
  shippingAddress: ShippingAddress;
  orderId: string;
};

export async function updateOrderStatus({
  email,
  shippingAddress: address,
  orderId,
}: UpdateOrderArgs) {
  try {
    const updatedOrder = await db.order.update({
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

    await resend.emails.send({
      from: "CaseCobra <shivansh.yadav12@gmail.com>",
      to: [email],
      subject: "Thanks for your order!",
      react: OrderReceivedEmail({
        orderId,
        orderDate: updatedOrder.createdAt.toLocaleDateString(),
        // @ts-ignore
        shippingAddress: {
          name: address.name,
          city: address.city,
          country: address.country,
          postalCode: address.postalCode,
          street: address.street,
          state: address.state,
          phoneNumber: address.phoneNumber,
        },
      }),
    });
  } catch (e) {
    console.error(e);
    throw new Error("Something went wrong");
  }

  return {
    url: `/thank-you?orderId=${orderId}`,
  };
}
