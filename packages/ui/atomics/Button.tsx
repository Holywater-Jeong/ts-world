import { FC } from 'react';
export const Button: FC<{ onClick: () => void }> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};
