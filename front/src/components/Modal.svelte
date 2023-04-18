<script>
    import ImageUpload from "$components/ImageUpload.svelte";
    let outLineAlert = false;
    let modalInputContent;
    let btnReady = false;
    let maxImgCount = 8

    export let showModal;
    export let getImgList;
    export let imgUpdateUse;

    $: modalInputContent,
        (() => {
            if (modalInputContent) {
                if (modalInputContent.length > 10) {
                    outLineAlert = false;
                    btnReady = true;
                } else {
                    btnReady = false;
                }
            }
        })();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->

<div
    class="modal-background suit-font fixed left-0 top-0 w-full h-full flex justify-center items-center z-10"
    class:hidden={showModal}
>
    <div class="modal-inner bg-white w-full md:w-1/2 pt-3">
        <slot name="header" />

        <hr />

        <div class="px-8 pt-2 h-80">
            <textarea
                class="w-full border border-zinc-300 rounded-lg resize-none focus:outline-blue-400 p-2"
                style="height:90%"
                class:border-red-400={outLineAlert}
                bind:value={modalInputContent}
                on:focusout={() => {
                    console.log(modalInputContent);
                    if (!modalInputContent || modalInputContent.length < 10) {
                        console.log("smalll!!!");
                        outLineAlert = true;
                    } else {
                        outLineAlert = false;
                    }
                }}
            />
            <div class="text-sm text-red-500" class:hidden={!outLineAlert}>
                최소 10자 이상 입력해주세요.
            </div>
        </div>

        {#if imgUpdateUse}
            <div class="px-4 py-1">
                <ImageUpload {maxImgCount} bind:getImgList />
            </div>
        {/if}

        <div class="text-center">
            {#if !btnReady}
                <div
                    class="w-full bg-zinc-400 py-4 text-white"
                    style="font-size:18px;"
                >
                    등록하기
                </div>
            {:else}
                <button
                    class="w-full bg-blue-400 py-4 text-white"
                    style="font-size:18px;"
                >
                    등록하기
                </button>
            {/if}
        </div>
    </div>
</div>

<style>
    .modal-background {
        background: rgba(0, 0, 0, 0.3);
        animation: fade 0.3s ease
    }
    .modal-inner {
        animation: zoom 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes zoom {
        from {
            transform: translateY(-90%);
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
