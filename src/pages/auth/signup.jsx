import { useState } from "react";
import InputField from "../../components/InputField";
import { FiUser, FiCalendar, FiLock, FiMail } from "react-icons/fi";
import { MdOutlineBloodtype,MdOutlineMonitorWeight } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    age:"",
    height:"",
    weight:"",
    blg:"",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const isFormValid = form.email.trim() !== "" && form.password.trim() !== "";

  // handle change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // validation
  const validate = () => {
    let newErrors = {};

    if (!form.name) newErrors.name = "Name required";
    if (!form.email) newErrors.email = "Email required";
    if (form.password.length < 12)
      newErrors.password = "Min 12 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords not match";

    return newErrors;
  };

  // submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Form Data:", form);
      // yaha API call karega
    }
  };

  return (
     <div className="min-h-screen flex items-center justify-center px-4">
    <form onSubmit={handleSubmit}  className="w-full max-w-sm rounded-lg bg-green-500/50 p-6 text-center shadow-md backdrop-blur-md">
    <div className="mb-4">

      <h1 className="search-title flex flex-row items-center justify-center gap-3 text-center">
          Create
          <span style={{ color: "#4CAF50" }}>Profile</span>
        </h1>
    </div>
  
      <InputField
      placeholder="Enter your name"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        icon={FiUser}
        
        
      />
 <InputField
      placeholder="Enter  your current age"
        name="age"
        value={form.age}
        onChange={handleChange}
        error={errors.age}
        icon={FiCalendar}
      />
       <InputField
        placeholder="Enter  height"
        name="height"
        value={form.height}
        onChange={handleChange}
        error={errors.height}
        icon={GiBodyHeight}
      />
       <InputField
      placeholder="Enter  weight"
        name="weight"
        value={form.weight}
        onChange={handleChange}
        error={errors.weight}
        icon={MdOutlineMonitorWeight}
      />
       <InputField
        placeholder="Enter your blood group"
        name="blg"
        value={form.blg}
        onChange={handleChange}
        error={errors.blg}
        icon={MdOutlineBloodtype}
      />
      <InputField
             placeholder="Emter your email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        icon={FiMail}
      />

      <InputField
            placeholder="Enter your password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        icon={FiLock}
      />

      <InputField
           placeholder="Confirm your password"
        name="confirmPassword"
        type="password"
        value={form.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        icon={FiLock}
      />

      <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-white transition ${
              isFormValid && !loading
                ? "bg-green-600 hover:bg-green-700"
                : "cursor-not-allowed bg-green-500/40 opacity-60 "
            }`}
          >
            <span className="text-center font-semibold">
              {loading ? "Sign..." : "Signup"}
            </span>
          </button>
    </form>
        </div>
  );
};

export default Signup;
