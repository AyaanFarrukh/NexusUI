import { UsersTable } from "@/components/users/users-table";

export default function UsersPage() {
  return (
    <div className="space-y-6 min-w-0">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Users</h1>
        <p className="text-muted-foreground">
          Manage your team members, their roles, and account permissions.
        </p>
      </div>
      <UsersTable />
    </div>
  );
}