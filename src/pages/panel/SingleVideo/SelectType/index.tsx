import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { useMutation } from '@tanstack/react-query'
import { Check, X } from 'lucide-react'

import { MButton } from '@components/atoms/MButton'
import { MVerticalSwiper } from '@components/molecules/MVerticalSwiper'
import LoadingSelectType from '@components/pages/SelectType/LoadingSelectType'

import { getSegmentsQueryFn } from '@core/services/api/requests/captions/get-segments.request'
import { useGetSingleVideo } from '@core/services/hooks/captions/useGetSingleVideo'
import { useGetSubtitle } from '@core/services/hooks/captions/useGetSubtitle'
import { useTranscriptionStore } from '@core/store/transcriptionStore'
import { useVideoStore } from '@core/store/videoStore'
import { TCriticalAny } from '@core/types/type-any'

import { ReactComponent as ExpandSvg } from '@assets/svg/expand.svg'
import { ReactComponent as PauseSvg } from '@assets/svg/pause.svg'
import { ReactComponent as PlaySvg } from '@assets/svg/play_arrow.svg'

const SelectTypePage = () => {
    const { videoId } = useParams()
    const navigate = useNavigate()

    const { addVideoData } = useVideoStore()
    const { addTranscription } = useTranscriptionStore()

    const videoRef = useRef<HTMLVideoElement>(null)

    const [videoStatus, setVideoStatus] = useState<'playing' | 'paused'>('paused')
    const [duration, setDuration] = useState(0)
    const [activeSubtitle, setActiveSubtitle] = useState(0)

    const { data: videoData, isLoading: isLoadingVideo } = useGetSingleVideo({ videoId: videoId ?? '' })
    const { data: subtitleData, isLoading: isLoadingSubtitle } = useGetSubtitle({ videoId: videoId ?? '' })

    const { mutate, isPending } = useMutation({
        mutationFn: () =>
            getSegmentsQueryFn(
                videoData?.data?.id.toString() ?? '',
                subtitleData?.data?.length === 0 ? '0' : subtitleData?.data[activeSubtitle].id.toString() ?? ''
            ),
        onSuccess: (response: TCriticalAny) => {
            addTranscription(response.data)

            //add data to video store
            addVideoData({
                srtId: subtitleData?.data[activeSubtitle].id ?? -1,
                videoDescription: videoData?.data?.description ?? '',
                videoId: videoData?.data?.id ?? 0,
                videoTitle: videoData?.data?.title ?? '',
                file_url: videoData?.data?.file_url ?? '',
                thumbnail: videoData?.data?.thumbnail ?? 0,
                thumbnail_url: videoData?.data?.thumbnail_url ?? '',
                language: subtitleData?.data[activeSubtitle].language as TCriticalAny,
                style: subtitleData?.data[activeSubtitle].style as TCriticalAny
            })

            if (videoData?.data.is_tiktok) {
                navigate(`/panel/subscription/${videoData?.data?.id}/player`)
            } else {
                navigate(
                    `/panel/subscription/edit-segment/${videoData?.data?.id}/${subtitleData?.data[activeSubtitle].id}`
                )
            }
        },
        onError: () => {
            toast.error('دریافت اطلاعات دچار مشکل شد')
        }
    })

    const handleFullScreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen()
            }
        }
    }

    if (isLoadingSubtitle || isLoadingVideo) {
        return <LoadingSelectType />
    }

    return (
        <div className='w-full flex flex-col items-center justify-center h-full'>
            <div className='w-full h-[300px] mb-[10px] shrink-0 flex items-center justify-center'>
                <video
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

            <div className='ltr flex items-center justify-center w-full gap-x-2.5 relative'>
                <button onClick={handleFullScreen} className='absolute right-0 -top-12'>
                    <ExpandSvg />
                </button>
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
                    {videoStatus === 'paused' ? <PlaySvg /> : <PauseSvg />}
                </button>
                <div className='relative grow bg-white/10 h-1'>
                    <div
                        style={{
                            width: `${videoRef.current?.duration ? (duration / videoRef.current?.duration) * 100 : 0}%`
                        }}
                        className='absolute h-full bg-green-100 rounded-r-lg'
                    ></div>
                </div>
            </div>

            <div className='flex flex-col w-full items-center my-4 gap-y-5'>
                <span className='font-light text-white'>انتخاب زبان زیرنویس</span>
                {subtitleData?.data?.length === 0 ? (
                    <span className='text-white'>زیرنویسی یافت نشد</span>
                ) : subtitleData?.data?.length === 1 ? (
                    <div className='mt-5 w-full text-2xl duration-300 flex items-center justify-center h-full py-2 border-y border-white/10 text-green-100 mx-auto'>
                        {subtitleData?.data[0].language.title}
                    </div>
                ) : (
                    <MVerticalSwiper
                        activeIndex={activeSubtitle}
                        setActiveIndex={setActiveSubtitle}
                        list={subtitleData?.data?.map((sub) => sub.language.title) ?? []}
                    />
                )}
            </div>

            <div className='flex items-center justify-around flex-col sm:flex-row w-full gap-x-10 gap-y-3 mt-auto'>
                <MButton
                    isLoading={isPending}
                    onClick={() => mutate()}
                    variant='FilledPrimary'
                    size='L'
                    disabled={subtitleData?.data.length === 0}
                >
                    <Check />
                    شروع
                </MButton>

                <MButton component={Link} to={'/panel'} variant='FilledError' size='L'>
                    <X />
                    انصراف
                </MButton>
            </div>
        </div>
    )
}

export default SelectTypePage
