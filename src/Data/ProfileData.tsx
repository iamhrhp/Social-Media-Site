import FeedIcon from '@mui/icons-material/Feed';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import EventNoteIcon from '@mui/icons-material/EventNote';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import StoreIcon from '@mui/icons-material/Store';

export interface ProfileDataProps {
  Title: string;
  img: string;
}

export const ProfileData = [
  {
    Title: 'Feed',
    img: <FeedIcon />,
  },
  {
    Title: 'Friends',
    img: <Diversity1Icon />,
  },
  {
    Title: 'Events',
    img: <EventNoteIcon />,
  },
  {
    Title: 'Watch Videos',
    img: <OndemandVideoIcon />,
  },
  {
    Title: 'Photos',
    img: <PhotoLibraryIcon />,
  },
  {
    Title: 'Files',
    img: <FileCopyIcon />,
  },
  {
    Title: 'Marketplace',
    img: <StoreIcon />,
  },
];
