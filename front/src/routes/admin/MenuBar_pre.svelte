<script>
    import { admin_sidebar } from "$lib/store";
    export let menu_list;
</script>

<div
    class="fixed left-0 top-0 h-screen border-r-2 bg-gray-100 suit-font pt-16 side"
    class:hide-side={$admin_sidebar}
>
    <ul class="text-right mt-6 pr-6" class:hidden={$admin_sidebar}>
        {#each menu_list as menu}
            <a href="/">
                <li class="mt-5 text-slate-700 cursor-pointer">
                    <span class="mr-1">{@html menu.icon}</span>
                    {menu.name}
                </li>
            </a>
        {/each}
        <li />
    </ul>
</div>

<style>
    .side {
        width: 160px;
        transition: width 0.2s;
    }

    .hide-side {
        width: 0px;
    }
</style>
