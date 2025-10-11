"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MoreHorizontal,
  Eye,
  Edit,
  MessageSquare,
  Mail,
  Phone,
  Tag,
  FileText,
  Merge,
  Ban,
  Trash2,
  Settings2,
  ArrowUpDown,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  DUMMY_USERS,
  User,
  UserProfileDrawer,
} from "@/pages/user-profile-drawer";
import { BulkActionsBar } from "./bulk-action-bar";
import { ColumnPickerDialog } from "@/pages/column-picker-dialog";
import { CreateUserDialog } from "@/pages/create-user-dialog";

type ColumnKey = keyof User | "actions";
export type ColumnConfig = {
  key: string;
  label: string;
  visible: boolean;
  sortable?: boolean;
};

const DEFAULT_COLUMNS: ColumnConfig[] = [
  { key: "name", label: "Name", visible: true, sortable: true },
  { key: "email", label: "Email", visible: true, sortable: true },
  { key: "phone", label: "Phone", visible: true },
  { key: "city", label: "City", visible: true, sortable: true },
  { key: "country", label: "Country", visible: true, sortable: true },
  { key: "language", label: "Language", visible: true },
  { key: "timezone", label: "Timezone", visible: true },
  { key: "age", label: "Age", visible: true, sortable: true },
  { key: "tags", label: "Tags", visible: true },
  { key: "optIns", label: "Opt-ins", visible: true },
  { key: "lastContact", label: "Last Contact", visible: true, sortable: true },
  { key: "status", label: "Status", visible: true },
  { key: "created", label: "Created", visible: true, sortable: true },
  { key: "owner", label: "Owner", visible: true },
  { key: "id", label: "User ID", visible: false },
  { key: "leadSource", label: "Lead Source", visible: false },
  { key: "score", label: "Score", visible: false, sortable: true },
  { key: "segment", label: "Segment", visible: false },
  { key: "actions", label: "Actions", visible: true },
];

