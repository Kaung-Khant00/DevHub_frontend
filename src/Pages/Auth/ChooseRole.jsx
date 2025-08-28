import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ChooseRole() {
  async function setRole(role) {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/set/role",
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.href = "/feed";
    } catch (error) {
      console.error("Error setting role:", error);
    }
  }
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user?.role) {
      window.location.href = "/feed";
    } else {
      toast.info("Please set your role to continue");
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen -mt-[50px]">
      <div className="w-full max-w-[500px] p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center my-3">
          Choose your role
        </h2>
        <div className="flex flex-col gap-5 my-2">
          <button
            onClick={() => setRole("developer")}
            className="btn btn-primary w-full"
          >
            Developer
          </button>
          <button
            onClick={() => setRole("client")}
            className="btn btn-primary w-full"
          >
            Client
          </button>
        </div>
      </div>
    </div>
  );
}
