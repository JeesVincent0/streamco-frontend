"use client";

import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const store = makeStore();

const persistor = persistStore(store);

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
