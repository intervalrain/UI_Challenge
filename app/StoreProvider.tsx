import React, { ReactNode } from 'react';

interface StoreProviderProps {
    children: ReactNode;
}

const StoreProvider: React.FC<StoreProviderProps> = ({ children })  => {
  return (
    <div>{children}</div>
  );
};

export default StoreProvider;