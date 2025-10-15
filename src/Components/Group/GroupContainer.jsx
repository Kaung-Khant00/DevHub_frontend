import React from "react";
import { useSelector } from "react-redux";
import GroupCard from "./GroupCard";
import Spinner from "../Common/Spinner";

const GroupContainer = () => {
  const { data, loading } = useSelector((state) => state.group.fetch);
  return (
    <>
      <div className="flex justify-center">{loading && <Spinner />}</div>
      <main className=" grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((group) => (
          <GroupCard group={group} key={group.id} />
        ))}
      </main>
      {!loading && data.length === 0 && <h1 className="text-center">No Group Found</h1>}
    </>
  );
};

export default GroupContainer;
