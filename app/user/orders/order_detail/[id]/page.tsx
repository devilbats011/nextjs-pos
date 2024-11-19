import OrderListMain from "@/app/components/OrderList/OrderListMain"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return <>
      <OrderListMain id={id} />
    </>
}
