import { FC, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Avatar,
  Button,
  Divider,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

interface IProps {
  email: string;
  postId: string;
  likes?: string;
}

const CommentsPage: FC<IProps> = (props: IProps) => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);
  const [postLikes, setPostLikes] = useState<string>('');

  // console.log('-------', comments);
  const { email, postId, likes } = props;

  const likePost = async () => {
    const postRef = doc(collection(db, 'posts'), postId);
    await updateDoc(postRef, { likes: postLikes + 1 });
    setPostLikes(postLikes + 1);
  };

  //post a comment in firestore

  const submitComment = async (event: any) => {
    event.preventDefault();
    const commentRef = collection(db, 'comments');
    await addDoc(commentRef, {
      email: email,
      comment: comment,
      postId: postId,
      timestamp: serverTimestamp(),
    });
    setComment('');
  };

  // retrieve all the comments by query sort by

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'comments'),
        orderBy('timestamp', 'asc')
        // where('post', '==', postId)
      ),
      (snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    );
    return unsubscribe;
  }, []);

  console.log(comments);
  return (
    <>
      <form onSubmit={submitComment}>
        <Box className="flex items-center justify-around my-3">
          <Box className="flex  items-center">
            <IconButton onClick={likePost}>
              <FavoriteBorderIcon />
            </IconButton>
            <Typography>{likes ? likes : postLikes} likes</Typography>
          </Box>
          <Box className="flex  items-center">
            <IconButton>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography>Comments</Typography>
          </Box>
        </Box>
        <Box>
          {comments.map((comment) => {
            return (
              <Box className="m-5" key={comment.id}>
                <Typography className="font-bold ">{comment.email}</Typography>
                <Typography>{comment.comment}</Typography>
                <Typography className="text-xs">
                  {comment.timestamp?.toDate().toLocaleTimeString('en-US')}
                </Typography>
                <Divider />
              </Box>
            );
          })}
        </Box>
        <Box className="w-full flex items-center mt-3">
          <IconButton>
            <Avatar
              alt="Remy Sharp"
              src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
            />
          </IconButton>
          <TextField
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            label="Write your comments....."
            className="w-full"
          />
          <Button type="submit" variant="outlined" className="mx-5">
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CommentsPage;
