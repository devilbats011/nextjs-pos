/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { ItemProps } from "../zustand/interface/item";
import useStore from "../zustand/useStore";
import { CategoryProps } from "../zustand/interface/backend/category";

export default function useItem() {
  const { getCategory } = useStore((state) => state);
  const [isHideModalCategory, setIsHideModalCategory] = useState(true);
  const [useEffectCount, setUseEffectCount] = useState(0);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [newCategory, setNewCategory] = useState<CategoryProps>();
  const [category, setCategory] = useState<CategoryProps>();
  const [item, setItem] = useState<Partial<ItemProps> | undefined | null>();
  const [selectedColor, _setSelectedColor] = useState<string | null>(null);
  const [radioValue, setRadioValue] = useState<'color'| 'image'>("color");

  useEffect(() => {
    getCategory().then((data: any) => {
      setCategories(data);
    });
  }, [useEffectCount]);

  function setSelectedColor(color: string) : void{
    setItem((prevItem: any) => ({
      ...prevItem,
      representation_color: color
    }))
    _setSelectedColor(color);
  }

  return {
    isHideModalCategory,
    setIsHideModalCategory,
    useEffectCount,
    setUseEffectCount,
    categories,
    setCategories,
    newCategory,
    setNewCategory,
    category,
    setCategory,
    item,
    setItem,
    selectedColor,
    setSelectedColor,
    radioValue,
    setRadioValue
  };
}
