"use client";

// import Breadcrumb from "@/app/components/Breadcrumb";
import ButtonBig from "@/app/components/Buttons/ButtonBig";
import Header1 from "@/app/components/Headers/Header1";
import InputGroupText from "@/app/components/InputGroup/InputGroupText";
import ItemList from "@/app/components/ItemList/page";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Page() {
    
    const router = useRouter();
  return (
    <div>
      {/* <Breadcrumb crumbs={[{ name: "Charge Order", href: "/#" }]} />
      <br /> */}
      <section
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <ButtonBig buttonProps={{ onClick: () => {router.back()} }} color="secondary">
          Back
        </ButtonBig>
        <ButtonBig buttonProps={{ onClick: () => {router.push('/user/examplee')} }} color="warning">
          Cancel
        </ButtonBig>
        <Header1> Order </Header1>
        <ItemList
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          disableCheckbox
          disableAddRemoveButton
          disableDeleteButton
        />

        <InputGroupText id="charge_order" inputProps={{ id: "charge_order" }}>
          Send Email
        </InputGroupText>

        <ButtonBig
          buttonProps={{
            onClick: () => {
              toast(
                <div>
                  <span style={{ margin: "0 .1rem" }}> </span> 🔑{" "}
                  <span style={{ margin: "0 .2rem", fontWeight: "bold" }}> </span> SOLD!
                </div>,
                {
                  position: "top-center",
                  duration: 1000,
                }
              );
            },
          }}
          color="primary"
        >
          NEW SALE
        </ButtonBig>
      </section>
    </div>
  );
}
