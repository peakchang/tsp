<script>
    import "$src/app.css";
    import { page } from "$app/stores";
    import { user_id } from "$lib/store";
    import { auth_chk } from "$lib/lib";
    let url = "/";
    $: url = $page.url.pathname;
    const navs = [
        { title: "HOME", href: "/" },
        { title: "광고서비스", href: "/service" },
        { title: "DB수집", href: "/getdb" },
        { title: "광고문의", href: "/about" },
    ];

    $: {
        console.log($page.url.pathname);
        auth_chk()
    }
</script>

<svelte:head>
    <!-- SUIT 폰트 CSS -->
    <link
        href="https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/static/woff2/SUIT.css"
        rel="stylesheet"
    />
</svelte:head>
<header>
    <div class="container hidden md:flex justify-around suit-font py-4 mx-auto">
        <div class="logo_area w-1/4">
            <a href="/"><img src="/img/logo.png" alt="" class="h-12" /></a>
        </div>
        <div class="w-6/12 align-middle flex items-center">
            <ul class="flex justify-between font-bold w-full">
                {#each navs as nav}
                    <li class="cursor-pointer">
                        <a href={nav.href}>
                            <span class:text-sky-600={url === nav.href}
                                >{nav.title}</span
                            >
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>

    <div class="md:hidden">
        <div class="mobile-logo text-center py-3">
            <img src="/img/logo.png" alt="" class="h-12 mx-auto" />
        </div>
        <hr />
        <div>
            <ul class="flex justify-between text-sm font-semibold py-2 px-3">
                {#each navs as nav}
                    <li class="cursor-pointer">
                        <a href={nav.href}>
                            <span
                                class="m-menu py-1 px-2 rounded-lg"
                                class:bg-sky-600={url === nav.href}
                                class:text-white={url === nav.href}
                                >{nav.title}</span
                            >
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </div>
    <hr />
</header>
<slot />


<style>
    :global(.suit-font) {
        font-family: "SUIT";
    }

    :global(.main_img) {
        height: 300px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 1900px;
        margin: 0 auto;
    }

    :global(.main_img h1) {
        text-align: center;
        font-size: 40px;
        font-weight: bolder;
        position: relative;
    }
</style>
