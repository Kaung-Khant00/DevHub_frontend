import React from "react";
import { FaUser } from "react-icons/fa";
import { FiUsers, FiFileText, FiTag } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { PiUsersThree, PiUsersThreeBold } from "react-icons/pi";
import { TiUserOutline } from "react-icons/ti";

export default function GroupCard({ group }) {
  return (
    <div className="bg-base-100 p-4 rounded shadow-sm">
      <div className="flex">
        <div className="w-2/9">
          <img
            src="https://previews.123rf.com/images/iconicbestiary/iconicbestiary1603/iconicbestiary160300183/54217126-it-company-at-work-group-of-software-developers-people-coding-together-sitting-in-front-of-their-pc.jpg"
            alt=""
          />
        </div>
        <div className="ps-3 flex-1">
          <h1 className="font-bold text-lg">CODER GROUP</h1>
          <div className="text-sm text-gray-700">This is the best group in the world</div>
          <div className="flex gap-1 py-3">
            <div className="badge badge-sm badge-soft badge-primary">MERN</div>
            <div className="badge badge-sm badge-soft badge-primary">WEB</div>
            <div className="badge badge-sm badge-soft badge-primary">LARAVEL</div>
            <div className="badge badge-sm badge-soft badge-primary">React</div>
            <div className="badge badge-sm badge-soft badge-primary">full stack</div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="text-primary flex gap-2">
                <PiUsersThreeBold size={18} />
                10
              </div>
              <div className="text-primary flex gap-2">
                <HiOutlineDocumentText size={18} /> 10
              </div>
            </div>
            <div className="space-x-2">
              <button className="btn btn-sm btn-primary">Join</button>
              <button className="btn btn-sm btn-soft btn-primary">View</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
