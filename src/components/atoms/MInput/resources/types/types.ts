import { type InputHTMLAttributes } from 'react'

import { type InputProps } from '@mantine/core'

interface IMInputProps extends InputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'style' | 'onChange'> {
    withRightSection?: boolean
    classNames?: {
        input?: string
        section?: string
        wrapper?: string
    }
    onChange?: (event: string) => void
}

export type { IMInputProps }
