import { Link } from 'react-router-dom'

import { ArrowLeft } from 'lucide-react'

import UploadVideo from '@components/pages/UploadVideo'

const UploadVideoPage = () => {
    return (
        <div className='flex flex-col items-center justify-start w-full h-full'>
            <Link to={'/panel'} className='btn btn-link text-green-100 mr-auto p-0'>
                <ArrowLeft />
            </Link>

            <UploadVideo />
        </div>
    )
}

export default UploadVideoPage
