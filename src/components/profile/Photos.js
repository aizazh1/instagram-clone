import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Post from "../modals/Post";

const Photos = ({ photos, loaded, profile, loggedInUser }) => {
  const [photoIndex, setPhotoIndex] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [photosState, setPhotosState] = useState([]);

  // console.log(photosState);

  useEffect(() => {
    setPhotosState(photos)
  }, [photos])

  const photoClickHandler = (i) => {
    setPhotoIndex(i);
    setModalOpen(true);
    setClicked(true);
  };

  const photoCloseHandler = () => {
    setModalOpen(false);
    setClicked(false);
  };

  return (
    <>
      <div className="h-16 border-t border-gray-primary mt-12 pt-4">
        <div className="grid grid-cols-3 gap-8 mt-4 mb-12">
          {!loaded ? (
            <>
              <Skeleton count={3} width={320} height={400} className="mb-12" />
              <Skeleton count={3} width={320} height={400} className="mb-12" />
              <Skeleton count={3} width={320} height={400} className="mb-12" />
            </>
          ) : photos.length > 0 ? (
            photos.map((photo, i) => (
              <div
                key={photo.docId}
                className="relative group cursor-pointer"
                onClick={() => photoClickHandler(i)}
              >
                <img src={photo.imageSrc} alt={photo.caption} />
                <div
                  className="absolute bottom-0 left-0 z-10 w-full justify-evenly 
              items-center h-full bg-black-faded group-hover:flex hidden"
                  style={{ display: clicked ? "none" : "" }}
                >
                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.likes.length}
                  </p>
                  <p className="flex items-center text-white font-bold">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-8 mr-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {photo.comments.length}
                  </p>
                </div>
              </div>
            ))
          ) : null}
        </div>

        {!loaded ||
          (photos.length === 0 && (
            <p className="text-center text-2xl">No Posts Yet</p>
          ))}
      </div>

      <Post
        isOpen={modalOpen}
        photoState={photosState}
        setPhotoState={setPhotosState}
        photoIndex={photoIndex}
        setModalClose={photoCloseHandler}
        profile={profile}
        loggedInUser={loggedInUser}
      />
    </>
  );
};

Photos.propTypes = {
  photos: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired, 
};

export default Photos;
