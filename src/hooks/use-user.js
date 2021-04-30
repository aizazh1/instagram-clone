import { useEffect, useState } from "react";
import { getUserByUserId } from "../services/firebase";

const UseUser = (userId) => {
  const [activeUser, setActiveUser] = useState();

  useEffect(() => {
    const getUserObjByUserId = async (userId) => {
      const user = await getUserByUserId(userId);
      setActiveUser(user || {});
    };
    if (userId) {
      getUserObjByUserId(userId);
    } else {
      setActiveUser(undefined);
    }
  }, [userId]);

  return { user: activeUser };
};

export default UseUser;
