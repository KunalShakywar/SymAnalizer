import { FiMail, FiUser, FiEdit } from "react-icons/fi";

export default function DemoProfile() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold">
            D
          </div>

          <h2 className="mt-4 text-xl font-semibold">Under constraction</h2>
          <p className="text-gray-500 text-sm">abc@gmail.com</p>
        </div>

        {/* Info Section */}
        <div className="mt-6 space-y-4">

          {/* Name */}
          <div className="flex items-center gap-3 p-3 rounded-lg border">
            <FiUser className="text-gray-400" />
            <span className="text-gray-700">Under constraction</span>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 p-3 rounded-lg border">
            <FiMail className="text-gray-400" />
            <span className="text-gray-700">Not original profile</span>
          </div>

        </div>

        {/* Button */}
        <button className="mt-6 w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
          <FiEdit />
          Edit Profile
        </button>

      </div>

    </div>
  );
}