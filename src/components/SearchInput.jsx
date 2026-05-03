import { FiSearch, FiX } from "react-icons/fi";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      
      {/* Search Icon */}
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange({ target: { value: "" } })}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
        >
          <FiX />
        </button>
      )}
    </div>
  );
};

export default SearchInput;