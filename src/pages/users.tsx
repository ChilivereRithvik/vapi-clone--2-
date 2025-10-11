"use client";

import { DashboardLayout } from "@/components/dashboard-layout";
import { UsersHeader } from "@/components/users-headers";
import { UsersTable } from "@/components/users-table";
import { UsersToolbar } from "@/components/users-toolbar";

export default function UsersPage() {
  return (
    <DashboardLayout padding="p-0" showScrollbar={false}>
      <div className="flex flex-col ">
        <UsersHeader />
        <UsersToolbar />
        {/* <div className="flex-1 min-h-0 overflow-auto"> */}
        <UsersTable />
        {/* </div> */}
      </div>
    </DashboardLayout>
  );
}
