import { useState, useRef, useEffect } from "react";
import { CiCircleInfo } from "react-icons/ci";
export default function InfoBox({ text, autoHideMs = null }) {
  const [show, setShow] = useState(false);
  const boxRef = useRef();
  const hideTimerRef = useRef(null);

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

  useEffect(() => {
    if (!show || !autoHideMs) {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
      return;
    }

    hideTimerRef.current = setTimeout(() => {
      setShow(false);
      hideTimerRef.current = null;
    }, autoHideMs);

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [show, autoHideMs]);

  return (
    <div ref={boxRef} className="relative inline-block">
      
      <button onClick={() => setShow((prev) => !prev)} type="button">
        <CiCircleInfo size={20} />
      </button>

      {show && (
        <div className="absolute cursor-pointer top-8 right-0 bg-green-900/90  border-none p-2 rounded-md w-45 shadow-lg border transition-opacity duration-500 ">
    {text}
  </div>
      )}
    </div>
  );
}
