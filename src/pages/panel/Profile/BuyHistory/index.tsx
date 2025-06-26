import { useState } from 'react'
import { Link } from 'react-router-dom'

import { ArrowLeft, FolderClock, History } from 'lucide-react'

import { MButton } from '@components/atoms/MButton'
import SubscriptionList from '@components/pages/BuyHistory/SubscriptionList'
import TransactionList from '@components/pages/BuyHistory/TransactionList'

const BuyHistoryPage = () => {
    const [stage, setStage] = useState<'transaction' | 'subscription'>('transaction')

    return (
        <div className='flex flex-col items-center justify-start w-full h-full'>
            <div className='relative flex items-center justify-center w-full mb-10'>
                <span className='text-2xl font-bold text-white'>تاریخچه</span>
                <Link to={'/panel/profile'} className='text-green-100 mr-auto absolute left-3'>
                    <ArrowLeft />
                </Link>
            </div>
            <div className='flex items-center justify-center flex-col sm:flex-row gap-y-2 gap-x-5 w-full'>
                <MButton
                    variant={stage === 'transaction' ? 'FilledPrimary' : 'TintPrimary'}
                    size='L'
                    onClick={() => setStage('transaction')}
                >
                    <History />
                    تاریخچه تراکنش
                </MButton>
                <MButton
                    variant={stage === 'subscription' ? 'FilledPrimary' : 'TintPrimary'}
                    size='L'
                    onClick={() => setStage('subscription')}
                >
                    <FolderClock />
                    تاریخچه اشتراک ها
                </MButton>
            </div>

            <div className='my-2 bg-white/40 w-full h-[1px]'></div>

            <div className='h-full mt-5 max-h-full overflow-y-auto flex flex-col gap-y-5 w-full'>
                {stage === 'subscription' ? <SubscriptionList /> : <TransactionList />}
            </div>
        </div>
    )
}

export default BuyHistoryPage
