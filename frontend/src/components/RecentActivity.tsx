import axios from "axios";
import { useEffect, useState } from "react";

export const RecentActivity = () => {
  return (
    <div>
      <RecentTransaction />
    </div>
  );
};

const tableheading = [
  "Payment Subject",
  "Type",
  "Date",
  "Payment Status",
  "Amount",
];

function RecentTransaction() {
  const [result, setResult] = useState(null); // Changed to null initially as we expect an object
  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/payment/status", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => setResult(response.data))
      .catch((error) => console.error("Error fetching data", error));
  }, [jwtToken]);

  return (
    <div className="shadow-lg">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {tableheading.map((item, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result ? (
              <tr className="bg-white border-b">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {/* Assuming payment subject is fixed or not provided */}
                  Apple MacBook Pro 17"
                </td>
                <td className="px-6 py-4">Payment</td>{" "}
                {/* Assuming "Payment" as the type */}
                <td className="px-6 py-4">
                  {new Date(result.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{result.status}</td>
                <td className="px-6 py-4">{result.amount}</td>
              </tr>
            ) : (
              <tr>
                <td
                  colSpan={tableheading.length}
                  className="px-6 py-4 text-center"
                >
                  No transaction found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
