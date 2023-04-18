<script>
    let qnaObjVal = {};
    for (let i = 0; i < 10; i++) {
        qnaObjVal[`qnaVal${i}`] = false;
    }
</script>

<div class=" max-w-3xl mx-auto px-2 mb-8">
    {#each Array(5) as _, i}
        <section>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="border-b border-zinc-200 py-2 cursor-pointer flex"
                on:click={() => {
                    qnaObjVal[`qnaVal${i}`] = !qnaObjVal[`qnaVal${i}`];
                }}
            >
                <div
                    class="h-16 border overflow-hidden rounded-md"
                    style="min-width: 64px; width:64px;"
                >
                    imgsdfs343434
                </div>
                <div class="pl-3" style="width:85%">
                    <div
                        class="text-sm md:text-base py-1 w-11/12 overflow-hidden whitespace-nowrap text-ellipsis"
                    >
                        dfgsdfgsdfgsdfgsdfgasdfasdfasdfasdfasdfalksdjflajsdlfijasldifjliasdjfajsdlfjaslidfjliasdjflajsdfjalsidfj
                    </div>
                    <div class="flex justify-between">
                        <div class="text-gray-400">
                            <span>박**</span>
                            <span class="mx-2">|</span>
                            <span>2023.04.15</span>
                        </div>
                        <div>
                            {#if qnaObjVal[`qnaVal${i}`] == true}
                                <span><i class="fa-solid fa-chevron-up" /></span
                                >
                            {:else}
                                <span
                                    ><i
                                        class="fa-solid fa-chevron-down"
                                    /></span
                                >
                            {/if}
                        </div>
                    </div>
                </div>
            </div>

            {#if qnaObjVal[`qnaVal${i}`]}
                <div class="bg-zinc-200 p-3">
                    <div class="question flex">
                        <div><i class="fa-solid fa-q" /></div>
                        <div class="ml-5 text-sm md:text-base">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Itaque, dolore architecto. Voluptates
                            perspiciatis provident ex architecto at eaque error
                            qui nisi. Accusamus voluptates assumenda ipsa
                            deleniti quasi debitis dignissimos aspernatur?
                        </div>
                    </div>

                    <div
                        class="answer-info mt-4 mb-1 text-gray-500 text-sm md:text-base"
                    >
                        <span>담당자</span>
                        <span class="mx-1">|</span>
                        <span>2023.04.15</span>
                    </div>
                    <div class="answer flex">
                        <div><i class="fa-solid fa-a" /></div>
                        <div class="ml-5 text-sm md:text-base">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Itaque, dolore architecto. Voluptates
                            perspiciatis provident ex architecto at eaque error
                            qui nisi. Accusamus voluptates assumenda ipsa
                            deleniti quasi debitis dignissimos aspernatur?
                        </div>
                    </div>
                </div>
            {/if}
        </section>
    {/each}
</div>
