'use client'

import { ButtonHTMLAttributes, type FC } from 'react'

interface IMButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean
}

const MButton: FC<IMButtonProps> = ({ children, className, disabled, isLoading = false, ...rest }) => {
    return (
        <button className={`btn btn-primary text-black ` + className} disabled={disabled || isLoading} {...rest}>
            {children}
            {isLoading && <div></div>}
        </button>
    )
}

export default MButton
