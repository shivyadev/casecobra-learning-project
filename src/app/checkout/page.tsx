import { db } from "@/db";
import { notFound } from "next/navigation";
import Checkout from "@/app/checkout/Checkout";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") return notFound();

  const order = await db.order.findUnique({
    where: { id },
  });

  if (!order) return notFound();

  const configuration = await db.configuration.findUnique({
    where: { id: order?.configurationId },
  });

  if (!configuration) return notFound();

  return <Checkout order={order} configuration={configuration} />;
};

export default Page;
