<script>
    let status = 0;
</script>

<div class="max_screen suit-font mx-auto px-4 mt-10">
    <ul class="flex">
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
            class="mr-10 font-bold text-lg {`${
                status == 0 ? 'text-black border-b border-black' : 'text-gray-400'
            }`}"
            on:click={() => {
                status = 0
            }}
        >
            <button>신청방법 / 고객센터</button>
        </li>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
            class="mr-10 font-bold text-lg {`${
                status == 1 ? 'text-black border-b border-black' : 'text-gray-400'
            }`}"
            on:click={() => {
                status = 1
            }}
        >
            <button>문의</button>
        </li>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li
            class="font-bold text-lg {`${
                status == 2 ? 'text-black border-b border-black' : 'text-gray-400'
            }`}"
            on:click={() => {
                status = 2
            }}
        >
            <button>후기</button>
        </li>
    </ul>
</div>
