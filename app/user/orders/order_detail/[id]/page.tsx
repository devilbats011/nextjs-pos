
import Breadcrumb from "@/app/components/Breadcrumb";
import OrderList from "@/app/components/OrderList/page";
import { pathNameProps } from "@/app/Interface/interface";
import useStore from "@/hooks/zustand/useStore";

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
