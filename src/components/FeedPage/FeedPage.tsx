import {
  Box,
  CardMedia,
  TextField,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { app, db, storage } from '../../firebase/firebaseConfig';
import { useForm } from 'react-hook-form';
import { ref, uploadBytes } from 'firebase/storage';
import { useLocation } from 'react-router-dom';
import CommentsPage from './CommentsPage/CommentsPage';
import SidebarPage from './SideBarPage/SidebarPage';

interface IProps {}

const FeedPage: FC<IProps> = (props: IProps) => {
  const [file, setFile] = useState<string>('');
  const [posts, setPosts] = useState<any[]>([]);
  const [postid, setPostId] = useState<string>('');

  // console.log('------', typeof postid);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { state: email } = useLocation();

  const handleImagePreview = (e: any) => {
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  //create post in firestore and store image in firebase storage
  const handlePost = async (data: any) => {
    try {
      const fileRef = ref(storage, `images/${data.image[0].name}`);
      await uploadBytes(fileRef, data.image[0]);

      const post = {
        userName: email,
        title: data.title,
        tags: data.tags.split(' ').map((tag: any) => ({ name: tag })),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
          app.options.storageBucket
        }/o/images%2F${encodeURIComponent(data.image[0].name)}?alt=media`,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'posts'), post);

      setValue('title', '');
      setValue('tags', '');
      setValue('image', '');
      // console.log('----------', data);
    } catch (e) {
      alert(e);
    }
  };

  //get Post onSnapshot order by created time desc
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, 'posts'), orderBy('createdAt', 'desc')),
      (snapshot) => {
        const newPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(newPosts);
      }
    );
    return () => unsubscribe();
  }, []);

  // console.log(posts);

  return (
    <Box className="bg-[#FAFAFB] h-full mt-2">
      <Box className="flex h-full ">
        <SidebarPage />
        <Box className="ml-[10%]  mr-[10%]  mt-5 w-full h-100% flex flex-col m-5">
          <Box className="bg-white rounded-3xl pt-5 pb-5">
            <Typography className="mb-5 ml-7 font-semibold">
              Post Something
            </Typography>
            <Divider />
            <form onSubmit={handleSubmit(handlePost)}>
              <Box className="flex flex-center items-center justify-between ml-5 mr-5">
                <Box className="w-[50%]">
                  <TextField
                    multiline
                    maxRows={4}
                    label="What's on your mind?"
                    className="userPost"
                    {...register('title', { required: true })}
                  />
                  <TextField
                    className="userTag"
                    label="@tag"
                    {...register('tags')}
                  />
                  <Button
                    className="mt-2 ml-1 font-semibold"
                    variant="outlined"
                    type="submit"
                  >
                    Post
                  </Button>
                </Box>
                <Box className="mt-3 mr-3">
                  <label className="image-label">
                    <ImageOutlinedIcon className="text-[50px]" />
                    <input
                      type="file"
                      {...register('image')}
                      // onChange={(e) => handleImagePreview(e)}
                    />
                  </label>
                </Box>
              </Box>
              <CardMedia
                component="img"
                src={file}
                className=" mt-5 pl-5 w-[20%]"
              />
            </form>
          </Box>
          <Box className="mt-5 py-5 ">
            {posts?.map((data, index = Date.now()) => {
              return (
                <Box
                  className="mb-5 py-5 bg-white rounded-3xl"
                  key={index}
                  onClick={() => setPostId(data.id)}
                >
                  <Typography className="font-bold px-5 mb-3">
                    {data.userName}
                  </Typography>
                  <Typography className="px-5 mb-3">{data.title}</Typography>
                  <CardMedia
                    className="px-5 rounded-[40px] mb-5 "
                    component="img"
                    src={data.imageUrl}
                    alt="Post"
                  />
                  <Box className="flex justify-end px-5">
                    <Typography className="mr-5">
                      {data.createdAt?.toDate().toDateString()}
                    </Typography>
                    <Typography>
                      {data.createdAt?.toDate().toLocaleTimeString('en-US')}
                    </Typography>
                  </Box>
                  <Divider />
                  <CommentsPage
                    likes={data?.likes}
                    postId={postid}
                    email={email}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
        <Box className="w-2/6 bg-white h-100%">chat</Box>
      </Box>
    </Box>
  );
};

export default FeedPage;
