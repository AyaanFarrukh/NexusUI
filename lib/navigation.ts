import {
  LayoutDashboard, BarChart3, Users, FolderKanban, CheckSquare, Calendar, MessageSquare, Bell, FileText, FileBarChart,
  ShoppingBag, ShoppingCart, UserCircle, CreditCard,
  Bot, Plug, Code2, Shapes,
  Settings,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Main",
    items: [
      { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
      { title: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
      { title: "Users", href: "/dashboard/users", icon: Users },
      { title: "Projects", href: "/dashboard/projects", icon: FolderKanban },
      { title: "Tasks", href: "/dashboard/tasks", icon: CheckSquare },
      { title: "Calendar", href: "/dashboard/calendar", icon: Calendar },
      { title: "Messages", href: "/dashboard/messages", icon: MessageSquare },
      { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
      { title: "Files", href: "/dashboard/files", icon: FileText },
      { title: "Reports", href: "/dashboard/reports", icon: FileBarChart },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "Products", href: "/dashboard/products", icon: ShoppingBag },
      { title: "Orders", href: "/dashboard/orders", icon: ShoppingCart },
      { title: "Customers", href: "/dashboard/customers", icon: UserCircle },
      { title: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
    ],
  },
  {
    title: "Tools",
    items: [
      { title: "AI Workspace", href: "/dashboard/ai", icon: Bot },
      { title: "UI Kit", href: "/dashboard/ui-kit", icon: Shapes },
      { title: "Integrations", href: "/dashboard/integrations", icon: Plug },
      { title: "Developer Tools", href: "/dashboard/developer", icon: Code2 },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Settings", href: "/dashboard/settings", icon: Settings },
    ],
  },
];