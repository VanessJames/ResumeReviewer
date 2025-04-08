import React from "react";
import { FaSpinner } from "react-icons/fa";

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <FaSpinner className="animate-spin text-white text-xl" />
    </div>
  );
};

export default Spinner;
