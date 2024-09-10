import { Button } from "./Button";
import { TopBar } from "./TopBar";

export const BalanceCard = () => {
  return (
    <div className="max-w-md shadow-lg border p-4">
      <TopBar title="Curren Balance" />
      <div className="p-10">
        <Balance />
      </div>
      <div className="flex justify-center">
        <Button type={"send"} />
        <Button type={"receive"} />
      </div>
    </div>
  );
};

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
