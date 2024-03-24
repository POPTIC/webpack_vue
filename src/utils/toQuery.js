export default function(json, url){
    const paramString = new URLSearchParams(json).toString();
    return `${url}?${paramString}`;
}