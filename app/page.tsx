import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-2xl font-semibold tracking-tight">
          מה תרצי לכתוב לתמר היום?
        </h1>
      </div>
    </section>
  );
}
