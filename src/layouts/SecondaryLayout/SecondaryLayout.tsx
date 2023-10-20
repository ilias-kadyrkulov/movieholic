import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

const SecondaryLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default SecondaryLayout;
