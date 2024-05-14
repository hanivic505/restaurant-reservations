"use client";
import classNames from "classnames";
import s from "./styles.module.scss";
import { Reservation } from "@/@types/reservations";
import { useEffect, useState } from "react";
import { FilterBar } from "./components/FilterBar";

interface IProps {
  filterBy: (formData: FormData) => Promise<Reservation[]>;
}

function List({ filterBy }: IProps) {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    filterBy(new FormData()).then((res) => {
      setReservations(res);
    });
  }, [filterBy]);

  const submitHandler = async (data: FormData) => {
    setReservations(await filterBy(data));
  };

  return (
    <>
      <FilterBar submitHandler={submitHandler} />
      <ul
        className={classNames("grid grid-cols-1 md:grid-cols-4 gap-4", s.list)}
      >
        {reservations?.map((reservation: Reservation) => (
          <li
            title={reservation.status}
            key={reservation.id}
            className={classNames(
              "p-4 border-2 rounded-lg",
              s[reservation.status.toLowerCase().replaceAll(" ", "-")]
            )}
          >
            <div>{reservation.businessDate}</div>
            {reservation.shift} - {reservation.start} - {reservation.end} -{" "}
            {reservation.quantity} - {reservation.area}
            {` - ${reservation.customer.firstName} ${reservation.customer.lastName}`}
          </li>
        ))}
      </ul>
    </>
  );
}

export default List;
