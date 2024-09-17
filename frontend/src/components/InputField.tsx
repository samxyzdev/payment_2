interface InputFieldProps {
  title: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
  type?: string; // Allow passing type (e.g., text, password)
}

export const InputField = ({
  title,
  placeholder,
  onChange,
  type = "text", // Default type is "text"
}: InputFieldProps) => {
  return (
    <div className="p-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {title}
      </label>
      <input
        onChange={onChange}
        type={type} // Use dynamic input type
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
};
