import { Link } from "react-router-dom";
import { BLANK_IMAGE } from "../../constants/others";
import PropTypes from "prop-types";

const header = ({ username, profileImage }) => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 mr-3 flex"
            src={profileImage ? `/images/avatars/${username}.jpg` : BLANK_IMAGE}
            alt={`${username} Profile Pic`}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
};

Headers.propTypes = {
  username: PropTypes.string.isRequired,
  profileImage: PropTypes.bool.isRequired,
};

export default header;
