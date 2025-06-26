import { FC } from 'react'

import { X } from 'lucide-react'

import { MButton } from '../MButton'

import { IMModalProps } from './resources'

const MModal: FC<IMModalProps> = ({ children, onClose, isShow }) => {
    return (
        <div
            className={`fixed ${
                isShow ? 'visible opacity-100' : 'invisible opacity-0'
            } duration-300 top-0 right-0 w-full h-full bg-black/90 backdrop-blur-[3px] flex items-center justify-center z-[1000]`}
        >
            <div className='flex flex-col items-start justify-start h-full w-full max-w-4xl p-7'>
                <MButton variant='None' size='None' onClick={onClose} className='text-green-100 !mr-auto p-0 !w-fit'>
                    <X />
                </MButton>
                {children}
            </div>
        </div>
    )
}

export default MModal
