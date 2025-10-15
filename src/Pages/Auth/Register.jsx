import { useState } from "react";
import { FaGithub, FaRegUserCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { TbLock, TbLockCheck } from "react-icons/tb";
import { Link } from "react-router-dom";
import FormInput from "../../Components/Common/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../Services/axios_instance";
import { registerUser } from "../../Redux/user/userSlice";

const Register = () => {
  const registerError = useSelector((state) => state.user.registerError);
  const dispatch = useDispatch();
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
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "developer",
    isAgree: false,
  });
  function handleSubmit(e) {
    e.preventDefault();
    if (form.isAgree) {
      dispatch(registerUser(form));
    } else {
      alert("Please agree to the terms and conditions.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-[500px] p-6 bg-white rounded-2xl shadow-md">
        <div>
          <h2 className="text-2xl text-gray-800 font-bold mt-4 mb-6 text-center">
            Sign up to <span className="text-primary">DevHub</span>
          </h2>
          {/*  
          |--------------------------------------------------------------------------
          |   Oauth REGISTER 
          |--------------------------------------------------------------------------
           */}
          <div className="flex justify-center gap-4">
            <div
              onClick={handleGoogleLogin}
              className="flex-1 btn-hover border border-gray-300 rounded flex btn gap-3 items-center">
              <FcGoogle size={25} />
              <span className="text-gray-600">Login with Google</span>
            </div>
            <div
              onClick={handleGitHubLogin}
              className="flex-1 btn-hover border border-gray-300 rounded flex btn gap-3 items-center">
              <FaGithub size={25} />
              <span className="text-gray-600">Login with Github</span>
            </div>
          </div>
          <div className="flex items-center gap-2 my-6">
            <div className="flex-1 bg-gray-300 h-[1px]"></div>
            <div className="text-center text-gray-600">or Login with</div>
            <div className="flex-1 bg-gray-300 h-[1px]"></div>
          </div>
          {/*  
          |--------------------------------------------------------------------------
          |   Simple REGISTER Form
          |--------------------------------------------------------------------------
           */}
          <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
            <FormInput
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              Icon={FaRegUserCircle}
            />
            {registerError?.name && <div className="text-red-500 text-sm mb-2">{registerError.name}</div>}
            <FormInput
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              Icon={MdOutlineAlternateEmail}
            />
            {registerError?.email && <div className="text-red-500 text-sm mb-2">{registerError.email}</div>}
            <FormInput
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              Icon={TbLock}
              isPasswordInput={true}
            />
            {registerError?.password && <div className="text-red-500 text-sm mb-2">{registerError.password}</div>}
            <FormInput
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              isPasswordInput={true}
              Icon={TbLockCheck}
            />
            {registerError?.password_confirmation && (
              <div className="text-red-500 text-sm mb-2">{registerError.password_confirmation}</div>
            )}
            {/*             <select className="btn mt-2" onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option disabled selected>
                Select Role
              </option>
              <option value="developer" selected={form.role === "developer"}>
                Developer
              </option>
              <option value="client" selected={form.role === "client"}>
                Client
              </option>
            </select>
            {registerError?.role && <div className="text-red-500 text-sm mb-2">{registerError.role}</div>} */}
            <div className="flex items-start mb-2 mt-3">
              <input
                type="checkbox"
                className="checkbox checkbox-sm text-white checked:border-primary  checked:bg-primary validator"
                required
                title="Required"
                onChange={(e) => setForm({ ...form, isAgree: e.target.checked })}
                checked={form.isAgree}
              />
              <p className="text-sm text-gray-600 ms-2">
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Use
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            </div>
            <button type="submit" className="w-full btn-primary text-white py-2 rounded-lg btn transition mt-3">
              Create Account
            </button>

            <p className="text-sm text-center mt-2 text-gray-600">
              Doesn't have an account?{" "}
              <Link to="/auth/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
