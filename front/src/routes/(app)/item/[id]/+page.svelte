<script>
    import { page } from "$app/stores";
    import CalculRadio from "$components/CalculRadio.svelte";
    console.log($page.params.id);

    let capaVal;
    let tongVal;
    let hyuhVal;
    let halTermVal;

    let capaList = [
        { value: 0, text: "128GB" },
        { value: 1, text: "256GB" },
    ];
    let tongList = [
        { value: 0, text: "SKT" },
        { value: 1, text: "KT" },
        { value: 2, text: "LG U+" },
        { value: 3, text: "알뜰폰" },
    ];

    let hyuhList = [
        { value: "gongsi", text: "공시지원금" },
        { value: "sunyak", text: "선택약정" },
    ];
    let halTermList = [
        { value: 1, text: "완납" },
        { value: 24, text: "24개월" },
        { value: 30, text: "30개월" },
    ];

    capaVal = capaList[0].value;
    tongVal = tongList[1].value;
    hyuhVal = hyuhList[0].value;
    halTermVal = halTermList[1].value;
</script>

<div class="max_screen suit-font mx-auto px-4">
    <div class="text-center">갤럭시Z플립3</div>

    <div class="grid md:grid-cols-2 gap-1">
        <div class="choice_area grid grid-cols-5">
            <div class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base">
                용량
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                {#each capaList as capa, idx}
                    <CalculRadio>
                        <input
                            type="radio"
                            value={capa.value}
                            class="hidden peer"
                            bind:group={capaVal}
                            slot="input-set"
                        />
                        <span slot="inner-text">{capa.text}</span>
                    </CalculRadio>
                {/each}
            </div>

            <div class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base">
                통신사
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                {#each tongList as tong, idx}
                    <CalculRadio>
                        <input
                            type="radio"
                            value={tong.value}
                            class="hidden peer"
                            bind:group={tongVal}
                            slot="input-set"
                        />
                        <span slot="inner-text">{tong.text}</span>
                    </CalculRadio>
                {/each}
            </div>

            <div class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base">
                할인유형
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                {#each halTermList as halTerm, idx}
                    <CalculRadio>
                        <input
                            type="radio"
                            value={halTerm.value}
                            class="hidden peer"
                            bind:group={halTermVal}
                            slot="input-set"
                        />
                        <span slot="inner-text">{halTerm.text}</span>
                    </CalculRadio>
                {/each}
            </div>


            <div class="flex justify-center items-center col-span-1 mt-3 text-sm md:text-base">
                할인유형
            </div>
            <div class="flex px-2 col-span-4 mt-3">
                {#each hyuhList as hyuh, idx}
                    <CalculRadio>
                        <input
                            type="radio"
                            value={hyuh.value}
                            class="hidden peer"
                            bind:group={hyuhVal}
                            slot="input-set"
                        />
                        <span slot="inner-text">{hyuh.text}</span>
                    </CalculRadio>
                {/each}
            </div>
        </div>

        <div>
            계산 영역
            <div class="w-12 h-12 bg-mpurple">#6b6998</div>

        </div>
        
    </div>
</div>
