import style from './header.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
export default function Header({ logo }) {
    return (
        <div className={style.header}>
            <div className={style.headerContent}>
                <div className={style.left}>
                <img src={logo} alt="logo" />
                <p>Hello Dennis</p>
                </div>
                
                <div className={style.right}>
                    <FontAwesomeIcon className={style.bellIcon} icon={faBell} />
                    <FontAwesomeIcon className={style.userIcon} icon={faCircleUser} />
                </div>
            </div>
        </div>
    )
}