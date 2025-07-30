import { Header } from "componets";
import React from "react";

const AllUsers = () => {
  const user = {
    name: "gu",
  };
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Trips Page`}
        description="Check out our current users in real time"
      />
      All Users Page content
    </main>
  );
};

export default AllUsers;
