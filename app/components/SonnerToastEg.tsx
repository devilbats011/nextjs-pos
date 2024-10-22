import { toast } from "sonner";

export default function SonnerToastEg() {
  return (
    <button
      onClick={() =>
        toast(<div>  <span style={{ margin: "0 .1rem" }}> </span> 🔑 <span style={{ margin: "0 .2rem" }}> </span>sonner toast </div>, {
          position: "top-center",
          duration: 1000,
        })
      }
    >
      Render my toast
    </button>
  );
}
