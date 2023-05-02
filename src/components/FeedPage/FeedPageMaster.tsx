import { FC } from 'react';
import HeaderPage from '../HeaderPage/HeaderPage';
import FeedPage from './FeedPage';
interface IProps {}

const FeedPageMaster: FC<IProps> = (props: IProps) => {
  return (
    <>
      <HeaderPage />
      <FeedPage />
    </>
  );
};

export default FeedPageMaster;
