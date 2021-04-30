import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import IsUserLoggedIn from "./helpers/isUserLoggedIn";
import ProtectedRoute from "./helpers/ProtectedRoute";
import UseAuthListener from "./hooks/use-auth-listener";

const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const NotFound = lazy(() => import("./pages/not-found"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));

function App() {
  const { user } = UseAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<></>}>
          <Switch>
            <IsUserLoggedIn user={user} path={ROUTES.LOGIN} exact>
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn user={user} path={ROUTES.SIGN_UP} exact>
              <Signup />
            </IsUserLoggedIn>
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
