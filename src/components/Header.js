import { useContext } from "react";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { HomeFilled, Logout } from "../icons";
import { BLANK_IMAGE } from "../constants/others";
import UseUser from "../hooks/use-user";
import Skeleton from "react-loading-skeleton";

const Header = () => {
  const { user: loggedInUser } = useContext(UserContext);
  const { user } = UseUser(loggedInUser?.uid);
  const { firebase } = useContext(FirebaseContext);

  return user?(
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full items-center">
          <div className="text-center flex items-center cursor-pointer">
            <h1 className="text-left w-full">
              <Link to={ROUTES.DASHBOARD}>
                <h1 className="text-4xl logo cursor-pointer">Instagram Clone</h1>
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center">
            {user.username ? (
              <>
                <Link to={ROUTES.DASHBOARD}>
                  <HomeFilled className="w-8 mr-6 text-black-light cursor-pointer" />
                </Link>
                <button
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(e) =>
                    e.key === "Enter" ? firebase.auth().signOut() : null
                  }
                >
                  <Logout className="w-8 mr-6 text-black-light cursor-pointer" />
                </button>
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user?.username}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={user.photoUrl || BLANK_IMAGE}
                      alt={`${user?.username}'s profile`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8">
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button className="text-blue-medium font-bold text-sm rounded w-20 h-8">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  ):<Skeleton width='100%' height={64} className='mb-8'/>;
};

export default Header;
