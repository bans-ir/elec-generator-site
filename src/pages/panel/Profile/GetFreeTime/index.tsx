import { ReactComponent as ArrowBackSvg } from "@assets/svg/arrow-back-outline.svg";
import { ReactComponent as TelegramSvg } from "@assets/svg/telegram.svg";
import { ReactComponent as InstagramSvg } from "@assets/svg/instagram.svg";
import { ReactComponent as YoutubeSvg } from "@assets/svg/youtube.svg";

const GetFreeTimePage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-full">
      <button className="btn btn-link text-green-100 mr-auto p-0 mb-5">
        <ArrowBackSvg />
      </button>

      <p className="text-2xl text-white mb-7">دریافت زمان رایگان بیشتر!</p>

      <div className="flex flex-col items-start justify-center gap-y-1 w-full pb-3 border-b border-white/10 px-1">
        <span className="text-white/60 font-light">
          1. آی دی های خود را وارد کنید
        </span>
        <input
          className="input input-secondary w-full ltr"
          placeholder="youtube"
          type="text"
        />
        <input
          className="input input-secondary w-full ltr"
          placeholder="instagram"
          type="text"
        />
        <input
          className="input input-secondary w-full ltr"
          placeholder="telegram"
          type="text"
        />
      </div>

      <div className="flex flex-col items-start justify-center gap-y-4 w-full pt-2.5 pb-3 border-b border-white/10 px-1">
        <span className="text-white/60 font-light">
          1. با صفحات خود ما را دنبال کنید
        </span>
        <div className="flex items-center justify-evenly w-full">
          <TelegramSvg />
          <InstagramSvg />
          <YoutubeSvg />
        </div>
      </div>

      <div className="flex flex-col items-start justify-center gap-y-4 w-full pt-2.5 px-1">
        <span className="text-white/60 font-light">
          1. دعوت از دوستان خود برای استفاده از برنامه
        </span>
        <button className="btn btn-secondary w-full">ارسال لینک دعوت</button>
      </div>

      <span className="text-sm text-white/60 font-light h-full w-full flex items-center justify-center">
        با تکرار مرحله 3 زمان خود را افزایش دهید
      </span>
    </div>
  );
};

export default GetFreeTimePage;
