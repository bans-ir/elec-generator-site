import { Link, useParams } from 'react-router-dom'

import { ArrowLeft } from 'lucide-react'

import {
    Template0,
    Template1,
    Template2,
    Template3,
    Template4,
    Template5,
    Template6,
    Template7,
    Template8,
    Template9,
    Template10,
    Template11,
    Template12,
    Template13,
    Template14
} from '@components/molecules/SingleTemplate'

const SingleTemplatePage = () => {
    const { templateId } = useParams()

    const generateTemplate = () => {
        switch (templateId) {
            case '0':
                return <Template0 />
            case '1':
                return <Template1 />
            case '2':
                return <Template2 />
            case '3':
                return <Template3 />
            case '4':
                return <Template4 />
            case '5':
                return <Template5 />
            case '6':
                return <Template6 />
            case '7':
                return <Template7 />
            case '8':
                return <Template8 />
            case '9':
                return <Template9 />
            case '10':
                return <Template10 />
            case '11':
                return <Template11 />
            case '12':
                return <Template12 />
            case '13':
                return <Template13 />
            case '14':
                return <Template14 />
            default:
                return <div>قالبی یافت نشد</div>
        }
    }

    return (
        <>
            <Link
                to={`/panel/create-template`}
                className='btn btn-link text-green-100 mr-auto p-0 sm:absolute left-7 flex gap-x-2 underline'
            >
                <ArrowLeft />
                لیست قالب ها
            </Link>
            <div className='hidden sm:flex flex-col gap-y-4 items-center justify-center w-full'>
                <span className='font-medium text-xl text-white'>ساخت قالب</span>
            </div>

            {generateTemplate()}
        </>
    )
}

export default SingleTemplatePage
