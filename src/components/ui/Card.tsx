interface CardProps {
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const AppCard: React.FC<CardProps> = ({
  title,
  icon,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full p-5 rounded-2xl bg-white shadow-md border border-gray-100",
        className
      )}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-3">
          {icon && <span className="text-gray-700">{icon}</span>}
          {title && (
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          )}
        </div>
      )}
      <div className="text-gray-700">{children}</div>
    </div>
  );
};
