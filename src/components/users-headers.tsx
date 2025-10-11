"use client";

import { Button } from "@/components/ui/button";
import { CreateUserDialog } from "@/pages/create-user-dialog";
import { ImportUsersDialog } from "@/pages/import-user-dialog";
import { DUMMY_USERS } from "@/pages/user-profile-drawer";
import { Plus, Upload, Download } from "lucide-react";
import { useState } from "react";

export function UsersHeader() {
  const [createOpen, setCreateOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);

  const handleExport = () => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "City",
      "Country",
      "Language",
      "Timezone",
      "DOB",
      "Age",
      "Tags",
      "SMS Opt-in",
      "Email Opt-in",
      "WhatsApp Opt-in",
      "Last Contact",
      "Status",
      "Created",
      "Owner",
      "Lead Source",
      "Score",
    ];

    const csvRows = [
      headers.join(","),
      ...DUMMY_USERS.map((user) =>
        [
          user.id,
          `"${user.name}"`,
          user.email,
          user.phone,
          user.city,
          user.country,
          user.language,
          user.timezone,
          user.dob,
          user.age,
          `"${user.tags.join("; ")}"`,
          user.optIns.sms,
          user.optIns.email,
          user.optIns.whatsapp,
          user.lastContact.toISOString(),
          user.status,
          user.created.toISOString(),
          user.owner,
          user.leadSource || "",
          user.score || "",
        ].join(",")
      ),
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-export-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex items-center justify-start  gap-3 border-b bg-background px-6 py-4 flex-shrink-0">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className=" h-4 w-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setImportOpen(true)}
          >
            <Upload className=" h-4 w-4" />
            Import CSV
          </Button>
          <Button size="sm" onClick={() => setCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            New User
          </Button>
        </div>
      </div>
      <CreateUserDialog open={createOpen} onOpenChange={setCreateOpen} />
      <ImportUsersDialog open={importOpen} onOpenChange={setImportOpen} />
    </>
  );
}
