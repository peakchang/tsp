<script>
    import axios from "axios";
    import { onMount, beforeUpdate, tick } from "svelte";
    import { page_set, del_arr_value } from "$front_lib/lib";
    import { goto } from "$app/navigation";

    // 전체 DB count
    let all_count;

    // 현재 page
    let page = 1;

    // 한 페이지에 보여줄 행수
    let show_row_num = 15;

    // 최초 데이터 불러오기
    let get_form_datas = get_datas();

    // 한 페이지에 보여줄 페이지 수
    let set_page_count = 5;

    // 페이징 배열
    let page_arr = [];

    // input group
    let selected_chk = [];

    // 전체선택을 위한 임시 배열
    let tempAllChkArr = [];

    const get_page = (e) => {
        if (Number(e.target.dataset.pagenum) != page) {
            page = Number(e.target.dataset.pagenum);
        }
    };
    const minusPage = () => {
        if (page > 1) {
            page = page - 1;
        }
    };

    const plusPage = () => {
        var max_page = Math.ceil(all_count / show_row_num);
        if (page < max_page) {
            page = page + 1;
        }
    };

    $: page,
        (() => {
            get_form_datas = get_datas();
        })();

    const del_list = () => {
        axios
            .post(import.meta.env.VITE_SERVER_URL + "/form_delete", {
                selected_chk,
            })
            .then((res) => {
                get_form_datas = get_datas();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const all_selected = async (e) => {
        selected_chk = e.target.checked ? [...tempAllChkArr] : [];
    };

    async function get_datas() {
        try {
            const params = { page, show_row_num };
            const res = await axios.get(
                import.meta.env.VITE_SERVER_URL + "/form_data",
                { params }
            );
            const json = await res.data;
            console.log(json);
            for (let i = 0; i < json.get_form_datas.length; i++) {
                tempAllChkArr.push(json.get_form_datas[i].id);
            }
            all_count = json.all_count;

            page_arr = page_set(page, all_count, show_row_num, set_page_count);
            return json;
        } catch (error) {
            console.log(error.message);
        }
    }
</script>

<div class="lg:container w-full mx-auto pt-20 suit-font px-5">
    <div
        class="pr-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal overflow-hidden"
    >
        <!--Console Content-->
        <div class="mb-3">
            <button
                class="border border-red-600 px-4 py-1 rounded-xl bg-red-600 text-white"
                on:click={del_list}>선택 삭제</button
            >
        </div>
        
        {#await get_form_datas}
            <div>waite.....</div>
        {:then val}
            <div class="table_wrap">
                <div class="rounded-md table_area">
                    <table
                        class="table border-collapse w-full text-center rounded-xl text-sm"
                    >
                        <thead>
                            <tr>
                                <th class="border border-slate-400 py-1">
                                    <input
                                        type="checkbox"
                                        on:change={all_selected}
                                        checked={selected_chk.length ==
                                            tempAllChkArr.length}
                                    />
                                </th>
                                <th class="border border-slate-400 py-1"
                                    >이름</th
                                >
                                <th class="border border-slate-400 py-1"
                                    >회사명</th
                                >
                                <th class="border border-slate-400 py-1"
                                    >연락처</th
                                >
                                <th class="border border-slate-400 py-1"
                                    >월 광고 예산</th
                                >
                                <th class="border border-slate-400 py-1"
                                    >경로</th
                                >
                                <th class="border border-slate-400 py-1"
                                    >서비스</th
                                >
                            </tr>
                        </thead>
                        <tbody>
                            {#each val.get_form_datas as val}
                                <tr>
                                    <td class="border border-slate-400 py-1">
                                        <input
                                            type="checkbox"
                                            value={val.id}
                                            bind:group={selected_chk}
                                        />
                                    </td>
                                    <td class="border border-slate-400 py-1"
                                        >{val.form_name}</td
                                    >
                                    <td class="border border-slate-400 py-1"
                                        >{val.form_company}</td
                                    >
                                    <td class="border border-slate-400 py-1"
                                        >{val.form_phone}</td
                                    >
                                    <td class="border border-slate-400 py-1"
                                        >{val.form_budget}</td
                                    >
                                    <td class="border border-slate-400 py-1"
                                        >{val.form_path}</td
                                    >
                                    <td class="border border-slate-400 py-1"
                                        >{val.form_service}</td
                                    >
                                </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>

            <nav aria-label="Page navigation example" class="mt-2 mx-auto">
                <ul
                    class="inline-flex items-center -space-x-px justify-center w-full"
                >
                    <li>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <span
                            class="block px-3 py-2 ml-0 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                            on:click={minusPage}
                        >
                            <svg
                                aria-hidden="true"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    fill-rule="evenodd"
                                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                    clip-rule="evenodd"
                                /></svg
                            >
                        </span>
                    </li>
                    {#each page_arr as on_page}
                        <li>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <span
                                class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
                                data-pagenum={on_page}
                                class:active={page == on_page}
                                on:click={get_page}>{on_page}</span
                            >
                        </li>
                    {/each}

                    <li>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <span
                            class="block px-3 py-2 leading-tight cursor-pointer text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                            on:click={plusPage}
                        >
                            <svg
                                aria-hidden="true"
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                ><path
                                    fill-rule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clip-rule="evenodd"
                                /></svg
                            >
                        </span>
                    </li>
                </ul>
            </nav>
        {/await}

        <!--/ Console Content-->
    </div>
</div>

<style>
    /* .set-width {
        width: 100%;
        margin: 30px auto;
    }
    @media (max-width: 1024px) {
        .set-width {
            width: 980px;
        }
    } */
    .table_wrap {
        width: 100%;
        overflow: auto;
    }
    .table_area {
        width: 100%;
        min-width: 1100px;
    }

    .active {
        background-color: #e6e6e6;
    }
</style>
