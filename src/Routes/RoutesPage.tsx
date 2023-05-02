import { Route, Routes } from 'react-router-dom';
import { FC } from 'react';
import RegisterPage from '../components/Resigterationpage/RegisterPage';
import FeedPageMaster from '../components/FeedPage/FeedPageMaster';

interface IProps {}

const RoutePage: FC = (props: IProps) => {
  return (
    <Routes>
      <Route path="/" element={<RegisterPage />} />
      <Route path="/feed" element={<FeedPageMaster />} />
    </Routes>
  );
};

export default RoutePage;
