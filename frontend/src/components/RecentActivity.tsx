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

const tableData = ["Laptop", "2023-09-01", "Completed", "$2999"];

function RecentTransaction() {
  return (
    <div className="shadow-lg">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              {tableheading.map((item) => (
                <th scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17"
              </th>
              {tableData.map((item) => (
                <td className="px-6 py-4">{item}</td>
              ))}
            </tr>
            <tr className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Microsoft Surface Pro
              </th>
              {tableData.map((item) => (
                <td className="px-6 py-4">{item}</td>
              ))}
            </tr>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Magic Mouse 2
              </th>
              {tableData.map((item) => (
                <td className="px-6 py-4">{item}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
