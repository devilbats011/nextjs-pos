"use client";

import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import ButtonSmall from "@/app/components/Buttons/ButtonSmall";
import Header1 from "@/app/components/Headers/Header1";
import ToasterMessage from "@/app/components/ToasterMessage";
import { baseUrlOrders } from "@/hooks/helper/constant";
import {
  fetchWithAuth,
  formatPrice,
  getObjectFromArrayById,
  isArrayNotEmpty,
  updateObjectArrayById,
  uuid,
} from "@/hooks/helper/helper";
import { useSonnerToast } from "@/hooks/useSonnerToast";
import { GroupItemProps, ItemProps } from "@/hooks/zustand/interface/item";
import {
  splitOrderItemsProps,
  SplitOrderProps,
} from "@/hooks/zustand/interface/item";
import useStore, { useStoreProps } from "@/hooks/zustand/useStore";
import { useParams, useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface GroupItemPropsExtend extends GroupItemProps {
  bill_id: string;
}

export default function Page() {
  const router = useRouter();
  const [splitOrderPerPerson, setSplitOrderPerPerson] = useState(2);
  const { ...dataStore } = useStore((state) => state);
  const [groupedItemList, setGroupedItemList] = useState<
    GroupItemPropsExtend[]
  >([]);
  const { id }: { id: string } = useParams();
  const { toaster } = useSonnerToast();

  useEffect(() => {
    setTimeout(() => {
      dataStore.setIsLoading(false);
    }, 300);
  }, []);

  useEffect(() => {
    dataStore.fetchItems();
    (async () => {
      const order = await dataStore.getOrderById(id);
      if (!order) return;
      (() => {
        const bills = order.bills.filter((bill) => bill.status == "unpaid");
        //* cast bills to GroupedItemList and then setGroupedItemList
        const tempGroupedItemList: GroupItemPropsExtend[] = bills.map(
          (bill, index) => {
            const {
              item: { id, name, price: itemPrice },
              item_quantity: quantity,
            } = bill;
            return {
              bill_id: bill.id,
              id,
              name,
              price: quantity * parseFloat(itemPrice as string),
              quantity,
              itemPrice,
            } as GroupItemPropsExtend;
          }
        );
        const totalQuantity = tempGroupedItemList.reduce(
          (acc, groupItem) => acc + groupItem.quantity,
          0
        );
        dataStore.setTotalQuantitySplitOrderPage(totalQuantity);
        setGroupedItemList(tempGroupedItemList);
      })();
    })();
  }, [splitOrderPerPerson]);

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb
        crumbs={[
          { name: "Sales", href: "/user/sales" },
          //   { name: "Order", href: "/user/sales/order" },
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
          onChange={(e) => {
            e.preventDefault();
            if (isNaN(e.target.value as any)) {
              toaster(
                <ToasterMessage>
                  <span className="italic text-red-500">
                    Value is not a number
                  </span>
                </ToasterMessage>
              );
              return;
            }
            if ((e.target.value as unknown as number) > 5) {
              toaster(
                <ToasterMessage>
                  <span className="italic text-red-500">
                    5 is the maximum number per person
                  </span>
                </ToasterMessage>
              );
              return;
            }

            if ((e.target.value as unknown as number) <= 0) {
              toaster(
                <ToasterMessage>
                  <span className="italic text-red-500">
                    1 is the minimum number per person
                  </span>
                </ToasterMessage>
              );
              return;
            }
            setSplitOrderPerPerson(parseInt(e.target.value));
          }}
          min={1}
          max={5}
          className="border py-2.5 text-xl rounded"
          defaultValue={splitOrderPerPerson}
          style={{ width: "80px", paddingLeft: "1.8rem" }}
        />
      </div>
      <br />
      <TableStorage items={groupedItemList} />
      {Array.isArray(groupedItemList) && groupedItemList.length > 0 ? (
        <SplitOrderDiv
          splitOrderNumber={splitOrderPerPerson}
          groupedItemList={groupedItemList}
          dataStore={dataStore}
          setGroupedItemList={setGroupedItemList}
        />
      ) : (
        <div className="text-gray-300 font-semibold text-center py-4 text-lg">
          No Items..
        </div>
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
            <th scope="col" className="px-3 py-3">
              Item Name
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Quantity
            </th>
            <th scope="col" className="px-3 py-3 text-center">
              Price per item
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: GroupItemProps) => (
            <tr
              key={item.id}
              className="bg-white border-b  font-bold cursor-auto"
              onClick={() => null}
            >
              <th
                scope="row"
                className="px-3 py-4 text-sm font-light whitespace-nowrap "
              >
                {item.name}
              </th>
              <td className="px-6 py-4 text-base text-center ">
                {item.quantity}
              </td>
              <td className="px-6 py-4 text-sm font-light text-center ">
                {formatPrice(item.itemPrice)}
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
  groupedItemList,
  dataStore,
  setGroupedItemList,
}: {
  splitOrderNumber: number;
  groupedItemList: GroupItemPropsExtend[];
  dataStore: useStoreProps;
  setGroupedItemList: Dispatch<SetStateAction<GroupItemPropsExtend[]>>;
}) {
  const [splitOrders, setSplitOrders] = useState<SplitOrderProps[]>([]);

  const { id: order_id }: { id: string } = useParams();
  const router = useRouter();
  useEffect(() => {
    // if (!items || items.length === 0) return;

    const splitOrderItems = groupedItemList.map(
      (item: GroupItemPropsExtend): splitOrderItemsProps => {
        return {
          bill_id: item.bill_id,
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
      splitOrders.length
    );

    setSplitOrders((prev) => []);

    Array.from({ length: splitOrderNumber }).map((_, index) =>
      setSplitOrders((prev) => [
        ...prev,
        {
          splitOrderItems,
          id: uuid(),
          totalSumPrice: 0,
          isPaid: false,
          quantity_paid: 0,
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
  }, [splitOrderNumber]);

  function addOne(order: SplitOrderProps, item: splitOrderItemsProps) {
    const _splitOrderItems = [...order.splitOrderItems];
    const _item = getObjectFromArrayById(_splitOrderItems, item.id);

    let newSplitOrderItems = [] as splitOrderItemsProps[];

    const orderItem = getObjectFromArrayById(groupedItemList, item.id);

    if (orderItem && orderItem?.quantity <= 0) {
      return;
    }

    const _item_price = groupedItemList.find(
      (i) => i.id === item.id
    )?.itemPrice;
    const item_price = parseFloat(_item_price as unknown as string);
    const sumPrice = (item.quantity + 1) * (item_price ?? 0);

    console.log(item_price, "item_price", sumPrice);

    if (!_item) {
      // new item added
      _splitOrderItems.push({
        bill_id: item.bill_id,
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

    const _item_price = dataStore.items.find((i) => i.id === item.id)?.price;
    const item_price = parseFloat(_item_price as unknown as string);
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
    const groupedItemListParent = [...groupedItemList]; // Copy the array to avoid mutating state directly
    const tempItem = getObjectFromArrayById(groupedItemListParent, itemId);
    if (!tempItem) {
      return;
    }
    const tempGroupItemListParent = groupedItemListParent.map((item) => {
      if (item.id === itemId) {
        if (String(quantity).includes("-")) {
          const newStringQuantity = String(quantity).replace("-", "");
          quantity = 0 - parseInt(newStringQuantity);
        }
        const q = parseInt(item.quantity as unknown as string) + quantity;
        item.quantity = q <= 0 ? 0 : q;
        return item;
      }
      return item;
    });
    setGroupedItemList(tempGroupItemListParent);
  };

  const { toaster } = useSonnerToast(3000);

  // console.log(dataStore.totalQuantitySplitOrderPage,'total');

  return (
    <div className="space-y-10">
      {splitOrders.map((splitOrder: SplitOrderProps, index: number) => (
        <div key={index} className="py-2 border-2 m-2">
          <div className=" py-4">
            {splitOrder.splitOrderItems.map((item: splitOrderItemsProps) => (
              <div
                className="grid grid-cols-3 grid-rows-3 sm:grid-cols-5 sm:grid-rows-1 gap-y-4 border-b py-4"
                style={{}}
                key={item.id}
              >
                <div className="col-span-full sm:col-span-2 flex justify-center items-center gap-4">
                  <span className="font-semibold">{item.name}</span>
                  <div
                    className=""
                    style={
                      {
                        // display: splitOrder.isPaid ? "none" : "flex",
                      }
                    }
                  >
                    x {item.quantity}
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-2  flex gap-2 justify-center items-center">
                  <ButtonSmall
                    buttonProps={{
                      style: {
                        display: splitOrder.isPaid ? "none" : "inherit",
                        height: "30px",
                      },
                      onClick: () => removeOne(splitOrder, item),
                    }}
                  >
                    -
                  </ButtonSmall>

                  <ButtonSmall
                    buttonProps={{
                      style: {
                        display: splitOrder.isPaid ? "none" : "inherit",
                        height: "30px",
                      },
                      onClick: () => addOne(splitOrder, item),
                    }}
                  >
                    +
                  </ButtonSmall>
                </div>

                <div className="flex justify-center items-center col-span-3 sm:col-span-1">
                  {formatPrice(item.sumPrice)}
                </div>
              </div>
            ))}
            <div className="flex justify-center items-center font-semibold relative">
              <span className="top-4 relative">
                Total Price: {formatPrice(splitOrder.totalSumPrice)}
              </span>
            </div>
          </div>
          <div className="w-full px-2">
            <ButtonBig
              buttonProps={{
                disabled: splitOrder.isPaid,
                onClick: (e) => {
                  const isQuantityNot0 = isArrayNotEmpty(
                    splitOrder.splitOrderItems.filter(
                      (split_order_item, index) => {
                        return split_order_item.quantity != 0;
                      }
                    )
                  );

                  if (!isQuantityNot0) {
                    toaster(
                      <ToasterMessage>
                        <span className="text-red-500 text-sm">
                          At least one item with a non-zero quantity.
                        </span>
                      </ToasterMessage>
                    );
                    return;
                  }

                  const updatedSplitOrders = updateObjectArrayById(
                    splitOrders,
                    splitOrder.id,
                    { ...splitOrder, isPaid: true }
                  );
                  setSplitOrders(updatedSplitOrders);

                  (async () => {
                    const accepted_one_split_order: SplitOrderProps = {
                      ...splitOrder,
                      splitOrderItems: splitOrder.splitOrderItems.filter(
                        (orderItem) => orderItem.quantity > 0
                      ),
                    };
                    fetchWithAuth(baseUrlOrders + "/split-order/" + order_id, {
                      method: "PUT",
                      body: JSON.stringify(accepted_one_split_order),
                    })
                      .then((res) => {
                        if (res.ok) {
                          const updated_quantity_paid =
                            accepted_one_split_order.splitOrderItems.reduce(
                              (acc, split_order_item) =>
                                acc + split_order_item.quantity,
                              0
                            );
                          const updatedSplitOrders2 = updateObjectArrayById(
                            updatedSplitOrders,
                            accepted_one_split_order.id,
                            { quantity_paid: updated_quantity_paid }
                          );
                          setSplitOrders(updatedSplitOrders2);

                          if (
                            updated_quantity_paid ==
                            dataStore.totalQuantitySplitOrderPage
                          ) {
                            toaster(
                              <ToasterMessage>Order Fully Paid</ToasterMessage>
                            );
                            setTimeout(() => {
                              router.push("/user/sales");
                            }, 500);
                            return;
                          }
                          toaster(<ToasterMessage> Updated </ToasterMessage>);
                        }
                        console.warn(res, res.json());
                        return null;
                      })
                      .catch((e) => {
                        console.error(e.message);
                        return null;
                      });
                  })();
                },
                style: { margin: "1rem 0" },
              }}
            >
              {splitOrder.isPaid ? "Paid" : "Charged"}
            </ButtonBig>
          </div>
        </div>
      ))}
    </div>
  );
}
