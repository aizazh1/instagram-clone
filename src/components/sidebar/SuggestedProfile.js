import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BLANK_IMAGE } from "../../constants/others";
import { toggleFollow } from "../../services/firebase";

const SuggestedProfile = ({
  profile: { username, profileImage, docId, userId },
  loggedInUserId,
  loggedInDocId,
}) => {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);
    
    toggleFollow(false, loggedInDocId, loggedInUserId, docId, userId);
  };

  return !followed ? (
    <div className="flex items-center justify-between">
      <div className="flex items-center justify-between">
        <img
          src={profileImage ? `/images/avatars/${username}.jpg` : BLANK_IMAGE}
          alt=""
          className="rounded-full w-8 flex mr-3"
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>
      <button
        className="text-xs font-bold text-blue-medium"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
};

SuggestedProfile.propTypes = {
  profile: PropTypes.shape({
    username: PropTypes.string.isRequired,
    profileImage: PropTypes.bool.isRequired,
    docId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }),
  loggedInDocId: PropTypes.string.isRequired,
  loggedInUserId: PropTypes.string.isRequired,
};

export default SuggestedProfile;
