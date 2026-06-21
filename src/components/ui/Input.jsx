export default function Input({
  label,
  type = "text",
  placeholder,
}) {
  return (
    <div className="space-y-2">
      <label className="block font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="
          w-full
          border
          rounded-lg
          px-4
          py-3
          focus:outline-none
          focus:ring-2
          focus:ring-teal-600
        "
      />
    </div>
  );
}