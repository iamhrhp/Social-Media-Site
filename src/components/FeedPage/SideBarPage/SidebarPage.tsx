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
import { ProfileData } from '../../../Data/ProfileData';

interface IProps {}

const SidebarPage: FC<IProps> = (props: IProps) => {
  return (
    <>
      <Box className="w-2/6 bg-white h-100%">
        <Box>
          {ProfileData.map((data, index = Date.now()) => {
            return (
              <Box
                className="flex items-center py-3 hover:bg-sky-500 hover:text-white transition ease-in-out"
                key={index}
              >
                <IconButton>{data.img}</IconButton>
                <Typography className="font-semibold">{data.Title}</Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </>
  );
};

export default SidebarPage;
