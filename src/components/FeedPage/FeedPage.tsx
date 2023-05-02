import {
  Box,
  CardMedia,
  TextField,
  Typography,
  Divider,
  IconButton,
  Avatar,
} from '@mui/material';
import { FC, useState } from 'react';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

interface IProps {}

const FeedPage: FC<IProps> = (props: IProps) => {
  const [file, setFile] = useState<string>('');

  const handleChange = (e: any) => {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Box className="bg-[#FAFAFB] h-screen mt-2">
      <Box className="flex h-[100vh] ">
        <Box className="w-2/6 bg-white h-100%">Profile</Box>
        <Box className="ml-[10%]  mr-[10%]  mt-5 w-full h-100% flex flex-col m-5">
          <Box className="bg-white rounded-3xl pt-5 pb-5">
            <Typography className="mb-5 ml-7 font-semibold">
              Post Something
            </Typography>
            <Divider />
            <Box className="flex flex-center items-center justify-between ml-5 mr-5">
              <Box className="w-[50%]">
                <TextField
                  multiline
                  maxRows={4}
                  label="What's on your mind?"
                  className="userPost"
                />
              </Box>
              <Box className="mt-3 mr-3">
                <label className="image-label">
                  <ImageOutlinedIcon className="text-[50px]" />
                  <input type="file" onChange={handleChange} />
                </label>
              </Box>
            </Box>
            <CardMedia component="img" src={file} />
          </Box>
          <Box className="bg-white mt-5 rounded-3xl py-5 ">
            <Box className="">
              <Typography className="font-bold px-5 mb-3">User name</Typography>
              <Typography className="px-5 mb-3">
                Post Title Post Title Post Title Post Title Post Title Post
                Title Post Title
              </Typography>
              <CardMedia
                className="px-5 rounded-[40px] mb-5 "
                component="img"
                src="https://www.interiordesignshop.net/wp-content/uploads/2017/10/Meet-The-Amazing-Interior-Design-At-The-Worlds-Best-Art-Galleries-1.jpg"
              />
              <Divider />

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
                  <Typography>120K Likes</Typography>
                </Box>
              </Box>

              <Box className="w-full flex items-center mt-3">
                <IconButton>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
                  />
                </IconButton>
                <TextField
                  label="Write your comments....."
                  className="w-full"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="w-2/6 bg-white h-100%">chat</Box>
      </Box>
    </Box>
  );
};

export default FeedPage;
