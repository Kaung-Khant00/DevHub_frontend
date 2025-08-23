import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const FormInput = ({
  type,
  placeholder,
  value,
  onChange,
  Icon,
  isPasswordInput = false,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative m-0 mt-2">
      {Icon && (
        <Icon className="text-gray-500 absolute inset-y-0 my-auto ms-3" />
      )}
      <input
        type={isPasswordInput ? (visible ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full btn ps-10"
      />
      {isPasswordInput && (
        <div
          className="absolute inset-y-0 end-0 my-auto me-3 flex items-center"
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <FaEye size={20} className="text-gray-500" />
          ) : (
            <FaEyeSlash size={20} className="text-gray-500" />
          )}
        </div>
      )}
    </div>
  );
};

export default FormInput;
