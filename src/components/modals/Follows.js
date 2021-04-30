import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { BLANK_IMAGE } from "../../constants/others";
import {
  getUserByUserId,
  isUserFollowingProfile,
  toggleFollow,
} from "../../services/firebase";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "400px",
    width: "384px",
    borderRadius: "16px",
    border: "none",
    padding: "0px",
  },
  overlay: {
    backgroundColor: "#00000059",
  },
};

const Follows = ({
  type,
  dispatch,
  profile,
  user: currentUser = {},
  ...rest
}) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers([]);
    const getUsers = async (id) => {
      const res = await getUserByUserId(id);
      const isFollowing = await isUserFollowingProfile(currentUser.userId, id);
      setUsers((prev) => [...prev, { ...res, isFollowing }]);
    };

    if (currentUser.userId && profile) {
      profile[type].map((id) => getUsers(id));
    }
  }, [currentUser.userId, profile, type]);

  const btnHandler = async (isFollowing, userDocId, userUserId, index) => {
    toggleFollow(
      isFollowing,
      currentUser.docId,
      currentUser.userId,
      userDocId,
      userUserId
    );
    setUsers((prev) => {
      const users = prev;
      const isFollowing = users[index].isFollowing;
      users[index].isFollowing = !isFollowing;
      return [...users];
    });
  };

  return (
    <Modal
      {...rest}
      style={customStyles}
      shouldCloseOnOverlayClick
      onRequestClose={() =>
        dispatch({
          modalOpen: false,
        })
      }
    >
      <h3 className="text-center text-lg capitalize font-medium border-b py-2 text-black-light">
        {type}
      </h3>
      {currentUser.userId && users.length > 0 ? (
        users.map((user, i) => (
          <div
            className="flex justify-between items-center m-4"
            key={user.docId}
          >
            <Link
              to={`${user.username}`}
              onClick={() => dispatch({ modalOpen: false })}
            >
              <div className="flex items-center">
                <img
                  alt=""
                  src={
                    user.profileImage
                      ? `/images/avatars/${user.username}.jpg`
                      : BLANK_IMAGE
                  }
                  className="w-10 h-10 rounded-full mr-4"
                />
                {user.username}
              </div>
            </Link>
            <button
              type="submit"
              className="bg-blue-medium font-bold text-sm rounded text-white py-2 w-20 
              text-center outline-none"
              onClick={() =>
                btnHandler(user.isFollowing, user.docId, user.userId, i)
              }
            >
              {user.isFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        ))
      ) : (
        <Skeleton width={360} height={50} count={4} className="m-3" />
      )}
    </Modal>
  );
};

Follows.propTypes = {
  type: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
};

export default Follows;
