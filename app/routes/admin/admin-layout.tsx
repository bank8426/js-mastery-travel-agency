import React from "react";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Outlet } from "react-router";
import { NavItems } from "componets";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      Momile
      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>
      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
