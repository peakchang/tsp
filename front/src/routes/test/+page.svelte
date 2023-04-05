<script>
    let toggle = true;
    let widthOn = 200;
    const hello = (ext, options = {}) => {
        console.log("element init!");
        const { width = "100px", height = "100px", color = "tomato" } = options;
        console.log(ext);
        ext.style.width = width;
        ext.style.height = height;
        ext.style.backgroundColor = color;
        return {
            update: (opts) => {
                // update는 use의 함수의 두번째 인자 (여기서는 options)가 변경 될 시에 실행된다.
                console.log("update!", opts);
                ext.style.width = opts.width;
            },
            destroy() {
                // destroy 는 화면에서 해당 요소가 사라질 경우에 실행된다.
                console.log("destroy!");
                widthOn = 200;
            },
        };
    };

    const testOn = (ele, testParamFunc) => {
        console.log(ele);
        ele.style.color = "red";
        ele.addEventListener("click", (e) => {
            console.log("slkdjflsjdf");
            e.stopPropagation();
        });

        window.addEventListener("click", () => {
            testParamFunc();
        });
    };

    const testParamFunc = () => {
        console.log("param!!!!");
    };
</script>

<button on:click={() => (toggle = !toggle)}>Toggle!</button>
<button on:click={() => (widthOn += 20)}>Size Up!</button>

<div use:hello />
{#if toggle}
    <div
        use:hello={{
            width: `${widthOn}px`,
            height: "70px",
            color: "royalblue",
        }}
    />
{/if}

<div use:testOn={testParamFunc}>lkasjdlfajsdli</div>
