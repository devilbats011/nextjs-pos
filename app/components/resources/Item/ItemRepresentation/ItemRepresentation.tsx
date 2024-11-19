'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import InputSelectColor from "./InputSelectColor";
import InputSelectImage from "./InputSelectImage";

export default function ItemRepresentation({ defaultColor = "red",
  setSelectedColor = () => {},
  selectedColor = 'black',
  useStateRadioValue,
  useStateItem,
 }: { defaultColor?: string | undefined | null ;
  useStateRadioValue: {radioValue: any, setRadioValue: any};
  selectedColor?: string | null;
  setSelectedColor?: (color: string)=> void;
  useStateItem:{item: any, setItem: any};

 }) {


  useEffect(() => {
    if(defaultColor) {
      setSelectedColor(defaultColor);
    }
  }, [defaultColor]);

  

  function onChangeRadio(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    useStateRadioValue.setRadioValue(event.target.value);
  }

  return (
    <div className="flex flex-col justify-start items-start gap-4 py-8">
      <h3
        className="font-bold text-lg"
        style={{ color: "#3F2F67" }}
      >
        Representation on Item
      </h3>

      <section className="flex gap-4">
        <input
          type="radio"
          name="a"
          value={"color"}
          id="1"
          defaultChecked
          onChange={onChangeRadio}
        />
        <label className="font-bold text-base" htmlFor="a">
          Color
        </label>
      </section>
      {useStateRadioValue.radioValue == 'color' && (
        <InputSelectColor
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}
      <section className="flex gap-4">
        <input
          type="radio"
          name="a"
          value={"image"}
          id="2"
          onChange={onChangeRadio}
        />
        <label className="font-bold text-base" htmlFor="b">
          Image
        </label>
      </section>
      {useStateRadioValue.radioValue == 'image' && <InputSelectImage  useStateItem={useStateItem} />}
    </div>
  );
}
