import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
    ArrowLeft,
    Coffee,
    CreditCard,
    Lightbulb,
    Minus,
    Monitor,
    Plus,
    Refrigerator,
    Save,
    Snowflake,
    Tv,
    Video,
    Wind
} from 'lucide-react'

import { MButton } from '@components/atoms/MButton'

const ITEMS_LIST = [
    {
        title: 'لامپ LED',
        value: 10,
        count: 0,
        icon: <Lightbulb size={24} />,
        type: 'array',
        array: [10, 15, 20, 40, 50, 100],
        arrayIndex: 0
    },
    {
        title: 'کولر گازی 1 BTU',
        value: 900,
        isAc: true,
        count: 0,
        icon: <Snowflake size={24} />,
        type: 'array',
        array: [900, 1200, 1800, 2200, 2800, 3000],
        arrayIndex: 0
    },
    {
        title: 'کولر گازی 2 BTU',
        value: 1200,
        count: 0,
        isAc: true,
        icon: <Snowflake size={24} />,
        type: 'array',
        array: [900, 1200, 1800, 2200, 2800, 3000],
        arrayIndex: 1
    },
    {
        title: 'تلویزیون 200 وات',
        value: 200,
        count: 0,
        icon: <Tv size={24} />
    },
    {
        title: 'کولر آبی متوسط 500 وات',
        value: 500,
        count: 0,
        icon: <Wind size={24} />
    },
    {
        title: 'یخچال ویترینی ایستاده 800 وات',
        value: 800,
        count: 0,
        icon: <Refrigerator size={24} />
    },
    {
        title: 'صندوق فروشگاهی (POS + مانیتور) 200 وات',
        value: 200,
        count: 0,
        icon: <Monitor size={24} />
    },
    {
        title: 'دستگاه کارتخوان (POS) 15 وات',
        value: 15,
        count: 0,
        icon: <CreditCard size={24} />
    },
    {
        title: 'قهوه‌ساز یا مایکروفر 1500 وات',
        value: 1500,
        count: 0,
        icon: <Coffee size={24} />
    },
    {
        title: 'دوربین‌های مدار بسته 500 وات',
        value: 500,
        count: 0,
        icon: <Video size={24} />
    },
    {
        title: 'سایر',
        value: 0,
        count: 0,
        icon: <Video size={24} />,
        type: 'other',
        array: [],
        arrayIndex: 0
    }
]