export function UsersTable() {
  const [users] = useState<User[]>(DUMMY_USERS);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [columns, setColumns] = useState<ColumnConfig[]>(DEFAULT_COLUMNS);
  const [density, setDensity] = useState<
    "comfortable" | "compact" | "spacious"
  >("comfortable");
  const [columnPickerOpen, setColumnPickerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const visibleColumns = columns.filter((col) => col.visible);

  const toggleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((u) => u.id)));
    }
  };

  const toggleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleEditUser = (user: User) => {
    setUserToEdit(user);
    setEditDialogOpen(true);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getStatusColor = (status: User["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "Blocked":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      case "Unverified":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
    }
  };

  const densityClasses = {
    comfortable: "h-14",
    compact: "h-10",
    spacious: "h-16",
  };

  return (
    <div className="flex flex-1 h-full flex-col overflow-x-auto">
      <div className="flex flex-1 flex-col h-full overflow-x-auto">
        <div className="flex items-center justify-between border-b bg-background px-6 py-2 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setColumnPickerOpen(true)}
            >
              <Settings2 className="mr-2 h-4 w-4" />
              Columns
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  Density: {density}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setDensity("compact")}>
                  Compact
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDensity("comfortable")}>
                  Comfortable
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDensity("spacious")}>
                  Spacious
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="text-sm text-muted-foreground">
            {users.length} users{" "}
            {selectedUsers.size > 0 && `• ${selectedUsers.size} selected`}
          </div>
        </div>

        {selectedUsers.size > 0 && (
          <BulkActionsBar
            selectedCount={selectedUsers.size}
            onClear={() => setSelectedUsers(new Set())}
          />
        )}

        <div className="flex-1 overflow-auto min-h-0">
          <Table className="min-w-[1600px] w-full">
            <TableHeader className="sticky top-0 z-10 bg-background">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedUsers.size === users.length}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
                {visibleColumns.map((col) => (
                  <TableHead key={col.key} className="whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {col.label}
                      {col.sortable && (
                        <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className={densityClasses[density]}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.has(user.id)}
                      onCheckedChange={() => toggleSelectUser(user.id)}
                      aria-label={`Select ${user.name}`}
                    />
                  </TableCell>
                  {visibleColumns.map((col) => {
                    if (col.key === "name") {
                      return (
                        <TableCell key={col.key}>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {getInitials(user.name)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </TableCell>
                      );
                    }
                    if (col.key === "email") {
                      return (
                        <TableCell
                          key={col.key}
                          className="text-muted-foreground"
                        >
                          {user.email}
                        </TableCell>
                      );
                    }
                    if (col.key === "phone") {
                      return (
                        <TableCell
                          key={col.key}
                          className="text-muted-foreground"
                        >
                          {user.phone}
                        </TableCell>
                      );
                    }
                    if (col.key === "city") {
                      return <TableCell key={col.key}>{user.city}</TableCell>;
                    }
                    if (col.key === "country") {
                      return (
                        <TableCell key={col.key}>{user.country}</TableCell>
                      );
                    }
                    if (col.key === "language") {
                      return (
                        <TableCell key={col.key}>{user.language}</TableCell>
                      );
                    }
                    if (col.key === "timezone") {
                      return (
                        <TableCell
                          key={col.key}
                          className="text-sm text-muted-foreground"
                        >
                          {user.timezone}
                        </TableCell>
                      );
                    }
                    if (col.key === "age") {
                      return <TableCell key={col.key}>{user.age}</TableCell>;
                    }
                    if (col.key === "tags") {
                      return (
                        <TableCell key={col.key}>
                          <div className="flex flex-wrap gap-1">
                            {user.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      );
                    }
                    if (col.key === "optIns") {
                      return (
                        <TableCell key={col.key}>
                          <div className="flex items-center gap-2">
                            <MessageSquare
                              className={`h-4 w-4 ${
                                user.optIns.sms
                                  ? "text-green-600"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                            <Mail
                              className={`h-4 w-4 ${
                                user.optIns.email
                                  ? "text-green-600"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                            <Phone
                              className={`h-4 w-4 ${
                                user.optIns.whatsapp
                                  ? "text-green-600"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          </div>
                        </TableCell>
                      );
                    }
                    if (col.key === "lastContact") {
                      return (
                        <TableCell key={col.key} className="text-sm">
                          <span title={user.lastContact.toLocaleString()}>
                            {formatDistanceToNow(user.lastContact, {
                              addSuffix: true,
                            })}
                          </span>
                        </TableCell>
                      );
                    }
                    if (col.key === "status") {
                      return (
                        <TableCell key={col.key}>
                          <Badge
                            variant="secondary"
                            className={getStatusColor(user.status)}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                      );
                    }
                    if (col.key === "created") {
                      return (
                        <TableCell
                          key={col.key}
                          className="text-sm text-muted-foreground"
                        >
                          {user.created.toLocaleDateString()}
                        </TableCell>
                      );
                    }
                    if (col.key === "owner") {
                      return <TableCell key={col.key}>{user.owner}</TableCell>;
                    }
                    if (col.key === "id") {
                      return (
                        <TableCell
                          key={col.key}
                          className="text-sm text-muted-foreground"
                        >
                          {user.id}
                        </TableCell>
                      );
                    }
                    if (col.key === "leadSource") {
                      return (
                        <TableCell key={col.key}>
                          {user.leadSource || "-"}
                        </TableCell>
                      );
                    }
                    if (col.key === "score") {
                      return (
                        <TableCell key={col.key}>{user.score || "-"}</TableCell>
                      );
                    }
                    if (col.key === "segment") {
                      return (
                        <TableCell key={col.key}>
                          {user.segment || "-"}
                        </TableCell>
                      );
                    }
                    if (col.key === "actions") {
                      return (
                        <TableCell key={col.key}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleViewUser(user)}
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Start Chat
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="mr-2 h-4 w-4" />
                                Place Call
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Tag className="mr-2 h-4 w-4" />
                                Add Tag
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                Add Note
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Merge className="mr-2 h-4 w-4" />
                                Merge
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <Ban className="mr-2 h-4 w-4" />
                                {user.status === "Blocked"
                                  ? "Unblock"
                                  : "Block"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      );
                    }
                    return null;
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <ColumnPickerDialog
        open={columnPickerOpen}
        onOpenChange={setColumnPickerOpen}
        columns={columns}
        onColumnsChange={setColumns}
      />

      <UserProfileDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        user={selectedUser}
      />

      <CreateUserDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        user={
          userToEdit
            ? {
                id: userToEdit.id,
                name: userToEdit.name,
                email: userToEdit.email,
                phone: userToEdit.phone,
                dob: userToEdit.dob,
                language: userToEdit.language,
                country: userToEdit.country,
                city: userToEdit.city,
                timezone: userToEdit.timezone,
                leadSource: userToEdit.leadSource,
                owner: userToEdit.owner,
                tags: userToEdit.tags,
                optIns: userToEdit.optIns,
              }
            : undefined
        }
        mode="edit"
      />
    </div>
  );
}
