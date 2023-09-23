import { Reservation } from "@/@types/reservations";
import List from "./_components/List";

async function getReservations(
  filter?: string
): Promise<{ reservations: Reservation[] }> {
  let { reservations }: { reservations: Reservation[] } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reservations`
  ).then((res) => res.json());

  if (filter) {
    const [key, value] = filter.split(":");
    if (key && value)
      reservations = reservations.filter((reservation: any) => {
        if (key === "start") {
          return (
            new Date(reservation[key].split("T")[0]).getTime() ===
            new Date(value).getTime()
          );
        } else if (typeof reservation[key] === "string")
          return reservation[key].toLowerCase() === value;
      });
  }

  return { reservations };
}

export default async function Home() {
  async function filterBy(formData: FormData) {
    "use server";
    const status = formData.get("status");
    const area = formData.get("area");
    const shift = formData.get("shift");
    const start = formData.get("start");
    const sort = formData.get("sort") as string;
    const filter = `${
      status
        ? `status:${status}`
        : start
        ? `start:${start}`
        : area
        ? `area:${area}`
        : shift
        ? `shift:${shift}`
        : ""
    }`;
    const [sortKey, sortDirection = "ASC"] = sort?.split(":") || [];
    const { reservations } = await getReservations(filter);
    const [key1, key2] = sortKey?.split(".") || [];

    if (key1 && key2)
      reservations.sort((a: any, b: any) =>
        (a[key1][key2] > b[key1][key2] && sortDirection === "ASC") ||
        (a[key1][key2] < b[key1][key2] && sortDirection === "DESC")
          ? 1
          : -1
      );
    else if (sortKey)
      reservations.sort((a: any, b: any) =>
        (a[sortKey] > b[sortKey] && sortDirection === "ASC") ||
        (a[sortKey] < b[sortKey] && sortDirection === "DESC")
          ? 1
          : -1
      );
    else
      reservations.sort((a, b) => (a.businessDate > b.businessDate ? 1 : -1));

    return reservations;
  }

  return (
    <>
      <h1 className="text-2xl">List of Reservations</h1>
      <List filterBy={filterBy} />
    </>
  );
}
