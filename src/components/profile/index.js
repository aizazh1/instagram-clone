import PropTypes from "prop-types";
import { useContext, useEffect, useReducer } from "react";
import UserContext from "../../context/user";
import UseUser from "../../hooks/use-user";
import { getUserPhotosByUserId } from "../../services/firebase";
import Follows from "../modals/Follows";
import Header from "./Header";
import Photos from "./Photos";

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  photosCollection: [],
  followersCount: 0,
  loaded: false,
  modalOpen: false,
  type: "followers",
};

const UserProfile = ({ user }) => {
  const { user: loggedInUser } = useContext(UserContext);
  const { user: currentUser = {} } = UseUser(loggedInUser?.uid);

  const [
    { photosCollection, followersCount, loaded, modalOpen, type },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    const getProfileInfoAndPhotos = async () => {
      const photos = await getUserPhotosByUserId(user.userId);
      dispatch({
        photosCollection: photos,
        followersCount: user.followers.length,
        loaded: true,
      });
    };
    getProfileInfoAndPhotos();
  }, [user]);

  return (
    <div>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={user}
        followersCount={followersCount}
        dispatch={dispatch}
        profileImage={user.profileImage}
        loaded={loaded}
        user={currentUser}
      />
      <Photos
        photos={photosCollection}
        loaded={loaded}
        profile={user}
        loggedInUser={currentUser}
      />
      <Follows
        isOpen={modalOpen}
        type={type}
        dispatch={dispatch}
        profile={user}
        user={currentUser}
      />
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    dateCreated: PropTypes.number.isRequired,
    profileImage: PropTypes.bool.isRequired,
  }),
};

export default UserProfile;
