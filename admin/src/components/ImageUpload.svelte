<script>
    import axios from "axios";
    import { dataURItoBlob } from "$front_lib/lib";
    import Sortable from "sortablejs";
    import { onMount } from "svelte";
    import _cloneDeep from "lodash/cloneDeep";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    let fileinput;
    let imgUrlArr = [];
    let listsEl;
    let sortableLists;
    export let modifyVal;

    onMount(() => {
        if (modifyVal) {
            imgUrlArr = JSON.parse(modifyVal);
        }
        // For Lists
        sortableLists = new Sortable(listsEl, {
            group: "My Lists", // 한 목록에서 다른 목록으로 요소를 끌어오려면(DnD) 두 목록의 그룹 값이 같아야 합니다.
            handle: ".list", // 드래그 핸들이 될 요소의 선택자를 입력합니다.
            delay: 50, // 클릭이 밀리는 것을 방지하기 위해 약간의 지연 시간을 추가합니다.
            animation: 0, // 정렬할 때 애니메이션 속도(ms)를 지정합니다.
            forceFallback: true, // 다양한 환경의 일관된 Drag&Drop(DnD)을 위해 HTML5 기본 DnD 동작을 무시하고 내장 기능을 사용합니다.
            // 요소의 DnD가 종료되면 실행할 핸들러(함수)를 지정합니다.
            onEnd(event) {
                const clone = _cloneDeep(imgUrlArr[event.oldIndex]);
                imgUrlArr.splice(event.oldIndex, 1);
                imgUrlArr.splice(event.newIndex, 0, clone);

                console.log(imgUrlArr);
            },
        });
    });

    const deleteImg = (e) => {
        const idx = Number(e.target.dataset.idx);
        const getImgSplit = imgUrlArr[idx].split("/");
        const getFolder = getImgSplit[getImgSplit.length - 2];
        const getImgName = getImgSplit[getImgSplit.length - 1];
        axios
            .post(import.meta.env.VITE_SERVER_URL + "/board/delete_img", {
                getFolder,
                getImgName,
            })
            .then((res) => {})
            .catch((err) => {});
        imgUrlArr.splice(idx, 1);
        imgUrlArr = [...new Set(imgUrlArr)];
    };
    const onFileSelected = (e) => {
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

                let imgForm = new FormData();

                const timestamp = new Date().getTime();
                const fileName = `${timestamp}${Math.random()
                    .toString(36)
                    .substring(2, 11)}.webp`;
                imgForm.append("onimg", resultImage, fileName);

                // FormData의 key 값과 value값 찾기
                let keys = imgForm.keys();
                for (const pair of keys) {
                    console.log(`name : ${pair}`);
                }

                let values = imgForm.values();
                for (const pair of values) {
                    console.log(`value : ${pair}`);
                }
                axios
                    .post(
                        import.meta.env.VITE_SERVER_URL + "/board/img_uploads",
                        imgForm
                    )
                    .then((res) => {
                        console.log(res.data);
                        console.log();
                        imgUrlArr.push(res.data.baseUrl);
                        imgUrlArr = [...new Set(imgUrlArr)];
                        // imgArr = .push(res.data.baseUrl);
                        console.log(imgUrlArr);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            };
        };
    };
</script>

<div>
    <div class="flex" bind:this={listsEl}>
        {#each imgUrlArr as img, idx}
            <div
                class="list border border-slate-400 w-24 h-24 rounded-lg flex items-center justify-center overflow-hidden mb-1 ml-1 relative"
            >
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <span
                    class="absolute top-1 right-1 text-red-600 cursor-pointer"
                    on:click={deleteImg}
                    ><i class="fa-regular fa-circle-xmark" data-idx={idx} />
                </span>
                <img src={img} alt="" />
            </div>
        {/each}
    </div>
</div>

<div id="app">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="flex items-center">
        <span
            class="text-3xl cursor-pointer"
            on:click={() => {
                fileinput.click();
            }}
            ><i class="fa-solid fa-images" />
        </span>
        <span
            class="ml-1 cursor-pointer"
            on:click={() => {
                fileinput.click();
            }}>이미지 업로드</span
        >

        <button
            class="ml-3 border border-emerald-700 bg-emerald-700 px-3 rounded-md text-white"
            on:click={() => {
                const imgUrlArrString = imgUrlArr.join(",");
                dispatch("imgUpdate", { imgUrlArrString });
            }}>업데이트</button
        >
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
