import React from "react";
import "./loader.css";
type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
