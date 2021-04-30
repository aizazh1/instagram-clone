import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header";
import UserProfile from "../components/profile";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const checkUserexists = async () => {
      const doesExist = await getUserByUsername(username);
      if (doesExist.length > 0) {
        setUser(doesExist[0]);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    };
    checkUserexists();
  }, [username, history]);

  return user ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
          <UserProfile user={user}/>
      </div>
    </div>
  ) : null;
};

export default Profile;
