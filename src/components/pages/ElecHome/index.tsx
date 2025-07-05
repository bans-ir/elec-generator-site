import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
    ArrowLeft,
    Coffee,
    Lightbulb,
    Microwave,
    Minus,
    Plus,
    Refrigerator,
    Save,
    Snowflake,
    Tv,
    WashingMachine,
    Wind
} from 'lucide-react'

import { MButton } from '@components/atoms/MButton'

const ITEMS_LIST = [
    {
        title: 'لامپ LED',
        value: 10,
        count: 0,
        icon: <Lightbulb size={24} />
    },
    {
        title: 'کولر گازی 9000 BTU',
        value: 900,
        count: 0,
        icon: <Snowflake size={24} />
    },
    {
        title: 'کولر گازی 12000 BTU',
        value: 1200,
        count: 0,
        icon: <Snowflake size={24} />
    },
    {
        title: 'کولر گازی 18000 BTU',
        value: 1800,
        count: 0,
        icon: <Snowflake size={24} />
    },
    {
        title: 'کولر گازی 22000 BTU',
        value: 2200,
        count: 0,
        icon: <Snowflake size={24} />
    },
    {
        title: 'کولر گازی 28000 BTU',
        value: 2700,
        count: 0,
        icon: <Snowflake size={24} />
    },
    {
        title: 'کولر گازی 30000 BTU',
        value: 3200,
        count: 0,
        icon: <Snowflake size={24} />
    },
    {
        title: 'کولر آبی متوسط 500 وات',
        value: 500,
        count: 0,
        icon: <Wind size={24} />
    },
    {
        title: 'یخچال فریزر خانگی',
        value: 700,
        count: 0,
        icon: <Refrigerator size={24} />
    },
    {
        title: 'ماشین لباسشویی',
        value: 2000,
        count: 0,
        icon: <WashingMachine size={24} />
    },
    {
        title: 'مایکروویو یا فر برقی',
        value: 1500,
        count: 0,
        icon: <Microwave size={24} />
    },
    {
        title: 'پمپ‌آب خانگی کوچک',
        value: 750,
        count: 0,
        icon: <Coffee size={24} />
    },
    {
        title: 'LED تلوزیون',
        value: 200,
        count: 0,
        icon: <Tv size={24} />
    }
]

const HomeProductPage = () => {
    const navigate = useNavigate()
    const [items, setItems] = useState(ITEMS_LIST)

    const onChangeValue = (type: 'increase' | 'decrease', toChangeIndex: number) =>
        setItems((prevState) =>
            prevState.map((item, index) =>
                index === toChangeIndex
                    ? {
                          ...item,
                          value: type === 'increase' ? item.value + 5 : item.value !== 0 ? item.value - 5 : 0
                      }
                    : item
            )
        )

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
                <h1 className='text-2xl'>خانگی</h1>
            </div>

            <div className='max-w-xl w-full mx-auto flex items-center justify-start relative mb-2'>
                <span className='absolute left-12'>توان</span>
                <span className='absolute left-[210px]'>تعداد</span>
            </div>

            <div className='grid max-w-xl w-full h-full mx-auto'>
                <div className='flex flex-col overflow-y-auto h-full max-h-[65vh]'>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className='flex flex-col items-center justify-between group relative py-2 border-b border-dashed border-neutral-500'
                        >
                            <div className='flex items-end justify-end gap-x-2 ml-auto mb-5'>
                                <div className='flex flex-col items-end justify-end gap-y-1'>
                                    <span className='font-medium text-base text-right'>{item.title}</span>
                                    <span className='text-xs'>مقدار استفاده در ساعت</span>
                                </div>
                                <div className='size-12 rounded-full bg-[#F0F2F5] group-hover:bg-[#FFBC41] duration-300 flex items-center justify-center'>
                                    {item.icon}
                                </div>
                            </div>

                            <div className='flex items-center justify-end gap-x-3 sm:gap-x-5 mr-auto mb-5'>
                                <div className='flex items-center justify-center gap-x-2 sm:gap-x-3 absolute left-0'>
                                    <MButton
                                        onClick={() => onChangeValue('increase', index)}
                                        className='btn-dash aspect-square size-7 sm:size-10 shrink-0'
                                    >
                                        <Plus className='size-2 sm:size-4 shrink-0' />
                                    </MButton>
                                    <span>{item.value}</span>
                                    <MButton
                                        onClick={() => onChangeValue('decrease', index)}
                                        className='btn-dash aspect-square size-7 sm:size-10 shrink-0'
                                    >
                                        <Minus className='size-2 sm:size-4 shrink-0' />
                                    </MButton>
                                </div>
                                <div className='flex items-center justify-center gap-x-2 sm:gap-x-3 absolute left-[170px]'>
                                    <MButton
                                        onClick={() => onChangeCount('increase', index)}
                                        className='btn-dash aspect-square size-7 sm:size-10 shrink-0'
                                    >
                                        <Plus className='size-2 sm:size-4 shrink-0' />
                                    </MButton>
                                    <span>{item.count}</span>
                                    <MButton
                                        onClick={() => onChangeCount('decrease', index)}
                                        className='btn-dash aspect-square size-7 sm:size-10 shrink-0'
                                    >
                                        <Minus className='size-2 sm:size-4 shrink-0' />
                                    </MButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='w-full flex items-center justify-between text-[#121417] mb-5 text-lg pt-3 border-t-2 border-[#F0F2F5]'>
                    <span>{(items.reduce((acc, item) => acc + item.value * item.count, 0) / 1000).toFixed(2)} KW</span>
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
                            )}&rt_url=elec-home`
                        )
                    }}
                    className='w-full mt-auto btn-lg'
                >
                    محاسبه توان <Save />
                </MButton>
            </div>
        </div>
    )
}

export default HomeProductPage
