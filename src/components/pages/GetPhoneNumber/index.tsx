import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import axios from 'axios'
import { ArrowLeft, Save } from 'lucide-react'

import { MButton } from '@components/atoms/MButton'

const GetPhoneNumberPage = () => {
    const navigate = useNavigate()

    const [phoneNumber, setPhoneNumber] = useState<string>('')
    const [returnUrl, setReturnUrl] = useState<string>()
    const [value, setValue] = useState<string>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { '0': searchParam } = useSearchParams()

    useEffect(() => {
        searchParam.forEach((val, index) => {
            if (Number(index) === 0) setValue(val)
            else setReturnUrl(val)
        })
    }, [searchParam])

    const validatePhoneNumber = (num: string) => /^09\d{9}$/.test(num)

    const handleSave = async () => {
        setError(null)
        if (!validatePhoneNumber(phoneNumber)) {
            setError('شماره همراه باید با 09 شروع شده و 11 رقم باشد.')
            return
        }
        setLoading(true)
        try {
            await axios.post('http://power.bans.ir/api/phone', { phoneNumber })
            // Optionally handle success (e.g., show a message or redirect)

            navigate(`/receipt?kw=${value}&rt_url=${returnUrl}`)
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

            <div className='grid max-w-xl w-full h-full mx-auto'>
                <div dir='rtl' className='flex items-start justify-start flex-col gap-1'>
                    <div className='text-xl'>شماره همراه</div>
                    <div className='text-sm'>شماره همراه را وارد کنید تا اطلاعات برای شما ارسال شود</div>
                    <input
                        type='text'
                        className='input w-full mt-5'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    {error && <div className='text-red-500 mt-2'>{error}</div>}
                </div>
                <MButton className='w-full mt-auto btn-lg' onClick={handleSave} disabled={loading}>
                    {loading ? (
                        'در حال ارسال...'
                    ) : (
                        <>
                            ذخیره اطلاعات <Save />
                        </>
                    )}
                </MButton>
            </div>
        </div>
    )
}

export default GetPhoneNumberPage
