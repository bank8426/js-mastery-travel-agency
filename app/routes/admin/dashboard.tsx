import { Header } from "componets";
import React from "react";

const Dashboard = () => {
  const user = {
    name: "gu",
  };
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome ${user?.name ?? "Guest"} 👋`}
        description="Track activity, trends and popular destinations in real time"
      />
      Dashboard Page content
    </main>
  );
};

export default Dashboard;
