<script>
    import { page } from "$app/stores";
    import CalculRadio from "$components/CalculRadio.svelte";
    import ColorRadio from "$components/ColorRadio.svelte";
    import ItemInfo from "./ItemInfo.svelte";
    import YogModal from "./YogModal.svelte";
    import axios from "axios";

    import { numComma } from "$front_lib/lib";
    let addQuery = $page.params.id;

    let showModal = true;

    let capaVal;
    let capaTxt;
    let pretongVal;
    let nowtongVal;
    let hyuhVal;
    let halTermVal;
    let fPrice;

    let colorVal;
    let usimVal;
    let yogVal;
    let yogInfo;
    let allYog;
    let get_item_promise = getItemInfo();
    let get_item_info;
    let mainstan = {};
    let allInfo = { sk: {}, kt: {}, lg: {} };
    let changeTongStatus;
    let changeTongBaseYog;

    // 할인 및 계산
    let nowGongsi;
    let nowHalin;
    let halwon;
    let monthHalwon;
    let yogName;
    let yogFee;
    let sunyakhal;
    let resultFee;

    let detailPropVal;

    // radio 메뉴 변수 모음
    let colorList = [];

    let capaList = [];

    let tongList = ["sk", "kt", "lg"];

    let hyuhList = [
        { value: "gongsi", text: "공시지원금" },
        { value: "sunyak", text: "선택약정" },
    ];
    let halTermList = [
        { value: 1, text: "완납" },
        { value: 24, text: "24개월" },
        { value: 30, text: "30개월" },
    ];
    let usimList = [
        { value: "buy", text: "구매" },
        { value: "prev", text: "기존유심" },
    ];

    // 초기값 정하기
    halTermVal = halTermList[1].value;
    usimVal = usimList[1].value;

    async function getItemInfo() {
        try {
            const res = await axios.get(
                import.meta.env.VITE_SERVER_URL + `/get_item/${addQuery}`
            );

            // 공시지원금 넣기
            allInfo.sk.gongsi = res.data.get_item_gongsi.gj_sk.split(",");
            allInfo.kt.gongsi = res.data.get_item_gongsi.gj_kt.split(",");
            allInfo.lg.gongsi = res.data.get_item_gongsi.gj_lg.split(",");

            get_item_info = res.data.get_item_info;

            // 할인 정보 넣기
            for (let i = 0; i < tongList.length; i++) {
                allInfo[tongList[i]].mnp_g_disc =
                    get_item_info["it_ph_mnpgdisc_" + tongList[i]].split(",");

                allInfo[tongList[i]].mnp_s_disc =
                    get_item_info["it_ph_mnpsdisc_" + tongList[i]].split(",");

                allInfo[tongList[i]].gib_g_disc =
                    get_item_info["it_ph_gibgdisc_" + tongList[i]].split(",");

                allInfo[tongList[i]].gib_s_disc =
                    get_item_info["it_ph_gibsdisc_" + tongList[i]].split(",");

                const yogd = res.data.get_yog;
                allInfo[tongList[i]].all_yog = [];
                for (let l = 0; l < yogd.length; l++) {
                    if (tongList[i] == yogd[l].py_tong) {
                        allInfo[tongList[i]].all_yog.push(yogd[l]);
                    }
                }
            }

            console.log("*********************** 정상체크~~~");
            // 색상코드 메뉴 만들기

            let colorTemp;
            let colorCodeTemp;
            if (get_item_info.it_color && get_item_info.it_colorcode) {
                colorTemp = get_item_info.it_color.split(",");
                colorCodeTemp = get_item_info.it_colorcode.split(",");
                Object.keys(colorTemp).find((key) => {
                    const tempColorObj = {
                        value: colorTemp[key],
                        color: colorCodeTemp[key],
                    };
                    colorList.push(tempColorObj);
                });
                colorVal = colorList[0].value;
            }

            let mainstanTemp = get_item_info.it_mainstan
                .replace(/[\\"/]/g, "")
                .split(",");
            mainstan.nowTong = mainstanTemp[0];
            mainstan.preTong = mainstanTemp[1];
            mainstan.hyuh = mainstanTemp[2];
            mainstan.capa = mainstanTemp[3];
            mainstan.yog = mainstanTemp[4];

            changeTongBaseYog = mainstan.yog;

            // // 초기 할인유형 셋팅
            hyuhVal = hyuhList[mainstan.hyuh].value;

            // // 초기 통신사 세팅
            nowtongVal = mainstan.nowTong;
            pretongVal = mainstan.nowTong;
            // // 초기 기본 셋팅 용량 만들기
            let capaTemp = get_item_info["it_ph_capa_" + nowtongVal].split(",");
            for (let i = 0; i < capaTemp.length; i++) {
                let capaTempObj = { value: i, text: capaTemp[i] };
                capaList.push(capaTempObj);
            }

            console.log(allYog);
            // 초기 기본 요금제 셋팅
            capaVal = capaList[mainstan.capa].value;
            yogVal = mainstan.yog;
            allYog = allInfo[nowtongVal].all_yog;
            yogInfo = allYog[yogVal];
            // 초기 출고가
            fPrice = Number(
                get_item_info["it_ph_fprice_" + nowtongVal].split(",")[capaVal]
            );

            return get_item_info;
        } catch (error) {
            console.log(error);
        }
    }

    // colorVal이 나오는 시점은 불려지고 난 뒤임, 메뉴 만드는 action!
    let prev_tong_val;
    $: {
        if (allInfo[nowtongVal]) {
            // 용량 변경시 출고가 변경
            fPrice = Number(
                get_item_info["it_ph_fprice_" + nowtongVal].split(",")[capaVal]
            );
            if (prev_tong_val != nowtongVal) {
                changeTongStatus = true;
            } else {
                changeTongStatus = false;
            }
            prev_tong_val = nowtongVal;

            // 요금제 변경시 요금제 정보 변경
            allYog = allInfo[nowtongVal].all_yog;
            yogInfo = allYog[yogVal];

            nowGongsi = Number(allInfo[nowtongVal].gongsi[yogVal]);
            let gaipType = pretongVal == nowtongVal ? "gib" : "mnp";
            let halinType = hyuhVal == "gongsi" ? "g" : "s";
            nowHalin = Number(
                allInfo[nowtongVal][`${gaipType}_${halinType}_disc`][yogVal]
            );

            // 공시 할인시 출고가 - 공시 - 할인
            if (hyuhVal == "gongsi") {
                halwon = fPrice - nowGongsi - nowHalin;
            } else {
                halwon = fPrice - nowHalin;
            }

            monthHalwon = Math.round(halwon / halTermVal);

            console.log(yogInfo);

            try {
                yogName = yogInfo.py_name;
            } catch (error) {
                yogName = '';
            }
            

            // 기본료
            sunyakhal = yogInfo.py_fee * 0.25;
            yogFee =
                hyuhVal == "gongsi"
                    ? yogInfo.py_fee
                    : yogInfo.py_fee - sunyakhal;
            resultFee = monthHalwon + yogFee;

            capaTxt = capaList[capaVal].text;
            detailPropVal = {
                subname: get_item_info.it_subname,
                capa: capaTxt,
                halwon,
                monthHalwon,
                expain_accept: get_item_info.it_explan_all,
            };
        }
    }
</script>

{#await get_item_promise}
    <div>...loading</div>
{:then getItemVal}
    <YogModal
        bind:showModal
        bind:allYog
        bind:yogVal
        bind:changeTongStatus
        {changeTongBaseYog}
    />
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
                                value={tong}
                                class="hidden peer"
                                bind:group={pretongVal}
                                slot="input-set"
                            />
                            <span slot="inner-text">
                                <img
                                    src="/img/{tong}_radio.png"
                                    alt=""
                                    class="w-7 mx-auto"
                                />
                            </span>
                        </CalculRadio>
                    {/each}
                    <CalculRadio>
                        <input
                            type="radio"
                            value="other"
                            class="hidden peer"
                            bind:group={pretongVal}
                            slot="input-set"
                        />
                        <span slot="inner-text">알뜰폰</span>
                    </CalculRadio>
                </div>

                <!-- ************** -->

                <div
                    class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base"
                >
                    변경 통신사
                </div>
                <div class="flex px-2 col-span-4 mt-3">
                    {#each tongList as tong, idx}
                        {#if getItemVal["it_ph_fprice_" + tong]}
                            <CalculRadio pyVal="1">
                                <input
                                    type="radio"
                                    value={tong}
                                    class="hidden peer"
                                    bind:group={nowtongVal}
                                    slot="input-set"
                                />
                                <span slot="inner-text">
                                    <img
                                        src="/img/{tong}_radio.png"
                                        alt=""
                                        class="w-7 mx-auto"
                                    />
                                </span>
                            </CalculRadio>
                        {/if}
                    {/each}
                </div>

                <!-- ************** -->

                <div
                    class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base"
                >
                    요금제
                </div>
                <div class="flex px-2 col-span-4 mt-3">
                    <div class="w-full">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            class="border border-gray-400 w-full mr-2 rounded-md py-2 px-3 cursor-pointer flex justify-between items-center"
                            on:click={() => {
                                showModal = !showModal;
                            }}
                        >
                            <span>{yogInfo.py_name}</span>

                            <span
                                class="text-sm bg-blue-400 text-white px-2 py-1 rounded-md"
                                >변경하기</span
                            >
                        </div>
                        <div class="px-2 mt-1">
                            <span class="f text-sm"
                                ><i class="fa-solid fa-wifi" /> : 무제한
                                <i class="fa-solid fa-phone" />
                                : 무제한 <i class="fa-solid fa-comment-sms" /> :
                                무제한</span
                            >
                        </div>
                        <div class="text-xs px-2 mt-1">
                            <span>{yogInfo.py_addinfo}</span>
                        </div>
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
                    {#each usimList as usim, idx}
                        <CalculRadio>
                            <input
                                type="radio"
                                value={usim.value}
                                class="hidden peer"
                                bind:group={usimVal}
                                slot="input-set"
                            />
                            <span slot="inner-text">{usim.text}</span>
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
                    <span>출고가</span>
                    <span>{numComma(fPrice)}원</span>
                </div>

                {#if hyuhVal == "gongsi"}
                    <div class="flex justify-between px-5 py-1 font-medium">
                        <span>공시지원금</span>
                        <span>-{numComma(nowGongsi)}원</span>
                    </div>
                {/if}

                <div class="flex justify-between px-5 py-1 font-medium">
                    <span>더싼할인</span>
                    <span>-{numComma(nowHalin)}원</span>
                </div>

                <div
                    class="flex justify-between px-5 py-1 font-semibold text-orange-600"
                >
                    <span>할부원금</span>
                    <span>{numComma(halwon)}원</span>
                </div>

                {#if halTermVal != 1}
                    <div
                        class="flex justify-between px-5 py-1 font-semibold text-orange-600"
                    >
                        <span>월 할부금</span>
                        <span>{numComma(monthHalwon)}원</span>
                    </div>
                {/if}

                <div
                    class=" py-2 bg-gray-100 text-center font-semibold text-xl rounded-lg"
                >
                    요금제 안내
                </div>
                <div class="flex justify-between font-medium px-5 py-1" sty>
                    <span>{yogName}</span>
                    <span>{numComma(yogFee)}원</span>
                </div>

                {#if hyuhVal == "sunyak"}
                    <div class="flex justify-between font-medium px-5 py-1">
                        <span>선택약정할인</span>
                        <span>-{numComma(sunyakhal)}원</span>
                    </div>
                {/if}

                <div
                    class="flex justify-between px-5 py-1 font-semibold text-orange-600"
                >
                    <span>월 기본료</span>
                    <span>{numComma(yogFee)}원</span>
                </div>

                <div
                    class="result_calcul mt-3 border border-gray-400 rounded-md overflow-hidden text-center"
                >
                    <div class="bg-slate-500 text-white p-2">
                        <span class="text-xl font-semibold">월 청구요금</span>
                        <span class="text-xs">(월 할부금 + 월 기본료)</span>
                    </div>
                    <div class="text-2xl mt-3 font-bold">
                        월 {numComma(resultFee)}원
                    </div>

                    {#if halTermVal != 1}
                        <div class="mb-3 text-sm">
                            ({numComma(monthHalwon)} + {numComma(yogFee)}원)
                        </div>
                    {:else}
                        <div class="mb-3 text-sm">
                            (입금하실 금액 : {numComma(halwon)})
                        </div>
                    {/if}
                </div>
                <div class="text-center">
                    <label class="cursor-pointer text-sm">
                        <input type="checkbox" class="" />
                        할부이자 미포함 금액
                    </label>
                </div>
            </div>
        </div>
    </div>

    <ItemInfo {detailPropVal} />
{/await}
