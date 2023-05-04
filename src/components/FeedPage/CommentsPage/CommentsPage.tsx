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
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';

interface IProps {
  email: string;
}

const CommentsPage: FC<IProps> = (props: IProps) => {
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<any[]>([]);

  const { email } = props;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    await addDoc(collection(db, 'comments'), {
      email: email,
      text: comment,
      timestamp: serverTimestamp(),
    });

    setComment('');
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'comments'), orderBy('timestamp', 'asc')),
      (snapshot) => {
        setComments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      }
    );
    return unsubscribe;
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box className="flex items-center justify-around my-3">
          <Box className="flex  items-center">
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <Typography>120K Likes</Typography>
          </Box>
          <Box className="flex  items-center">
            <IconButton>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <Typography>Comments</Typography>
          </Box>
        </Box>
        <Box>
          {comments.map((comment) => (
            <Box className="m-5" key={comment.id}>
              <Typography className="font-bold ">{comment.email}</Typography>
              <Typography>{comment.text}</Typography>
              <Typography className="text-xs">
                {comment.timestamp?.toDate().toLocaleTimeString('en-US')}
              </Typography>
              <Divider />
            </Box>
          ))}
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
