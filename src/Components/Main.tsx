import { Outlet } from 'react-router-dom'
import '../Styles/Main.scss'

const Main = () => {
    return (
        <main>
            <Outlet />
        </main>
    )
}

export default Main