import { useEffect, useState } from "react";
import InputSelectColor from "./InputSelectColor";
import InputSelectImage from "./InputSelectImage";

export default function ItemRepresentaion() {
  const [radioValue, setRadioValue] = useState<string | number>("1");

  function onChangeRadio(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setRadioValue(event.target.value);
  }

  return (
    <div className="flex flex-col justify-start items-start gap-4">
      <h3
        className="font-bold text-base md:text-xl"
        style={{ color: "#3F2F67" }}
      >
        Representation on Item
      </h3>

      <section className="flex gap-4">

        <input
          type="radio"
          name="a"
          value={"1"}
          id="1"
          defaultChecked
          onChange={onChangeRadio}
        />
        <label className="font-bold text-base" htmlFor="a">
          Color
        </label>
      </section>
      {radioValue == 1 && <InputSelectColor />}

      <section className="flex gap-4">

        <input
          type="radio"
          name="a"
          value={"2"}
          id="2"
          onChange={onChangeRadio}
        />
        <label className="font-bold text-base" htmlFor="b">
          Image
        </label>
      </section>

      {radioValue == 2 && <InputSelectImage />}
    </div>
  );
}
