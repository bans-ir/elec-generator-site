import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import GetOtpCode from '@components/pages/authentication/GetOtpCode'
import GetPhoneNumber from '@components/pages/authentication/GetPhoneNumber'
import Installation from '@components/pages/authentication/Installation'
import StarField from '@components/pages/authentication/StarField/StarField'

import { getCookieStorageItem } from '@core/helper/cookie-handler'

const AuthenticationPage = () => {
    const navigate = useNavigate()

    const [isShowInstall, setIsShowInstall] = useState(true)

    const [authStage, setAuthStage] = useState<{
        stage: 'get-phone' | 'get-otp'
        phoneNumber?: string
    }>({
        stage: 'get-phone'
    })

    useEffect(() => {
        //check if there is token
        if (getCookieStorageItem('token')) {
            //redirect to panel section
            navigate('/panel')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <StarField />

            {isShowInstall ? (
                <Installation onCloseInstall={() => setIsShowInstall(false)} />
            ) : (
                <section className='flex flex-col items-center justify-between w-full h-full relative z-10'>
                    {authStage.stage === 'get-phone' ? (
                        <GetPhoneNumber
                            goOptHandler={(phoneNumber: string) => setAuthStage({ stage: 'get-otp', phoneNumber })}
                            prevPhoneNumber={authStage?.phoneNumber}
                        />
                    ) : (
                        authStage.stage === 'get-otp' &&
                        authStage.phoneNumber && (
                            <GetOtpCode
                                goGetPhoneHandler={() =>
                                    setAuthStage((prevState) => ({
                                        ...prevState,
                                        stage: 'get-phone'
                                    }))
                                }
                                phoneNumber={authStage.phoneNumber}
                            />
                        )
                    )}
                </section>
            )}
        </>
    )
}

export default AuthenticationPage
