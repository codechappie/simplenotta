import React from "react";
import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
const FloatingButton = ({ children }: Props) => {
  return (
    <>
      <label
        className="btn btn-lg btn-circle fixed bottom-5 right-5 bg-primary hover:bg-purple-800 border-none"
        htmlFor="my-modal-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.2}
          stroke="#ffffff"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </label>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">{children}</div>
    </>
  );
};

export default FloatingButton;
