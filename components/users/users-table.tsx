"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/lib/hooks/use-toast";
import { DeleteUserDialog } from "./delete-user-dialog";
import { usersData } from "@/data/users";
import { User, UserRole, UserStatus } from "@/types/user";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type SortColumn = "name" | "registeredAt" | "lastActive";
type SortDirection = "asc" | "desc";

const statusOptions = [
  { value: "all", label: "All statuses" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

const roleOptions = [
  { value: "all", label: "All roles" },
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
  { value: "billing", label: "Billing" },
];

const pageSizeOptions = [
  { value: "10", label: "10 per page" },
  { value: "20", label: "20 per page" },
  { value: "50", label: "50 per page" },
];

const statusBadgeMap: Record<UserStatus, { label: string; variant: "success" | "neutral" | "warning" }> = {
  active: { label: "Active", variant: "success" },
  inactive: { label: "Inactive", variant: "neutral" },
  pending: { label: "Pending", variant: "warning" },
};

const roleBadgeMap: Record<UserRole, string> = {
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
  billing: "Billing",
};

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatRelativeTime(dateString: string): string {
  const now = new Date("2025-03-15T00:00:00Z");
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) return `${Math.max(1, diffMins)}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

function SortHeader({
  label,
  column,
  sortColumn,
  sortDirection,
  onSort,
}: {
  label: string;
  column: SortColumn;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSort: (column: SortColumn) => void;
}) {
  const isActive = sortColumn === column;
  const Icon = isActive ? (sortDirection === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;

  return (
    <button
      onClick={() => onSort(column)}
      className={cn(
        "inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-colors hover:text-foreground",
        isActive ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {label}
      <Icon className="size-3.5" />
    </button>
  );
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-3 w-[150px]" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function UsersTable() {
  const { toast } = useToast();

  // Data state
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  // Sort state
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Delete state
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(usersData);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, roleFilter, pageSize]);

  // Filtered users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower);
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [users, search, statusFilter, roleFilter]);

  // Sorted users
  const sortedUsers = useMemo(() => {
    const sorted = [...filteredUsers].sort((a, b) => {
      let comparison = 0;

      switch (sortColumn) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "registeredAt":
          comparison = new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime();
          break;
        case "lastActive":
          comparison = new Date(a.lastActive).getTime() - new Date(b.lastActive).getTime();
          break;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
    return sorted;
  }, [filteredUsers, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedUsers.length / pageSize);
  const paginatedUsers = sortedUsers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleDelete = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    toast({
      title: "User deleted",
      description: "The user has been permanently removed.",
      variant: "success",
    });
  };

  const router = useRouter();

  const handleView = (user: User) => {
  router.push(`/dashboard/users/${user.id}`);
};

  const handleEdit = (user: User) => {
    toast({
      title: "Edit user",
      description: `Opening editor for ${user.name}... (Buyer integration point)`,
    });
  };

  // Determine which state to show
  const isEmpty = !isLoading && users.length === 0;
  const isNoResults = !isLoading && users.length > 0 && filteredUsers.length === 0;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-xs">
          <Input
            placeholder="Search by name or email..."
            icon={<Search className="size-4" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-[140px]"
          />
          <Select
            options={roleOptions}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-[130px]"
          />
          <Button>
            Add user
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-xl border border-border bg-surface shadow-card overflow-hidden min-w-0">
        {isLoading ? (
          <div className="p-6">
            <TableSkeleton />
          </div>
        ) : isEmpty ? (
          <EmptyState
            icon={<Users className="size-8" />}
            title="No users yet"
            description="Get started by adding your first user to the platform."
            action={<Button>Add user</Button>}
            className="py-16"
          />
        ) : isNoResults ? (
          <EmptyState
            icon={<Search className="size-8" />}
            title="No results found"
            description="Try adjusting your search or filters to find what you're looking for."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("all");
                  setRoleFilter("all");
                }}
              >
                Clear filters
              </Button>
            }
            className="py-16"
          />
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-3 text-left">
                      <SortHeader
                        label="User"
                        column="name"
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left">
                      <SortHeader
                        label="Registered"
                        column="registeredAt"
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="px-6 py-3 text-left">
                      <SortHeader
                        label="Last active"
                        column="lastActive"
                        sortColumn={sortColumn}
                        sortDirection={sortDirection}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="transition-colors hover:bg-muted/30">
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar fallback={user.name} size="sm" />
                          <div>
                            <p className="font-medium text-foreground">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge variant="outline">{roleBadgeMap[user.role]}</Badge>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <Badge variant={statusBadgeMap[user.status].variant}>
                          {statusBadgeMap[user.status].label}
                        </Badge>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                        {formatDate(user.registeredAt)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-muted-foreground">
                        {formatRelativeTime(user.lastActive)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="size-8">
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">Open actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => handleView(user)}>
                              <Eye className="mr-2 size-4" />
                              View profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(user)}>
                              <Pencil className="mr-2 size-4" />
                              Edit user
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-danger-fg focus:text-danger-fg"
                              onClick={() => {
                                setDeleteTarget(user);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="mr-2 size-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex flex-col gap-3 border-t border-border px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {(currentPage - 1) * pageSize + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium text-foreground">
                  {Math.min(currentPage * pageSize, sortedUsers.length)}
                </span>{" "}
                of <span className="font-medium text-foreground">{sortedUsers.length}</span>{" "}
                results
              </p>
              <div className="flex items-center gap-4">
                <Select
                  options={pageSizeOptions}
                  value={String(pageSize)}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                  className="w-[130px]"
                />
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <span className="px-2 text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog
        user={deleteTarget}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </div>
  );
}