import React from "react";
import {MutatingDots } from "react-loader-spinner";

const Spinner = () => {
  return (
    <MutatingDots
      height="100"
      width="100"
      color="#FFFFFF"
      secondaryColor="#FFFFFF"
      radius="14.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />

  );
};

export default Spinner;
