export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
}) {
  const variants = {
    primary: "bg-teal-700 text-white hover:bg-teal-800",
    secondary: "bg-slate-800 text-white hover:bg-slate-900",
    outline:
      "border border-teal-700 text-teal-700 hover:bg-teal-700 hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-lg font-medium transition ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </button>
  );
}