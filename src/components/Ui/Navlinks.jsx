import React from 'react';

import { NavLink } from 'react-router-dom';



const Navlinks = ({ data, marginTop, className, handleClick, userId = 0 }) => {

  return (
    <div className={marginTop}>
      {data && data.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.title}
            to={item.path.replace(':id', userId)}
            end
            className={className}
            onClick={() => handleClick && handleClick()}
          >
            {Icon && <Icon className="mr-2" />}
            {item.title}
          </NavLink>
        );
      })}
    </div>
  );
};



export default Navlinks;