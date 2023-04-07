<script>
    import axios from "axios";
    import { onMount, beforeUpdate } from "svelte";
    import { admin_sidebar, pc_sidebar } from "$front_lib/store";
    import FixedButton from "$components/FixedButton.svelte";

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

    const testUpdate = (e) => {
        console.log('asdjflaisjdf');
        console.log(e.detail);
    }

    let choice_btn = ['업데이트']
</script>

<FixedButton on:update={testUpdate} {choice_btn} />



<div class="suit-font px-2 pt-20 text-xs" class:pl-44={!$pc_sidebar}>
    <div class="pt-5 pb-2" />

    {#await site_info}
        <div>waite.....</div>
    {:then val}
        <table class="w-full table border-collapse text-xs md:text-sm">
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
                        
                    </div>
                </td>
            </tr>
        </table>
    {/await}
</div>
