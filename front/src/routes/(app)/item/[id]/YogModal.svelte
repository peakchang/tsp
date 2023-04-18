<script>
    export let showModal;
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
        <div class="px-8 pt-2 h-96">
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
