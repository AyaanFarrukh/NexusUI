import { Avatar } from "@/components/ui/avatar";
import type { ProjectMember } from "@/types/project";

interface TeamAvatarStackProps {
  members: ProjectMember[];
  max?: number;
}

export function TeamAvatarStack({ members, max = 4 }: TeamAvatarStackProps) {
  const visible = members.slice(0, max);
  const remaining = members.length - visible.length;

  return (
    <div className="flex -space-x-2">
      {visible.map((member) => (
        <Avatar
          key={member.id}
          fallback={member.name}
          size="sm"
          className="ring-2 ring-surface"
        />
      ))}
      {remaining > 0 && (
        <span className="grid size-8 place-items-center rounded-full bg-muted text-xs font-medium text-muted-foreground ring-2 ring-surface">
          +{remaining}
        </span>
      )}
    </div>
  );
}