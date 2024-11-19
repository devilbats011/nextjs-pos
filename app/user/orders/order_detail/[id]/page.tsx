
import OrderList from "@/app/components/OrderList/page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <>
      <OrderList id={id} />
    </>
}
