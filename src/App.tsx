/* eslint-disable react-refresh/only-export-components */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { IframePages } from "./Pages/IframesPage";

const queryClient = new QueryClient();

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env["VITE_COGNITO_USER_POOL_ID"] ?? "",
      userPoolClientId:
        import.meta.env["VITE_COGNITO_USER_POOL_CLIENT_ID"] ?? "",
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<IframePages />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
