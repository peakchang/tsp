<script>
    import { pc_sidebar } from "$front_lib/store";
    import FixedButton from "$components/FixedButton.svelte";
    import { page } from "$app/stores";
    import Editor from "$components/Editor.svelte";
    import ImageUpload from "$components/ImageUpload.svelte";
    import axios from "axios";
    import { tick } from "svelte";

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
    let it_use = true;
    let it_jisho_status = true;
    let it_sunhal_use= true;
    let it_nohalin = true;
    let it_jisho_cate;
    let it_color;
    let it_colorcode;
    let it_img_list;

    let it_mainstan_tong;
    let it_mainstan_hyuh;
    let it_mainstan_capa;
    let it_mainstan_yog;
    let it_gongsi_model;
    let it_relation_item;
    let it_ph_tongsin;
    let it_seq;

    let capaArr;
    let yogList;

    let modifyVal;
    let modifyImageList;
    let outUpload = "on";
    let maxImgCount = 10;

    const serverUrl = import.meta.env.VITE_SERVER_URL;

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

    let allPhInfo = {};
    for (let i = 0; i < tongArr.length; i++) {
        allPhInfo[tongArr[i]] = {};
        for (let j = 0; j < valiableArr.length; j++) {
            allPhInfo[tongArr[i]]["it_ph_" + valiableArr[j]] = "";
        }
    }

    $: if (allPhInfo[it_mainstan_tong]) {
        let capaArrTemp = allPhInfo[it_mainstan_tong].it_ph_capa;
        capaArr = capaArrTemp.split(",");
    }

    $: it_mainstan_tong,
        (() => {
            yogList = change_mainstan_tong_axios(it_mainstan_tong);
        })();

    const get_it_realative = () => {};
    const choice_btn = ["업데이트"];
    // console.log($page.url.params.slug);
    console.log($page.params.slug);
    const item_id = $page.params.slug;

    const change_mainstan_tong_axios = async (tong) => {
        const getYogList = await axios.get(
            serverUrl + `/item/get_sel_yog?set_yog=${tong}`
        );
        yogList = getYogList.data.set_yog_list;
        return yogList;
    };

    const getEditorContent = (e) => {
        it_explan = e.detail.editorContent;
    };

    const getImageArr = (e) => {
        it_img_list = e.detail.editorContent;
    };

    $: {
        it_use = changeBoolToInt(it_use);
        it_jisho_status = changeBoolToInt(it_jisho_status);
        it_sunhal_use = changeBoolToInt(it_sunhal_use);
        it_nohalin = changeBoolToInt(it_nohalin);
        it_mainitem = changeBoolToInt(it_mainitem);
    }

    const changeBoolToInt = (chk) => {
        if (chk) {
            chk = 1;
        } else {
            chk = 0;
        }
        return chk;
    };

    const itemUpdate = () => {
        console.log(it_name);
        console.log(it_subname);
        console.log(it_cotype);
        console.log(it_dependitem);
        console.log(it_mainitem);
        console.log(it_maker);
        console.log(it_brand);
        console.log(it_model);
        console.log(it_explan);
        console.log(it_price);
        console.log(it_use);
        console.log(it_jisho_status);
        console.log(it_sunhal_use);
        console.log(it_nohalin);
        console.log(it_jisho_cate);
        console.log(it_color);
        console.log(it_colorcode);
        console.log(it_img_list);
        console.log(it_mainstan_tong);
        console.log(it_mainstan_hyuh);
        console.log(it_mainstan_capa);
        console.log(it_mainstan_yog);
        console.log(it_seq);
        console.log(allPhInfo);
    };
</script>

