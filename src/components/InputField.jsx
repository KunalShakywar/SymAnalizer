import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const InputField = ({
  icon:Icon,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  className,
  error
}) => {
  const [show, setShow] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div style={{ marginBottom: "10px" }}>
      <div className="flex items-center border rounded-lg px-3 focus:outline-none focus:ring-2 focus:ring-green-500">
        {Icon && <Icon className="text-gray-400 mr-2" />}

        <input
          type={isPasswordField && show ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 pr-3 py-2 rounded-lg outline-none bg-transparent "
        />

        {isPasswordField && (
          <button type="button" onClick={() => setShow((prev) => !prev)}>
            {show ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default InputField;
