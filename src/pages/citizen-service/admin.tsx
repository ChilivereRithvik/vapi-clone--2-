"use client";

import { useState } from "react";
import {
  BarChart3,
  Phone,
  Users,
  FileText,
  Calendar,
  TrendingUp,
  Settings,
  Menu,
  Search,
  Bell,
  User,
  Plus,
  Edit,
  Trash2,
  Download,
  Upload,
  AlertCircle,
  CheckCircle,
  Shield,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard-layout";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3, current: false },
  { name: "Call Logs", href: "/call-logs", icon: Phone, current: false },
  { name: "Eligibility", href: "/eligibility", icon: FileText, current: false },
  { name: "Schemes", href: "/schemes", icon: Users, current: false },
  { name: "Follow-ups", href: "/follow-ups", icon: Calendar, current: false },
  { name: "Analytics", href: "/analytics", icon: TrendingUp, current: false },
  { name: "Admin", href: "/admin", icon: Settings, current: true },
];

const adminUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gov.in",
    role: "Super Admin",
    status: "Active",
    lastLogin: "2024-01-15 10:30",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@gov.in",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-15 09:15",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@gov.in",
    role: "Agent",
    status: "Inactive",
    lastLogin: "2024-01-14 16:45",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@gov.in",
    role: "Supervisor",
    status: "Active",
    lastLogin: "2024-01-15 08:20",
  },
];

const auditLogs = [
  {
    id: 1,
    user: "John Doe",
    action: "Updated scheme eligibility",
    resource: "PM-KISAN",
    timestamp: "2024-01-15 10:30",
    status: "Success",
  },
  {
    id: 2,
    user: "Jane Smith",
    action: "Created new user",
    resource: "User Management",
    timestamp: "2024-01-15 09:15",
    status: "Success",
  },
  {
    id: 3,
    user: "Mike Johnson",
    action: "Failed login attempt",
    resource: "Authentication",
    timestamp: "2024-01-15 08:45",
    status: "Failed",
  },
  {
    id: 4,
    user: "Sarah Wilson",
    action: "Exported call logs",
    resource: "Call Logs",
    timestamp: "2024-01-15 08:20",
    status: "Success",
  },
];

const systemHealth = [
  {
    service: "API Gateway",
    status: "Healthy",
    uptime: "99.9%",
    lastCheck: "2 mins ago",
  },
  {
    service: "Database",
    status: "Healthy",
    uptime: "99.8%",
    lastCheck: "1 min ago",
  },
  {
    service: "Call Processing",
    status: "Warning",
    uptime: "98.5%",
    lastCheck: "3 mins ago",
  },
  {
    service: "Eligibility Engine",
    status: "Healthy",
    uptime: "99.7%",
    lastCheck: "1 min ago",
  },
];

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  const filteredUsers = adminUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout>
      <div className="flex h-screen bg-background">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Page Content */}
          <main className="flex-1 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold  text-foreground mb-2">
                    System Administration
                  </h1>
                  <p className="text-muted-foreground">
                    Manage users, settings, and system configuration
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="users" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger
                    value="users"
                    className="flex items-center gap-2"
                  >
                    <Users className="h-4 w-4" />
                    Users
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="flex items-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="flex items-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="monitoring"
                    className="flex items-center gap-2"
                  >
                    <Activity className="h-4 w-4" />
                    Monitoring
                  </TabsTrigger>
                  <TabsTrigger
                    value="audit"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Audit Logs
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="users" className="space-y-6">
                  <Card className="rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        User Management
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4">
                        <div className="relative flex-1">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                        <Select
                          value={selectedRole}
                          onValueChange={setSelectedRole}
                        >
                          <SelectTrigger className="w-48">
                            <SelectValue placeholder="Filter by role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="Super Admin">
                              Super Admin
                            </SelectItem>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Supervisor">
                              Supervisor
                            </SelectItem>
                            <SelectItem value="Agent">Agent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Login</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell className="font-medium">
                                {user.name}
                              </TableCell>
                              <TableCell>{user.email}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{user.role}</Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    user.status === "Active"
                                      ? "default"
                                      : "secondary"
                                  }
                                >
                                  {user.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {user.lastLogin}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle>System Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auto-assign">Auto-assign calls</Label>
                          <Switch id="auto-assign" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-notifications">
                            SMS notifications
                          </Label>
                          <Switch id="sms-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-alerts">Email alerts</Label>
                          <Switch id="email-alerts" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="session-timeout">
                            Session timeout (minutes)
                          </Label>
                          <Input
                            id="session-timeout"
                            type="number"
                            defaultValue="30"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle>Integration Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="api-endpoint">API Endpoint</Label>
                          <Input
                            id="api-endpoint"
                            defaultValue="https://api.gov.in/v1"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="webhook-url">Webhook URL</Label>
                          <Input
                            id="webhook-url"
                            placeholder="https://your-webhook.com"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="debug-mode">Debug mode</Label>
                          <Switch id="debug-mode" />
                        </div>
                        <Button className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Test Connection
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle>Security Policies</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="two-factor">Require 2FA</Label>
                          <Switch id="two-factor" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password-expiry">
                            Password expiry (days)
                          </Label>
                          <Input
                            id="password-expiry"
                            type="number"
                            defaultValue="90"
                            className="w-20"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="max-attempts">
                            Max login attempts
                          </Label>
                          <Input
                            id="max-attempts"
                            type="number"
                            defaultValue="5"
                            className="w-20"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="ip-whitelist">
                            IP whitelist enabled
                          </Label>
                          <Switch id="ip-whitelist" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="rounded-2xl">
                      <CardHeader>
                        <CardTitle>Data Protection</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="data-encryption">
                            Data encryption
                          </Label>
                          <Switch id="data-encryption" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="audit-logging">Audit logging</Label>
                          <Switch id="audit-logging" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="data-retention">
                            Data retention (days)
                          </Label>
                          <Input
                            id="data-retention"
                            type="number"
                            defaultValue="365"
                            className="w-24"
                          />
                        </div>
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          Run Security Scan
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="monitoring" className="space-y-6">
                  <Card className="rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        System Health
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Uptime</TableHead>
                            <TableHead>Last Check</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {systemHealth.map((service, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {service.service}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {service.status === "Healthy" ? (
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                  ) : service.status === "Warning" ? (
                                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                                  ) : (
                                    <AlertCircle className="h-4 w-4 text-red-500" />
                                  )}
                                  <Badge
                                    variant={
                                      service.status === "Healthy"
                                        ? "default"
                                        : service.status === "Warning"
                                        ? "secondary"
                                        : "destructive"
                                    }
                                  >
                                    {service.status}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell>{service.uptime}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {service.lastCheck}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="audit" className="space-y-6">
                  <Card className="rounded-2xl">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Audit Logs
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Action</TableHead>
                            <TableHead>Resource</TableHead>
                            <TableHead>Timestamp</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {auditLogs.map((log) => (
                            <TableRow key={log.id}>
                              <TableCell className="font-medium">
                                {log.user}
                              </TableCell>
                              <TableCell>{log.action}</TableCell>
                              <TableCell>{log.resource}</TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {log.timestamp}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    log.status === "Success"
                                      ? "default"
                                      : "destructive"
                                  }
                                >
                                  {log.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}
