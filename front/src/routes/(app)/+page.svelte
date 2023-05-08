<script>
    import ItemDiv from "$components/ItemDiv.svelte";
    import MainSwiper from "$components/MainSwiper.svelte";
    import ReviewSwiper from "$components/ReviewSwiper.svelte";
    import axios from "axios";

    let itemList = getItemList();

    async function getItemList() {
        const res = await axios.get(
            import.meta.env.VITE_SERVER_URL + `/get_item`
        );
        return res.data;
    }
</script>

<div class="suit-font max_screen mx-auto px-2 my-4 main-slider">
    <MainSwiper />
</div>

<div class="max_screen mx-auto px-2 suit-font">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        {#await itemList}
            <div>...loading</div>
        {:then itemVal}
            {#each itemVal.get_item_list as item}
                <a href="/item/{item.it_id}">
                    <ItemDiv bind:itemInfo={item} />
                </a>
            {/each}
        {/await}
    </div>
</div>

<div class="suit-font max_screen mx-auto px-2 my-4 main-slider">
    <ReviewSwiper />
</div>
