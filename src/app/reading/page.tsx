import { getAllReading } from "@/lib/curius";
import { ReadingList } from "./reading-list";

export const revalidate = 3600;

export const metadata = {
  title: "Reading — Kaustubh Kislay",
};

export default async function ReadingPage() {
  const items = await getAllReading();

  return (
    <div className="mx-auto max-w-[640px] px-6 py-16">
      <ReadingList items={items} backHref="/" />
    </div>
  );
}
