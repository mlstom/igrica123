function medju(){
    let element = document.querySelector("#medju")

    Characters?.map((hero)=>{
        
    element.innerHTML+=`
    
    <div style="color: white; background:black; gap:20px;">
        <div style="color: white; background:black; " >
                ${hero.name}
        </div>
        
</div>

`
})
    

    screen("#glavni","none")
    screen("#medju","flex")

}