import { Outlet } from "@remix-run/react";

export default function Parent() {
  return (
    <div className="p-10">
      <Outlet />
    </div>
  );
}
