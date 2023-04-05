<script>
    import { goto } from "$app/navigation";
    import { user_id } from "$lib/store";
    import axios from "axios";
    import { onMount } from "svelte";

    onMount(() => {
        if(!$user_id){
            alert('이미 로그아웃 되어 있습니다.')
            history.back()
            return false
        }else{
            request_logout();
        }
    })
    

    const request_logout = async () => {
        await axios
            .get(import.meta.env.VITE_SERVER_URL + "/auth/logout", {
                withCredentials: true,
            })
            .then((res) => {
                alert("로그아웃 되었습니다.");
                $user_id = "";
                goto("/");
            })
            .catch((err) => {
                alert(err.response.data.message);
                return;
            });
    };
    
</script>
