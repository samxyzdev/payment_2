import axios from "axios";
import { useState } from "react";

export const AddMoney = () => {
  const [amount, setAmount] = useState<number>(0);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
    // e.target.value always string in HTML input tag
    setAmount(parseInt(e.target.value) || 0);
  }

  async function handleOnClick(): Promise<void> {
    const jwtToken = localStorage.getItem("token");
    if (!jwtToken) {
      console.error("No token found");
      return;
    }
    const payload = {
      amount: amount,
      provider: "HDFC",
    };
    const dataFromBackend = await axios.post(
      "http://localhost:3000/api/v1/payment/onramp",
      payload,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    console.log(dataFromBackend.data);
  }

  return (
    <div>
      <div className="shadow-lg p-12 rounded-sm">
        <div className="text-2xl font-bold">Add Money</div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Amount
        </label>
        <input
          onChange={handleOnChange}
          type="number"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Enter Amount"
          required
        />
        <div className="flex justify-center">
          <button
            className="p-4 mt-2 rounded-lg bg-gray-200 font-semibold"
            onClick={handleOnClick}
          >
            Add Money
          </button>
        </div>
      </div>
    </div>
  );
};
