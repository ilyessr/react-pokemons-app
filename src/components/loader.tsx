import React, { FunctionComponent } from "react";

const Loader: FunctionComponent = () => {
  return (
    <div className="flex justify-center items-center h-full grow ">
      <img src="/assets/images/icons/icon_pokeball.png" alt="Loading..." className="animate-spin h-20" />
    </div>
  );

};

export default Loader;
