import User from "./User";
import Suggestions from "./Suggestions";
import { useContext } from "react";
import LoggedInUserContext from "../../context/logged-in-user";

const Sidebar = () => {
  const user = useContext(LoggedInUserContext) || {};

  return (
    <div className="p-4">
      <User fullName={user?.fullName} username={user?.username} profileImage={user?.profileImage}/>
      <Suggestions userId={user?.userId} docId={user?.docId}/>
    </div>
  );
};

export default Sidebar;
