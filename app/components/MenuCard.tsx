import { LucideIcon } from "lucide-react";

interface MenuCardProps {
  title: string;
  icon: LucideIcon;
  onClick?: () => void;
  className?: string;
  href?: string;
  disabled?: boolean;
}

export function MenuCard({ title, icon: Icon, onClick, className = "", href, disabled = false }: MenuCardProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-white w-full bg-menu-item hover:bg-menu-item-hover  rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] ${className}`}
    >
      <a href={disabled ? undefined : href} className="w-full">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-secondary/50 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-foreground font-prompt font-medium text-base">{title}</span>
      </div></a>
    </button>
  );
}