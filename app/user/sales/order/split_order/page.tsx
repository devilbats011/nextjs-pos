"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import ButtonSmall from "@/app/components/Buttons/ButtonSmall";
import Header1 from "@/app/components/Headers/Header1";

import ItemList from "@/app/components/ItemList/page";
import {
  formatPrice,
  getObjectFromArrayById,
  uuid,
} from "@/hooks/helper/helper";
import { GroupItemProps, ItemProps } from "@/hooks/zustand/interface/item";
import {
  splitOrderItemsProps,
  SplitOrderProps,
} from "@/hooks/zustand/interface/order";
import useStore, { useStoreProps } from "@/hooks/zustand/useStore";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Page() {
  const r = useRouter();
  const [splitOrder, setSplitOrder] = useState(2);
  const { ...dataStore } = useStore((state) => state);
  const [groupedItemList, setGroupedItemList] = useState<GroupItemProps[]>([]);

  useEffect(() => {
    dataStore.fetchItems();
    const tempGroupedItemList = dataStore.groupedItemList();
    setGroupedItemList(tempGroupedItemList);
    console.log("tempGroupedItemList", tempGroupedItemList);
  }, [splitOrder]);

  // }, [dataStore.orderItems]);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        crumbs={[
          { name: "Sales", href: "/user/sales" },
          { name: "Order", href: "/user/sales/order" },
          { name: "Split Order", href: "#" }, // /user/split_order
        ]}
      />

      <div
        className="flex flex-col items-center justify-center gap-4 py-4"
        style={{ width: "100%", minWidth: "300px" }}
      >
        <Header1> Split Order Per Person </Header1>
        <input
          type="number"
          onChange={(e) => setSplitOrder(parseInt(e.target.value))}
          min={1}
          max={5}
          className="border py-2.5 text-xl rounded"
          defaultValue={splitOrder}
          style={{ width: "80px", paddingLeft: "1.8rem" }}
        />
      </div>
      <br />
      <TableStorage items={groupedItemList} />
      {Array.isArray(groupedItemList) && groupedItemList.length > 0 && (
        <SplitOrderDiv
          splitOrderNumber={splitOrder}
          items={groupedItemList}
          dataStore={dataStore}
          setGroupedItemList={setGroupedItemList}
        />
      )}
    </div>
  );
}