<FixedButton on:update={itemUpdate} {choice_btn} />
<div class="suit-font px-2 pt-16 mb-28" class:pl-44={!$pc_sidebar}>
    <div class="mt-8">
        <table
            class="table border-collapse w-full text-center rounded-xl text-xs md:text-sm"
        >
            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 상품코드 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    {item_id}
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 상품명 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        bind:value={it_name}
                        class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 서브네임 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        bind:value={it_subname}
                        class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 통신방식 </th>
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
                <th class="border border-slate-400 py-2 w-2/12"> 상품가격 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        bind:value={it_price}
                        class="border border-slate-400 py-1 rounded-md"
                    /> 원
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 출력순서 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        bind:value={it_seq}
                        class="border border-slate-400 py-1 rounded-md"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 제조사 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        bind:value={it_maker}
                        class="border border-slate-400 py-1 rounded-md"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 브랜드 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        bind:value={it_brand}
                        class="border border-slate-400 py-1 rounded-md"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 모델명 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        bind:value={it_model}
                        class="border border-slate-400 py-1 rounded-md"
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

                    <select
                        class="border border-slate-400 py-1 px-3 rounded-md ml-5"
                        bind:value={it_dependitem}
                    >
                        <option value="5G">5G</option>
                        <option value="LTE">LTE</option>
                    </select>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 판매가능 </th>
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
                <th class="border border-slate-400 py-2 w-2/12"> 연관상품 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <select
                        class="border border-slate-400 py-1 px-3 rounded-md"
                        on:change={get_it_realative}
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 체크사항 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <label>
                        <input type="checkbox" bind:checked={it_jisho_status} />
                        <span>지식쇼핑 입점여부</span>
                    </label>

                    <label class="ml-5">
                        <input type="checkbox" bind:checked={it_sunhal_use} />
                        <span>선약할인 적용여부</span>
                    </label>

                    <label class="ml-5">
                        <input type="checkbox" bind:checked={it_nohalin} />
                        <span>전체할인 적용여부</span>
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
                        class="border border-slate-400 py-1 rounded-md"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 상품설명 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <Editor
                        on:getEditorContent={getEditorContent}
                        {modifyVal}
                    />
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
                                    class="border border-slate-400 py-1 rounded-md w-11/12"
                                />
                            </div>

                            <div class="text-xs">
                                {key.toUpperCase()} 용량 <br />
                                <input
                                    type="text"
                                    bind:value={value.it_ph_capa}
                                    class="border border-slate-400 py-1 rounded-md w-11/12"
                                />
                            </div>

                            <div class="text-xs">
                                {key.toUpperCase()} MNP 공시할인 <br />
                                <input
                                    type="text"
                                    bind:value={value.it_ph_mnpgdisc}
                                    class="border border-slate-400 py-1 rounded-md w-11/12"
                                />
                            </div>

                            <div class="text-xs">
                                {key.toUpperCase()} MNP 선약할인 <br />
                                <input
                                    type="text"
                                    bind:value={value.it_ph_mnpsdisc}
                                    class="border border-slate-400 py-1 rounded-md w-11/12"
                                />
                            </div>

                            <div class="text-xs">
                                {key.toUpperCase()}기변 공시할인 <br />
                                <input
                                    type="text"
                                    bind:value={value.it_ph_gibgdisc}
                                    class="border border-slate-400 py-1 rounded-md w-11/12"
                                />
                            </div>

                            <div class="text-xs">
                                {key.toUpperCase()} 기변 선약할인 <br />
                                <input
                                    type="text"
                                    bind:value={value.it_ph_gibsdisc}
                                    class="border border-slate-400 py-1 rounded-md w-11/12"
                                />
                            </div>
                        </div>
                    </td>
                </tr>
            {/each}

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 출력 기준 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <div class="grid grid-cols-2 lg:grid-cols-4">
                        <div>
                            <span>기존통신사 :</span>
                            <select
                                class="border border-slate-400 py-1 px-3 rounded-md"
                                bind:value={it_mainstan_tong}
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
                                <option value="gongsi">공시지원금</option>
                                <option value="sunyak">선택약정</option>
                            </select>
                        </div>

                        {#if capaArr}
                            <div>
                                <span class="ml-3">용량 :</span>
                                <select
                                    class="border border-slate-400 py-1 px-3 rounded-md"
                                    bind:value={it_mainstan_capa}
                                >
                                    {#each capaArr as capa}
                                        <option value={capa}>{capa}</option>
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
                                            value={val.py_name}
                                            selected={idx == 2}
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
                        class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4"
                    />
                </td>
            </tr>
            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 색상코드 </th>

                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        bind:value={it_colorcode}
                        class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4"
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
    </div>
</div>

<style>
    :global(.ql-editor) {
        height: 320px;
        max-height: 320px;
        overflow: auto;
    }
</style>
