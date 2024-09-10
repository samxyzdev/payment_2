import { Button } from "./Button";
import { TopBar } from "./TopBar";

export const Transaction = () => {
  return (
    <div className="border shadow-lg p-4">
      <TopBar title="Send Money" />
      <div className="p-20">
        <Transfer />
        <div className="flex justify-center pt-4">
          <Button type="send" />
        </div>
      </div>
    </div>
  );
};

function Transfer() {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 ">
          Email Id
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="John"
          required
        />
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Amount
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="John"
          required
        />
      </div>
    </div>
  );
}
