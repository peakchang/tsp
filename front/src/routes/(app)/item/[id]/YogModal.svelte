<script>
    import YogRadio from "$components/YogRadio.svelte";
    export let showModal;
    export let allYog;
    export let yogVal;
    export let changeTongStatus;
    export let changeTongBaseYog;

    let yogValTemp = Number(yogVal);
    $: {
        // 통신사 변경시 기본 셋팅 요금제로~~
        if(changeTongStatus){
            yogValTemp = changeTongBaseYog
        }
        changeTongStatus = false;
        yogVal = yogValTemp;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
    class="modal-background suit-font fixed left-0 top-0 w-full h-full flex justify-center items-center z-10"
    class:hidden={showModal}
>
    <div class="modal-inner bg-white w-full md:w-1/2 pt-3">
        <div class="modal-header flex justify-between items-center py-2 px-8">
            <div class="modal-header font-semibold w-full pl-6 text-xl">
                요금제 선택
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

        <hr />
        <div class="px-8 pt-2 overflow-auto" style="height:520px">
            {#each allYog as yog, idx}
                <YogRadio>
                    <input
                        type="radio"
                        class="hidden peer"
                        slot="input-set"
                        value={idx}
                        bind:group={yogValTemp}
                        on:click={() => (showModal = !showModal)}
                    />
                    <div slot="inner-text">
                        <div class="text-lg">{yog.py_name}</div>
                        <div class="text-base">
                            기본료 : {yog.py_fee
                                .toString()
                                .replace(
                                    /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g,
                                    ","
                                )}원
                        </div>
                        <div class="text-xs font-normal">
                            <i class="fa-solid fa-wifi" /> : {yog.py_data}
                            <i class="fa-solid fa-phone" />
                            : {yog.py_call}
                            <i class="fa-solid fa-comment-sms" />
                            :
                            {yog.py_sms}
                        </div>
                        <div class="text-xs font-light">
                            {yog.py_addinfo}
                        </div>
                    </div>
                </YogRadio>
            {/each}
        </div>
    </div>
</div>

<style>
    .modal-background {
        background: rgba(0, 0, 0, 0.3);
        animation: fade 0.5s ease;
    }
    .modal-inner {
        animation: zoom 0.5s ease;
    }

    @keyframes zoom {
        from {
            transform: translateY(-30%);
        }
        to {
            transform: translateY(0);
        }
    }
    /* .dialog[open]::backdrop {
        animation: fade 0.2s ease-out;
    } */
    @keyframes fade {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    button {
        display: block;
    }
</style>
