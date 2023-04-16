<script>
    // import Swiper core and required modules
    import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    // Import Swiper styles
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";
    import "swiper/css/scrollbar";

    let rightHiddenVal = false;
    let leftHiddenVal = true;


</script>

<div class="relative">
    <Swiper
        modules={[Navigation]}
        navigation={{
            prevEl: ".rv_prev",
            nextEl: ".rv_next",
        }}
        spaceBetween={20}
        breakpoints={{
            "@0.00": {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            "@1.00": {
                slidesPerView: 4,
                spaceBetween: 40,
            },
        }}
        on:slideChange={(e) => {
            console.log(e.detail[0].realIndex);
            // swiperCount = e.detail[0].realIndex + 1;
            if(e.detail[0].realIndex == 0){
                leftHiddenVal = true;
            }else{
                leftHiddenVal = false;
            }
        }}
        class="chk-swiper"
    >
        <SwiperSlide>
            <img
                src=""
                alt=""
            />
        </SwiperSlide>
    </Swiper>
    <div
        class="rv_prev absolute left-3 top-1/3 z-10 text-white opacity-50 text-3xl cursor-pointer"
        class:hidden={leftHiddenVal}
    >
        <i class="fa-solid fa-circle-chevron-left" />
    </div>
    <div
        class="rv_next absolute right-3 top-1/3 z-10 text-white opacity-50 text-3xl cursor-pointer"
        class:hidden={rightHiddenVal}
    >
        <i class="fa-solid fa-circle-chevron-right" />
    </div>
</div>

<style>
    :global(.swiper) {
        width: 100%;
        height: 150px;
    }
    :global(.swiper-slide) {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        border : 1px solid #EAEAEA;
        
    }
    :global(.swiper-slide img) {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
    @media only screen and (max-width: 768px) {
        :global(.swiper) {
            height: 120px;
        }
    }
    /* @media only screen and (min-width: 1800px) {
        :global(.swiper) {
            height: 300px;
        }
    } */
</style>
