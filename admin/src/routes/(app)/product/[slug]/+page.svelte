<script>
    import { pc_sidebar } from "$front_lib/store";
    import FixedButton from "$components/FixedButton.svelte";
    import { page } from "$app/stores";
    import Editor from "$components/Editor.svelte";
    import ImageUpload from "$components/ImageUpload.svelte";
    import axios from "axios";
    import { tick } from "svelte";
    import Sortable from "sortablejs";

    import { onMount } from "svelte";
    import { each } from "svelte/internal";

    let it_name;
    let it_subname;
    let it_cotype;
    let it_dependitem;
    let it_mainitem = false;
    let it_maker;
    let it_brand;
    let it_model;
    let it_explan;
    let it_price;
    let it_hignend_chk;
    let it_use;
    let it_jisho_status;
    let it_sunhal_use;
    let it_nohalin;
    let it_jisho_cate;
    let it_color;
    let it_colorcode;
    let it_img_list;
    let mainstan_json;
    let it_mainstan_nowtong;
    let it_mainstan_pretong;
    let it_mainstan_hyuh;
    let it_mainstan_capa;
    let it_mainstan_yog;
    let getGongsiModels;
    let it_gongsi_model;
    let it_relation_item_arr = [];
    let it_ph_tongsin;
    let it_seq;
    let capaArr;
    let yogList;
    let modifyVal;
    let modifyImageList;
    let allDevice;
    let outUpload = "on";
    let maxImgCount = 10;
    const item_id = $page.params.slug;

    // 통신사별 정책값은 객체를 사용한 동적 변수로 할당
    let allPhInfo = {};
    let tongArr = ["sk", "kt", "lg"];
    let valiableArr = [
        "fprice",
        "capa",
        "newdisc",
        "mnpgdisc",
        "mnpsdisc",
        "gibgdisc",
        "gibsdisc",
    ];
    for (let i = 0; i < tongArr.length; i++) {
        allPhInfo[tongArr[i]] = {};
        for (let j = 0; j < valiableArr.length; j++) {
            allPhInfo[tongArr[i]]["it_ph_" + valiableArr[j]] = "";
        }
    }

    // mainstan 통신사 변경시 용량 선택값 변화 주기
    $: if (allPhInfo[it_mainstan_nowtong]) {
        let capaArrTemp = allPhInfo[it_mainstan_nowtong].it_ph_capa;
        capaArr = capaArrTemp.split(",");
    }

    // 최초 모든 값 불러오기
    let getProductInfo = get_product_info();

    async function get_product_info() {
        try {
            const res = await axios.get(
                import.meta.env.VITE_SERVER_URL +
                    `/item/get_product_info?it_id=${item_id}`
            );
            const json = await res.data.get_product;
            getGongsiModels = await res.data.get_all_gongsi;
            allDevice = await res.data.get_all_devices;

            it_name = json.it_name;
            it_subname = json.it_subname;
            it_cotype = json.it_cotype;

            if (json.it_img_list) {
                it_img_list = json.it_img_list.split(",");
            }

            it_dependitem = json.it_dependitem;
            it_mainitem = json.it_mainitem;
            it_maker = json.it_maker;
            it_brand = json.it_brand;
            it_model = json.it_model;
            it_price = json.it_price;
            it_use = json.it_use;

            it_jisho_status = json.it_jisho_status;
            it_hignend_chk = json.it_hignend_chk;
            it_sunhal_use = json.it_sunhal_use;
            it_nohalin = json.it_nohalin;
            it_jisho_cate = json.it_jisho_cate;
            it_color = json.it_color;
            it_colorcode = json.it_colorcode;
            it_seq = json.it_seq;
            it_gongsi_model = json.it_gongsi_model;

            console.log(json.it_relation_item);
            if(json.it_relation_item){
                it_relation_item_arr = JSON.parse(json.it_relation_item);
            }

            // 에디터와 이미지 업로드 기능에 기본값 넣어주기
            modifyVal = json.it_explan;

            modifyImageList = it_img_list;

            // 정책 값들 동적변수로 기본값 할당
            for (const key in allPhInfo) {
                allPhInfo[key].it_ph_fprice = json["it_ph_fprice_" + key];
                allPhInfo[key].it_ph_capa = json["it_ph_capa_" + key];
                allPhInfo[key].it_ph_newdisc = json["it_ph_newdisc_" + key];
                allPhInfo[key].it_ph_mnpgdisc = json["it_ph_mnpgdisc_" + key];
                allPhInfo[key].it_ph_mnpsdisc = json["it_ph_mnpsdisc_" + key];
                allPhInfo[key].it_ph_gibgdisc = json["it_ph_gibgdisc_" + key];
                allPhInfo[key].it_ph_gibsdisc = json["it_ph_gibsdisc_" + key];
            }

            const it_mainstan_temp = json.it_mainstan.replace(/"/, "");
            mainstan_json = it_mainstan_temp.split(",");
            it_mainstan_nowtong = mainstan_json[0];
            it_mainstan_pretong = mainstan_json[1];
            it_mainstan_hyuh = mainstan_json[2] ? mainstan_json[2] : 0;
            it_mainstan_capa = mainstan_json ? Number(mainstan_json[3]) : 0;
            it_mainstan_yog = mainstan_json[4] ? Number(mainstan_json[4]) : 0;

            return json;
        } catch (error) {
            console.log(error.message);
        }
    }

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    // mainstan 통신사 변경시 요금제 불러오기
    $: it_mainstan_nowtong,
        (() => {
            yogList = change_mainstan_tong_axios(it_mainstan_nowtong);
        })();

    const change_mainstan_tong_axios = async (tong) => {
        const getYogList = await axios.get(
            serverUrl + `/item/get_sel_yog?set_yog=${tong}`
        );
        yogList = getYogList.data.set_yog_list;
        return yogList;
    };

    // 연관상품 추가 함수

    const get_it_realative = (e) => {
        const obj = it_relation_item_arr;
        const searchVal = e.target.value;
        if (!e.target.value) {
            return false;
        } else if (
            it_relation_item_arr &&
            Object.keys(obj).find((key) =>
                Object.keys(obj[key]).find(
                    (key2) => obj[key][key2] === searchVal
                )
            )
        ) {
            return false;
        }

        let relationTemp = {
            itid: e.target.value,
            itname: e.target.options[e.target.selectedIndex].text,
        };
        it_relation_item_arr = [...it_relation_item_arr, relationTemp];
        // it_relation_item_arr.push(relationTemp);
        console.log(it_relation_item_arr);
    };

    // const del_relation_item = (e) => {
    //     console.log(e.target);
    // }
    function del_relation_item(e) {
        const tempRelationArr = [...it_relation_item_arr];
        for (let i = 0; i < tempRelationArr.length; i++) {
            console.log(tempRelationArr[i]);
            if (tempRelationArr[i].itname === this.value) {
                tempRelationArr.splice(i, 1);
                i--;
            }
        }
        console.log(tempRelationArr);
        it_relation_item_arr = tempRelationArr
    }

    // 우측 상단 고정 기본 버튼 선택
    const choice_btn = ["업데이트"];

    // Editor components 에서 불러온 데이터 (e.detail.editorContent) 를 it_explan 에 할당
    const getEditorContent = (e) => {
        it_explan = e.detail.editorContent;
    };

    // imageUpload components 에서 불러온 데이터 (e.detail.getImgList) 를 it_img_list 에 할당
    const getImageArr = (e) => {
        if (e.detail.getImgList[0]) {
            it_img_list = e.detail.getImgList;
        }
    };

    // bind:checked 를 하면 기본값은 boolean 으로 지정된다. DB 저장을 위해 1 과 0 으로 변경
    $: {
        it_use = changeBoolToInt(it_use);
        it_jisho_status = changeBoolToInt(it_jisho_status);
        it_sunhal_use = changeBoolToInt(it_sunhal_use);
        it_nohalin = changeBoolToInt(it_nohalin);
        it_mainitem = changeBoolToInt(it_mainitem);
        it_hignend_chk = changeBoolToInt(it_hignend_chk);
    }

    const changeBoolToInt = (chk) => {
        if (chk) {
            chk = 1;
        } else {
            chk = 0;
        }
        return chk;
    };

    // 기본 통신사 값은 그냥 DB 저장용 및 리스트에서 확인용이다. it_mainstan_nowtong 이 변하면 변경
    $: it_ph_tongsin = it_mainstan_nowtong;

    // 상품 업로드 하기~~
    const itemUpdate = async () => {
        console.log(it_img_list);
        if (it_img_list) {
            it_img_list = it_img_list.join();
        }

        let it_mainstan = `${it_mainstan_nowtong},${it_mainstan_pretong},${it_mainstan_hyuh},${it_mainstan_capa},${it_mainstan_yog}`;

        let it_relation_item = it_relation_item_arr
            ? JSON.stringify(it_relation_item_arr)
            : "";

        await axios
            .post(serverUrl + "/item/item_update_div", {
                it_id: item_id,
                it_name: it_name,
                it_subname: it_subname,
                it_cotype: it_cotype,
                it_dependitem: it_dependitem,
                it_mainitem: it_mainitem,
                it_maker: it_maker,
                it_brand: it_brand,
                it_model: it_model,
                it_explan: it_explan,
                it_price: it_price,
                it_use: it_use,
                it_jisho_status: it_jisho_status,
                it_sunhal_use: it_sunhal_use,
                it_nohalin: it_nohalin,
                it_hignend_chk,
                it_jisho_cate: it_jisho_cate,
                it_color: it_color,
                it_gongsi_model,
                it_colorcode: it_colorcode,
                it_img_list,
                it_mainstan,
                it_seq: it_seq,
                it_ph_tongsin,
                it_relation_item,
                allPhInfo,
            })
            .then((res) => {
                alert("완료 되었습니다.");
                // 굳이 다시 불러올 필요 없이 이미지 리스트만 변경 합세
                it_img_list = it_img_list.split(",");
            })
            .catch((err) => {
                alert(err);
            });
    };
</script>

<FixedButton on:update={itemUpdate} {choice_btn} />
<div class="suit-font px-2 pt-16 mb-28" class:pl-44={!$pc_sidebar}>
    <div class="mt-8">
        {#await getProductInfo}
            <div>...loading</div>
        {:then getProductInfo}
            <table
                class="table border-collapse w-full text-center rounded-xl text-xs md:text-sm"
            >
                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        상품코드
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        {item_id}
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        상품명
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <input
                            type="text"
                            bind:value={it_name}
                            class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4 pl-2"
                        />
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        서브네임
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <input
                            type="text"
                            bind:value={it_subname}
                            class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4 pl-2"
                        />
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        통신방식
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <select
                            class="border border-slate-400 py-1 px-3 rounded-md"
                            bind:value={it_cotype}
                        >
                            <option value="5G">5G</option>
                            <option value="LTE">LTE</option>
                        </select>
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        상품가격
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <input
                            type="text"
                            bind:value={it_price}
                            class="border border-slate-400 py-1 rounded-md pl-2"
                        /> 원
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        출력순서
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <input
                            type="text"
                            bind:value={it_seq}
                            class="border border-slate-400 py-1 rounded-md pl-2"
                        />
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        제조사
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <input
                            type="text"
                            bind:value={it_maker}
                            class="border border-slate-400 py-1 rounded-md pl-2"
                        />
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        브랜드
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <input
                            type="text"
                            bind:value={it_brand}
                            class="border border-slate-400 py-1 rounded-md pl-2"
                        />
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        모델명
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <input
                            type="text"
                            bind:value={it_model}
                            class="border border-slate-400 py-1 rounded-md pl-2"
                        />
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        종속모델상태
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <label>
                            메인상품 체크 : <input
                                type="checkbox"
                                bind:checked={it_mainitem}
                            />
                        </label>

                        {#if !it_mainitem}
                            <select
                                class="border border-slate-400 py-1 px-3 rounded-md ml-5"
                                bind:value={it_dependitem}
                            >
                                <option value="5G">5G</option>
                                <option value="LTE">LTE</option>
                            </select>
                        {/if}
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        판매가능
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <label>
                            판매 여부 : <input
                                type="checkbox"
                                value="1"
                                bind:checked={it_use}
                            />
                        </label>
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        연관상품
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <div class="flex items-center">
                            <select
                                class="border border-slate-400 py-1 px-3 rounded-md mr-8"
                                on:change={get_it_realative}
                            >
                                <option value="">선택하세요</option>
                                {#each allDevice as device}
                                    <option value={device.it_id}
                                        >{device.it_subname}</option
                                    >
                                {/each}
                            </select>

                            <div>
                                {#each it_relation_item_arr as relation_item}
                                    <span
                                        class="p-1 border border-zinc-400 rounded-md mr-2"
                                        >{relation_item.itname}
                                        <button
                                            class="text-red-500"
                                            value={relation_item.itname}
                                            on:click|capture={del_relation_item}
                                            ><i
                                                class="fa-regular fa-circle-xmark"
                                            /></button
                                        >
                                    </span>
                                {/each}
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        체크사항
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <label>
                            <input
                                type="checkbox"
                                bind:checked={it_jisho_status}
                            />
                            <span>지식쇼핑 입점여부</span>
                        </label>

                        <label class="ml-5">
                            <input
                                type="checkbox"
                                bind:checked={it_sunhal_use}
                            />
                            <span>선약할인 적용여부</span>
                        </label>

                        <label class="ml-5">
                            <input type="checkbox" bind:checked={it_nohalin} />
                            <span>전체할인 적용여부</span>
                        </label>

                        <label class="ml-5">
                            <input
                                type="checkbox"
                                bind:checked={it_hignend_chk}
                            />
                            <span>하이엔드 모델 적용여부</span>
                        </label>
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        지식쇼핑 카테고리ID
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <input
                            type="text"
                            bind:value={it_jisho_cate}
                            class="border border-slate-400 py-1 rounded-md pl-2"
                        />
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        상품설명
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <Editor
                            on:getEditorContent={getEditorContent}
                            {modifyVal}
                        />
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        공시 적용
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <select
                            bind:value={it_gongsi_model}
                            class="border border-slate-400 py-1 rounded-md pl-2"
                        >
                            {#each getGongsiModels as model}
                                <option value={model.gj_model_name}
                                    >{model.gj_model_name}</option
                                >
                            {/each}
                        </select>
                    </td>
                </tr>

                {#each Object.entries(allPhInfo) as [key, value] (key)}
                    <tr>
                        <th class="border border-slate-400 py-2 w-2/12">
                            {key.toUpperCase()} 지원금
                        </th>
                        <td class="border border-slate-400 py-2 text-left pl-3">
                            <div class="grid grid-cols-2 lg:grid-cols-3">
                                <div class="text-xs">
                                    {key.toUpperCase()} 출고가 <br />
                                    <input
                                        type="text"
                                        bind:value={value.it_ph_fprice}
                                        class="border border-slate-400 py-1 rounded-md w-11/12 pl-2"
                                    />
                                </div>

                                <div class="text-xs">
                                    {key.toUpperCase()} 용량 <br />
                                    <input
                                        type="text"
                                        bind:value={value.it_ph_capa}
                                        class="border border-slate-400 py-1 rounded-md w-11/12 pl-2"
                                    />
                                </div>

                                <div class="text-xs">
                                    {key.toUpperCase()} MNP 공시할인 <br />
                                    <input
                                        type="text"
                                        bind:value={value.it_ph_mnpgdisc}
                                        class="border border-slate-400 py-1 rounded-md w-11/12 pl-2"
                                    />
                                </div>

                                <div class="text-xs">
                                    {key.toUpperCase()} MNP 선약할인 <br />
                                    <input
                                        type="text"
                                        bind:value={value.it_ph_mnpsdisc}
                                        class="border border-slate-400 py-1 rounded-md w-11/12 pl-2"
                                    />
                                </div>

                                <div class="text-xs">
                                    {key.toUpperCase()}기변 공시할인 <br />
                                    <input
                                        type="text"
                                        bind:value={value.it_ph_gibgdisc}
                                        class="border border-slate-400 py-1 rounded-md w-11/12 pl-2"
                                    />
                                </div>

                                <div class="text-xs">
                                    {key.toUpperCase()} 기변 선약할인 <br />
                                    <input
                                        type="text"
                                        bind:value={value.it_ph_gibsdisc}
                                        class="border border-slate-400 py-1 rounded-md w-11/12 pl-2"
                                    />
                                </div>
                            </div>
                        </td>
                    </tr>
                {/each}

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        출력 기준
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <div class="grid grid-cols-2 lg:grid-cols-4">
                            <div>
                                <span>선택 통신사 :</span>
                                <select
                                    class="border border-slate-400 py-1 px-3 rounded-md"
                                    bind:value={it_mainstan_nowtong}
                                >
                                    {#each Object.entries(allPhInfo) as [key, value] (key)}
                                        <option value={key}
                                            >{key.toUpperCase()}</option
                                        >
                                    {/each}
                                </select>
                            </div>

                            <div>
                                <span>이전 통신사 :</span>
                                <select
                                    class="border border-slate-400 py-1 px-3 rounded-md"
                                    bind:value={it_mainstan_pretong}
                                >
                                    {#each Object.entries(allPhInfo) as [key, value] (key)}
                                        <option value={key}
                                            >{key.toUpperCase()}</option
                                        >
                                    {/each}
                                </select>
                            </div>

                            <div>
                                <span class="ml-3">할인유형 :</span>
                                <select
                                    class="border border-slate-400 py-1 px-3 rounded-md"
                                    bind:value={it_mainstan_hyuh}
                                >
                                    <option value="0">공시지원금</option>
                                    <option value="1">선택약정</option>
                                </select>
                            </div>

                            {#if capaArr}
                                <div>
                                    <span class="ml-3">용량 :</span>
                                    <select
                                        class="border border-slate-400 py-1 px-3 rounded-md"
                                        bind:value={it_mainstan_capa}
                                    >
                                        {#each capaArr as capa, idx}
                                            <option value={idx}>{capa}</option>
                                        {/each}
                                    </select>
                                </div>
                            {/if}

                            <div>
                                <span class="ml-3">요금제 :</span>
                                <select
                                    class="border border-slate-400 py-1 px-3 rounded-md"
                                    bind:value={it_mainstan_yog}
                                >
                                    {#await yogList}
                                        <option>...대기</option>
                                    {:then valList}
                                        {#each valList as val, idx}
                                            <option
                                                value={idx}
                                                selected={idx ==
                                                    it_mainstan_yog}
                                                >{val.py_name}</option
                                            >
                                        {/each}
                                    {/await}
                                </select>
                            </div>
                        </div>
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12"> 색상 </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <input
                            type="text"
                            bind:value={it_color}
                            class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4 pl-2"
                        />
                    </td>
                </tr>
                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        색상코드
                    </th>

                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <input
                            type="text"
                            bind:value={it_colorcode}
                            class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4 pl-2"
                        />
                    </td>
                </tr>

                <tr>
                    <th class="border border-slate-400 py-2 w-2/12">
                        이미지 리스트
                    </th>
                    <td class="border border-slate-400 py-2 text-left pl-3">
                        <ImageUpload
                            on:getImageArr={getImageArr}
                            {modifyImageList}
                            {outUpload}
                            {maxImgCount}
                        />
                    </td>
                </tr>
            </table>
        {/await}
    </div>
</div>

<style>
    :global(.ql-editor) {
        height: 320px;
        max-height: 320px;
        overflow: auto;
    }
</style>
