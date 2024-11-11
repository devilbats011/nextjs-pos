import { useEffect, useState } from "react";
import InputSelectColor from "./InputSelectColor";
import InputSelectImage from "./InputSelectImage";

export default function ItemRepresentation({ defaultColor = "red",
  setSelectedColor = () => {},
  selectedColor = 'black'
 }: { defaultColor?: string | undefined | null ;

  selectedColor?: string | null;
  setSelectedColor?: (color: string)=> void;

 }) {
  const [radioValue, setRadioValue] = useState<string | number>("1");

  useEffect(() => {
    if(defaultColor) {
      setSelectedColor(defaultColor);
    }
  }, [defaultColor]);

  function onChangeRadio(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(event.target.value);
    setRadioValue(event.target.value);
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
          value={"1"}
          id="1"
          defaultChecked
          onChange={onChangeRadio}
        />
        <label className="font-bold text-base" htmlFor="a">
          Color
        </label>
      </section>
      {radioValue == 1 && (
        <InputSelectColor
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      )}
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
