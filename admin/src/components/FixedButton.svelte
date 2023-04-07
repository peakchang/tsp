<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let choice_btn;
    console.log(choice_btn);

    let testDisVal = "유규유규유규유규유규유규유규유규";
</script>

<div class="fixed right-0 top-14 z-50 pr-5 text-sm suit-font">
    {#if choice_btn.includes("업데이트")}
        <button
            class="border border-blue-700 bg-blue-700 text-white py-1 px-4 rounded-md ml-2"
            on:click={() => {
                dispatch("update", { myName: testDisVal });
            }}
        >
            업데이트
        </button>
    {/if}

    {#if choice_btn.includes("선택삭제")}
        <button
            class="border border-red-700 bg-red-700 text-white py-1 px-4 rounded-md ml-2"
            on:click={() => {
                dispatch("choice_del");
            }}
        >
            선택삭제
        </button>
    {/if}

    {#if choice_btn.includes("선택수정")}
        <button
            class="border border-emerald-700 bg-emerald-700 text-white py-1 px-4 rounded-md ml-2"
            on:click={() => {
                dispatch("choice_update");
            }}
        >
            선택수정
        </button>
    {/if}

    {#if choice_btn.includes("상품추가")}
        <button
            class="border border-indigo-700 bg-indigo-700 text-white py-1 px-4 rounded-md ml-2"
            on:click={() => {
                dispatch("add_item");
            }}
        >
            상품추가
        </button>
    {/if}
    
    {#if choice_btn.includes("상품복사")}
        <button
            class="border border-pink-700 bg-pink-700 text-white py-1 px-4 rounded-md ml-2"
            on:click={() => {
                dispatch("copy_item");
            }}
        >
            상품복사
        </button>
    {/if}
</div>
