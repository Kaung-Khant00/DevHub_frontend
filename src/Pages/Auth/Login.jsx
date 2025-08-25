import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLock } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { __LOGIN__ } from "../../Redux/user/userAction";
import FormInput from "../../Components/Common/FormInput.jsx";
import { api } from "../../Services/axios_instance.js";

const Login = () => {
  const { loginError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleGitHubLogin = async () => {
    try {
      const response = await api.get("auth/github");
      window.open(response.data.url, "_self");
    } catch (err) {
      console.log(err);
    }
  };
  const handleGoogleLogin = async () => {
    try {
      const response = await api.get("auth/google");
      window.open(response.data.url, "_self");
    } catch (err) {
      console.log(err);
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(__LOGIN__(form));
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-[500px] p-6 bg-white rounded-2xl shadow-md">
        <div>
          <h2 className="text-2xl text-gray-800 font-bold mt-4 mb-6 text-center">
            Login to <span className="text-primary">DevHub</span>
          </h2>
          {/*
          |-------------------------------------------------------------------------
          | OAUTH LOGIN
          |--------------------------------------------------------------------------
          */}
          <div className="flex justify-center gap-4">
            <div
              onClick={handleGoogleLogin}
              className="flex-1 btn-hover border border-gray-300 rounded flex btn gap-3 items-center"
            >
              <FcGoogle size={25} />
              <span className="text-gray-600">Login with Google</span>
            </div>
            <div
              onClick={handleGitHubLogin}
              className="flex-1 btn-hover border border-gray-300 rounded flex btn gap-3 items-center"
            >
              <FaGithub size={25} />
              <span className="text-gray-600">Login with Github</span>
            </div>
          </div>
          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 bg-gray-300 h-[1px]"></div>
            <div className="text-center text-gray-600">or Login with</div>
            <div className="flex-1 bg-gray-300 h-[1px]"></div>
          </div>
          {loginError?.form && (
            <div className="text-red-500 text-sm mb-2">{loginError.form}</div>
          )}
          {/*
          |--------------------------------------------------------------------------
          | SIMPLE LOGIN FORM
          |--------------------------------------------------------------------------
          */}
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <FormInput
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              Icon={MdOutlineAlternateEmail}
            />
            {loginError?.email && (
              <div className="text-red-500 text-sm mb-2">
                {loginError.email}
              </div>
            )}

            <FormInput
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              Icon={TbLock}
              isPasswordInput={true}
            />
            {loginError?.password && (
              <div className="text-red-500 text-sm mb-2">
                {loginError.password}
              </div>
            )}
            <button
              type="submit"
              className="w-full btn-primary text-white py-2 rounded-lg btn transition mt-3"
            >
              Login
            </button>

            <p className="text-sm text-center mt-2 text-gray-600">
              Already have an account?{" "}
              <Link
                to="/auth/register"
                className="text-primary hover:underline"
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
