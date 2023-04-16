<script>
    import { pc_sidebar } from "$front_lib/store";
    const buildLink = import.meta.env.VITE_BUILD_LINK;
    import FixedButton from "$components/FixedButton.svelte";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import axios from "axios";

    let itemList = getItemList();
    let itSeqList = [];
    let itPriceList = [];
    let itUseList = [];
    const add_item = () => {
        const timestamp = String(new Date().getTime());
        console.log($page.url.pathname);
        goto($page.url.pathname + "/" + timestamp);
    };
    const choice_btn = ["선택수정", "선택삭제", "상품추가", "상품복사"];
    $: {
        console.log($pc_sidebar);
    }

    async function getItemList() {
        try {
            const res = await axios.get(
                import.meta.env.VITE_SERVER_URL + "/item/get_item_list"
            );
            const json = await res.data.item_list;
            for (let i = 0; i < json.length; i++) {
                console.log(json[i]);
                itSeqList.push(json[i].it_seq);
                itPriceList.push(json[i].it_price);
                itUseList.push(json[i].it_use);
            }
            console.log(itSeqList);
            console.log(itUseList);
            return json;
        } catch (error) {
            console.log(error.message);
        }
    }
</script>

<FixedButton on:add_item={add_item} {choice_btn} />

<div class="suit-font px-2 pt-24" class:pl-44={!$pc_sidebar}>
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
                                <input type="checkbox" />
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
                            <td class="border border-slate-400 py-1" />
                            <td class="border border-slate-400 py-1"
                                >{val.it_subname}</td
                            >
                            <td class="border border-slate-400 py-1">
                                {val.it_ph_tongsin.toUpperCase()}
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
