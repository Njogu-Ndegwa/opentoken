import style from "./card.module.scss"
export function CustomCard({children}) {
    return (
        <div className={style.card}>
            {children}
        </div>
    )
}