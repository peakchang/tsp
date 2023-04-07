<script>
    import { pc_sidebar } from "$front_lib/store";
    import FixedButton from "$components/FixedButton.svelte";
    import axios from "axios";
    let yogAllList = getYogAllList();
    let tongArr = ["전체", "SK", "KT", "LG U+"];
    let typeArr = ["전체", "일반", "키즈"];
    const serverUrl = import.meta.env.VITE_SERVER_URL;

    const choice_btn = ["선택수정", "선택삭제", "상품추가"];

    const addItem = () => {
        axios
            .post(serverUrl + "/yog/add_yog")
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {});
    };
    const choiceDel = () => {
        console.log("choiceDel");
    };

    const choiceUpdate = () => {
        console.log("choiceUpdate");
    };

    async function getYogAllList() {
        try {
            const res = await axios.get(
                import.meta.env.VITE_SERVER_URL + "/yog/get_yog_list"
            );
            const json = await res.data.get_yog_list;
            console.log("-----------------------");
            console.log(json);
            return json;
        } catch (error) {
            console.log(error.message);
        }
    }
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
                            name="hosting"
                            class="hidden peer"
                            checked={idx === 0}
                            required
                        />
                        <label
                            for="tong{idx}"
                            class="inline-flex items-center justify-center w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 px-3"
                        >
                            <div class="block">
                                <div class="w-full">{tong}</div>
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
                            name="gettype"
                            class="hidden peer"
                            checked={idx === 0}
                            required
                        />
                        <label
                            for="type{idx}"
                            class="inline-flex items-center justify-center w-full text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 px-3"
                        >
                            <div class="block">
                                <div class="w-full">{type}</div>
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
                            <input type="checkbox" />
                        </th>
                        <th class="border border-slate-400 py-1"> 통신사 </th>
                        <th class="border border-slate-400 py-1"> 타입 </th>
                        <th class="border border-slate-400 py-1"> 요금제명 </th>
                        <th class="border border-slate-400 py-1"> 요금 </th>
                        <th class="border border-slate-400 py-1"> 조건 </th>
                        <th class="border border-slate-400 py-1"> 순서 </th>
                    </tr>

                    {#each valList as val}
                        <tr>
                            <td class="border border-slate-400 py-1">
                                <input type="checkbox" />
                            </td>
                            <td class="border border-slate-400 py-1"> SK </td>
                            <td class="border border-slate-400 py-1"> 일반 </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    value="슈퍼플랜 베이직 초이스"
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                />
                            </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    value="85000"
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                />
                            </td>
                            <td class="border border-slate-400 py-1">
                                <input
                                    type="text"
                                    value="2달 무료 어쩌구 저쩌구 여쩌구"
                                    class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                                />
                            </td>
                            <td class="border border-slate-400 py-1 w-14">
                                <input
                                    type="text"
                                    value="1"
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
