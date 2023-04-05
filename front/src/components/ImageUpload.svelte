<script>
    let avatar, fileinput;
    const onFileSelected = (e) => {
        // 이미지 파일 불러오기
        let image = e.target.files[0];

        // 미리보기를 위해 파일리어 생성
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            avatar = e.target.result;
        };

        // 이미지 전송을 위해 FormData에 이미지 넣기 ('네임값', 이미지)로 네임값은 multer 파라미터에 넣어준다
        let imgForm = new FormData();
        imgForm.append("img", image);

        // FormData의 key 값과 value값 찾기
        let keys = imgForm.keys();
        for (const pair of keys) {
            console.log(`name : ${pair}`);
        }

        let values = imgForm.values();
        for (const pair of values) {
            console.log(`value : ${pair}`);
        }

        axios.post(import.meta.env.VITE_SERVER_URL + "/board/uploads", imgForm);
    };
</script>
<div id="app">
    <h1>Upload Image</h1>

    {#if avatar}
        <img class="avatar" src={avatar} alt="d" />
    {:else}
        <img
            class="avatar"
            src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
            alt=""
        />
    {/if}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
        class="upload"
        src="https://static.thenounproject.com/png/625182-200.png"
        alt=""
        on:click={() => {
            fileinput.click();
        }}
    />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="chan"
        on:click={() => {
            fileinput.click();
        }}
    >
        Choose Image
    </div>
    <input
        style="display:none"
        type="file"
        accept=".jpg, .jpeg, .png"
        name="testimg"
        on:change={(e) => onFileSelected(e)}
        bind:this={fileinput}
    />
</div>

<style>
    #app {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
    }

    .upload {
        display: flex;
        height: 50px;
        width: 50px;
        cursor: pointer;
    }
    .avatar {
        display: flex;
        height: 200px;
        width: 200px;
    }
</style>
