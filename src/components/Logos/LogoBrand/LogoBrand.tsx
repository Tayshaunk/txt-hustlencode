import { NavLink } from 'react-router-dom';

const LogoBrand = ({ color }: { color: string }) => {
  return (
    <NavLink to={'/'}>
      <h1 style={{ color, fontWeight: 400, fontSize: 25 }}>Hustle N' Code</h1>
    </NavLink>
  );
};

export default LogoBrand;
