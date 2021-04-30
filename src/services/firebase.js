import { FieldValue, firebase } from "../lib/firebase";

export const doesUsernameExist = async (username) => {
  const userNameRes = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return userNameRes.docs.length > 0;
};

export const getUserByUsername = async (username) => {
  const userNameRes = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return userNameRes.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
};

export const getUserByUserId = async (uid) => {
  const res = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", uid)
    .get();

  const user = { ...res.docs[0].data(), docId: res.docs[0].id };

  return user;
};

export const getSuggestedProfiles = async (uid) => {
  const user = await getUserByUserId(uid);

  const following = user.following;

  const res = await firebase
    .firestore()
    .collection("users")
    .where("userId", "not-in", [uid, ...following])
    .limit(10)
    .get();

  return res.docs.map((user) => ({ ...user.data(), docId: user.id }));

  // return res;
};

const updateLoggedInUserFollowing = async (
  loggedInDocId,
  userId,
  isFollowing
) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInDocId)
    .update({
      following: isFollowing
        ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId),
    });
};

const updateFollowedUserFollowers = async (
  docId,
  loggedInUserId,
  isFollowing
) => {
  return firebase
    .firestore()
    .collection("users")
    .doc(docId)
    .update({
      followers: isFollowing
        ? FieldValue.arrayRemove(loggedInUserId)
        : FieldValue.arrayUnion(loggedInUserId),
    });
};

export const toggleFollow=(isFollowing, loggedInDocId, loggedInUserId, profileDocId, profileUserId)=>{
  updateLoggedInUserFollowing(loggedInDocId, profileUserId, isFollowing);
  updateFollowedUserFollowers(profileDocId, loggedInUserId, isFollowing);
}

export const getPhotos = async (userId, following) => {
  const res = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = res.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);
      const { username, profileImage } = user;
      return { username, profileImage, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
};

export const getUserPhotosByUserId = async (id) => {
  const res = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", id)
    .get();

  return res.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));
};

export const isUserFollowingProfile = async (userId, profileId) => {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .where("following", "array-contains", profileId)
    .get();

  const response = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return response.length > 0;
};
