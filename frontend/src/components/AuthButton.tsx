interface AuthButtonProps {
  type: string;
  onClick: () => void; // Add an onClick handler for submission
}

export const AuthButton = ({ type, onClick }: AuthButtonProps) => {
  return (
    <div className="p-2 mt-5">
      <button
        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={onClick} // Call the passed onClick function
      >
        {type === "signup" ? "Sign up" : "Sign in"}
      </button>
    </div>
  );
};
