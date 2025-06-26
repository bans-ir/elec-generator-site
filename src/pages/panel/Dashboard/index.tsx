import { useNavigate } from 'react-router-dom'

import { Presentation } from 'lucide-react'

import Footer from '@components/layout/Footer'

import { ReactComponent as SupportSvg } from '@assets/svg/support.svg'

const DashboardPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className='flex items-center flex-row-reverse justify-between w-full'>
                <div className='flex items-center justify-center gap-x-3 text-2xl text-primary-300 font-black border-b-2 border-primary-100 pb-1 text-center'>
                    داشبورد
                    <Presentation size={32} />
                </div>
                <div className='flex items-center justify-center gap-x-5'>
                    <div className='size-9 shrink-0 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center'>
                        <SupportSvg />
                    </div>
                </div>
            </div>

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-5 items-start justify-start h-[500px] sm:h-[300px]'>
                <div className='overflow-hidden relative bg-secondary-100 p-2 rounded-md h-full flex items-center justify-center'>
                    <span className='font-medium'>اضافه کردن زیرنویس</span>
                    <div className='absolute inset-0 bg-white/40 backdrop-blur-[1px] grayscale-[50%] rounded-xl'></div>
                    <div className='absolute py-1 z-[1] bg-secondary-400 text-primary w-fit text-center -rotate-45 -translate-x-8 left-0 top-6 text-xs font-semibold px-10'>
                        درحال توسعه
                    </div>
                </div>
                <div className='cursor-pointer bg-secondary-100 p-2 rounded-md h-full flex items-center justify-center'>
                    <span className='font-medium'>اصلاح نویز</span>
                </div>
                <div className='cursor-pointer bg-secondary-100 p-2 rounded-md h-full flex items-center justify-center'>
                    <span className='font-medium'>استخراج متن تصویر</span>
                </div>
                <div
                    onClick={() => navigate('/panel/create-template')}
                    className='cursor-pointer bg-secondary-100 p-2 rounded-md h-full flex items-center justify-center'
                >
                    <span className='font-medium'>ساخت کاور ویدیو</span>
                </div>
                <div className='cursor-pointer bg-secondary-100 p-2 rounded-md h-full flex items-center justify-center'>
                    <span className='font-medium'>استخراج متن تصویر</span>
                </div>
                <div className='overflow-hidden relative bg-secondary-100 p-2 rounded-md h-full flex items-center justify-center'>
                    <span className='font-medium'>ربات اینستاگرام</span>
                    <div className='absolute inset-0 bg-white/40 backdrop-blur-[1px] grayscale-[50%] rounded-xl'></div>
                    <div className='absolute py-1 z-[1] bg-secondary-400 text-primary w-fit text-center -rotate-45 -translate-x-8 left-0 top-6 text-xs font-semibold px-10'>
                        درحال توسعه
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default DashboardPage
