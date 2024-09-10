export const TopBar = ({ title }: { title: string }) => {
  return (
    <div>
      <div>
        <div className="flex justify-between">
          <div>{title}</div>
        </div>
        <div className="border-b-2"></div>
      </div>
    </div>
  );
};
