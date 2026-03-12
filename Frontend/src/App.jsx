import { router } from "./app.routes";
import { RouterProvider } from "react-router";
import "./Features/shared/style/global.scss";
import { AuthProvider } from "./features/auth/auth.context";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
