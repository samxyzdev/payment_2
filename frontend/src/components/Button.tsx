export const Button = ({ type }: { type: "send" | "receive" }) => {
  return (
    <div>
      <div>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {type === "send" ? "Send" : "Receive"}
        </button>
      </div>
    </div>
  );
};
