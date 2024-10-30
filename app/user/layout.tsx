import Sidebar from "../components/Navigation/Sidebar/page";
import Topbar from "../components/Navigation/Topbar/page";

export default async function Layout({
  children,
  // params,
}: {
  children: React.ReactNode;
  // params: Promise<{ team: string }>;
}) {
  return (
    <section style={{ padding: "1.4rem" }}>
      <section
        style={{
          display: "flex",
          gap: "10px",
          margin: "2.2rem 0 2rem 0px",
        }}
      >
        <Topbar />
        <Sidebar />
        {/* <pre style={{marginTop: "100px"}}>

        {JSON.stringify({},null,2)} 
        </pre> */}
      </section>
      <section>{children}</section>
    </section>
  );
}
