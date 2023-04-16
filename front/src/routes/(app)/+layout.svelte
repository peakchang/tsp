<script>
    import "$src/app.css";
    import { page } from "$app/stores";
    import { user_id } from "$lib/store";
    import { goto } from "$app/navigation";
    import SideBar from "$components/SideBar.svelte";
    import Footer from "$components/Footer.svelte";
    // import { auth_chk } from "$lib/lib";
    import "$node_modules/@fortawesome/fontawesome-free/css/all.min.css";
    let url = "/";
    let sideBarStatus = false;
    $: url = $page.url.pathname;
    const navs = [
        { title: "전체", href: "/", query: "all" },
        { title: "갤럭시폰", query: "galaxy" },
        { title: "아이폰", query: "iphone" },
        // { title: "키즈폰", query: "kids" },
        { title: "구매후기", href: "/review" },
        { title: "문의", href: "/qna" },
        { title: "사전예약", href: "/qna" },
    ];

    $: {
        console.log($page.url.pathname);
        // auth_chk()
    }

    let search_input;
    let shWrap = false;

    $: {
        console.log(search_input);
    }
</script>

<svelte:head>
    <!-- SUIT 폰트 CSS -->
    <link
        href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
        rel="stylesheet"
    />
</svelte:head>
<header class="">
    <div
        class="hidden max_screen md:flex justify-between items-center suit-font py-4 px-2 mx-auto border-b border-zinc-300"
    >
        <a href="/"> <div class="">LOGO</div></a>

        <div class="flex">
            {#each navs as nav}
                <button
                    class="ml-6 font-semibold"
                    on:click={() => {
                        if (nav.href) {
                            goto(nav.href);
                        } else {
                            console.log(nav.query);
                        }
                    }}>{nav.title}</button
                >
            {/each}
        </div>
        <div
            class="flex border border- border-gray-300 pl-3 py-1 rounded-md"
            class:border-2={shWrap}
        >
            <button><i class="fa-solid fa-magnifying-glass" /></button>
            <input
                type="text"
                on:focusout={() => {
                    shWrap = false;
                }}
                on:focusin={() => {
                    shWrap = true;
                }}
                class="b border-none focus:outline-none ml-2"
            />
        </div>
        <div class="flex">
            <a href="/auth/login">
                <span
                    class="py-1 border border-blue-400 px-3 rounded-lg bg-blue-400 text-white"
                    >로그인</span
                >
            </a>
            <a href="/auth/logout">
                <span
                    class="ml-3 py-1 border border-emerald-500 px-3 rounded-lg bg-emerald-500 text-white"
                    >회원가입</span
                >
            </a>
        </div>
    </div>

    <div
        class="fixed left-0 top-0 flex md:hidden py-3 px-5 w-full justify-between items-center suit-font border-b border-zinc-300 bg-white z-20"
    >
        <div class="flex">
            <button
                on:click={() => {
                    sideBarStatus = !sideBarStatus;
                }}
            >
                <i class="fa-solid fa-bars" />
            </button>

            <a href="/">
                <div class="ml-5">LOGO</div>
            </a>
        </div>

        <div
            class="flex border border- border-gray-300 py-1 pl-3 rounded-lg overflow-hidden"
            class:border-2={shWrap}
        >
            <button><i class="fa-solid fa-magnifying-glass" /></button>

            <input
                type="text"
                on:focusout={() => {
                    shWrap = false;
                }}
                on:focusin={() => {
                    shWrap = true;
                }}
                class="b border-none focus:outline-none ml-2"
            />
        </div>
    </div>
    <SideBar bind:sideBarStatus {navs} />

    <div class="mt-16 md:hidden" />
</header>

<slot />

<hr class="bg-zinc-300 border-0" style="height: 1px;" />

<Footer />

<style>
    :global(.suit-font) {
        font-family: "SUIT";
    }

    :global(.max_screen) {
        max-width: 970px;
    }

    :global(.max_screen_inner) {
        max-width: 616px;
    }

    :global(.main_img) {
        height: 300px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 970px;
        margin: 0 auto;
    }

    :global(.main_img h1) {
        text-align: center;
        font-size: 40px;
        font-weight: bolder;
        position: relative;
    }
</style>
