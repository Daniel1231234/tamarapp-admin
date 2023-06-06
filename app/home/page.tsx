import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Form from "../components/Form";

interface PageProps {}

const Page = async ({}: PageProps) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/home");
  }
  return (
    <section className="py-20">
      <h1 className="text-2xl font-semibold tracking-tight text-center my-4">
        מה תרצי לכתוב לתמר היום?
      </h1>
      <Form />
    </section>
  );
};

export default Page;
