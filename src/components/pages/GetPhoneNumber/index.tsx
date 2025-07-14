import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import axios from 'axios'
import { ArrowLeft, Save } from 'lucide-react'

import { MButton } from '@components/atoms/MButton'

const GetPhoneNumberPage = () => {
    const navigate = useNavigate()

    const [timer, setTimer] = useState<number>(120)
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

    const [type, setType] = useState<'phone' | 'otp'>('phone')
    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [otp, setOtp] = useState<string>('')
    const [returnUrl, setReturnUrl] = useState<string>()
    const [value, setValue] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { '0': searchParam } = useSearchParams()

    useEffect(() => {
        searchParam.forEach((val, index) => {
            if (index === 'kw') setValue(val)
            else setReturnUrl(val)
        })
    }, [searchParam])

    useEffect(() => {
        if (type === 'otp') {
            setTimer(120) // مقداردهی اولیه
            const id = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
            setIntervalId(id)

            return () => clearInterval(id)
        }

        return () => {
            if (intervalId) clearInterval(intervalId)
        }
    }, [type])

    useEffect(() => {
        if (timer === 0 && type === 'otp') {
            setType('phone')
            toast.error('کد منقضی شد. لطفاً دوباره شماره را وارد کنید.')
            if (intervalId) clearInterval(intervalId)
        }
    }, [timer, type])

    const validatePhoneNumber = (num: string) => /^09\d{9}$/.test(num)
    const formatTimer = (t: number) => {
        const minutes = Math.floor(t / 60)
        const seconds = t % 60
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }

    const handleSave = async () => {
        setError(null)
        if (!validatePhoneNumber(phoneNumber)) {
            setError('شماره همراه باید با 09 شروع شده و 11 رقم باشد.')
            return
        }
        setLoading(true)
        try {
            await axios.post('http://localhost:5000/phone', {
                phoneNumber
            })

            toast.success('کد برای شما ارسال شد')

            setType('otp')
        } catch (error) {
            setError('ارسال اطلاعات با خطا مواجه شد.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async () => {
        setError(null)
        if (otp.trim().length !== 5) {
            setError('کد را به درستی وارد کنید.')
            return
        }
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:5000/phone/verify', {
                phoneNumber,
                otp,
                value,
                items: localStorage.getItem('selected-items')
            })
            if (response.data.success === true) {
                window.open(response.data.pdfLink, '_blank')
                navigate(`/receipt?kw=${value}&rt_url=${returnUrl}`)
            } else {
                toast.error('ارسال اطلاعات با خطا مواجه شد')
            }
        } catch (error) {
            setError('ارسال اطلاعات با خطا مواجه شد.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full h-full flex flex-col items-start justify-start relative'>
            <div className='flex items-center justify-center relative w-full mb-5'>
                <Link to={`/${returnUrl}`} className='absolute left-0 flex items-center justify-center gap-x-1'>
                    <ArrowLeft />
                    بازگشت
                </Link>
                <h1 className='text-base sm:text-xl lg:text-2xl w-full max-w-xl mx-auto text-center border-b pb-1'>
                    وارد کردن شماره همراه
                </h1>
            </div>

            <div className='grid max-w-xl w-full mx-auto'>
                <div dir='rtl' className='flex items-start justify-start flex-col gap-1'>
                    {type === 'phone' ? (
                        <>
                            <div className='text-xl'>شماره همراه</div>
                            <div className='text-sm'>شماره همراه را وارد کنید تا اطلاعات برای شما ارسال شود</div>
                            <input
                                type='tel'
                                inputMode='numeric'
                                pattern='[0-9]*'
                                className='input w-full mt-5'
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </>
                    ) : (
                        <>
                            <div className='text-base'>کد ارسالی را به شماره همراه {phoneNumber} را وارد کنید</div>
                            <button
                                onClick={() => {
                                    setType('phone')
                                    if (intervalId) clearInterval(intervalId)
                                }}
                                className='text-primary'
                            >
                                تغییر شماره همراه
                            </button>
                            <input
                                type='tel'
                                inputMode='numeric'
                                pattern='[0-9]*'
                                className='input w-full mt-5'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                            <div className='text-sm text-gray-600 mt-1'>زمان باقی‌مانده: {formatTimer(timer)}</div>
                        </>
                    )}

                    {error && <div className='text-red-500 mt-2'>{error}</div>}
                </div>
                <MButton
                    className='w-full btn-lg mt-5'
                    onClick={() => (type === 'phone' ? handleSave() : handleVerifyOtp())}
                    disabled={loading}
                >
                    {loading ? (
                        <div>
                            در حال ارسال...
                            <div className='loading loading-dots'></div>
                        </div>
                    ) : (
                        <>
                            ارسال اطلاعات <Save />
                        </>
                    )}
                </MButton>
            </div>
        </div>
    )
}

export default GetPhoneNumberPage
