import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

import { ArrowLeft, Save } from 'lucide-react'

import { MButton } from '@components/atoms/MButton'

import GeneratorImage from '@assets/images/generator.png'
import SolarPanelImage from '@assets/images/solar-panel.png'

const LIST = {
    sun: [
        {
            title: 'پنل خورشیدی اول',
            value: 4000,
            price: 1000000,
            image: SolarPanelImage
        },
        {
            title: 'پنل خورشیدی دوم',
            value: 300,
            price: 10000,
            image: SolarPanelImage
        },
        {
            title: 'پنل خورشیدی سوم',
            value: 40000,
            price: 100000000,
            image: SolarPanelImage
        },
        {
            title: 'پنل خورشیدی چهارم',
            value: 1000,
            price: 100000,
            image: SolarPanelImage
        }
    ],
    oil: [
        {
            title: 'ژنراتور اول',
            value: 4000,
            price: 1000000,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور دوم',
            value: 300,
            price: 10000,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور سوم',
            value: 40000,
            price: 100000000,
            image: GeneratorImage
        },
        {
            title: 'ژنراتور چهارم',
            value: 1000,
            price: 100000,
            image: GeneratorImage
        }
    ]
}

const ReceiptPage = () => {
    const [, setValue] = useState<string>()
    const [returnUrl, setReturnUrl] = useState<string>()
    const [type, setType] = useState<keyof typeof LIST>('sun')
    const { '0': searchParam } = useSearchParams()

    useEffect(() => {
        searchParam.forEach((val, index) => {
            if (Number(index) === 0) setValue(val)
            else setReturnUrl(val)
        })
    }, [searchParam])

    return (
        <div className='w-full h-full flex flex-col items-start justify-start relative'>
            <div className='flex items-center justify-center relative w-full mb-5'>
                <Link to={`/${returnUrl}`} className='absolute left-0 flex items-center justify-center gap-x-1'>
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
                            onClick={() => setType('oil')}
                            className={`flex items-center justify-center gap-y-2 flex-col shadow p-5 rounded-md cursor-default hover:shadow-xl duration-300 active:shadow ${
                                type === 'oil' ? 'bg-[#FFBC41]' : ''
                            }`}
                        >
                            ژنراتور بنزینی
                            <img src={GeneratorImage} alt='generator' className='size-14 rounded-lg' />
                        </div>
                        <div
                            onClick={() => setType('sun')}
                            className={`flex items-center justify-center gap-y-2 flex-col shadow p-5 rounded-md cursor-default hover:shadow-xl duration-300 active:shadow ${
                                type === 'sun' ? 'bg-[#FFBC41]' : ''
                            }`}
                        >
                            پنل خورشیدی
                            <img src={SolarPanelImage} alt='generator' className='size-14 rounded-lg' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-y-5 p-3 overflow-y-auto h-full max-h-[55vh]'>
                    {LIST[type].map((item, index) => (
                        <div
                            key={index}
                            className='flex items-center justify-end shadow p-3 rounded-md hover:shadow-xl duration-300'
                        >
                            <div dir='rtl' className='flex flex-col gap-y-2'>
                                <span>{item.title}</span>
                                <span>{item.price.toLocaleString('en')} ریال</span>
                                <span>{(item.value / 1000).toFixed(2)}KW</span>
                            </div>
                            <img src={item.image} alt='image' className='size-20 rounded-2xl ml-3' />
                        </div>
                    ))}
                </div>
                <MButton className='w-full mt-auto btn-lg'>
                    ذخیره اطلاعات <Save />
                </MButton>
            </div>
        </div>
    )
}

export default ReceiptPage
