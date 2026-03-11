//src\api\index.js
import { api } from "./client";
export const get  = (path)        => api.get(path).then(r => r.data);
export const post = (path, body)  => api.post(path, body).then(r => r.data);
export const put  = (path, body)  => api.put(path, body).then(r => r.data);
export const del  = (path)        => api.delete(path).then(r => r.data);
