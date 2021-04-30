import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";
import Skeleton from "react-loading-skeleton";
import { BLANK_IMAGE } from "../../constants/others";

const Header = ({
  photosCount,
  profile,
  followersCount,
  dispatch,
  profileImage,
  loaded,
  user,
}) => {
  const [isFollowingProfile, setIsFollowingProfile] = useState(null);
  const activeBtn = profile.username !== user.username;

  const handleToggleFollow = () => {
    setIsFollowingProfile((prev) => !prev);
    dispatch({
      followersCount: isFollowingProfile
        ? followersCount - 1
        : followersCount + 1,
    });
    toggleFollow(
      isFollowingProfile,
      user.docId,
      user.userId,
      profile.docId,
      profile.userId
    );
  };

  useEffect(() => {
    const handleIsFollowing = async () => {
      const isFollowing = await isUserFollowingProfile(
        user.userId,
        profile.userId
      );
      setIsFollowingProfile(isFollowing);
    };
    if (user?.userId && profile?.userId) {
      handleIsFollowing();
    }
  }, [profile?.userId, user?.userId]);

  const followingHandler = () => {
    if (profile.following.length !== 0) {
      dispatch({
        modalOpen: true,
        type: "following",
      });
    }
  };

  const followersHandler = () => {
    if (followersCount !== 0) {
      dispatch({
        modalOpen: true,
        type: "followers",
      });
    }
  };

  return loaded ? (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        <img
          className="rounded-full h-40 w-40 flex"
          alt={`${profile.username}'s profile pic`}
          src={
            profileImage
              ? `/images/avatars/${profile.username}.jpg`
              : BLANK_IMAGE
          }
        />
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4 text-black-light">{profile.username}</p>
          {user && activeBtn && isFollowingProfile !== null ? (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? "Unfollow" : "Follow"}
            </button>
          ) : null}
        </div>
        <div className="container flex mt-4">
          <p className="mr-10 text-black-light">
            <span className="font-bold">{photosCount}</span> posts
          </p>
          <p
            className={`mr-10 text-black-light ${
              followersCount !== 0 && "cursor-pointer"
            }`}
            onClick={followersHandler}
          >
            <span className="font-bold">{followersCount}</span>
            {followersCount === 1 ? " follower" : " followers"}
          </p>
          <p
            className={`mr-10 text-black-light ${
              profile.following.length !== 0 && "cursor-pointer"
            }`}
            onClick={followingHandler}
          >
            <span className="font-bold">{profile.following.length}</span>{" "}
            following
          </p>
        </div>
        <div className="container mt-4">
          <p className="font-medium text-black-light">{profile.fullName}</p>
        </div>
      </div>
    </div>
  ) : (
    <Skeleton height={160} />
  );
};

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followersCount: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  profileImage: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    docId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }).isRequired,
};

export default Header;
