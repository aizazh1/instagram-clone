import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import usePhotos from "../hooks/use-photos";
import Post from "./post";
import LoggedInUserContext from "../context/logged-in-user";

const Timeline = () => {
  const user = useContext(LoggedInUserContext);
  const { photos } = usePhotos(user);
  
  return (
    <div className="container col-span-2">
      {!photos ? (
        <>
          <Skeleton count={4} width={640} height={500} className="mb-5" />
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => <Post content={content} key={content.docId} />)
      ) : (
        <p className="text-center text-2xl">Follow people to see photos!</p>
      )}
    </div>
  );
};

export default Timeline;
