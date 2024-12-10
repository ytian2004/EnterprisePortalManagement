import axios from "axios";

// 信息更新
export function upload(path, userForm){
    const params = new FormData()
    for(let i in userForm){
        params.append(i, userForm[i])
    }
    return axios.post(path,params,{
        headers:{
            "Content_Type":"multipart/form-data"
        }
    }).then(res=>{
        return res.data
    })
}
