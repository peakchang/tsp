<script>
    import { pc_sidebar } from "$front_lib/store";
    const buildLink = import.meta.env.VITE_BUILD_LINK;
    import FixedButton from "$components/FixedButton.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    const add_item = () => {
        const timestamp = String(new Date().getTime());
        console.log($page.url.pathname);
        goto($page.url.pathname + '/' + timestamp)
    };
    const choice_btn = ["선택수정", "선택삭제", "상품추가", "상품복사"];
    $: {
        console.log($pc_sidebar);
    }
</script>

<FixedButton on:add_item={add_item} {choice_btn} />

<div class="suit-font px-2 pt-24" class:pl-44={!$pc_sidebar}>
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
                        <a href="{buildLink}/product/845784"> 845784 (GO!) </a>
                    </td>
                    <td class="border border-slate-400 py-1" />
                    <td class="border border-slate-400 py-1">갤럭시Z플립4</td>
                    <td class="border border-slate-400 py-1">
                        <select
                            class="border border-slate-400 rounded-md px-3 py-1"
                        >
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
