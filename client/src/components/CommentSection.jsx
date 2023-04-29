import React, { useState } from "react";
import { Box, Divider, Typography, Avatar, TextField } from '@mui/material';
import { setPost } from "state";

function CommentSection({ comments, name, avatar, postId, token, loggedInUserId, dispatch }) {
  const [newComment, setNewComment] = useState("");

  const postComment = async (commentText) => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: loggedInUserId,
        comment: commentText,
      }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    console.log("Comment posted successfully.");
  };

  return (
    <Box mt="0.5rem">
      {comments?.map(({ comment }, i) => (
        <Box key={`${name}-${i}`}>
          <Divider />
          <Typography sx={{ m: "0.5rem 0", pl: "1rem" }}>
            {comment}
          </Typography>
        </Box>
      ))}
      <Divider />
      {/* Add comment section */}
      <Box sx={{ display: "flex", alignItems: "center", p: "0.5rem" }}>
        <Avatar alt={name} src={avatar} />
        <TextField
          fullWidth
          variant="outlined"
          label="Write a comment..."
          size="small"
          margin="dense"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              postComment(newComment);
              setNewComment("");
            }
          }}
        />
      </Box>
    </Box>
  );
}

export default CommentSection;
