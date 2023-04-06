<script>
    import { pc_sidebar } from "$front_lib/store";
</script>

<div class="suit-font px-2 pt-16" class:pl-44={!$pc_sidebar}>
    <div>
        <div class="flex flex-wrap">

            <select class="border border-slate-400 rounded-md px-2 text-xs md:text-sm">
                <option value="">진행중 모델</option>
                <option value="">전체 모델</option>
                <option value="">예외 모델</option>
            </select>

            <button
                class="border border-emerald-700 bg-emerald-700 px-4 py-1 text-sm rounded-md text-white ml-3"
            >
                선택수정
            </button>

            <button
                class="border border-red-700 bg-red-700 px-4 py-1 text-sm rounded-md text-white ml-3"
            >
                선택삭제
            </button>
        </div>
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
                </tr>

                <tr>
                    <td class="border border-slate-400 py-1">
                        <input type="checkbox" />
                    </td>

                    <td class="border border-slate-400 py-1">
                        <input type="checkbox" />
                    </td>
                    <td class="border border-slate-400 py-1"> iphone13mini </td>
                    <td class="border border-slate-400 py-1">
                        <input
                            type="text"
                            value=""
                            class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                        />
                    </td>
                    <td class="border border-slate-400 py-1">
                        <input
                            type="text"
                            value=""
                            class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                        />
                    </td>
                    <td class="border border-slate-400 py-1">
                        <input
                            type="text"
                            value=""
                            class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                        />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