function TableStorage({ items }: { items: GroupItemProps[] }) {
  return (
    <div className="relative overflow-x-auto px-2">
      <table className="w-full text-sm text-left rtl:text-center rounded-md  ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100 ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Item Name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Quantity
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: GroupItemProps) => (
            <tr
              className="bg-white border-b  font-bold cursor-auto"
              onClick={() => null}
            >
              <th scope="row" className="px-6 py-4  whitespace-nowrap ">
                {item.name}
              </th>
              <td className="px-6 py-4 text-lg text-center ">
                {item.quantity}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SplitOrderDiv({
  splitOrderNumber,
  items,
  dataStore,
  setGroupedItemList,
}: {
  splitOrderNumber: number;
  items: GroupItemProps[];
  dataStore: useStoreProps;
  setGroupedItemList: Dispatch<SetStateAction<GroupItemProps[]>>;
}) {
  const [SplitOrders, setSplitOrders] = useState<SplitOrderProps[]>([]);

  useEffect(() => {
    console.log("splitOrderNumber", splitOrderNumber, "items", items);
    // if (!items || items.length === 0) return;

    const splitOrderItems = items.map(
      (item: GroupItemProps): splitOrderItemsProps => {
        return {
          id: item.id,
          name: item.name,
          quantity: 0,
          price: item.price,
          sumPrice: 0,
        };
      }
    );

    console.log(
      "splitOrderNumber",
      splitOrderNumber,
      "index",
      SplitOrders.length
    );

    setSplitOrders((prev) => []);

    Array.from({ length: splitOrderNumber }).map((_, index) =>
      setSplitOrders((prev) => [
        ...prev,
        {
          splitOrderItems,
          id: uuid(),
          totalSumPrice: 0,
        },
      ])
    );

    // if (SplitOrders.length !== splitOrderNumber) {
    // for (let index = SplitOrders.length; index < splitOrderNumber; index++) {

    //   setSplitOrders((prev) => [
    //     ...prev,
    //     {
    //       splitOrderItems,
    //       id: uuid(),
    //       sumPrice: 0,
    //     },
    //   ]);
    // }
    // for (let index = SplitOrders.length; index > splitOrderNumber; index++) {
    //   setSplitOrders((prev) => prev.slice(0, -1));
    // }
    // }

    return () => {};
  }, [splitOrderNumber]);

  function addOne(order: SplitOrderProps, item: splitOrderItemsProps) {
    const _splitOrderItems = [...order.splitOrderItems];
    const _item = getObjectFromArrayById(_splitOrderItems, item.id);

    let newSplitOrderItems = [] as splitOrderItemsProps[];

    const orderItem = getObjectFromArrayById(items, item.id);

    if (orderItem && orderItem?.quantity <= 0) {
      return;
    }

    const item_price = items.find((i) => i.id === item.id)?.itemPrice;
    const sumPrice = (item.quantity + 1) * (item_price ?? 0);

    console.log(item_price, "item_price", sumPrice);

    if (!_item) {
      // new item added
      _splitOrderItems.push({
        id: item.id,
        quantity: 1,
        price: item.price,
        name: item.name,
        sumPrice,
      });
      newSplitOrderItems = _splitOrderItems;

      decrementOrderItemQuantity(item.id);
      // dataStore.decrementOrderItemQuantity(item.id);
    } else {
      // existing item
      newSplitOrderItems = order.splitOrderItems = _splitOrderItems.map((i) => {
        return i.id === _item.id
          ? { ...i, quantity: i.quantity + 1, sumPrice }
          : i;
      });

      decrementOrderItemQuantity(_item.id);
      // dataStore.decrementOrderItemQuantity(_item.id);
    }

    // console.log("newSplitOrderItems", newSplitOrderItems, dataStore.items);

    setSplitOrders((prev) =>
      prev.map((o) =>
        o.id === order.id
          ? {
              ...o,
              splitOrderItems: newSplitOrderItems,
              totalSumPrice: newSplitOrderItems.reduce(
                (acc, item) => acc + item.sumPrice,
                0
              ),
            }
          : o
      )
    );
  }

  function removeOne(order: SplitOrderProps, item: splitOrderItemsProps) {
    const _splitOrderItems = [...order.splitOrderItems];
    const _item = getObjectFromArrayById(_splitOrderItems, item.id);

    let newSplitOrderItems = [] as splitOrderItemsProps[];

    const item_price = dataStore.items.find((i) => i.id === item.id)?.price;
    const sumPrice = (item.quantity - 1) * (item_price ?? 0);
    console.log(item_price, "item_price", sumPrice);

    if (_item) {
      if (_item.quantity > 0) {
        console.log(_item.quantity, "item.quantity");
        newSplitOrderItems = _splitOrderItems.map((i) => {
          return i.id === _item.id
            ? { ...i, quantity: i.quantity - 1, sumPrice }
            : i;
        });

        incrementOrderItemQuantity(item.id);

        setSplitOrders((prev) =>
          prev.map((o) =>
            o.id === order.id
              ? {
                  ...o,
                  splitOrderItems: newSplitOrderItems,
                  totalSumPrice: newSplitOrderItems.reduce(
                    (acc, item) => acc + item.sumPrice,
                    0
                  ),
                }
              : o
          )
        );
      }
    } else {
      console.warn(`Item with ID ${item.id} not found in splitOrderItems.`);
    }
  }

  const incrementOrderItemQuantity = (itemId: string) => {
    updateOrderItemQuantity(itemId, 1);
  };

  const decrementOrderItemQuantity = (itemId: string) => {
    updateOrderItemQuantity(itemId, -1);
  };

  const updateOrderItemQuantity = (itemId: string, quantity: number) => {
    const groupedItemListParent = [...items]; // Copy the array to avoid mutating state directly
    const tempItem = getObjectFromArrayById(groupedItemListParent, itemId);
    if (!tempItem) {
      return;
    }
    const tempGroupItemListParent = groupedItemListParent.map((item) => {
      if (item.id === itemId) {
        const q = (item.quantity += quantity);
        console.log(q);
        item.quantity = q <= 0 ? 0 : q;
        console.log(item.quantity);
        return item;
      }
      return item;
    });

    setGroupedItemList(tempGroupItemListParent);
  };

  return (
    <div>
      {/* {JSON.stringify(SplitOrders,null,1)} */}
      {/* {JSON.stringify(items,null,1)} */}

      {/* {Array.from({ length: splitOrderNumber }).map((_, index) => ( */}
      {SplitOrders.map((order: SplitOrderProps, index: number) => (
        <div key={index} className="p-4 border border-gray-300 m-2 ">
          <div className="flex gap-4 justify-center items-center flex-col">
            {order.splitOrderItems.map((item) => (
              <div className="flex gap-2 flex-row" key={item.id}>
                <ButtonSmall
                  buttonProps={{
                    onClick: () => removeOne(order, item),
                  }}
                >
                  -
                </ButtonSmall>
                <div className="flex justify-center items-center">
                  {item.name}
                </div>
                <ButtonSmall
                  buttonProps={{
                    onClick: () => addOne(order, item),
                  }}
                >
                  +
                </ButtonSmall>

                <div className="flex justify-center items-center">
                  {item.quantity}
                </div>
                <div className="flex justify-center items-center">
                  Sum Price: {formatPrice(item.sumPrice)}
                </div>
              </div>
            ))}
            {/* <div> Price To Paid: ___ </div> */}
            {/* <div style={{ maxWidth: "300px" }}>{JSON.stringify({})} </div> */}

            <div className="p-2 border flex justify-center items-center">
              Total Sum Price: {formatPrice(order.totalSumPrice)}
            </div>
          </div>

          <ButtonBig
            buttonProps={{
              onClick: (e) => {
                // r.push("/user/sales/order/charge_order");
                console.log(e);
              },
              style: { margin: "1rem 0" },
            }}
          >
            Charged
          </ButtonBig>
          {/* <ItemList
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            disableDeleteButton
            disableTotalItems
            items={dataStore.groupedItemList()}
          /> */}
        </div>
      ))}
    </div>
  );
}