const ElecProductPage = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState(ITEMS_LIST)

    const onChangeValue = (type: 'increase' | 'decrease', toChangeIndex: number) => {
        setItems((prevState) =>
            prevState.map((item, index) => {
                if (index === toChangeIndex) {
                    if (item.type === 'array') {
                        const newArrayIndex =
                            type === 'increase'
                                ? item.arrayIndex !== item.array.length - 1
                                    ? item.arrayIndex + 1
                                    : item.arrayIndex
                                : item.arrayIndex !== 0
                                ? item.arrayIndex - 1
                                : item.arrayIndex

                        return {
                            ...item,
                            arrayIndex: newArrayIndex,
                            value: item.array[newArrayIndex],
                            count: type === 'increase' && item.count === 0 ? item.count + 1 : item.count
                        }
                    } else if (item.type === 'custom') {
                        return {
                            ...item,
                            value: type === 'increase' ? item.value + 5 : item.value !== 0 ? item.value - 5 : 0,
                            count: type === 'increase' && item.count === 0 ? item.count + 1 : item.count
                        }
                    }

                    return {
                        ...item,
                        value:
                            type === 'increase'
                                ? item.value === 0
                                    ? 10
                                    : item.value === 10
                                    ? 50
                                    : item.value === 50
                                    ? 100
                                    : item.value + 100
                                : item.value === 0
                                ? 0
                                : item.value === 10
                                ? 0
                                : item.value === 50
                                ? 10
                                : item.value === 100
                                ? 50
                                : item.value - 100,
                        count: type === 'increase' && item.count === 0 ? item.count + 1 : item.count
                    }
                }

                return item
            })
        )
    }

    const onChangeCount = (type: 'increase' | 'decrease', toChangeIndex: number) =>
        setItems((prevState) =>
            prevState.map((item, index) =>
                index === toChangeIndex
                    ? {
                          ...item,
                          count: type === 'increase' ? item.count + 1 : item.count !== 0 ? item.count - 1 : 0
                      }
                    : item
            )
        )

    return (
        <div className='w-full h-full flex flex-col items-start justify-start relative'>
            <div className='flex items-center justify-center relative w-full mb-5'>
                <Link to={'/'} className='absolute left-0'>
                    <ArrowLeft />
                </Link>
                <h1 className='text-2xl'>تجاری</h1>
            </div>

            <div className='max-w-xl w-full mx-auto flex items-center justify-start relative mb-2'>
                <span className='absolute left-10 sm:left-12'>توان</span>
                <span className='absolute left-[160px] sm:left-[210px]'>تعداد</span>
            </div>

            <div className='grid max-w-xl w-full h-full mx-auto'>
                <div className='flex flex-col overflow-y-auto h-full max-h-[62vh]'>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className='flex flex-row-reverse items-center justify-between group relative py-2 border-b border-dashed border-neutral-500'
                        >
                            <div className='flex flex-col items-end justify-end gap-x-2 ml-auto mb-5'>
                                <div className='flex flex-col items-end justify-end gap-y-1'>
                                    <span className='font-medium text-base text-right max-w-[150px]'>{item.title}</span>
                                </div>
                                <div className='size-12 rounded-full bg-[#F0F2F5] group-hover:bg-[#FFBC41] duration-300 flex items-center justify-center'>
                                    {item.icon}
                                </div>
                            </div>

                            <div className='flex items-center justify-end gap-x-3 sm:gap-x-5 mr-auto mb-5'>
                                <div className='flex items-center justify-center gap-x-2 sm:gap-x-3 absolute left-0'>
                                    <MButton
                                        onClick={() => onChangeValue('increase', index)}
                                        className='aspect-square size-7 sm:size-10 shrink-0'
                                    >
                                        <Plus className='size-2 sm:size-4 shrink-0' />
                                    </MButton>
                                    <span>{item.isAc ? item.value * 10 : item.value}</span>
                                    <MButton
                                        onClick={() => onChangeValue('decrease', index)}
                                        className='aspect-square size-7 sm:size-10 shrink-0'
                                    >
                                        <Minus className='size-2 sm:size-4 shrink-0' />
                                    </MButton>
                                </div>
                                <div className='flex items-center justify-center gap-x-2 sm:gap-x-3 absolute left-[130px] sm:left-[170px]'>
                                    <MButton
                                        onClick={() => onChangeCount('increase', index)}
                                        className='aspect-square size-7 sm:size-10 shrink-0'
                                    >
                                        <Plus className='size-2 sm:size-4 shrink-0' />
                                    </MButton>
                                    <span>{item.count}</span>
                                    <MButton
                                        onClick={() => onChangeCount('decrease', index)}
                                        className='aspect-square size-7 sm:size-10 shrink-0'
                                    >
                                        <Minus className='size-2 sm:size-4 shrink-0' />
                                    </MButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='w-full flex items-center justify-between text-[#121417] mb-5 text-lg pt-3 border-t-2 border-[#F0F2F5]'>
                    <div className='flex flex-col gap-y-2'>
                        {(() => {
                            const totalKW = items.reduce((acc, item) => acc + item.value * item.count, 0) / 1000
                            const powerFactor = 0.85
                            const totalKVA = totalKW / powerFactor

                            return (
                                <>
                                    <span>{totalKW.toFixed(2)} KW</span>
                                    <span>{totalKVA.toFixed(2)} kVA</span>
                                </>
                            )
                        })()}
                    </div>
                    <span>مصرف کل</span>
                </div>

                <MButton
                    onClick={() => {
                        const selectedItems = items.filter((item) => item.count > 0)
                        localStorage.setItem(
                            'selected-items',
                            JSON.stringify(
                                selectedItems.map((item) => ({
                                    count: item.count,
                                    title: item.title,
                                    value: item.value
                                }))
                            )
                        )

                        navigate(
                            `/phone-number?kw=${items.reduce(
                                (acc, item) => acc + item.value * item.count,
                                0
                            )}&rt_url=elec-industry`
                        )
                    }}
                    className='w-full mt-auto btn-lg'
                >
                    دریافت فایل محاسبه توان <Save />
                </MButton>
            </div>
        </div>
    )
}

export default ElecProductPage
