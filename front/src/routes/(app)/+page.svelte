<script>
    import ItemDiv from "$components/ItemDiv.svelte";
    import MainSwiper from "$components/MainSwiper.svelte";
    import ReviewSwiper from "$components/ReviewSwiper.svelte";
</script>

<div class="suit-font max_screen mx-auto px-2 my-4 main-slider">
    <MainSwiper />
</div>

<div class="max_screen mx-auto px-2 suit-font">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
        <a href="/item/84848484">
            <ItemDiv />
        </a>

        <a href="/item/84848484">
            <ItemDiv />
        </a>

        <a href="/item/84848484">
            <ItemDiv />
        </a>

        <a href="/item/84848484">
            <ItemDiv />
        </a>
    </div>
</div>


<div class="suit-font max_screen mx-auto px-2 my-4 main-slider">
    <ReviewSwiper />
</div>