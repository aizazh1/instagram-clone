import { useEffect } from "react";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/sidebar";
import UseUser from "../hooks/use-user";
import PropTypes from "prop-types";
import LoggedInUserContext from "../context/logged-in-user";

const Dashboard = ({ user: loggedInUser }) => {
  const { user } = UseUser(loggedInUser.uid);
  useEffect(() => {
    document.title = "Instagram";
  }, []);

  return (
    <LoggedInUserContext.Provider value={user}>
      <div className="bg-gray-background">
        <Header />
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
          <Timeline />
          <Sidebar />
        </div>
      </div>
    </LoggedInUserContext.Provider>
  );
};

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Dashboard;
