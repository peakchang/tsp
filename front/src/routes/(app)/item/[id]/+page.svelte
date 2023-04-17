<script>
    import { page } from "$app/stores";
    import CalculRadio from "$components/CalculRadio.svelte";
    import ColorRadio from "$components/ColorRadio.svelte";
    console.log($page.params.id);

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
                요금제
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                <div
                    class="border border-gray-400 w-full mr-2 rounded-md py-2 px-3 cursor-pointer flex justify-between items-center"
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
        </div>

        <div class="border border-red-600 mx-8">
            계산 영역
            <div
                class=" py-2 bg-gray-100 text-center font-medium text-xl rounded-lg"
            >
                단말기 가격 안내
            </div>
            <div class="flex justify-between px-5 py-1" style="font-size:17px;">
                <span>단말기</span>
                <span>1,254,000 WON</span>
            </div>

            <div class="flex justify-between px-5 py-1" style="font-size:17px;">
                <span>단말가격</span>
                <span>-0 WON</span>
            </div>

            <div class="flex justify-between px-5 py-1 font-semibold text-orange-600" style="font-size:17px;">
                <span>단말가격</span>
                <span>1,254,000 WON</span>
            </div>
        </div>
    </div>
</div>
