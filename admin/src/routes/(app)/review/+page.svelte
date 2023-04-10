<script>
    import { pc_sidebar } from "$lib/store";
    import Editor from "$components/Editor.svelte";
    import ImageUpload from "$components/ImageUpload.svelte";

    let modifyVal = '';

    const updateBoard = (e) => {
        console.log("gogogogogogoogogogog");
        console.log(e.detail);
    };

    const imgUpdate = (e) => {
        console.log(e.detail.imgUrlArrString);
    }

</script>

<div class="suit-font px-2 pt-24" class:pl-44={!$pc_sidebar}>
    <!-- <Editor on:editorUpdate={updateBoard} {modifyVal} /> -->
    <ImageUpload on:imgUpdate={imgUpdate} {modifyVal}/>
</div>
