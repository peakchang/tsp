<script>
    import axios from "axios";
    let getUsers = get_users();
    let inputChk = [];
    let selected = [];
    let idList = [];
    let nickList = [];
    let emailList = [];
    let inputChkTemp = [];

    async function get_users() {
        try {
            const res = await axios.get(
                import.meta.env.VITE_SERVER_URL + "/get_users",
                { withCredentials: true }
            );
            const json = await res.data;
            console.log(json);
            for (let i = 0; i < json.get_user.length; i++) {
                idList.push(json.get_user[i].idx);
                nickList.push(json.get_user[i].user_nick);
                emailList.push(json.get_user[i].user_email);
                selected.push(String(json.get_user[i].user_rate));
            }
            inputChkTemp = [...new Array(json.get_user.length)].map(
                (_, i) => i
            );
            return json;
        } catch (error) {
            console.log(error.message);
        }
    }

    const update_user = (e) => {
        console.log(inputChkTemp);
        console.log(inputChk);
        console.log(selected);
        console.log(nickList);
        console.log(emailList);
        console.log(e.target.value);
        const updateType = e.target.value
        axios
            .post(
                import.meta.env.VITE_SERVER_URL + "/user_update",
                {
                    idList,
                    inputChk,
                    selected,
                    nickList,
                    emailList,
                    updateType
                },
                { withCredentials: true }
            )
            .then((res) => {
                getUsers = get_users();
                inputChk = [];
            })
            .catch((err) => {});
    };

    const allChk = (e) => {
        inputChk = e.target.checked ? [...inputChkTemp] : [];
    };
</script>

<div class="pt-24 container mx-auto suit-font px-2">
    <!--Console Content-->
    <div class="mb-3 pt-5 pl-3">
        <button
            class="border border-red-600 px-4 py-1 rounded-xl bg-red-600 text-white text-sm"
            value="delete"
            on:click={update_user}>선택삭제</button
        >
        <button
            class="border border-indigo-500 px-4 py-1 rounded-xl bg-indigo-500 text-white text-sm"
            value="update"
            on:click={update_user}>업데이트</button
        >
    </div>

    {#await getUsers}
        <div>...loading</div>
    {:then val}
        <table
            class="table border-collapse w-full text-center rounded-xl text-sm"
        >
            <tr class="bg-slate-200">
                <th class="border border-slate-400 py-2">
                    <input
                        type="checkbox"
                        on:change={allChk}
                        checked={inputChk.length == inputChkTemp.length}
                    />
                </th>
                <th class="border border-slate-400 py-2">아이디</th>
                <th class="border border-slate-400 py-2">닉네임</th>
                <th class="border border-slate-400 py-2">이메일</th>
                <th class="border border-slate-400 py-2">등급</th>
            </tr>

            {#each val.get_user as user, i}
                <tr>
                    <td class="border border-slate-400 py-1">
                        <input
                            type="checkbox"
                            value={i}
                            bind:group={inputChk}
                        />
                    </td>
                    <td class="border border-slate-400 py-1">{user.user_id}</td>
                    <td class="border border-slate-400 py-1">
                        <input
                            type="text"
                            bind:value={nickList[i]}
                            class="border border-gray-200 rounded-md w-full py-1 pl-3"
                        />
                    </td>
                    <td class="border border-slate-400 py-1"
                        >{user.user_email}</td
                    >
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
    {/await}
</div>
