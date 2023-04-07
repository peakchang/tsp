<script>
    import { pc_sidebar } from "$front_lib/store";
    import axios from "axios";
    

    let getUsers;
    let inputChk = [];
    let selected = [];
    let idList = [];
    let nickList = [];
    let emailList = [];
    let inputChkTemp = [];
    let get_user = []
    
</script>

<div class="suit-font px-2 pt-20" class:pl-44={!$pc_sidebar}>
    <!--Console Content-->

    <table class="table border-collapse w-full text-center rounded-xl" style="font-size: 8px;">
        <tr class="bg-slate-200">
            <th class="border border-slate-400 py-2">아이피</th>
            <th class="border border-slate-400 py-2">경로</th>
            <th class="border border-slate-400 py-2">브라우저</th>
            <th class="border border-slate-400 py-2">접속기기</th>
            <th class="border border-slate-400 py-2">시간</th>
        </tr>

        {#each get_user as user, i}
            <tr>
                <td class="border border-slate-400 py-1">
                    <input type="checkbox" value={i} bind:group={inputChk} />
                </td>
                <td class="border border-slate-400 py-1">{user.user_id}</td>
                <td class="border border-slate-400 py-1">
                    <input
                        type="text"
                        bind:value={nickList[i]}
                        class="border border-gray-200 rounded-md w-full py-1 pl-3"
                    />
                </td>
                <td class="border border-slate-400 py-1">{user.user_email}</td>
                <td class="border border-slate-400 py-1">
                    <select
                        class="border border-zinc-500 py-1 px-5 rounded-md"
                        bind:value={selected[i]}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </td>
            </tr>
        {/each}
    </table>
</div>
