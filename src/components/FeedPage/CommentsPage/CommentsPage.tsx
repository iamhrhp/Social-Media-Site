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
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useCollectionData } from 'react-firebase-hooks/firestore';

interface IProps {
  email: string;
  postId: string;
  likes?: string;
}

const CommentsPage: FC<IProps> = (props: IProps) => {
  // const [comment, setComment] = useState<string>('');
  // const [comments, setComments] = useState<any[]>([]);
  const [postLikes, setPostLikes] = useState<string>('');
  //   const [commentText, setCommentText] = useState<string>('');
  //   const [comments, setComments] = useState<any[]>([]);

  // console.log('-------', comments);
  const { email, postId, likes } = props;

  const likePost = async () => {
    const postRef = doc(collection(db, 'posts'), postId);
    await updateDoc(postRef, { likes: postLikes + 1 });
    setPostLikes(postLikes + 1);
  };

  //post a comment in firestore

  //   const submitComment = async (event: any) => {
  //     event.preventDefault();
  //     const commentRef = collection(db, 'comments');
  //     await addDoc(commentRef, {
  //       email: email,
  //       comment: comment,
  //       postId: postId,
  //       timestamp: serverTimestamp(),
  //     });
  //     setComment('');
  //   };

  //retrieve all the comments by query sort by

  //   useEffect(() => {
  //     const unsubscribe = onSnapshot(
  //       query(
  //         collection(db, 'comments'),
  //         orderBy('timestamp', 'asc'),
  //         where('post', '==', postId)
  //       ),
  //       (snapshot) => {
  //         setComments(
  //           snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  //         );
  //       }
  //     );
  //     return unsubscribe;
  //   }, []);
  // const commentsCollectionRef = collection(db, 'comments');
  // const submitComment = async (event: any) => {
  //   event.preventDefault();
  //   const newComment = {
  //     comment: comment,
  //     email: email,
  //     postId: postId,
  //     timestamp: new Date(),
  //   };
  //   const docRef = await addDoc(commentsCollectionRef, newComment);
  //   console.log('Comment added with ID: ', docRef.id);
  //   setComment('');
  // };

  // const loadComments = () => {
  //   const commentsQuery = query(
  //     commentsCollectionRef
  //     //   where('postId', '==', postId)
  //   );
  //   return onSnapshot(commentsQuery, (snapshot) => {
  //     const comments: any = [];
  //     snapshot.forEach((doc) => {
  //       console.log('-------doc', doc);
  //       comments.push({ id: doc.id, ...doc.data() });
  //     });
  //     setComments(comments);
  //   });
  // };

  // useEffect(() => {
  //   loadComments();
  // }, []);

  return (
    <>
      <form
      // onSubmit={submitComment}
      >
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
          {/* {comments.map((comment) => {
            return (
              <Box className="m-5" key={comment.id}>
                <Typography className="font-bold ">{comment.email}</Typography>
                <Typography>{comment?.comment}</Typography>
                <Typography className="text-xs">
                  {comment.timestamp?.toDate().toLocaleTimeString('en-US')}
                </Typography>
                <Divider />
              </Box>
            );
          })} */}
        </Box>
        <Box className="w-full flex items-center mt-3">
          <IconButton>
            <Avatar
              alt="Remy Sharp"
              src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
            />
          </IconButton>
          <TextField
            // value={comment}
            // onChange={(event) => setComment(event.target.value)}
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
