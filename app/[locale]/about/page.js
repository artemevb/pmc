import SignUp from "../_components/Main/SignUp";
import SliderDoctors from "../_components/About/SliderDoctors";
import Advantages from "../_components/About/Advantages";
import AboutClinics from "../_components/About/AboutClinics";
import Service from "../_components/About/Service";

export default function page({ params }) {
    return (
        <div className="w-full bg-white flex flex-col gap-[90px] mdx:gap-[120px] xl:gap-[180px]">
            <AboutClinics/>
            <Advantages/>
            <Service/>
            <SliderDoctors locale={params.locale} />
            <div className="mx-[10px] mb-[90px] mdx:mb-[130px] xl:mb-[150px]">
                <SignUp />
            </div>
        </div>
    );
}