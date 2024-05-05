import facebookImg from "../images/facebook.svg";
import twitterImg from "../images/twitter.svg";
import youtubeImg from "../images/youtube.svg";
import instagramImg from "../images/instagram.svg";

function Footer() {
  return (
    <div className="flex justify-between items-center mt-[120px] xl:px-[100px] lg:px-[32px] sm:px-[32px] pt-8 pb-[64px] bg-black">
      <div className="text-[#676767]">©codeit - 2023</div>
      <div className="flex gap-5">
        <div className="text-[#CFCFCF]">Privacy Policy</div>
        <div className="text-[#CFCFCF]">FAQ</div>
      </div>
      <div className="flex gap-2">
        <img src={facebookImg} alt="facebook" />
        <img src={twitterImg} alt="twitter" />
        <img src={youtubeImg} alt="youtube" />
        <img src={instagramImg} alt="instagram" />
      </div>
    </div>
  );
}

export default Footer;
