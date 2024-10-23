export default function ToasterMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row gap-2">
      <span style={{ margin: "0 .1rem" }}> </span> 🔑
      <div style={{ margin: "0 .2rem" }}>{children}</div>
    </div>
  );
}
