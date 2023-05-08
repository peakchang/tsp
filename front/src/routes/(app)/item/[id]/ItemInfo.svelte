<script>
    import ReviewComponent from "./ReviewComponent.svelte";
    import QnaComponent from "./QnaComponent.svelte";
    import AllItemDetail from "./AllItemDetail.svelte";

    export let detailPropVal;
    let menuValStatus = 0;

    let qnaObjVal = {};
    for (let i = 0; i < 10; i++) {
        qnaObjVal[`qnaVal${i}`] = false;
    }
</script>

<div class="max_screen suit-font mx-auto px-4 mt-10">
    <ul class="flex">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
            class="mr-10 font-bold text-lg {`${
                menuValStatus == 0
                    ? 'text-black border-b border-black'
                    : 'text-gray-400'
            }`}"
            on:click={() => {
                menuValStatus = 0;
            }}
        >
            <button>신청방법 / 고객센터</button>
        </li>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
            class="mr-10 font-bold text-lg {`${
                menuValStatus == 1
                    ? 'text-black border-b border-black'
                    : 'text-gray-400'
            }`}"
            on:click={() => {
                menuValStatus = 1;
            }}
        >
            <button>문의</button>
        </li>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
            class="font-bold text-lg {`${
                menuValStatus == 2
                    ? 'text-black border-b border-black'
                    : 'text-gray-400'
            }`}"
            on:click={() => {
                menuValStatus = 2;
            }}
        >
            <button>후기</button>
        </li>
    </ul>

    {#if menuValStatus == 0}
        <AllItemDetail detailPropVal={detailPropVal} />
    {:else if menuValStatus == 1}
        <ReviewComponent />
    {:else}
        <QnaComponent />
    {/if}
</div>
