<script>
    import {auth_chk} from "$lib/lib";
    import { onMount } from "svelte";
    onMount(() => {
        console.log('ajsdfjaslidfj');
        auth_chk("provider")
    })
</script>