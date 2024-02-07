import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const [loading, setLoading] = useState(true);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("Error fetching user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile, userId, token]); // Add dependencies

  return (
    <>
      {loading ? (
        <p>Loading...</p> // Display a loading indicator
      ) : (
        posts?.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
            createdAt,
          }) => (
            <PostWidget
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              comments={comments}
              createdAt={createdAt}
            />
          )
        )
      )}
    </>
  );
};

export default PostsWidget;
