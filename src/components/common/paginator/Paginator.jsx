import s from './Paginator.module.css'

const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = []

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div className={s.pagesWrapper}>
            {pages.map(p => <span onClick={() => props.onPageChanged(p)}
                className={`${props.currentPage === p && s.selectedPage} ${s.pageNumber}`}>{p}</span>)}
        </div>
    )

}

export default Paginator