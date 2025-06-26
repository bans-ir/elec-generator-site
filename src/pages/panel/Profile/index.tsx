import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

import { CreditCard, History, LogOut } from 'lucide-react'

import { MButton } from '@components/atoms/MButton'
import { MModal } from '@components/atoms/MModal'
import Footer from '@components/layout/Footer'
import EditProfileModal from '@components/pages/Profile/EditProfileModal'
import LoadingProfile from '@components/pages/Profile/LoadingProfile/LoadingProfile'
import LogoutModal from '@components/pages/Profile/LogoutModal'

import { useGetProfile } from '@core/services/hooks/account/useGetProfile'

import { ReactComponent as AparatSvg } from '@assets/svg/aparat.svg'
import { ReactComponent as InstagramSvg } from '@assets/svg/instagram.svg'
import { ReactComponent as PenLineSvg } from '@assets/svg/pen-line.svg'
import { ReactComponent as ProSvg } from '@assets/svg/pro-svg.svg'
import { ReactComponent as SupportSvg } from '@assets/svg/support.svg'
import { ReactComponent as TelegramSvg } from '@assets/svg/telegram.svg'
import { ReactComponent as YoutubeSvg } from '@assets/svg/youtube.svg'

const ProfilePage = () => {
    const [isShowLogoutModal, setIsShowLogoutModal] = useState(false)
    const [isShowEditProfileModal, setIsShowEditProfileModal] = useState(false)

    const { data, isLoading } = useGetProfile({})

    return (
        <>
            {isLoading ? (
                <LoadingProfile />
            ) : (
                <div className='flex flex-col items-center justify-center gap-y-2 w-full h-full'>
                    <ProSvg className='mb-3' />
                    <span dir='ltr' className='font-light text-xl text-white'>
                        +98 {data?.data?.phone_number.slice(1)}
                    </span>
                    <button
                        className='flex items-center justify-center gap-1 text-neutral-400 hover:text-white duration-300'
                        onClick={() => setIsShowEditProfileModal(true)}
                    >
                        <PenLineSvg />
                        <span>{data?.data?.first_name}</span> <span>{data?.data?.last_name}</span>
                    </button>
                    <span className='font-light text-neutral-400 text-center'>
                        {data?.data?.remaining_caption_time}
                        <br />
                        <>
                            <button
                                className='mx-2 font-medium hover:!text-white duration-300'
                                onClick={() => {
                                    navigator.clipboard.writeText(data?.data?.invitation_code ?? '')

                                    toast.success('کد معرف کپی شد')
                                }}
                            >
                                {data?.data?.invitation_code}
                            </button>
                            : کد معرف
                        </>
                    </span>

                    <div className='flex items-center justify-between w-full py-4 px-[30px] border-y border-neutral-600 text-light-green mt-5'>
                        <SupportSvg />
                        <TelegramSvg />
                        <InstagramSvg />
                        <YoutubeSvg />
                        <AparatSvg />
                    </div>

                    <div className='flex flex-col w-full gap-y-4 mt-auto mb-8'>
                        <div className='grid sm:grid-cols-2 gap-2'>
                            <MButton variant='FilledPrimary' size='M' component={Link} to={'/panel/profile/history'}>
                                <History />
                                مشاهده تاریخچه{' '}
                            </MButton>
                            <MButton variant='FilledPrimary' size='M' component={Link} to={'/panel/profile/buy-time'}>
                                <CreditCard />
                                خرید زمان بیشتر
                            </MButton>
                        </div>

                        <MButton variant='FilledError' size='M' onClick={() => setIsShowLogoutModal(true)}>
                            <LogOut />
                            خروج از حساب کاربری
                        </MButton>
                    </div>

                    <span className='text-xs text-neutral-400 font-thin poppins'>App version 0.0.1</span>
                </div>
            )}

            <Footer />

            <MModal isShow={isShowLogoutModal} onClose={() => setIsShowLogoutModal(false)}>
                <LogoutModal onClose={() => setIsShowLogoutModal(false)} />
            </MModal>

            <MModal isShow={isShowEditProfileModal} onClose={() => setIsShowEditProfileModal(false)}>
                <EditProfileModal
                    userData={{
                        firstName: data?.data?.first_name,
                        lastName: data?.data?.last_name
                    }}
                    onClose={() => setIsShowEditProfileModal(false)}
                />
            </MModal>
        </>
    )
}

export default ProfilePage
