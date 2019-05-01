import React from 'react';
import Following from "./Following";
import Followers from "./Followers";
import DynamicScrollToTop from "../../routes/DynamicScrollToTop";

const People = () => {
  return (
    <div>
      <DynamicScrollToTop/>
      <Following/>
      <Followers/>
    </div>
  );
};

export default People;
