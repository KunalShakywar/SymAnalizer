import { useState, useRef, useEffect } from "react";
import { CiCircleInfo } from "react-icons/ci";
export default function InfoBox({ text }) {
  const [show, setShow] = useState(false);
  const boxRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setShow(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={boxRef} className="relative inline-block">
      
      <button onClick={() => setShow(!show)} ><CiCircleInfo size={20} /></button>

      {show && (
        <div className="absolute cursor-pointer top-8 right-0 bg-green-900/90  border-none p-2 rounded-md w-45 shadow-lg border transition-opacity duration-500 ">
    {text}
  </div>
      )}
    </div>
  );
}