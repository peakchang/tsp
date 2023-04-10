<script>
    import { pc_sidebar } from "$front_lib/store";
    import FixedButton from "$components/FixedButton.svelte";
    import axios from "axios";
    $:{
        console.log($pc_sidebar);
    }
    let yogAllList = getYogAllList();
    let tongArr = [
        { tongName: "전체" },
        { tongName: "SK", tongValue: "sk" },
        { tongName: "KT", tongValue: "kt" },
        { tongName: "LG U+", tongValue: "lg" },
    ];

    let typeArr = [
        { typeName: "전체" },
        { typeName: "일반", typeValue: "basic" },
        { typeName: "키즈", typeValue: "kids" },
    ];
    let yogChecked = [];
    let py_num = [];
    let py_tong = [];
    let py_name = [];
    let py_call = [];
    let py_sms = [];
    let py_addinfo = [];
    let py_fee = [];
    let py_seq = [];
    let py_type = [];
    let inputChkTemp = [];

    let radioTong;
    let radioType;

    const serverUrl = import.meta.env.VITE_SERVER_URL;

    const choice_btn = ["선택수정", "선택삭제", "상품추가"];

    const addItem = () => {
        axios
            .post(serverUrl + "/yog/add_yog")
            .then((res) => {
                console.log("여기가 완료되는자리 아님???");
                yogAllList = getYogAllList();
            })
            .catch((err) => {});
    };

    const choiceDel = () => {
        const chkConfirm = confirm(
            "삭제하시겠습니까? 삭제된 자료는 복구 불가합니다."
        );
        if (!chkConfirm) {
            return;
        }
        axios
            .post(serverUrl + "/yog/del_yog", { yogChecked, py_num })
            .then((res) => {
                console.log("삭제 성공!");
                yogAllList = getYogAllList();
            })
            .catch((err) => {
                
            });
    };

    const choiceUpdate = () => {
        axios
            .post(serverUrl + "/yog/update_yog", {
                yogChecked,
                py_num,
                py_tong,
                py_name,
                py_call,
                py_sms,
                py_addinfo,
                py_fee,
                py_seq,
                py_type,
            })
            .then((res) => {
                if (res.data.result == 'fail') {
                    alert('업데이트에 실패 했습니다.')
                }
                yogAllList = getYogAllList();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const chkRadio = (e) => {
        console.log(radioTong);
        console.log(radioType);
        yogAllList = getYogAllList(radioTong, radioType);
        // console.log(e.target.value);
        console.log(`요기는~~~~~~~~~ ${py_num}`);
    };

    async function getYogAllList(chkTong = "", chkType = "") {
        try {
            let addQuery;
            if (chkTong === "" && chkType === "") {
                addQuery = "";
            } else if (chkTong === "" && chkType !== "") {
                addQuery = "?chk_type=" + chkType;
            } else {
                addQuery = "?chk_tong=" + chkTong + "&chk_type=" + chkType;
            }
            const res = await axios.get(
                import.meta.env.VITE_SERVER_URL + "/yog/get_yog_list" + addQuery
            );
            const json = await res.data.get_yog_list;

            py_num = [];
            py_tong = [];
            py_name = [];
            py_call = [];
            py_sms = [];
            py_addinfo = [];
            py_fee = [];
            py_seq = [];
            py_type = [];
            for (let i = 0; i < json.length; i++) {
                py_num.push(json[i].py_num);
                py_tong.push(json[i].py_tong);
                py_name.push(json[i].py_name);
                py_call.push(json[i].py_call);
                py_addinfo.push(json[i].py_addinfo);
                py_sms.push(json[i].py_sms);
                py_fee.push(json[i].py_fee);
                py_seq.push(json[i].py_seq);
                py_type.push(json[i].py_type);
            }

            inputChkTemp = [...new Array(json.length)].map((_, i) => i);
            yogChecked = []
            return json;
        } catch (error) {
            console.log(error.message);
        }
    }

    const allChk = (e) => {
        yogChecked = e.target.checked ? [...inputChkTemp] : [];
    };
</script>

<FixedButton
    on:choice_update={choiceUpdate}
    on:add_item={addItem}
    on:choice_del={choiceDel}
    {choice_btn}
/>
<div class="suit-font px-2 pt-24" class:pl-44={!$pc_sidebar}>
    <div>
        <div class="flex flex-wrap">
            <ul class="flex mt-2">
                {#each tongArr as tong, idx}
                    <li class="ml-1">
                        <input
                            type="radio"
                            id="tong{idx}"
                            class="hidden peer"
                            name="tong"
                            value={tong.tongValue}
                            checked={idx === 0}
                            bind:group={radioTong}
                            on:change={chkRadio}
                            required
                        />
                        <label
                            for="tong{idx}"
                            class="inline-flex items-center justify-center w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 px-3"
                        >
                            <div class="block">
                                <div class="w-full">{tong.tongName}</div>
                            </div>
                        </label>
                    </li>
                {/each}
            </ul>

            <span class="i inline-block px-2 mt-2">l</span>

            <ul class="flex mt-2">
                {#each typeArr as type, idx}
                    <li class="ml-1">
                        <input
                            type="radio"
                            id="type{idx}"
                            name="type"
                            value={type.typeValue}
                            class="hidden peer"
                            checked={idx === 0}
                            bind:group={radioType}
                            on:change={chkRadio}
                            required
                        />
                        <label
                            for="type{idx}"
                            class="inline-flex items-center justify-center w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 px-3"
                        >
                            <div class="block">
                                <div class="w-full">{type.typeName}</div>
                            </div>
                        </label>
                    </li>
                {/each}
            </ul>
        </div>
    </div>

    <div class="table_wrap mt-3">
        <div class="table_area">
            {#await yogAllList}
                <div>...loading</div>
            {:then valList}
                <table
                    class="table border-collapse w-full text-center rounded-xl text-xs md:text-sm"
                >
                    <tr>
                        <th class="border border-slate-400 py-1">
                            <input
                                type="checkbox"
                                on:change={allChk}
                                checked={yogChecked.length == inputChkTemp.length}
                            />
                        </th>
                        <th class="border border-slate-400 py-1"> 통신사 </th>
                        <th class="border border-slate-400 py-1"> 타입 </th>
                        <th class="border border-slate-400 py-1"> 요금제명 </th>
                        <th class="border border-slate-400 py-1"> 요금 </th>
                        <th class="border border-slate-400 py-1"> 조건 </th>
                        <th class="border border-slate-400 py-1"> 순서 </th>
                    </tr>

                    {#each valList as val, idx}
                        <tr>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="checkbox"
                                    value={idx}
                                    bind:group={yogChecked}
                                />
                                {val.py_tong}
                            </td>
                            <td class="border border-slate-400 py-1">
                                <select
                                    class="border border-slate-400 rounded-md py-1"
                                    bind:value={py_tong[idx]}
                                >
                                    <option value="sk">SK</option>
                                    <option value="kt">KT</option>
                                    <option value="lg">LG U+</option>
                                </select>
                            </td>
                            <td class="border border-slate-400 py-1">
                                <select
                                    class="border border-slate-400 rounded-md py-1"
                                    bind:value={py_type[idx]}
                                >
                                    <option value="basic">일반</option>
                                    <option value="kids">키즈</option>
                                </select>
                            </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    bind:value={py_name[idx]}
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                />
                            </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    bind:value={py_fee[idx]}
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                />
                            </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    bind:value={py_addinfo[idx]}
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                />
                            </td>
                            <td class="border border-slate-400 py-1 w-14">
                                <input
                                    type="text"
                                    bind:value={py_seq[idx]}
                                    class="border border-slate-300 h-auto py-1 w-full rounded-md pl-2"
                                />
                            </td>
                        </tr>
                    {/each}
                </table>
            {/await}
        </div>
    </div>
</div>
