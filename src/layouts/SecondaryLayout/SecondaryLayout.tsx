import { Outlet } from 'react-router-dom';

const SecondaryLayout = () => {
  return (
    <>
      <div>SecondaryLayout</div>
      <Outlet />
    </>
  );
};

export default SecondaryLayout;
