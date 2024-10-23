interface InputGroupTextProps {
  children: string | React.ReactNode;
  id?: string;
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
  labelProps?: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
}

export default function InputGroupText({
  children,
  id,
  inputProps,
  labelProps,
}: InputGroupTextProps) {

  const _id = id || `input-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".8rem" }}>
      <label
        {...labelProps}
        htmlFor={_id}
        className="font-bold text-base md:text-xl "
        style={{ color: '#3F2F67'}}
      >
        {children}
      </label>
      <input
        {...inputProps}
        placeholder="kewl@ice.ice"
        className="input w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        type="text"
        style={{ background: '#EFEFEF'}}
        id={_id}
      />
    </div>
  );
}
