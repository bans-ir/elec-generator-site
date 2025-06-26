import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Range } from 'react-range'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { Loader } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Pause, Play } from 'lucide-react'

import { MButton } from '@components/atoms/MButton'
import LoadingEditSegment from '@components/pages/EditSegment/LoadingEditSegment/LoadingEditSegment'

import { QueryKeysEnum } from '@core/enums/query-keys'
import { convertMsToTime } from '@core/helper/convert-ms-to-time'
import { convertSecondToTime } from '@core/helper/convert-second-to-time'
import { patchUpdateSegmentsMutationFn } from '@core/services/api/requests/captions/patch-update-segment.request'
import { patchUpdateVideoMutationFn } from '@core/services/api/requests/captions/patch-update-video.request'
import useGetSegmentsList from '@core/services/hooks/captions/useGetSegmentsList/useGetSegmentsList.hooks'
import { useGetSingleVideo } from '@core/services/hooks/captions/useGetSingleVideo'
import { useTranscriptionStore } from '@core/store/transcriptionStore'
import { TCriticalAny } from '@core/types/type-any'

const EditSegment = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const { videoId, subtitleId } = useParams()

    const { addTranscription } = useTranscriptionStore()

    const videoRef = useRef<HTMLVideoElement>(null)
    const inputRefs = useRef<{ [key: string]: HTMLInputElement }>({})
    const prevInputValue = useRef<string>('')

    const [editSegment, setEditSegment] = useState<{
        segmentId?: number
        value?: string
    }>({})

    const [videoStatus, setVideoStatus] = useState<'playing' | 'paused'>('paused')
    const [duration, setDuration] = useState(0)

    const {
        data,
        isLoading,
        refetch: refetchSegmentsList
    } = useGetSegmentsList({
        subtitleId: subtitleId ?? '',
        videoId: videoId ?? ''
    })
    const { data: videoData, isLoading: isLoadingVideo } = useGetSingleVideo({ videoId: videoId ?? '' })

    const {
        mutate,
        isPending: isUpdatingSegment,
        variables: updatingSegmentData
    } = useMutation({
        mutationFn: patchUpdateSegmentsMutationFn,
        onSuccess: () => {
            toast.success('زیرنویس با موفقیت ویرایش شد')

            refetchSegmentsList()
        },
        onError: () => {
            toast.error('ویرایش زیرنویس با مشکل مواجه شد')
        }
    })

    const { mutate: updateVideo, isPending: isUpdatingVideo } = useMutation({
        mutationFn: patchUpdateVideoMutationFn,
        onSuccess: () => {
            toast.success('ویدیو با موفقیت ویرایش شد')

            queryClient.invalidateQueries({
                queryKey: [QueryKeysEnum.Videos]
            })

            navigate(`/panel/subscription/${videoId}/player`)

            addTranscription(data?.data ?? [])
        },
        onError: () => {
            toast.error('ویرایش ویدیو با مشکل مواجه شد')
        }
    })

    if (isLoading || isLoadingVideo) return <LoadingEditSegment />

    return (
        <div className='grid gap-y-5 w-full h-full py-3'>
            <Link
                to={`/panel/${videoId}/select-type`}
                className='btn btn-link text-green-100 mr-auto p-0 absolute left-7'
            >
                <ArrowLeft />
            </Link>
            <div className='flex flex-col gap-y-4 items-center justify-center w-full'>
                <span className='font-medium text-2xl text-white'>اصلاح کلمات و تلفظ</span>
            </div>

            <div className='grid gap-y-3 p-1 w-full max-h-full overflow-y-auto'>
                {data?.data.map((item) => (
                    <div
                        onClick={() => {
                            if (inputRefs.current[item.id]) {
                                inputRefs.current[item.id]?.focus()
                            }
                        }}
                        className={`${
                            duration >= +item.start_time / 1000 && duration < +item.end_time / 1000
                                ? 'bg-primary-300'
                                : ''
                        } cursor-pointer duration-300 flex flex-col w-full shadow-md bg-neutral-600 p-2 rounded-md text-white text-right`}
                    >
                        <textarea
                            dir='rtl'
                            ref={(el) => {
                                if (el) {
                                    ;(inputRefs.current[item.id] as TCriticalAny) = el
                                    // Set height dynamically based on the content
                                    el.style.height = 'auto' // Reset height to auto before calculating
                                    el.style.height = `${el.scrollHeight}px` // Set to the scroll height
                                }
                            }}
                            className='bg-transparent outline-none max-w-full whitespace-break-spaces h-fit overflow-hidden resize-none'
                            onFocus={(e: TCriticalAny) => {
                                const value = e.target.value

                                const lastDigitPosition = value.length + (value.length === 0 ? 0 : 1)

                                if (videoRef.current) videoRef.current.currentTime = +item.start_time / 1000

                                e.target.setSelectionRange(lastDigitPosition, lastDigitPosition)

                                setEditSegment({ segmentId: item.id, value })

                                prevInputValue.current = value
                            }}
                            onInput={(e: TCriticalAny) => {
                                // Adjust height on input
                                e.target.style.height = 'auto'
                                e.target.style.height = `${e.target.scrollHeight}px`
                            }}
                            value={editSegment.segmentId === item.id ? editSegment.value : item.text}
                            onChange={(e) =>
                                setEditSegment((prevState) => ({
                                    ...prevState,
                                    value: e.target.value
                                }))
                            }
                            onBlur={() => {
                                if (prevInputValue.current !== editSegment.value) {
                                    mutate({
                                        data: {
                                            start_time: +item.start_time,
                                            end_time: +item.end_time,
                                            text: editSegment.value ?? ''
                                        },
                                        segmentId: item.id.toString(),
                                        subtitleId: subtitleId ?? '',
                                        videoId: videoId ?? ''
                                    })
                                }

                                setEditSegment({})
                            }}
                        />

                        <div className='flex items-center flex-row-reverse justify-between w-full'>
                            {isUpdatingSegment && +updatingSegmentData.segmentId === item.id && (
                                <div className='flex items-center justify-center gap-x-2 text-xs'>
                                    <span>در حال ویرایش زیرنویس</span>
                                    <Loader size={'xs'} />
                                </div>
                            )}
                            <div className='flex items-center justify-center gap-2 mt-2 text-neutral-200 mr-auto text-sm'>
                                <span>{convertMsToTime(+item.start_time)}</span>-
                                <span>{convertMsToTime(+item.end_time)}</span>
                            </div>
                        </div>
                    </div>
                ))}{' '}
            </div>

            <div className='flex items-center justify-center gap-5'>
                <div className='flex flex-col w-full '>
                    <div className='flex items-center justify-center gap-2 w-full'>
                        <button
                            onClick={() => {
                                if (videoRef.current && videoRef.current.paused) {
                                    videoRef.current.play()
                                    setVideoStatus('playing')
                                } else if (videoRef.current && !videoRef.current.paused) {
                                    videoRef.current.pause()
                                    setVideoStatus('paused')
                                }
                            }}
                        >
                            {videoStatus === 'paused' ? (
                                <Play className='text-primary-100' />
                            ) : (
                                <Pause className='text-primary-100' />
                            )}
                        </button>
                        <Range
                            step={1}
                            min={0}
                            max={videoRef.current?.duration || 1}
                            values={[duration]}
                            onChange={(values) => {
                                setDuration(values[0])
                                if (videoRef.current) videoRef.current.pause()
                            }}
                            onFinalChange={(values) => {
                                if (videoRef.current) videoRef.current.currentTime = values[0]
                            }}
                            renderTrack={({ props, children }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '4px',
                                        width: '100%',
                                        background: `linear-gradient(to right, #00966D ${
                                            (duration / (videoRef.current?.duration ?? 1)) * 100
                                        }%, #E2EBC0 ${(duration / (videoRef.current?.duration ?? 1)) * 100}%)`,
                                        borderRadius: '3px',
                                        position: 'relative',
                                        marginTop: '10px',
                                        marginBottom: '10px',
                                        marginLeft: '10px'
                                    }}
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    {...props}
                                    style={{
                                        ...props.style,
                                        height: '20px',
                                        width: '20px',
                                        borderRadius: '50%',
                                        backgroundColor: '#00966D',
                                        border: '2px solid white',
                                        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.5)',
                                        outline: '0px'
                                    }}
                                    className='hover:scale-105'
                                />
                            )}
                        />
                    </div>
                    <div className='flex flex-row-reverse items-center justify-between w-full text-white text-sm'>
                        <span>{convertSecondToTime(videoRef.current?.duration ?? 0)}</span>
                        <span>{convertSecondToTime(duration)}</span>
                    </div>
                </div>
                <div className='relative group'>
                    {(isUpdatingSegment || !!editSegment.segmentId) && (
                        <div className='absolute group-hover:-top-8 top-0 group-hover:opacity-100 duration-300 opacity-0 right-0 bg-white rounded-md px-2 py-1 whitespace-nowrap text-sm'>
                            شما در حال تغییر زیرنویس هستید
                        </div>
                    )}

                    <MButton
                        isLoading={isUpdatingVideo}
                        disabled={isUpdatingSegment || !!editSegment.segmentId}
                        onClick={() =>
                            updateVideo({
                                data: {
                                    data: {
                                        is_tiktok: true
                                    },
                                    videoId: videoId ?? ''
                                }
                            })
                        }
                        variant='FilledPrimary'
                        size='M'
                        className='!w-fit'
                    >
                        تایید
                    </MButton>
                </div>
            </div>

            <video
                hidden
                onTimeUpdate={() => {
                    if (videoRef.current) setDuration(videoRef.current.currentTime)
                }}
                onPause={() => setVideoStatus('paused')}
                onPlay={() => setVideoStatus('playing')}
                onEnded={() => setVideoStatus('paused')}
                ref={videoRef}
                data-video={0}
                src={videoData?.data?.file_url}
                className='max-h-full'
            ></video>
        </div>
    )
}

export default EditSegment
