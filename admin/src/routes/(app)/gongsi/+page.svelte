<script>
    import { pc_sidebar } from "$front_lib/store";
    import FixedButton from "$components/FixedButton.svelte";
    import axios from "axios";
    // import XLSX from "xlsx";
    // import { read, writeFileXLSX } from "xlsx";
    import * as XLSX from "xlsx/xlsx.mjs";
    const testUpdate = () => {};
    const choice_btn = ["선택수정", "선택삭제", "상품추가"];

    let gongsi_list = allGongsiList();
    let gj_num = [];
    let gj_model_name = [];
    let gj_use = [];
    let gj_sk = [];
    let gj_kt = [];
    let gj_lg = [];
    let gj_seq = [];
    let gj_checked = [];
    let inputChkTemp = [];
    let excelVal = [];
    let exFileVal = ''

    async function allGongsiList(chkTong = "", chkType = "") {
        try {
            const res = await axios.get(
                import.meta.env.VITE_SERVER_URL + "/gongsi/get_gongsi_list"
            );
            const json = await res.data.get_gongsi_list;
            console.log(res.data);

            gj_num = [];
            gj_model_name = [];
            gj_use = [];
            gj_sk = [];
            gj_kt = [];
            gj_lg = [];
            gj_seq = [];
            gj_checked = [];
            for (let i = 0; i < json.length; i++) {
                gj_num.push(json[i].gj_num);
                gj_model_name.push(json[i].gj_model_name);
                gj_use.push(json[i].gj_use);
                gj_sk.push(json[i].gj_sk);
                gj_kt.push(json[i].gj_kt);
                gj_lg.push(json[i].gj_lg);
                gj_seq.push(json[i].gj_seq);
            }
            inputChkTemp = [...new Array(json.length)].map((_, i) => i);
            gj_checked = [];
            return json;
        } catch (error) {
            console.log(error.message);
        }
    }

    const add_gongsi = () => {
        console.log("add gongsi");
        axios
            .post(import.meta.env.VITE_SERVER_URL + "/gongsi/add_gongsi")
            .then((res) => {
                gongsi_list = allGongsiList();
            })
            .catch((error) => {});
    };

    const gj_update = () => {
        console.log("선택 업데이트");
        console.log(gj_use);
        console.log(gj_checked);
        console.log(gj_sk);
        console.log(gj_kt);
        console.log(gj_lg);
        console.log(gj_seq);
        console.log(gj_model_name);
        axios
            .post(import.meta.env.VITE_SERVER_URL + "/gongsi/update_gongsi", {
                gj_num,
                gj_model_name,
                gj_use,
                gj_sk,
                gj_kt,
                gj_lg,
                gj_seq,
                gj_checked,
            })
            .then((res) => {
                gongsi_list = allGongsiList();
            });
    };

    const gj_del = () => {
        console.log(gj_checked);
        console.log(gj_num);
        axios
            .post(import.meta.env.VITE_SERVER_URL + "/gongsi/delete_gongsi", {
                gj_num,
                gj_checked,
            })
            .then((res) => {
                gongsi_list = allGongsiList();
            });
    };

    const chkChange = (e) => {
        console.log(e.target.checked);
        console.log(e.target.value);
        if (e.target.checked) {
            gj_use[Number(e.target.value)] = 1;
        } else {
            gj_use[Number(e.target.value)] = 0;
        }
    };

    const allChk = (e) => {
        gj_checked = e.target.checked ? [...inputChkTemp] : [];
    };

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

    const uploadExcel = () => {
        console.log(excelVal);
        exFileVal = ''
        axios
            .post(
                import.meta.env.VITE_SERVER_URL + "/gongsi/ex_update_gongsi",
                {
                    excelVal,
                }
            )
            .then((res) => {
                console.log(res.data);
                console.log(exFileVal);
                gongsi_list = allGongsiList();
            })
            .catch((error) => {});
    };
</script>

<FixedButton
    on:choice_del={gj_del}
    on:choice_update={gj_update}
    on:add_item={add_gongsi}
    {choice_btn}
/>
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

    {#await gongsi_list}
        <div>...loading</div>
    {:then valList}
        <div class="table_wrap mt-3">
            <div class="table_area">
                <table
                    class="table border-collapse w-full text-center rounded-xl text-xs md:text-sm"
                >
                    <tr>
                        <th class="border border-slate-400 py-1">
                            <input
                                type="checkbox"
                                on:change={allChk}
                                checked={gj_checked.length ==
                                    inputChkTemp.length}
                            />
                        </th>
                        <th class="border border-slate-400 py-1"> 판매중 </th>
                        <th class="border border-slate-400 py-1"> 모델명 </th>

                        <th class="border border-slate-400 py-1">
                            SK 공시지원금
                        </th>
                        <th class="border border-slate-400 py-1">
                            KT 공시지원금
                        </th>
                        <th class="border border-slate-400 py-1">
                            LG 공시지원금
                        </th>
                        <th class="border border-slate-400 py-1 w-16">
                            순서
                        </th>
                    </tr>

                    {#each valList as val, idx}
                        <tr>
                            <td class="border border-slate-400 py-1 w-8">
                                <input
                                    type="checkbox"
                                    value={idx}
                                    bind:group={gj_checked}
                                />
                            </td>

                            <td class="border border-slate-400 py-1">
                                <input
                                    type="checkbox"
                                    value={idx}
                                    checked={gj_use[idx] == 1}
                                    on:change={chkChange}
                                />
                            </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    bind:value={gj_model_name[idx]}
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                />
                            </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    bind:value={gj_sk[idx]}
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                />
                            </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    bind:value={gj_kt[idx]}
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                />
                            </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    bind:value={gj_lg[idx]}
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                />
                            </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    bind:value={gj_seq[idx]}
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                />
                            </td>
                        </tr>
                    {/each}
                </table>
            </div>
        </div>
    {/await}
</div>
