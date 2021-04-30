import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BLANK_IMAGE } from "../../../constants/others";
import { getUserByUsername } from "../../../services/firebase";

const Comment = ({ comment, displayName }) => {
  const [hasImg, setHasImg] = useState(false);
  useEffect(() => {
    if (displayName) {
      const getUserProfileImage = async () => {
        const [{ profileImage }] = await getUserByUsername(displayName);
        setHasImg(profileImage);
      };
      getUserProfileImage();
    }
  }, [displayName]);

  return (
    <div className="flex py-3 px-4 items-start">
      <Link to={`/p/${displayName}`}>
        <img
          src={
            hasImg
              ? `/images/avatars/${displayName}.jpg`
              : BLANK_IMAGE
          }
          alt=""
          className="h-8 w-8 rounded-full"
        />
      </Link>
      <div className="text-sm ml-4 w-11/12">
        <Link to={`/p/${displayName}`}>
          <span className="font-semibold text-sm mr-2">{displayName}</span>
        </Link>
        {comment}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.string,
  displayName: PropTypes.string,
};

export default Comment;
