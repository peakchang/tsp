<script>
    import { page } from "$app/stores";
    import CalculRadio from "$components/CalculRadio.svelte";
    import ColorRadio from "$components/ColorRadio.svelte";
    import ItemInfo from "./ItemInfo.svelte";
    import YogModal from "./YogModal.svelte";
    console.log($page.params.id);

    let showModal = true;

    let capaVal;
    let tongVal;
    let hyuhVal;
    let halTermVal;
    let colorVal;


    let colorList = [
        { value: 0, color: "#0054FF" },
        { value: 1, color: "#FF00DD" },
        { value: 2, color: "#FF007F" },
        { value: 3, color: "#4641D9" },
        { value: 4, color: "#99004C" },
    ];

    let capaList = [
        { value: 0, text: "128GB" },
        { value: 1, text: "256GB" },
    ];
    let tongList = [
        { value: 0, text: "sk" },
        { value: 1, text: "kt" },
        { value: 2, text: "lg" },
    ];

    let hyuhList = [
        { value: "gongsi", text: "공시지원금" },
        { value: "sunyak", text: "선택약정" },
    ];
    let halTermList = [
        { value: 1, text: "완납" },
        { value: 24, text: "24개월" },
        { value: 30, text: "30개월" },
    ];

    capaVal = capaList[0].value;
    tongVal = tongList[1].value;
    hyuhVal = hyuhList[0].value;
    halTermVal = halTermList[1].value;
    colorVal = colorList[0].value;

    $: console.log(colorVal);
</script>

<YogModal bind:showModal />
<div class="max_screen suit-font mx-auto px-4">
    <div class="text-center">갤럭시Z플립3</div>

    <div class="grid md:grid-cols-2 gap-1">
        <div class="choice_area grid grid-cols-5">
            <!-- ************** -->

            <div
                class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base"
            >
                색상
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                {#each colorList as color}
                    <label class="mr-2">
                        <input
                            type="radio"
                            name="color"
                            value={color.value}
                            bind:group={colorVal}
                            class="hidden peer"
                        />
                        <div
                            class="border-4 border-white w-9 h-9 cursor-pointer peer-checked:border-none"
                            style="background-color: {color.color};"
                        />
                    </label>
                {/each}
            </div>

            <!-- ************** -->

            <div
                class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base"
            >
                용량
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                {#each capaList as capa, idx}
                    <CalculRadio>
                        <input
                            type="radio"
                            value={capa.value}
                            class="hidden peer"
                            bind:group={capaVal}
                            slot="input-set"
                        />
                        <span slot="inner-text">{capa.text}</span>
                    </CalculRadio>
                {/each}
            </div>

            <!-- ************** -->

            <div
                class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base"
            >
                기존 통신사
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                {#each tongList as tong, idx}
                    <CalculRadio pyVal="1">
                        <input
                            type="radio"
                            value={tong.value}
                            class="hidden peer"
                            bind:group={tongVal}
                            slot="input-set"
                        />
                        <span slot="inner-text">
                            <img
                                src="/img/{tong.text}_radio.png"
                                alt=""
                                class="w-7 mx-auto"
                            />
                        </span>
                    </CalculRadio>
                {/each}
                <CalculRadio>
                    <input
                        type="radio"
                        value="3"
                        class="hidden peer"
                        bind:group={tongVal}
                        slot="input-set"
                    />
                    <span slot="inner-text">알뜰폰</span>
                </CalculRadio>
            </div>

            <!-- ************** -->

            <div
                class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base"
            >
                기존 통신사
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                {#each tongList as tong, idx}
                    <CalculRadio pyVal="1">
                        <input
                            type="radio"
                            value={tong.value}
                            class="hidden peer"
                            bind:group={tongVal}
                            slot="input-set"
                        />
                        <span slot="inner-text">
                            <img
                                src="/img/{tong.text}_radio.png"
                                alt=""
                                class="w-7 mx-auto"
                            />
                        </span>
                    </CalculRadio>
                {/each}
            </div>

            <!-- ************** -->

            <div
                class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base"
            >
                요금제
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    class="border border-gray-400 w-full mr-2 rounded-md py-2 px-3 cursor-pointer flex justify-between items-center"
                    on:click={() => {
                        showModal =!showModal;
                    }}
                >
                    <span>5GX 프라임</span>
                    <span
                        class="text-sm bg-blue-400 text-white px-2 py-1 rounded-md"
                        >변경하기</span
                    >
                </div>
            </div>

            <!-- ************** -->

            <div
                class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base"
            >
                할부개월수
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                {#each halTermList as halTerm, idx}
                    <CalculRadio>
                        <input
                            type="radio"
                            value={halTerm.value}
                            class="hidden peer"
                            bind:group={halTermVal}
                            slot="input-set"
                        />
                        <span slot="inner-text">{halTerm.text}</span>
                    </CalculRadio>
                {/each}
            </div>
            <!-- ************** -->
            <div
                class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base"
            >
                할인유형
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                {#each hyuhList as hyuh, idx}
                    <CalculRadio>
                        <input
                            type="radio"
                            value={hyuh.value}
                            class="hidden peer"
                            bind:group={hyuhVal}
                            slot="input-set"
                        />
                        <span slot="inner-text">{hyuh.text}</span>
                    </CalculRadio>
                {/each}
            </div>

            <!-- ************** -->
            <div
                class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base"
            >
                유심
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                {#each hyuhList as hyuh, idx}
                    <CalculRadio>
                        <input
                            type="radio"
                            value={hyuh.value}
                            class="hidden peer"
                            bind:group={hyuhVal}
                            slot="input-set"
                        />
                        <span slot="inner-text">{hyuh.text}</span>
                    </CalculRadio>
                {/each}
            </div>
        </div>

        <div class="mt-10 md:mt-0 md:mx-8">
            <div
                class=" py-2 bg-gray-100 text-center font-semibold text-xl rounded-lg"
            >
                단말기 가격 안내
            </div>
            <div class="flex justify-between px-5 py-1 font-medium">
                <span>단말기</span>
                <span>1,254,000원</span>
            </div>

            <div class="flex justify-between px-5 py-1 font-medium">
                <span>더싼할인</span>
                <span>-0원</span>
            </div>

            <div
                class="flex justify-between px-5 py-1 font-semibold text-orange-600"
            >
                <span>할부원금</span>
                <span>1,254,000원</span>
            </div>

            <div
                class=" py-2 bg-gray-100 text-center font-semibold text-xl rounded-lg"
            >
                요금제 안내
            </div>
            <div class="flex justify-between font-medium px-5 py-1" sty>
                <span>5GX 프라임</span>
                <span>89,000원</span>
            </div>

            <div class="flex justify-between font-medium px-5 py-1">
                <span>선택약정할인</span>
                <span>-22,500원</span>
            </div>

            <div
                class="flex justify-between px-5 py-1 font-semibold text-orange-600"
            >
                <span>월 기본료</span>
                <span>66,750원</span>
            </div>

            <div
                class="result_calcul mt-3 border border-gray-400 rounded-md overflow-hidden text-center"
            >
                <div class="bg-slate-500 text-white p-2">
                    <span class="text-xl font-semibold">월 청구요금</span>
                    <span class="text-xs">(월 할부금 + 월 기본료)</span>
                </div>
                <div class="text-2xl mt-3 font-bold">월 118,542원</div>
                <div class="mb-3">(51,792 + 66,750원)</div>
            </div>
            <div class="text-center">
                <label class="cursor-pointer text-sm">
                    <input type="checkbox" class=""/>
                    할부이자 미포함 금액
                </label>
            </div>
        </div>
    </div>
</div>

<ItemInfo />