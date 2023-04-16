<script>
    // import Swiper core and required modules
    import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
    import { Swiper, SwiperSlide } from "swiper/svelte";
    // Import Swiper styles
    import "swiper/css";
    import "swiper/css/navigation";
    import "swiper/css/pagination";
    import "swiper/css/scrollbar";

    let pageBool = false;

    // scrollbar={{ draggable: true }}
    // pagination={{ clickable: false }}
    let autoplayVal = { delay: 3000 };
    // let autoplayVal = false;
    let swiperCount;
</script>

<div class="r rounded-lg overflow-hidden relative">
    <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        navigation={{
            prevEl: ".prev",
            nextEl: ".next",
        }}
        loop
        autoplay={autoplayVal}
        on:slideChange={(e) => {
            // console.log(e.detail[0].realIndex);
            swiperCount = e.detail[0].realIndex + 1;
        }}
        on:swiper={(e) => console.log(e)}
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
        class="prev absolute left-3 top-1/3 z-10 text-gray-700 opacity-60 text-3xl cursor-pointer"
    >
        <i class="fa-solid fa-circle-chevron-left" />
    </div>
    <div
        class="next absolute right-3 top-1/3 z-10 text-gray-700 opacity-60 text-3xl cursor-pointer"
    >
        <i class="fa-solid fa-circle-chevron-right" />
    </div>

    <div
        class="absolute right-3 bottom-3 z-10 bg-slate-700 text-white text-sm py-1 px-4 rounded-full"
        style="background-color:rgba(0,0,0,.3)"
    >
        {swiperCount ? swiperCount : ''} / 3
    </div>
</div>

<style>
    :global(.swiper) {
        width: 100%;
        height: 170px;
    }
    :global(.swiper-slide) {
        text-align: center;
        font-size: 18px;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    :global(.swiper-slide img) {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    @media only screen and (max-width: 768px) {
        :global(.swiper) {
            height: 150px;
        }
    }
    /* @media only screen and (min-width: 1800px) {
        :global(.swiper) {
            height: 300px;
        }
    } */
</style>
