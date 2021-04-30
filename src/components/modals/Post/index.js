import PropTypes from "prop-types";
import Modal from "react-modal";
import Skeleton from "react-loading-skeleton";
import { formatDistance } from "date-fns";
import Comment from "./Comment";
import Actions from "../../post/Actions";
import AddComment from "../../post/AddComment";
import { useEffect, useRef, useState } from "react";
import { BLANK_IMAGE } from "../../../constants/others";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "600px",
    width: "900px",
    borderRadius: "0",
    border: "none",
    padding: "0px",
    position: "relative",
  },
  overlay: {
    backgroundColor: "#00000059",
  },
};

const Post = ({
  isOpen,
  photoState,
  setPhotoState,
  photoIndex,
  setModalClose,
  profile,
  loggedInUser,
}) => {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  const [comments, setComments] = useState();
  const [likedPhoto, setLikedPhoto] = useState(false);
  const [post, setPost] = useState();
  const [, setUpdate] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setPost(null);
    } else {
      const thisPost = photoState[photoIndex];
      if (thisPost) {
        setPost(thisPost);
        setComments(thisPost.comments);
        setLikedPhoto(thisPost.likes.includes(loggedInUser.userId));
      }
    }
  }, [isOpen, loggedInUser.userId, photoIndex, photoState]);

  const photoLikedHandler = () => {
    if (post) {
      const currPhoto = post;
      if (!likedPhoto) {
        currPhoto.likes.push(loggedInUser.userId);
      } else {
        const ind = currPhoto.likes.indexOf(loggedInUser.userId);
        currPhoto.likes.splice(ind, 1);
      }
      setPhotoState((prevState) => {
        const allPhotos = prevState;
        allPhotos[photoIndex] = currPhoto;
        return allPhotos;
      });
    }
  };

  const addCommentHandler = (comment) => {
    const currPhoto = post;
    currPhoto.comments.push({
      displayName: loggedInUser.username,
      comment: comment,
    });
    setUpdate((prev) => !prev);
    setPhotoState((prevState) => {
      const allPhotos = prevState;
      allPhotos[photoIndex] = currPhoto;
      return allPhotos;
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      shouldCloseOnOverlayClick
      onRequestClose={setModalClose}
    >
      {post ? (
        <div className="flex">
          <img src={post.imageSrc} alt="" style={{ height: 600 }} />
          <div className="flex flex-col flex-1">
            <div className="flex py-3 px-4 mb-3 items-center border-b border-gray-200">
              <img
                src={
                  profile.profileImage
                    ? `/images/avatars/${profile.username}.jpg`
                    : BLANK_IMAGE
                }
                alt=""
                className="h-8 w-8 rounded-full"
              />
              <div className="text-sm ml-4 w-11/12">
                <span className="font-semibold text-sm mr-2">
                  {profile.username}
                </span>
              </div>
            </div>
            <div className="overflow-y-auto" style={{ height: 340 }}>
              <Comment comment={post?.caption} displayName={profile.username} />
              {comments?.map((comment, i) => (
                <Comment
                  comment={comment.comment}
                  displayName={comment.displayName}
                  key={i}
                />
              ))}
            </div>
            <div className="items-center">
              <Actions
                docId={post.docId}
                totalLikes={post.likes.length}
                likedPhoto={likedPhoto}
                handleFocus={handleFocus}
                fromModal
                photoLikedHandler={photoLikedHandler}
              />
              <p className="text-gray-base text-xs px-4 py-1">
                {formatDistance(post.dateCreated, new Date())} ago
              </p>
              <div className="pt-3">
                <AddComment
                  docId={post.docId}
                  comments={comments || []}
                  setComments={setComments}
                  commentInput={commentInput}
                  isProfile
                  addCommentHandler={addCommentHandler}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton
          width={600}
          height={600}
          className="absolute"
          style={{ borderRadius: 0 }}
        />
      )}
    </Modal>
  );
};

Post.propTypes = {
  isOpen: PropTypes.bool,
  photoState: PropTypes.object,
  setPhotoState: PropTypes.func,
  photoIndex: PropTypes.number,
  setModalClose: PropTypes.func,
  profile: PropTypes.object,
  loggedInUser: PropTypes.object,
};

export default Post;
