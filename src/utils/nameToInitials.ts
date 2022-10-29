export function nameToInitials (userName: string){
    return userName.split(" ").map((n)=>n[0]).join("");
}