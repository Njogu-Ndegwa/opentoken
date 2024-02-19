import Sidebar from "../../components/sidebar/sidebar";
import Header from '../../components/header/header'
import style from './dashboard.module.scss'
export default function Dashboard() {
    return (
        <>
        <div className={style.dashboard} style={{display: "block", width: "100%"}}>
            <Header />
            <Sidebar />
            
        </div>
        </>
    )
}