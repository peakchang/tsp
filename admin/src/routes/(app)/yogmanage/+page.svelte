<script>
    import { pc_sidebar } from "$front_lib/store";
    let tongArr = ["전체", "SK", "KT", "LG U+"];
    let typeArr = ["전체", "일반", "키즈"];
</script>

<div class="suit-font px-2 pt-16" class:pl-44={!$pc_sidebar}>
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

            <button
                class="border border-emerald-700 bg-emerald-700 px-4 py-1 text-sm rounded-md text-white ml-3 mt-2"
            >
                선택수정
            </button>

            <button
                class="border border-red-700 bg-red-700 px-4 py-1 text-sm rounded-md text-white ml-3 mt-2"
            >
                선택삭제
            </button>
        </div>

        <!-- <select class="border border-slate-400 px-2 py-1 rounded-md text-sm">
            <option value="SK">SK</option>
            <option value="KT">KT</option>
            <option value="LG U+">LG U+</option>
        </select>

        <select class="border border-slate-400 px-2 py-1 rounded-md text-sm">
            <option value="">전체</option>
            <option value="">일반</option>
            <option value="">키즈</option>
        </select> -->
    </div>

    <div class="table_wrap mt-3">
        <div class="table_area">
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
            </table>
        </div>
    </div>
</div>
