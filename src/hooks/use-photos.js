import { useEffect, useState } from "react";
import { getPhotos } from "../services/firebase";

const usePhotos = (user) => {
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    const getTimelinePhotos = async () => {
      if (user) {
        let followedUserPhotos = [];
        if (user?.following?.length > 0) {
          followedUserPhotos = await getPhotos(user?.userId, user?.following);
          followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
        }
        setPhotos(followedUserPhotos);
      }
    };

    getTimelinePhotos();
  }, [user]);

  return { photos };
};

export default usePhotos;
