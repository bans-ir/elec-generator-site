import { Link, useNavigate } from 'react-router-dom'

import { ArrowLeft } from 'lucide-react'

import Pic0 from '@assets/images/template/00.png'
import Pic1 from '@assets/images/template/01.png'
import Pic2 from '@assets/images/template/02.png'
import Pic3 from '@assets/images/template/03.png'
import Pic4 from '@assets/images/template/04.png'
import Pic5 from '@assets/images/template/05.png'
import Pic6 from '@assets/images/template/06.png'
import Pic7 from '@assets/images/template/07.png'
import Pic8 from '@assets/images/template/08.png'
import Pic9 from '@assets/images/template/09.png'
import Pic10 from '@assets/images/template/10.png'
import Pic11 from '@assets/images/template/11.png'
import Pic12 from '@assets/images/template/12.png'
import Pic13 from '@assets/images/template/13.png'
import Pic14 from '@assets/images/template/14.png'

const IMAGES_LIST = [Pic0, Pic1, Pic2, Pic3, Pic4, Pic5, Pic6, Pic7, Pic8, Pic9, Pic10, Pic11, Pic12, Pic13, Pic14]

const CreateTemplatePage = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col gap-y-5 w-full h-full py-3'>
            <div>
                <Link
                    to={`/panel`}
                    className='btn btn-link text-green-100 mr-auto p-0 absolute left-7 flex gap-x-2 underline'
                >
                    <ArrowLeft />
                    خانه
                </Link>
                <div className='flex flex-col gap-y-4 items-center justify-center w-full'>
                    <span className='font-medium text-xl text-white'>انتخاب قالب</span>
                </div>
            </div>
            <div className='w-full grid grid-cols-3 gap-5'>
                {IMAGES_LIST.map((item, index) => (
                    <div
                        onClick={() => navigate(`/panel/create-template/${index}`)}
                        className='cursor-pointer group flex flex-col gap-y-1 text-white items-center justify-center'
                        key={index}
                    >
                        <div className='overflow-hidden'>
                            <img
                                className='group-hover:scale-110 duration-300 object-cover max-h-[450px]'
                                src={item}
                                alt='banner of template'
                            />
                        </div>
                        <span className='text-lg font-semibold'>قالب {index + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CreateTemplatePage
