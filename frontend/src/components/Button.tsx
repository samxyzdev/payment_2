export const Button = ({
  name,
  onClick,
}: {
  name: string;
  onClick?: () => void;
}) => {
  return (
    <div>
      <button onClick={onClick}>{name}</button>
    </div>
  );
};
