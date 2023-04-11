<script>
    import { pc_sidebar } from "$front_lib/store";
    import FixedButton from "$components/FixedButton.svelte";
    import { page } from "$app/stores";
    import TongTr from "$components/TongTr.svelte";

    let it_name;
    let it_subname;
    let it_cotype;
    let it_dependitem;
    let it_mainitem;
    let it_maker;
    let it_brand;
    let it_model;
    let it_explan;
    let it_price;
    let it_use;
    let it_jisho_status;
    let it_sunhal_use;
    let it_nohalin;
    let it_jisho_cate;
    let it_color;
    let it_colorcode;
    let it_img1;
    let it_img2;
    let it_img3;
    let it_img4;
    let it_img5;
    let it_img6;
    let it_img7;
    let it_img8;
    let it_img9;
    let it_img10;
    let it_mainstan;
    let it_gongsi_model;
    let it_relation_item;
    let it_ph_tongsin;

    let it_seq;

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
            allPhInfo[tongArr[i]]["it_ph_" + valiableArr[j]] = "dsfsfd";
        }
    }
    console.log(allPhInfo);

    const testUpdate = () => {
        console.log("asdjflasjdf");
        console.log(it_ph_sk_fprice);
        console.log(it_ph_sk_capa);
    };
    const get_it_realative = () => {};
    const choice_btn = ["업데이트"];
    // console.log($page.url.params.slug);
    console.log($page.params.slug);
    const item_id = $page.params.slug;

    let testVal;
</script>

<FixedButton on:update={testUpdate} {choice_btn} />
<div class="suit-font px-2 pt-16 mb-28" class:pl-44={!$pc_sidebar}>
    {#each Object.entries(allPhInfo) as [keys, value] (keys)}
        {keys}
        <input type="text" bind:value={value.it_ph_capa} />
        <!-- {#each Object.entries(value) as [key, val] (key)}
            {key}
            {val}
        {/each} -->
    {/each}

    <button on:click={()=>{
        console.log(allPhInfo);
        
    }}>ssss</button>

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
                <th class="border border-slate-400 py-2 w-2/12">
                    종속모델상태
                </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <label>
                        메인상품 체크 : <input
                            type="checkbox"
                            bind:value={it_mainitem}
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
                            bind:value={it_use}
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
                    >
                        <option value="5G">5G</option>
                        <option value="LTE">LTE</option>
                    </select>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 체크사항 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <label>
                        <input type="checkbox" bind:value={it_jisho_status} />
                        <span>지식쇼핑 입점여부</span>
                    </label>

                    <label class="ml-5">
                        <input type="checkbox" bind:value={it_sunhal_use} />
                        <span>선약할인 적용여부</span>
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
                    <!-- <Editor /> -->
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 출력 기준 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <div class="grid grid-cols-2 lg:grid-cols-4">
                        <div>
                            <span>기존통신사 :</span>
                            <select
                                class="border border-slate-400 py-1 px-3 rounded-md"
                            >
                                <option value="SK">SK</option>
                                <option value="KT">KT</option>
                                <option value="LG U+">LG U+</option>
                            </select>
                        </div>

                        <div>
                            <span class="ml-3">할인유형 :</span>
                            <select
                                class="border border-slate-400 py-1 px-3 rounded-md"
                            >
                                <option value="SK">SK</option>
                                <option value="KT">KT</option>
                                <option value="LG U+">LG U+</option>
                            </select>
                        </div>

                        <div>
                            <span class="ml-3">용량 :</span>
                            <select
                                class="border border-slate-400 py-1 px-3 rounded-md"
                            >
                                <option value="SK">SK</option>
                                <option value="KT">KT</option>
                                <option value="LG U+">LG U+</option>
                            </select>
                        </div>

                        <div>
                            <span class="ml-3">요금제 :</span>
                            <select
                                class="border border-slate-400 py-1 px-3 rounded-md"
                            >
                                <option value="SK">SK</option>
                                <option value="KT">KT</option>
                                <option value="LG U+">LG U+</option>
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
                        class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4"
                    />
                </td>
            </tr>
            <tr>
                <th class="border border-slate-400 py-2 w-2/12"> 색상코드 </th>
                <td class="border border-slate-400 py-2 text-left pl-3">
                    <input
                        type="text"
                        class="border border-slate-400 py-1 rounded-md w-4/5 md:w-2/4"
                    />
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-2 w-2/12">
                    이미지 리스트
                </th>
                <td class="border border-slate-400 py-2 text-left pl-3" />
            </tr>
        </table>
    </div>
</div>
