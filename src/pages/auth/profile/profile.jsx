import { FiEdit } from "react-icons/fi";
import ProfileImage from "../../../components/profileImage";

export default function DemoProfile() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="relative flex items-center justify-center gap-3 rounded-xl bg-green-500/50 p-4">
        <button
          type="button"
          aria-label="Edit profile"
          className="absolute right-2 top-2 rounded-full bg-white p-1.5 shadow-md transition hover:scale-105"
        >
          <FiEdit className="text-sm text-gray-700" />
        </button>

        <div className="flex items-center justify-center">
          {/* after complete ui then use random default images */}
          <ProfileImage
            src={""}
            size="w-20 h-20"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold p-0.5">Aakarsh Pandit</h3>
          <div className="grid grid-cols-2 gap-2 text-sm md:text-xl">
            <p className="rounded bg-gray-400 p-0.5">Height: 5'11</p>
            <p className="rounded bg-gray-400 p-0.5">Weight: 65</p>
            <p className="rounded bg-red-400 p-0.5">Blood G: B+</p>
            <p className="rounded bg-blue-400 p-0.5">BMI: </p>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="mt-4 flex items-center justify-center gap-3 rounded-xl bg-green-500/50"></div>
    </div>
  );
}
