export const AuthButton = () => {
  return (
    <div className="p-2 round bg-gray-400 rounded-full mt-5">
      <div className="flex justify-center">
        <button>{true === "true" ? "Sign up" : "Sign in"}</button>
      </div>
    </div>
  );
};
