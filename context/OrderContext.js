
import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function useOrderContext() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <OrderContext.Provider value={{ selectedOrder, setSelectedOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
