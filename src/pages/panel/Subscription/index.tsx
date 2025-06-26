import { Presentation } from 'lucide-react'

import Footer from '@components/layout/Footer'
import SubscriptionEmpty from '@components/pages/Subscription/SubscriptionEmpty'
import SubscriptionLoading from '@components/pages/Subscription/SubscriptionLoading'
import SubscriptionVideosContainer from '@components/pages/Subscription/SubscriptionVidesoContainer'

import useGetVideos from '@core/services/hooks/captions/useGetVideos/useGetVideos.hooks'

import { ReactComponent as SupportSvg } from '@assets/svg/support.svg'

const SubscriptionPage = () => {
    const { data: videos, isLoading } = useGetVideos({})

    return (
        <>
            <div className='flex items-center flex-row-reverse justify-between w-full'>
                <div className='flex items-center justify-center gap-x-3 text-2xl text-primary-300 font-black border-b-2 border-primary-100 pb-1 text-center'>
                    پروژه ها
                    <Presentation size={32} />
                </div>
                <div className='flex items-center justify-center gap-x-5'>
                    <div className='size-9 shrink-0 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center'>
                        <SupportSvg />
                    </div>
                </div>
            </div>

            {isLoading ? (
                <SubscriptionLoading />
            ) : videos?.data.length === 0 ? (
                <SubscriptionEmpty />
            ) : (
                <SubscriptionVideosContainer videosList={videos?.data ?? []} />
            )}

            <Footer />
        </>
    )
}

export default SubscriptionPage
