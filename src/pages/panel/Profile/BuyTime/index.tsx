import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'
import { ArrowLeft, CreditCard } from 'lucide-react'

import { MButton } from '@components/atoms/MButton'
import { MVerticalSwiper } from '@components/molecules/MVerticalSwiper'
import LoadingBuyTime from '@components/pages/BuyTime/LoadingBuyTime'

import { postPurchaseItemMutationFn } from '@core/services/api/requests/financial/post-purchase-item.request'
import { useGetPurchasableItems } from '@core/services/hooks/purchasing/useGetPurchasableItems'
import { TCriticalAny } from '@core/types/type-any'

const BuyTimePage = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const { data: purchasable, isLoading } = useGetPurchasableItems({
        categoryCode: 'caption'
    })

    const selectedTiming = useMemo(() => {
        return purchasable?.data.find((_, index) => index === activeIndex)
    }, [activeIndex, purchasable?.data])

    const { mutate, isPending } = useMutation({
        mutationFn: postPurchaseItemMutationFn,
        onSuccess: (response: TCriticalAny) => {
            toast.success(response.data.message ?? 'صورت حساب با موفقیت ایجاد شد')
        },
        onError: (error: TCriticalAny) => {
            toast.error(error.data.message || 'ایجاد صورت حساب با مشکل مواجه شد')
        }
    })

    //check if trying to fetch data
    if (isLoading) return <LoadingBuyTime />

    return (
        <div className='flex flex-col items-center justify-start w-full h-full'>
            <Link to={'/panel/profile'} className='btn btn-link text-green-100 mr-auto p-0 mb-5'>
                <ArrowLeft />
            </Link>

            {isLoading ? (
                <LoadingBuyTime />
            ) : (
                <>
                    <div className='text-2xl text-white border-b-2 border-white/60 pb-1 mb-14'>
                        <span>زمان انتخابی</span>
                    </div>

                    <MVerticalSwiper
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        list={purchasable?.data.map((item) => item.title) ?? []}
                    />

                    <div className='flex flex-col gap-y-4 w-full mb-10'>
                        <div className='text-green-100 flex items-start justify-between w-full'>
                            <span>محاسبه مبلغ:</span>
                            <div className='flex items-center justify-center flex-col text-lg font-semibold'>
                                {selectedTiming?.discounted_price === null ? (
                                    <span>{selectedTiming?.price.toLocaleString()} تومان</span>
                                ) : (
                                    <>
                                        <div className='relative after:absolute after:block after:w-full after:h-[1px] after:bg-green-100 after:-rotate-12 after:top-3 text-green-100'>
                                            {selectedTiming?.price.toLocaleString()} تومان
                                        </div>
                                        <span>{selectedTiming?.discounted_price.toLocaleString()} تومان</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <MButton
                        className='mt-auto'
                        variant='FilledPrimary'
                        size='L'
                        onClick={() => {
                            const foundedTimingItem = purchasable?.data.find((_, index) => index === activeIndex)

                            if (!foundedTimingItem) {
                                toast.error('باید حداقل یک مورد را انتخاب کنید')
                                return
                            }

                            mutate({
                                data: {
                                    item_id: foundedTimingItem.id
                                }
                            })
                        }}
                        isLoading={isPending}
                    >
                        <CreditCard />
                        پرداخت
                    </MButton>
                </>
            )}
        </div>
    )
}

export default BuyTimePage
