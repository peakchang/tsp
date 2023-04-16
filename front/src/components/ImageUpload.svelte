<script>
    import axios from "axios";
    import { dataURItoBlob } from "$front_lib/lib";
    import Sortable from "sortablejs";
    import { onMount } from "svelte";
    import _cloneDeep from "lodash/cloneDeep";
    import { createEventDispatcher } from "svelte";
    import imageCompression from "browser-image-compression";
    const dispatch = createEventDispatcher();

    let fileinput;
    let imgUrlArr = [];
    let listsEl;
    let sortableLists;
    let deleteWait = true;

    export let getImgList = [];
    export let modifyImageList = [];
    export let maxImgCount;

    /*
    Sortable을 사용해 imgUrlArr을 직접 변겨하게 되면 에러가 난다. (배열이 꼬임) 이를 방지하기 위해
    imgUrlArr 은 직접 사용하기 위해 따로 관리하고 상위 +page.svelte 에 보낼 배열은
    getImgList 에 따로 저장해서 사용
    */
    onMount(() => {
        if (modifyImageList) {
            imgUrlArr = modifyImageList;
        }
        // For Lists
        sortableLists = new Sortable(listsEl, {
            group: "My Lists", // 한 목록에서 다른 목록으로 요소를 끌어오려면(DnD) 두 목록의 그룹 값이 같아야 합니다.
            handle: ".list", // 드래그 핸들이 될 요소의 선택자를 입력합니다.
            delay: 0, // 클릭이 밀리는 것을 방지하기 위해 약간의 지연 시간을 추가합니다.
            animation: 0, // 정렬할 때 애니메이션 속도(ms)를 지정합니다.
            forceFallback: true, // 다양한 환경의 일관된 Drag&Drop(DnD)을 위해 HTML5 기본 DnD 동작을 무시하고 내장 기능을 사용합니다.
            animation: 150,
            onSort: function (e) {
                var items = e.to.children;
                let tempArr = [];
                for (let i = 0; i < items.length; i++) {
                    tempArr.push(items[i].querySelector("img").src);
                }
                getImgList = tempArr;
            },
        });
    });

    // 이미지 삭제시 파일에서 삭제 및 배열에서도 삭제
    const deleteImg = (e) => {
        if(!deleteWait){
            alert('잠시 후 다시 요청해주세요')
            return false;
        }
        deleteWait = false;
        const idx = Number(e.target.dataset.idx);
        const getImgSplit = imgUrlArr[idx].split("/");
        const getFolder = getImgSplit[getImgSplit.length - 2];
        const getImgName = getImgSplit[getImgSplit.length - 1];
        axios
            .post(import.meta.env.VITE_SERVER_URL + "/board/delete_img", {
                getFolder,
                getImgName,
            })
            .then((res) => {
                console.log('사제 완료~~~');
                deleteWait = true;
            })
            .catch((err) => {});
        imgUrlArr.splice(idx, 1);
        imgUrlArr = [...new Set(imgUrlArr)];
        getImgList = imgUrlArr;
    };
    $: deleteWait,
        (() => {
            console.log(deleteWait);
        })();

    // 이미지를 선택하면 사이즈 변경 (최대 1200px) 및 webp 변경 후 업로드
    const onFileSelected = (e) => {
        if (imgUrlArr.length >= maxImgCount) {
            alert(`최대 ${maxImgCount}개 이미지만 업로드 가능합니다.`);
            return false;
        }

        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", ".png,.jpg,.jpeg");
        input.click();

        // input change
        input.onchange = async (e) => {
            const maxWidth = 1200;
            const img_file = e.target.files[0];
            const options = {
                maxSizeMB: 0.7,
                // maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
            const compressedFile = await imageCompression(img_file, options);

            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
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
                    // let keys = imgForm.keys();
                    // for (const pair of keys) {
                    //     console.log(`name : ${pair}`);
                    // }

                    // let values = imgForm.values();
                    // for (const pair of values) {
                    //     console.log(`value : ${pair}`);
                    // }

                    console.log("이벤트는 발생 함???");
                    axios
                        .post(
                            import.meta.env.VITE_SERVER_URL +
                                "/board/img_uploads",
                            imgForm
                        )
                        .then((res) => {
                            imgUrlArr.push(res.data.baseUrl);
                            imgUrlArr = [...new Set(imgUrlArr)];
                            getImgList = imgUrlArr;
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                };
            };
        };
    };
    $: imgUrlArr,
        (() => {
            dispatch("getImageArr", { getImgList });
        })();
</script>

<div>
    <div class="flex flex-wrap" bind:this={listsEl}>
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
                if (imgUrlArr.length >= maxImgCount) {
                    alert(`최대 ${maxImgCount}개 이미지만 업로드 가능합니다.`);
                    return false;
                }
                fileinput.click();
            }}
            ><i class="fa-solid fa-images" />
        </span>
        <span class="ml-1 cursor-pointer" on:click={onFileSelected}>
            이미지 업로드
        </span>

    </div>

    <!-- <input
        style="display:none"
        type="file"
        accept=".jpg, .jpeg, .png"
        name="testimg"
        on:change={(e) => onFileSelected(e)}
        bind:this={fileinput}
    /> -->
</div>
