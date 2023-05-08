<script>
    import { numComma } from "$front_lib/lib";
    export let itemInfo;
    const tongArr = ["sk", "kt", "lg"];
    let halwonArr = [];
    let fprice;
    let itemImage;

    // 돌면서 통신사별 출고가 - 공시 - 할인 했을때 가장 적은 할부원금 찾기
    for (const tong of tongArr) {
        if (itemInfo[`it_ph_fprice_${tong}`]) {
            fprice = itemInfo[`it_ph_fprice_${tong}`].split(",")[0];
            const getGongsiArr = itemInfo[`gj_${tong}`].split(",").map(Number);
            const getGongsiMax = Math.max(...getGongsiArr);

            const getHalinArr = [
                ...itemInfo[`it_ph_mnpgdisc_${tong}`].split(","),
                ...itemInfo[`it_ph_gibgdisc_${tong}`].split(","),
            ].map(Number);
            const getHalinMax = Math.max(...getHalinArr);
            halwonArr.push(Number(fprice) - getGongsiMax - getHalinMax);
        }
    }
    const minHalwon = Math.min(...halwonArr);
    
    if (itemInfo.it_img_list) {
        itemImage = itemInfo.it_img_list.split(",")[0];
    } else {
        itemImage = "";
    }
</script>

<div class=" rounded-md p-2 text-center shadow">
    <div>
        <img
            src={itemImage}
            alt=""
            class="mx-auto w-10/12"
            style="max-width:180px;"
        />
    </div>
    <div class="font-medium">{itemInfo.it_subname}</div>
    <div class="text-sm line-through text-gray-400">
        출고가 : {numComma(fprice)}원
    </div>
    <div class="font-medium">구매가 : {numComma(minHalwon)}원~</div>
</div>
