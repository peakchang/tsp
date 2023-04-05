<script>
    import { admin_sidebar, pc_sidebar } from "$lib/store";
    export let menu_list;
</script>

<div
    class="fixed left-0 top-0 h-screen border-r-2 bg-gray-100 suit-font pt-16 side"
    class:hide-side={$pc_sidebar}
>
    <ul class="text-left mt-6 pl-3">
        {#each menu_list as menu}
            <a href="{menu.link}">
                <li class="mt-5 text-slate-500 cursor-pointer">
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
        transform: translateX(0);
        transition: transform 0.15s ease-in-out
    }

    .hide-side {
        transform: translateX(-160px)
    }
</style>
