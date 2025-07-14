import { Link } from 'react-router-dom'

import ElecHomeImage from '@assets/images/elec-home.png'
import ElecIndustryImage from '@assets/images/Elec-industryjpg.png'
import ElecProductImage from '@assets/images/electrical-equipment.png'
import BansLogoImage from '@assets/images/logo.webp'

const HomePage = () => {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center relative'>
            <img
                src={BansLogoImage}
                alt='elec home'
                className='h-[70px] w-[200px] bg-black rounded-md text-2xl relative xl:absolute xl:top-2 mb-5'
            />
            <h1 className='text-2xl relative xl:absolute xl:top-24 mb-5'>نرم افزار محاسبه انرژی</h1>

            <div dir='rtl' className='grid md:grid-cols-2 xl:grid-cols-3 gap-5'>
                <Link
                    to={'/elec-product'}
                    className='relative flex flex-col items-center justify-center group cursor-pointer'
                >
                    <div className='z-10 rounded-xl w-80 md:w-96 bg-base-100 shadow-sm relative overflow-hidden'>
                        <img
                            src={ElecProductImage}
                            alt='elec home'
                            className='w-full h-[100px] xl:h-[200px] object-center object-contain p-2 md:p-4 rounded-t-xl mb-2 md:mb-5 group-hover:scale-105 duration-300'
                        />
                        <div className='px-3 pb-6 flex flex-col items-center justify-center'>
                            <h2 className='text-2xl mb-1'>تجاری</h2>
                            <span className='text-sm'>درباره ی محصولات تجاری</span>
                        </div>
                    </div>
                    <div className='h-16 w-[350px] bg-[#0B0B0B0A] blur-xs rounded-xl shadow-sm absolute -bottom-3'></div>
                </Link>
                <Link
                    to={'/elec-industry'}
                    className='relative flex flex-col items-center justify-center group cursor-pointer'
                >
                    <div className='z-10 rounded-xl w-80 md:w-96 bg-base-100 shadow-sm relative overflow-hidden'>
                        <img
                            src={ElecIndustryImage}
                            alt='elec home'
                            className='w-full h-[100px] xl:h-[200px] object-center object-contain p-2 md:p-4 rounded-t-xl mb-2 md:mb-5 group-hover:scale-105 duration-300'
                        />
                        <div className='px-3 pb-6 flex flex-col items-center justify-center'>
                            <h2 className='text-2xl mb-1'>صنعتی</h2>
                            <span className='text-sm'>درباره ی محصولات صنعتی</span>
                        </div>
                    </div>
                    <div className='h-16 w-[350px] bg-[#0B0B0B0A] blur-xs rounded-xl shadow-sm absolute -bottom-3'></div>
                </Link>
                <Link
                    to={'/elec-home'}
                    className='relative flex flex-col items-center justify-center group cursor-pointer'
                >
                    <div className='z-10 rounded-xl w-80 md:w-96 bg-base-100 shadow-sm relative overflow-hidden'>
                        <img
                            src={ElecHomeImage}
                            alt='elec home'
                            className='w-full h-[100px] xl:h-[200px] object-center object-contain p-2 md:p-4 rounded-t-xl mb-2 md:mb-5 group-hover:scale-105 duration-300'
                        />
                        <div className='px-3 pb-6 flex flex-col items-center justify-center'>
                            <h2 className='text-2xl mb-1'>خانگی</h2>
                            <span className='text-sm'>درباره ی محصولات خانگی</span>
                        </div>
                    </div>
                    <div className='h-16 w-[350px] bg-[#0B0B0B0A] blur-xs rounded-xl shadow-sm absolute -bottom-3'></div>
                </Link>
            </div>
        </div>
    )
}

export default HomePage
