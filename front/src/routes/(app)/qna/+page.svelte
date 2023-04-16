<script>
    import Modal from "$components/Modal.svelte";
    let showModal = true;
    let getImgList;

    let qnaObjVal = {};
    for (let i = 0; i < 10; i++) {
        qnaObjVal[`qnaVal${i}`] = false;
    }
    console.log(qnaObjVal);
</script>

<div class="max_screen_inner suit-font mx-auto px-6 md:px-2">
    <div
        class="flex justify-between items-center py-3 my-3 border-b border-zinc-200"
    >
        <span class="text-3xl">상품문의</span>
        <button
            class="py-2 px-8 border border-blue-400 rounded-lg font-semibold text-blue-400"
            on:click={() => (showModal = !showModal)}>문의하기</button
        >
    </div>

    {#each Array(5) as _, i}
        <section class="py-3">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="border-b border-zinc-200 py-2 cursor-pointer"
                on:click={() => {
                    qnaObjVal[`qnaVal${i}`] = !qnaObjVal[`qnaVal${i}`];
                }}
            >
                <div class="flex justify-between py-1">
                    <span
                        class="text-xs md:text-sm py-1 px-3 rounded-md bg-gray-200 text-blue-400 font-semibold"
                        >답변대기</span
                    >
                    {#if qnaObjVal[`qnaVal${i}`] == true}
                        <span><i class="fa-solid fa-chevron-up" /></span>
                    {:else}
                        <span><i class="fa-solid fa-chevron-down" /></span>
                    {/if}
                </div>
                <div
                    class="text-sm md:text-base overflow-hidden whitespace-nowrap text-ellipsis py-1"
                >
                    {i}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                    incidunt cum eligendi nobis aut atque dignissimos est numquam?
                    Rerum dolorem soluta cumque accusantium eaque iste repellendus,
                    cupiditate accusamus eligendi voluptas.
                </div>
                <div class="text-gray-400 py-1 text-xs md:text-sm">
                    <span>박**</span>
                    <span class="mx-2">|</span>
                    <span>2023.04.15</span>
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

<Modal bind:showModal bind:getImgList>
    <div
        class="modal-header flex justify-between items-center py-2 px-8"
        slot="header"
    >
        <div class="modal-header font-semibold w-full pl-6 text-xl">
            문의하기
        </div>
        <button
            class="text-3xl text-red-400"
            on:click={() => {
                showModal = !showModal;
            }}
        >
            <i class="fa-regular fa-circle-xmark" />
        </button>
    </div>
</Modal>
