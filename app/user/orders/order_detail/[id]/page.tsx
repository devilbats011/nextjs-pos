

import Breadcrumb from "@/app/components/Breadcrumb";
import OrderList from "@/app/components/OrderList/page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <>
      <Breadcrumb
        crumbs={[
          { name: "Orders", href: "/user/orders" },
          { name: "Order Detail", href: "#" },
        ]}
      />
      <OrderList id={id} />
    </>
}
