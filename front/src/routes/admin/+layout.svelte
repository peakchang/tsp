<script>
    import "$node_modules/@fortawesome/fontawesome-free/css/all.min.css";
    import "$src/app.css";
    import { page } from "$app/stores";
    import { auth_chk } from "$lib/lib";

    import MenuBar from "./MenuBar.svelte";
    import { admin_sidebar, pc_sidebar, mobile_sidebar } from "$lib/store";

    $pc_sidebar = false;

    let user_area = false;
    let innerWidth;

    let menu_list = [
        {
            icon: '<i class="fa-solid fa-gear"></i>',
            name: "메인관리",
            link: "/admin",
        },
        {
            icon: '<i class="fa-solid fa-money-bill"></i>',
            name: "요금제관리",
            link: "/admin/yogmanage",
        },
        {
            icon: '<i class="fa-solid fa-square-phone-flip"></i>',
            name: "공시 관리",
            link: "/admin/gongsi",
        },
        {
            icon: '<i class="fa-solid fa-sitemap"></i>',
            name: "상품 관리",
            link: "/admin/item",
        },
    ];

    let url = "/admin";
    $: url = $page.url.pathname;

    $: {
        console.log($page.url.pathname);
        auth_chk();
    }
    $: {
        if (innerWidth < 980) {
            $pc_sidebar = true;
        } else {
            $pc_sidebar = false;
            $mobile_sidebar = true;
        }
    }

    const user_area_toggle = (ele) => {
        ele.addEventListener("click", (e) => {
            user_area = !user_area;
            e.stopPropagation();
        });

        window.addEventListener("click", () => {
            user_area = false;
        });
    };

    const mobile_sidebar_toggle = (ele) => {
        ele.addEventListener("click", (e) => {
            $mobile_sidebar = !$mobile_sidebar;
            e.stopPropagation();
        });

        window.addEventListener("click", () => {
            $mobile_sidebar = true;
        });
    };
</script>

<svelte:head>
    <!-- SUIT 폰트 CSS -->
    <link
        href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
        rel="stylesheet"
    />
</svelte:head>

<svelte:window bind:innerWidth />

<div class="fixed left-0 top-0 w-full z-50 py-2 px-6 lg:pl-28 bg-slate-700">
    <button
        class="text-2xl text-white hidden md:inline-block"
        on:click={() => {
            $pc_sidebar = !$pc_sidebar;
        }}
    >
        <i class="fa-solid fa-burger" />
    </button>
    <button class="p pt-1" use:user_area_toggle>
        <span class="text-white ml-6 relative">
            User님 로그인중
            {#if user_area}
                <div
                    class="absolute top-7 left-0 w-36 z-50 border border-slate-400 rounded-lg bg-white text-slate-800"
                >
                    <ul class="text-center">
                        <a href="/">
                            <li class="mt-1 border-b border-gray-200">HOME</li>
                        </a>
                        <a href="/">
                            <li class="mt-1 border-b border-gray-200">
                                LOGOUT
                            </li>
                        </a>
                    </ul>
                </div>
            {/if}
        </span>
        <span class="text-white ml-2"><i class="fa-solid fa-caret-down" /></span
        >
    </button>

    <button
        class="text-2xl text-white inline-block float-right relative md:hidden"
        use:mobile_sidebar_toggle
    >
        <i class="fa-solid fa-burger" />

        <div
            class="border border-slate-400 w-40 absolute top-9 bg-white text-black text-sm rounded-md"
            style="right:-23px"
            class:hidden={$mobile_sidebar}
        >
            <ul>
                {#each menu_list as list}
                    <li class="py-2 border-b border-gray-200">
                        {@html list.icon}
                        {list.name}
                    </li>
                {/each}
            </ul>
        </div>
    </button>
</div>

<MenuBar {menu_list} />

<slot />

<style>
    :global(.suit-font) {
        font-family: "SUIT";
    }

    :global(.table_wrap) {
        width: 100%;
        overflow: auto;
    }

    :global(.table_area) {
        width: 100%;
        min-width: 880px;
    }
</style>
