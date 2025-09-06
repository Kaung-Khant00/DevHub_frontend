import React from "react";
import { useSelector } from "react-redux";
import GroupCard from "./GroupCard";

const GroupContainer = () => {
  const { data } = useSelector((state) => state.group.fetch);
  return (
    <main className=" grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((group) => (
        <GroupCard group={group} key={group.id} />
      ))}
    </main>
  );
};

export default GroupContainer;
