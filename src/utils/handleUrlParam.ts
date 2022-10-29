export function handleUrlParam(key:string, value:string | null) {
  if (window.history.replaceState) {
    let searchParams = new URLSearchParams(window.location.search);

    if(!value){
      searchParams.delete(key);
    } else {
      searchParams.set(key, value);
    }

    let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + searchParams.toString();
    window.history.replaceState({path: newurl}, '', newurl);
  }
}