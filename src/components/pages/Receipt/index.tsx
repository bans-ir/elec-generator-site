import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { ArrowLeft, Save } from 'lucide-react'

import { MButton } from '@components/atoms/MButton'

import GeneratorImage from '@assets/images/generator.png'

const LIST = {
    oil: [
        {
            title: 'ژنراتور',
            value: 1,
            price: 30000000,
            minKW: 1000,
            maxKW: 1000,
            isInvertor: true,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور',
            value: 1,
            price: 15000000,
            minKW: 1000,
            maxKW: 1000,
            isInvertor: false,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور',
            value: '1 - 2',
            price: 65000000,
            minKW: 1000,
            maxKW: 2000,
            isInvertor: true,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور',
            value: '1 - 2',
            price: 30000000,
            minKW: 1000,
            maxKW: 2000,
            isInvertor: false,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور',
            value: '2 - 3',
            price: 85000000,
            minKW: 2000,
            maxKW: 3000,
            isInvertor: true,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور',
            value: '2 - 3',
            price: 40000000,
            minKW: 2000,
            maxKW: 3000,
            isInvertor: false,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور',
            value: '3 - 5',
            price: 110000000,
            minKW: 3000,
            maxKW: 5000,
            isInvertor: true,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور',
            value: '3 - 5',
            price: 55000000,
            minKW: 3000,
            maxKW: 5000,
            isInvertor: false,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور',
            value: '5 - 8',
            price: 145000000,
            minKW: 5000,
            maxKW: 8000,
            isInvertor: true,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور',
            value: '5 - 8',
            price: 70000000,
            isInvertor: false,
            minKW: 5000,
            maxKW: 8000,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور',
            value: '8 - 10',
            price: 180000000,
            isInvertor: true,
            minKW: 8000,
            maxKW: 10000,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور',
            value: '8 - 10',
            price: 90000000,
            isInvertor: false,
            minKW: 8000,
            maxKW: 10000,
            image: GeneratorImage
        }
    ]
}

const ReceiptPage = () => {
    const [value, setValue] = useState<number | null>(null)
    const [type] = useState<keyof typeof LIST>('oil')
    const [searchParams] = useSearchParams()

    const navigate = useNavigate()

    useEffect(() => {
        const val = searchParams.get('kw')
        if (val && !isNaN(Number(val))) {
            setValue(Number(val))
        }
    }, [searchParams])

    const getFilteredList = () => {
        const list = LIST[type]
        if (value === null) return []

        const first = list[0]
        const last = list[list.length - 1]

        // اگر کمتر از همه بود
        if (value < first.minKW) return list.filter((item) => item.minKW === first.minKW && item.maxKW === first.maxKW)

        // اگر بیشتر از همه بود
        if (value > last.maxKW) return list.filter((item) => item.minKW === last.minKW && item.maxKW === last.maxKW)

        // بازه‌ی میانی
        return list.filter((item) => value >= item.minKW && value <= item.maxKW)
    }

    return (
        <div className='w-full h-full flex flex-col items-start justify-start relative'>
            <div className='flex items-center justify-center relative w-full mb-5'>
                <Link to={`/`} className='absolute left-0 flex items-center justify-center gap-x-1'>
                    <ArrowLeft />
                    بازگشت
                </Link>
                <h1 className='text-base sm:text-xl lg:text-2xl w-full max-w-xl mx-auto text-center border-b pb-1'>
                    ژنراتور های پیشنهادی
                </h1>
            </div>

            <div className='grid max-w-xl w-full h-full mx-auto'>
                <div className='flex flex-col'>
                    <div className='flex items-center justify-start gap-x-5'>
                        <div
                            className={`flex items-center justify-center gap-y-2 flex-col shadow p-3 rounded-md cursor-default hover:shadow-xl duration-300 active:shadow ${
                                type === 'oil' ? 'bg-[#FFBC41]' : ''
                            }`}
                        >
                            ژنراتور بنزینی
                            <img src={GeneratorImage} alt='generator' className='size-14 rounded-lg' />
                        </div>
                        {/* <div
                            onClick={() => setType('sun')}
                            className={`flex items-center justify-center gap-y-2 flex-col shadow p-3 rounded-md cursor-default hover:shadow-xl duration-300 active:shadow ${
                                type === 'sun' ? 'bg-[#FFBC41]' : ''
                            }`}
                        >
                            پنل خورشیدی
                            <img src={SolarPanelImage} alt='generator' className='size-14 rounded-lg' />
                        </div> */}
                    </div>
                </div>
                <div className='flex flex-col gap-y-5 overflow-y-auto h-full max-h-[55vh]'>
                    {getFilteredList().map((item, index) => (
                        <div
                            key={index}
                            className='flex items-center justify-end shadow p-3 rounded-md hover:shadow-xl duration-300'
                        >
                            <div dir='rtl' className='flex flex-col gap-y-2'>
                                <span>
                                    {item.title} {item.isInvertor ? '(اینورتر)' : ''}
                                </span>
                                <span>{item.price.toLocaleString('en')} ریال</span>
                                <span>{item.value} کیلووات</span>
                            </div>
                            <img src={item.image} alt='image' className='size-20 rounded-2xl ml-3' />
                        </div>
                    ))}
                </div>

                <MButton onClick={() => navigate('/')} className='w-full mt-auto btn-lg'>
                    ذخیره اطلاعات <Save />
                </MButton>
            </div>
        </div>
    )
}

export default ReceiptPage
