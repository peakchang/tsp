<script>
    import { goto } from "$app/navigation";
    import axios from "axios";
    import { user_id } from "$lib/store.js";
    import { onMount } from "svelte";

    let getemail;
    let getpwd;
    let id_input;

    onMount(() => {
        console.log($user_id);
        if($user_id){
            alert('이미 로그인 되어 있습니다.')
            history.back()
            return
        }
    })

    const request_login = async () => {
        if (!getemail || !getpwd) {
            alert("아이디와 비밀번호를 입력해주세요!");
            return;
        }

        await axios
            .post(
                import.meta.env.VITE_SERVER_URL + "/auth/login",
                {
                    getemail,
                    getpwd,
                },
                { withCredentials: true }
            )
            .then((res) => {
                console.log("받아온 데이터~~~~~");
                console.log(res);
                if (res.data.error) {
                    alert(res.data.error);
                    id_input.focus();
                    return;
                } else {
                    $user_id = res.data.user_id;
                    goto("/");
                }
            })
            .catch((err) => {
                alert(err.response.data.message);
                return;
            });
    };


    const kakao_login = () => {
        location.href = 'http://localhost:8000/api/v4/auth/kakao'
    };

    const gotoJoin = () => {
        goto("/auth/join");
    };
</script>

<svelte:head>
    <!-- SUIT 폰트 CSS -->
    <link
        href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
        rel="stylesheet"
    />
</svelte:head>

<div class="w-full max-w-xs mx-auto mt-20 suit-font">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <span class="block text-gray-700 text-sm font-bold mb-2">
                아이디
            </span>
            <input
                type="text"
                bind:value={getemail}
                bind:this={id_input}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div class="mb-4">
            <span class="block text-gray-700 text-sm font-bold mb-2">
                비밀번호
            </span>
            <input
                type="password"
                bind:value={getpwd}
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
        <div class="flex items-center justify-between">
            <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                on:click={request_login}>로그인</button
            >
            <button
                href="/auth/join"
                class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                on:click={gotoJoin}>회원가입</button
            >
        </div>
    </div>

    <button on:click={kakao_login}> 카카오 로그인 </button>
</div>

<style>
    :global(.suit-font) {
        font-family: "SUIT";
    }
</style>
