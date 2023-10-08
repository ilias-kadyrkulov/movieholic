import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';

const SecondaryLayout = () => {
  return (
    <>
      <div>SecondaryLayout</div>
      <Header />
      <Outlet />
    </>
  );
};

export default SecondaryLayout;
