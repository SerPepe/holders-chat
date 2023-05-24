

function Redirect(){

    if(typeof window !== 'undefined'){
        window.open("http://localhost:3001/?ONE", "_self");
    }
    return(
        <div>
            </div>
    )
}
export default Redirect