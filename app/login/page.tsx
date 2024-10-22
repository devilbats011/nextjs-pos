
import login from "@/api/login";
import logout from "@/api/logout";
import { redirect } from "next/navigation";

interface LoginProps {
    onLogin: (username: string, password: string) => void;
  }

export default async function Page() {

    return   (
        <section style={{'padding': '20px'}}>
        <form
          action={async (formData) => {
            "use server";
            await login('http://127.0.0.1:8000/api/status');
            redirect("/");
          }}
        >
          <input type="text" name="username" placeholder="username" style={{color: 'blue',padding: '10px', border: '1px solid blue'}} required />
          <br />
          <br />
          <button type="submit" style={{border: '1px solid blue', padding: '10px'}}>Login</button>
        </form>
      </section>
    )

}
