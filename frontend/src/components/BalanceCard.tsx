export const BalanceCard = () => {
  return (
    <div className="max-w-md shadow-lg border p-2">
      <TopBar />
      <div className="p-10">
        <Balance />
      </div>
    </div>
  );
};

function TopBar() {
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div>Current Balance</div>
          <div>Balance History</div>
        </div>
        <div className="border-b max-w-md"></div>
      </div>
    </div>
  );
}

function Balance() {
  return (
    <div className="flex">
      <div className="text-7xl">$120.56</div>
      <div className="flex flex-col justify-end ml-2 text-gray-500">
        <div>Available</div>
      </div>
    </div>
  );
}
