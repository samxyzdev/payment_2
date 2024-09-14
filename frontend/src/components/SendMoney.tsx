interface InputFieldSchema {
  title: string;
  placeholder: string;
}

export const SendMoney = () => {
  return (
    <div>
      <div className="shadow-lg p-4 rounded-sm">
        <div className="font-bold text-2xl">Transfer Money</div>
        <InputField title="To" placeholder="Enter receiver Id" />
        <InputField title="Amount" placeholder="Enter Amount" />
        <div className="flex justify-center">
          <button className="p-4 mt-2 rounded-lg bg-gray-200 font-semibold">
            Send Money
          </button>
        </div>
      </div>
    </div>
  );
};

function InputField({ title, placeholder }: InputFieldSchema) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {title}
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
