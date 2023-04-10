import { user_id } from "$lib/store";
import axios from "axios";
import { goto } from "$app/navigation";

export const auth_chk = (type="local", compareRate = 1, path = '/', alertMessage) => {
    axios
        .get(import.meta.env.VITE_SERVER_URL + "/auth/chk", {
            withCredentials: true,
        })
        .then((res) => {
            if (!res.data.loginChk) {
                user_id.set('')
            }

            if (res.data.userInfo) {
                const userInfo = res.data.userInfo
                console.log(userInfo);
                if (userInfo.user_rate < compareRate) {
                    alert(alertMessage)
                    if (!path) {
                        history.back()
                    } else {
                        console.log('path 이동은 오니?');
                        goto(path)
                    }
                }
                if(type != "local"){
                    user_id.set(userInfo.idx)
                    goto(path)
                }
            }

            // user_id.subscribe((c) => {
            //     testVal = c
            // });
            // console.log(testVal);
        })
        .catch((err) => {
            console.log("error!!!");
            console.log(err);
        });
}

// 보여줄 하단 페이징 구하기
export const page_set = (page, all_count, show_row_num, set_page_count) => {
    var page_arr = [];
    var max_page = Math.ceil(all_count / show_row_num);
    if (page < 3) {
        for (let i = 1; i < set_page_count + 1; i++) {
            if (i > max_page) {
                break;
            }
            page_arr.push(i);
        }
    } else {
        for (let i = page - 2; i < page + 3; i++) {
            if (i > max_page) {
                break;
            }
            page_arr.push(i);
        }
    }
    return page_arr;
};

// 배열 내 특정값 삭제하기
export const del_arr_value = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr
}

export const dataURItoBlob = (dataURI) => {
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