import { Outlet, Link, NavLink } from "react-router-dom";
import style from './sidebar.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faToggleOn, faUsers, faAddressCard, faDollarSign, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
export default function Sidebar() {
  return (
    <>

      <div className={style.sidebar}>
        <nav>
          <ul>
            <li>
              <NavLink className={({isActive}) => 
                isActive ? style.activeLink : style.link
              } to={`/dashboard/reports`}>
              <FontAwesomeIcon className={style.icon} icon={faTachometerAlt} />
              Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => 
                isActive ? style.activeLink : style.link
              } to={`/dashboard/clients`}>
              <FontAwesomeIcon  className={style.icon}  icon={faAddressCard} />
                Accounts</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => 
                isActive ? style.activeLink : style.link
              } to={`/dashboard/test`}>
              <FontAwesomeIcon className={style.icon} icon={faUsers} />
                Clients</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => 
                isActive ? style.activeLink : style.link
              }  to={`/dashboard/contacts/3`}>
              <FontAwesomeIcon  className={style.icon}  icon={faDollarSign} />
                Payments</NavLink>
            </li>
            <li>
              <NavLink className={({isActive}) => 
                isActive ? style.activeLink : style.link
              }  to={`/dashboard/contacts/3`}>
              <FontAwesomeIcon className={style.icon} icon={faToggleOn} />
                Activation Codes</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className={style.detail}>
        <Outlet />
      </div>
    </>
  );
}