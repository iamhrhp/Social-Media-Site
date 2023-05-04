import { FC } from 'react';
import { Box, Typography, IconButton, TextField, Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

interface IProps {}

const CommentsPage: FC<IProps> = (props: IProps) => {
  return (
    <>
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
          <Typography>120K Comments</Typography>
        </Box>
      </Box>
      <Box className="w-full flex items-center mt-3">
        <IconButton>
          <Avatar
            alt="Remy Sharp"
            src="https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg"
          />
        </IconButton>
        <TextField label="Write your comments....." className="w-full" />
      </Box>
    </>
  );
};

export default CommentsPage;
