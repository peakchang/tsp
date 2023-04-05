<script>
    import axios from "axios";
    import { onMount, beforeUpdate } from "svelte";
    import { admin_sidebar,pc_sidebar } from "$lib/store";

    let site_info = get_site_info();
    let site_company;
    let site_company_num;
    let site_owner;
    let site_address;
    let site_tel;
    let site_manager;

    const updateSiteInfo = () => {
        const siteInfo = {
            site_company,
            site_company_num,
            site_owner,
            site_address,
            site_tel,
            site_manager,
        };
        console.log(siteInfo);
        axios
            .post(
                import.meta.env.VITE_SERVER_URL + "/base_setting",
                { siteInfo },
                { withCredentials: true }
            )
            .then((res) => {
                console.log("success!!");
                site_info = get_site_info();
            });
    };

    async function get_site_info() {
        try {
            const res = await axios.get(
                import.meta.env.VITE_SERVER_URL + "/base_setting"
            );
            const json = await res.data;
            const onSite = json.site_info;
            site_company = onSite.site_company;
            site_company_num = onSite.site_company_num;
            site_owner = onSite.site_owner;
            site_address = onSite.site_address;
            site_tel = onSite.site_tel;
            site_manager = onSite.site_manager;
            return json;
        } catch (error) {
            console.log(error.message);
        }
    }
</script>

<div class="suit-font px-2 pt-10" class:pl-44={!$pc_sidebar}>
    <div class="pt-5 pb-2">
        <button
            class="border border-blue-600 px-4 rounded-lg py-1 bg-blue-600 text-white"
            on:click={updateSiteInfo}>변경 적용</button
        >
    </div>

    {#await site_info}
        <div>waite.....</div>
    {:then val}
        <table class="w-full table border-collapse text-xs md:text-base">
            <tr>
                <th class="border border-slate-400 py-1">회사명</th>
                <td class="border border-slate-400 py-1">
                    <div class="flex">
                        <input
                            type="text"
                            class="pl-4 w-10/12"
                            placeholder="회사명을 입력하세요"
                            bind:value={site_company}
                        />
                        <button
                            class="border border-emerald-600 px-2 md:px-4 rounded-lg py-1 bg-emerald-600 text-white"
                            >변경</button
                        >
                    </div>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-1">사업자 번호</th>
                <td class="border border-slate-400 py-1">
                    <div class="flex">
                        <input
                            type="text"
                            class="pl-4 w-10/12"
                            placeholder="사업자 번호를 입력하세요"
                            bind:value={site_company_num}
                        />
                        <button
                            class="border border-emerald-600 px-2 md:px-4 rounded-lg py-1 bg-emerald-600 text-white"
                            >변경</button
                        >
                    </div>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-1">대표자명</th>
                <td class="border border-slate-400 py-1">
                    <div class="flex">
                        <input
                            type="text"
                            class="pl-4 w-10/12"
                            placeholder="대표자명을 입력하세요"
                            bind:value={site_owner}
                        />
                        <button
                            class="border border-emerald-600 px-2 md:px-4 rounded-lg py-1 bg-emerald-600 text-white"
                            >변경</button
                        >
                    </div>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-1">회사 주소</th>
                <td class="border border-slate-400 py-1">
                    <div class="flex">
                        <input
                            type="text"
                            class="pl-4 w-10/12"
                            placeholder="회사 주소를 입력하세요"
                            bind:value={site_address}
                        />
                        <button
                            class="border border-emerald-600 px-2 md:px-4 rounded-lg py-1 bg-emerald-600 text-white"
                            >변경</button
                        >
                    </div>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-1">전화번호</th>
                <td class="border border-slate-400 py-1">
                    <div class="flex">
                        <input
                            type="text"
                            class="pl-4 w-10/12"
                            placeholder="회사 전화번호를 입력하세요"
                            bind:value={site_tel}
                        />
                        <button
                            class="border border-emerald-600 px-2 md:px-4 rounded-lg py-1 bg-emerald-600 text-white"
                            >변경</button
                        >
                    </div>
                </td>
            </tr>

            <tr>
                <th class="border border-slate-400 py-1">개인정보책임자</th>
                <td class="border border-slate-400 py-1">
                    <div class="flex">
                        <input
                            type="text"
                            class="pl-4 w-10/12"
                            placeholder="개인정보 책임자를 입력하세요"
                            bind:value={site_manager}
                        />
                        <button
                            class="border border-emerald-600 px-2 md:px-4 rounded-lg py-1 bg-emerald-600 text-white"
                            >변경</button
                        >
                    </div>
                </td>
            </tr>
        </table>
    {/await} 


    
</div>
