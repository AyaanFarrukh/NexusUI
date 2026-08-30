export const kpiData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    comparison: "from last month",
    icon: "DollarSign",
  },
  {
    title: "Active Users",
    value: "+2,350",
    change: "+180.1%",
    trend: "up" as const,
    comparison: "from last month",
    icon: "Users",
  },
  {
    title: "Orders",
    value: "+12,234",
    change: "+19%",
    trend: "up" as const,
    comparison: "from last month",
    icon: "ShoppingCart",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "-4.5%",
    trend: "down" as const,
    comparison: "from last month",
    icon: "Activity",
  },
] as const;

export const analyticsData = {
  "7d": [
    { name: "Mon", revenue: 4000, users: 2400 },
    { name: "Tue", revenue: 3000, users: 1398 },
    { name: "Wed", revenue: 2000, users: 9800 },
    { name: "Thu", revenue: 2780, users: 3908 },
    { name: "Fri", revenue: 1890, users: 4800 },
    { name: "Sat", revenue: 2390, users: 3800 },
    { name: "Sun", revenue: 3490, users: 4300 },
  ],
  "30d": [
    { name: "Week 1", revenue: 12000, users: 8400 },
    { name: "Week 2", revenue: 14000, users: 9398 },
    { name: "Week 3", revenue: 11000, users: 7800 },
    { name: "Week 4", revenue: 16780, users: 11908 },
  ],
  "90d": [
    { name: "Jan", revenue: 45000, users: 24000 },
    { name: "Feb", revenue: 52000, users: 28000 },
    { name: "Mar", revenue: 48000, users: 26000 },
  ],
  "12m": [
    { name: "Jan", revenue: 4000, users: 2400 },
    { name: "Feb", revenue: 3000, users: 1398 },
    { name: "Mar", revenue: 2000, users: 9800 },
    { name: "Apr", revenue: 2780, users: 3908 },
    { name: "May", revenue: 1890, users: 4800 },
    { name: "Jun", revenue: 2390, users: 3800 },
    { name: "Jul", revenue: 3490, users: 4300 },
    { name: "Aug", revenue: 4000, users: 2400 },
    { name: "Sep", revenue: 3000, users: 1398 },
    { name: "Oct", revenue: 2000, users: 9800 },
    { name: "Nov", revenue: 2780, users: 3908 },
    { name: "Dec", revenue: 1890, users: 4800 },
  ],
};

export const revenueByCategoryData = [
  { name: "SaaS", value: 4500 },
  { name: "E-commerce", value: 3200 },
  { name: "Consulting", value: 2800 },
  { name: "Licensing", value: 1900 },
  { name: "Support", value: 1200 },
];

export const recentActivity = [
  {
    id: 1,
    user: "Sarah Chen",
    action: "purchased",
    target: "Enterprise Plan",
    time: "2 minutes ago",
    avatar: "SC",
  },
  {
    id: 2,
    user: "Marcus Johnson",
    action: "commented on",
    target: "Q3 Marketing Strategy",
    time: "15 minutes ago",
    avatar: "MJ",
  },
  {
    id: 3,
    user: "Elena Rodriguez",
    action: "uploaded",
    target: "3 new files to Project Alpha",
    time: "1 hour ago",
    avatar: "ER",
  },
  {
    id: 4,
    user: "David Kim",
    action: "completed",
    target: "Server Migration Task",
    time: "3 hours ago",
    avatar: "DK",
  },
];

export const topProducts = [
  { id: 1, name: "Wireless Headphones Pro", category: "Electronics", sales: 1234, revenue: "$45,231", growth: "+12%" },
  { id: 2, name: "Ergonomic Office Chair", category: "Furniture", sales: 892, revenue: "$32,100", growth: "+8%" },
  { id: 3, name: "Smart Home Hub", category: "Electronics", sales: 745, revenue: "$28,450", growth: "+15%" },
  { id: 4, name: "Premium Coffee Beans", category: "Food & Bev", sales: 632, revenue: "$12,890", growth: "-2%" },
  { id: 5, name: "Mechanical Keyboard", category: "Electronics", sales: 521, revenue: "$18,235", growth: "+5%" },
];