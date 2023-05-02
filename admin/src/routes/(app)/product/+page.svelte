<script>
    import { pc_sidebar } from "$front_lib/store";
    const buildLink = import.meta.env.VITE_BUILD_LINK;
    import FixedButton from "$components/FixedButton.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import * as XLSX from "xlsx/xlsx.mjs";
    import axios from "axios";

    let chkList = [];
    let itemList = getItemList();
    let itSeqList = [];
    let itPriceList = [];
    let itUseList = [];
    let itImageList = [];
    let itIdList = [];
    let exFileVal;
    let excelVal = [];

    const choice_btn = ["선택수정", "선택삭제", "상품추가"];
    $: {
        console.log($pc_sidebar);
    }

    async function getItemList() {
        try {
            const res = await axios.get(
                import.meta.env.VITE_SERVER_URL + "/item/get_item_list"
            );
            const json = await res.data.item_list;
            console.log(json);
            for (let i = 0; i < json.length; i++) {
                itSeqList.push(json[i].it_seq);
                itPriceList.push(json[i].it_price);
                itUseList.push(json[i].it_use);
                itIdList.push(json[i].it_id);
                // itImageList.push(json[i].it_img_list.split(',')[0])
            }

            
            



            return json;
        } catch (error) {
            console.log(error.message);
        }
    }

    const readExcel = (e) => {
        let input = e.target;
        let reader = new FileReader();
        reader.onload = function () {
            let data = reader.result;
            let workBook = XLSX.read(data, { type: "binary" });
            workBook.SheetNames.forEach(function (sheetName) {
                console.log("SheetName: " + sheetName);
                let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName]);
                console.log(rows);
                excelVal = rows;
            });
        };
        reader.readAsBinaryString(input.files[0]);
    };

    const uploadExcel = async () => {
        console.log(excelVal);
        await axios
            .post(
                import.meta.env.VITE_SERVER_URL + "/item/item_update_excel",
                excelVal
            )
            .then((res) => {
                console.log("아이템 업데이트 성공!!");
                // location.reload();
            });
    };

    const add_item = () => {
        const timestamp = String(new Date().getTime());
        console.log($page.url.pathname);
        goto($page.url.pathname + "/" + timestamp);
    };

    const del_item = async () => {
        console.log("del");
        console.log(chkList);
        console.log(itIdList);
        await axios
            .post(
                import.meta.env.VITE_SERVER_URL + "/item/item_update_list",
                {chkList, itIdList, type: 'item_delete'}
            )
            .then((res) => {
                console.log("아이템 업데이트 성공!!");
                // location.reload();
            });
    };

    const changeMainStan = (e) => {
        console.log(e.target.value);
        console.log(itIdList[e.target.value]);
    };
</script>

<FixedButton on:add_item={add_item} on:choice_del={del_item} {choice_btn} />

<div class="suit-font px-2 pt-24" class:pl-44={!$pc_sidebar}>
    <div>
        <div class="flex flex-wrap">
            <select
                class="border border-slate-400 rounded-md mt-2 px-2 text-xs md:text-sm"
            >
                <option value="">진행중 모델</option>
                <option value="">전체 모델</option>
                <option value="">예외 모델</option>
            </select>

            <button
                class="border border-blue-700 bg-blue-700 px-4 py-1 text-sm rounded-md text-white ml-3 mt-2"
            >
                조회
            </button>

            <input
                type="file"
                bind:value={exFileVal}
                on:change={readExcel}
                class="block border w-48 border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 ml-4 mt-2
                  file:bg-transparent file:border-0
                  file:bg-gray-300 file:mr-4
                  file:py-1 file:px-2"
            />
            <button
                class="border border-blue-700 bg-blue-700 px-4 py-1 text-sm rounded-md text-white ml-3 mt-2"
                on:click={uploadExcel}
            >
                업로드
            </button>
        </div>
    </div>

    <div class="table_wrap mt-3">
        <div class="table_area">
            {#await itemList}
                <div>...loading</div>
            {:then valList}
                <table
                    class="table border-collapse w-full text-center rounded-xl text-xs md:text-sm"
                >
                    <tr>
                        <th class="border border-slate-400 py-1 w-12">
                            <input type="checkbox" />
                        </th>
                        <th class="border border-slate-400 py-1 w-12">
                            판매
                        </th>
                        <th class="border border-slate-400 py-1"> 상품번호 </th>

                        <th class="border border-slate-400 py-1">이미지</th>
                        <th class="border border-slate-400 py-1">상품명</th>
                        <th class="border border-slate-400 py-1">통신사</th>
                        <th class="border border-slate-400 py-1">상품가격</th>
                        <th class="border border-slate-400 py-1">순서</th>
                    </tr>

                    {#each valList as val, idx}
                        <tr>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="checkbox"
                                    value={idx}
                                    bind:group={chkList}
                                />
                            </td>

                            <td class="border border-slate-400 py-1">
                                <input
                                    type="checkbox"
                                    checked={itUseList[idx] === 1}
                                />
                            </td>

                            <td class="border border-slate-400 py-1">
                                <a href="{buildLink}/product/{val.it_id}">
                                    {val.it_id}
                                </a>
                            </td>
                            <td class="border border-slate-400 py-1" >
                                <img src="{val.it_img_list ? val.it_img_list.split(',')[0] : ''}" alt="" class="w-16 mx-auto">
                            </td>
                            <td class="border border-slate-400 py-1"
                                >{val.it_subname}</td
                            >
                            <td class="border border-slate-400 py-1">
                                {#if val.it_mainstan}
                                    {val.it_mainstan
                                        .replace(/"/, "")
                                        .split(",")[0]
                                        .toUpperCase()}
                                    <button
                                        value={idx}
                                        on:click={changeMainStan}
                                        >(심플 변경)</button
                                    >
                                {/if}
                            </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                    bind:value={itPriceList[idx]}
                                />
                            </td>
                            <td class="border border-slate-400 py-1 w-16">
                                <input
                                    type="text"
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                    bind:value={itSeqList[idx]}
                                />
                            </td>
                        </tr>
                    {/each}
                </table>
            {/await}
        </div>
    </div>
</div>
