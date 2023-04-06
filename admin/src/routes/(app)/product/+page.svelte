<script>
    import { pc_sidebar } from "$lib/store";
    const buildLink = import.meta.env.VITE_BUILD_LINK
</script>

<div class="suit-font px-2 pt-16" class:pl-44={!$pc_sidebar}>
    <div>
        <div class="flex flex-wrap">
            <button
                class="border border-blue-700 bg-blue-700 px-4 py-1 text-sm rounded-md text-white ml-3"
            >
                상품추가
            </button>
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

            <button
                class="border border-pink-700  bg-pink-700 px-4 py-1 text-sm rounded-md text-white ml-3"
            >
                상품복사
            </button>
        </div>
    </div>

    <div class="table_wrap mt-3">
        <div class="table_area">
            <table
                class="table border-collapse w-full text-center rounded-xl text-xs md:text-sm"
            >
                <tr>
                    <th class="border border-slate-400 py-1 w-12">
                        <input type="checkbox" />
                    </th>
                    <th class="border border-slate-400 py-1 w-12"> 판매 </th>
                    <th class="border border-slate-400 py-1"> 상품번호 </th>

                    <th class="border border-slate-400 py-1">이미지</th>
                    <th class="border border-slate-400 py-1">상품명</th>
                    <th class="border border-slate-400 py-1">통신사</th>
                    <th class="border border-slate-400 py-1">상품가격</th>
                    <th class="border border-slate-400 py-1">순서</th>
                </tr>

                <tr>
                    <td class="border border-slate-400 py-1">
                        <input type="checkbox" />
                    </td>

                    <td class="border border-slate-400 py-1">
                        <input type="checkbox" />
                    </td>

                    <td class="border border-slate-400 py-1">
                        <a href="{buildLink}/product/845784">
                            
                            845784 (GO!)
                        </a>
                        
                    </td>
                    <td class="border border-slate-400 py-1">
                        <img src="/test11.png" alt="" class="w-14 mx-auto" />
                    </td>
                    <td class="border border-slate-400 py-1">갤럭시Z플립4</td>
                    <td class="border border-slate-400 py-1">
                        <select class="border border-slate-400 rounded-md px-3 py-1">
                            <option value="SK">SK</option>
                            <option value="KT">KT</option>
                            <option value="LG U+">LG U+</option>
                        </select>
                    </td>
                    <td class="border border-slate-400 py-1">
                        <input
                            type="text"
                            value="599500"
                            class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                        />
                    </td>
                    <td class="border border-slate-400 py-1 w-16">
                        <input
                            type="text"
                            value="3"
                            class="border border-slate-300 h-auto py-1 w-11/12 rounded-md pl-2"
                        />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</div>
