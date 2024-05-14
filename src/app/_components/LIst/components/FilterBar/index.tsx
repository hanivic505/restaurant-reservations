import classNames from "classnames";
import s from "./styles.module.scss";
import { useRef } from "react";

export const FilterBar = (props: any) => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div
      className={classNames(" p-4 my-4 bg-gray-700 rounded-md", s.actionBar)}
    >
      <form
        ref={formRef}
        action={props.submitHandler}
        className="flex flex-col md:flex-row gap-4"
      >
        <ul className="flex flex-col md:flex-row gap-4 flex-grow md:items-center">
          <li>
            Status:{" "}
            <select name="status">
              <option value={""}>All</option>
              <option value={"confirmed"}>Confirmed</option>
              <option value={"not confirmed"}>Not Confirmed</option>
              <option value={"seated"}>Seated</option>
              <option value={"checked-out"}>Checked Out</option>
            </select>
          </li>
          <li>
            Date: <input name="start" type="date" />
          </li>
          <li>
            Area:{" "}
            <select name="area">
              <option value={""}>All</option>
              <option value={"bar"}>Bar</option>
              <option value={"main room"}>Main Room</option>
            </select>
          </li>
          <li>
            Shift:{" "}
            <select name="shift">
              <option value={""}>All</option>
              <option value={"breakfast"}>Breakfast</option>
              <option value={"lunch"}>Lunch</option>
              <option value={"dinner"}>Dinner</option>
            </select>
          </li>
          <li>
            <button>Filter</button>
          </li>
        </ul>
        <ul className="flex flex-col md:flex-row md:items-center gap-4 flex-shrink">
          <li className="!hidden md:!block">
            <span className="w-0.5 bg-white block h-8"></span>
          </li>
          <li className={s.sorting}>
            Sort by:{" "}
            <select
              name="sort"
              className="md:ml-4"
              onChange={() => {
                formRef.current?.requestSubmit();
              }}
            >
              <option value={"customer.firstName:ASC"}>
                Guest Name Ascending
              </option>
              <option value={"customer.firstName:DESC"}>
                Guest Name Descending
              </option>
              <option value={"quantity:ASC"}>Guest Number Ascending</option>
              <option value={"quantity:DESC"}>Guest Number Descending</option>
            </select>
          </li>
        </ul>
      </form>
    </div>
  );
};
