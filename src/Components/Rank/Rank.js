import React from "react";

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className="grey f3">{`${name}, your current entry count is...`}</div>
      <div className="grey f2">{entries}</div>
    </div>
  );
};

export default Rank;
