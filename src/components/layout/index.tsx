import { Outlet } from 'react-router-dom'
const Layout = () => {
    return (
        <section className='h-full max-w-4xl flex flex-col items-center justify-between gap-y-5 mx-auto'>
            <Outlet />
        </section>
    )
}

export default Layout
