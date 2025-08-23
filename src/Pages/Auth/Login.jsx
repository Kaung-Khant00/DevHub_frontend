import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { __LOGIN__ } from "../../Redux/user/userAction";
import FormInput from "../../Components/FormInput";

const Login = () => {
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(__LOGIN__(form));
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-[500px] p-6 bg-white rounded-2xl shadow-md">
        <div>
          <h2 className="text-2xl text-gray-800 font-bold mt-4 mb-6 text-center">
            Login to <span className="text-blue-500">DevHub</span>
          </h2>
          <div className="flex justify-center gap-4">
            <div className="flex-1 btn-hover border border-gray-300 rounded flex btn gap-3 items-center">
              <FcGoogle size={25} />
              <span className="text-gray-600">Login with Google</span>
            </div>
            <div className="flex-1 btn-hover border border-gray-300 rounded flex btn gap-3 items-center">
              <FaGithub size={25} />
              <span className="text-gray-600">Login with Github</span>
            </div>
          </div>
          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 bg-gray-300 h-[1px]"></div>
            <div className="text-center text-gray-600">or Login with</div>
            <div className="flex-1 bg-gray-300 h-[1px]"></div>
          </div>
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <FormInput
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              Icon={MdOutlineAlternateEmail}
            />
            {error?.email && (
              <div className="text-red-500 text-sm mb-2">{error.email}</div>
            )}
            <FormInput
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              Icon={TbLock}
              isPasswordInput={true}
            />
            {error?.password && (
              <div className="text-red-500 text-sm mb-2">{error.password}</div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition mt-3"
            >
              Login
            </button>

            <p className="text-sm text-center mt-2 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/auth/register"
                className="text-blue-600 hover:underline"
              >
                Signup here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
