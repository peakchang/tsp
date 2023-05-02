<script>
    export let pyVal = 2;
</script>
<label class="w-full">
    <slot name="input-set" />
    <div
        class="border border-gray-400 bg-gray-100 rounded-md py-{pyVal} my-2 text-center peer-checked:border-red-600 peer-checked:bg-white font-medium cursor-pointer text-xs md:text-sm"
    >
        <slot name="inner-text" />
    </div>
</label>
