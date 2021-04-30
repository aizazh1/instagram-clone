import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { memo } from "react";
import { BLANK_IMAGE } from "../../constants/others";

const User = ({ username, fullName, profileImage }) => {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6">
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 mr-3 flex"
          src={profileImage? `/images/avatars/${username}.jpg`: BLANK_IMAGE}
          alt={"Profile Pic"}
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
};

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
  profileImage: PropTypes.bool,
};

export default memo(User);
