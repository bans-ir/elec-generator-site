'use client'

import { forwardRef } from 'react'

import { Input } from '@mantine/core'
import { X } from 'lucide-react'

import { type IMInputProps } from './resources'

const MInput = forwardRef<HTMLInputElement, IMInputProps>(
    ({ classNames, value, onChange, withRightSection = true, disabled = false, ...rest }, ref) => {
        return (
            <Input
                ref={ref}
                classNames={{
                    wrapper: '!w-full',
                    input: `!border-2 !border-neutral-200 !rounded-lg !bg-neutral-100 !py-2 !h-auto placeholder:!text-neutral-600 placeholder:!text-base !text-base focus:!border-primary-600 hover:!border-primary ${
                        classNames?.input ?? ''
                    }`
                }}
                rightSection={
                    withRightSection &&
                    !disabled && (
                        <X
                            onClick={() => onChange && onChange('')}
                            style={{ display: value ? undefined : 'none' }}
                            size={20}
                            color='gray'
                            className='pointer-events-auto cursor-pointer'
                        />
                    )
                }
                disabled={disabled}
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                {...rest}
            />
        )
    }
)

MInput.displayName = 'MInput'

export default MInput
