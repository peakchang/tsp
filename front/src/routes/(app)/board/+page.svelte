<script>
    import Sortable from "sortablejs";
    import { onMount } from "svelte";
    import _cloneDeep from "lodash/cloneDeep";
    import axios from "axios";

    let fileinput;
    const onFileSelected = async (e) => {
        const maxWidth = 1200;
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (r) {
            const img = new Image();
            img.src = r.target.result;

            img.onload = async function (e) {
                if (img.width >= maxWidth) {
                    var share = img.width / maxWidth;
                    var setHeight = Math.floor(img.height / share);
                    var setWidth = maxWidth;
                } else {
                    var setWidth = img.width;
                    var setHeight = img.height;
                }

                var canvas = document.createElement("canvas");
                canvas.width = setWidth;
                canvas.height = setHeight;
                canvas.display = "inline-block";
                canvas
                    .getContext("2d")
                    .drawImage(img, 0, 0, setWidth, setHeight);

                var getReImgUrl = canvas.toDataURL("image/webp");

                const resultImage = dataURItoBlob(getReImgUrl);
                console.log(resultImage);

                let imgForm = new FormData();

                const timestamp = new Date().getTime();
                const fileName = `${timestamp}${Math.random()
                    .toString(36)
                    .substring(2, 11)}.webp`;
                imgForm.append("onimg", resultImage, fileName);

                // imgArr.push(fileName);

                const getImgUrl = await axios.post(
                    import.meta.env.VITE_SERVER_URL + "/board/img_uploads",
                    imgForm,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                console.log(getImgUrl);
                const tempImg = `<img src="${getImgUrl.data.baseUrl}">`;
                const temp_list = [...lists];
                temp_list.push(tempImg);
                lists = temp_list;
            };
        };

        // const update_data = await axios.post(import.meta.env.VITE_SERVER_URL + "/board/uploads", imgForm);
    };

    let lists = [];
    let lestsEl;
    let sortableLists;

    onMount(() => {
        sortableLists = new Sortable(lestsEl, {
            group: "My Lists", // 한 목록에서 다른 목록으로 끌어오려면 두 목록의 그룹 값이 같아야 한다.
            handle: ".list", // 드래그 핸들이 될 요소의 선택자를 입력합니다.
            delay: 0, // 클릭이 밀리는것을 방지하기 위해 약간의 지연 시간을 추가합니다.
            animation: 0, // 정렬할 때 애니메이션 속도를 지정합니다.
            forceFallback: true, // 다양한 환경의 일관된 Drag&Drop 를 위해 HTML5 기본 DnD 동작을 무시합니다.
            // 그 이유는 다양한 브라우저의 호환성 때문
            // 드래그 앤 드롭이 완료된 후 실행되는 이벤트
            onChoose(e) {
                console.log("jaslidjfiajsdlfj");
                console.log(e.oldIndex);
                console.log(lists.length - 1);
                return false;
            },
            onStart(e) {},
            onEnd(event) {
                console.log(event);
                console.log(event.oldIndex);
                console.log(event.newIndex);
                const oldIndex = event.oldIndex;
                const newIndex = event.newIndex;

                const clone = _cloneDeep(lists[oldIndex]);
                lists.splice(oldIndex, 1);
                lists.splice(newIndex, 0, clone);
                console.log(lestsEl);
                console.log(lists);
            },
        });
    });

    const add_list = () => {
        const temp_list = [...lists];
        temp_list.push("oioo");
        lists = temp_list;
    };

    const dataURItoBlob = (dataURI) => {
        const bytes =
            dataURI.split(",")[0].indexOf("base64") >= 0
                ? atob(dataURI.split(",")[1])
                : unescape(dataURI.split(",")[1]);
        const mime = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const max = bytes.length;
        const ia = new Uint8Array(max);
        for (let i = 0; i < max; i++) ia[i] = bytes.charCodeAt(i);
        return new Blob([ia], { type: mime });
    };
</script>

<div class="list-container suit-font">
    <div class="flex">
        <div class="lists flex flex-wrap" bind:this={lestsEl}>
            {#each lists as list}
                <div class="border-2 border-slate-300 list w-28 h-28 m-1 rounded-xl overflow-hidden flex justify-center items-center">
                    {@html list}
                </div>
            {/each}
        </div>
    </div>
    <button
        class=" border-2 border-slate-400 list flex justify-center items-center cursor-pointer font-semibold  py-1 w-48 mt-3 rounded-xl "
        on:click={() => {
            fileinput.click();
        }}
    >
        <span class="text-slate-500 text-3xl"
            ><i class="fa-solid fa-upload" /></span
        >
        <span class="ml-3">파일 업로드</span>
    </button>
</div>

<button on:click={add_list}>addList</button>

<input
    style="display:none"
    type="file"
    accept=".jpg, .jpeg, .png"
    name="testimg"
    on:change={(e) => onFileSelected(e)}
    bind:this={fileinput}
/>
