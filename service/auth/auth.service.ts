type LoginProps = {
 username: string,
 password: string
}
export async function LoginService(data:LoginProps) {
    const response = await fetch("/api/auth/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(data)
    } );
    
    const result = await response.json();

    if(!response){
        throw new Error("Login Failed")
    };

    return result ;
}