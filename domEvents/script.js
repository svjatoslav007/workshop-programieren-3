let clickHandler = 0;
function clickHandler(evt) {
   console.log(evt)
   clickCounter++;
   let str =" thanks for click "+clickCounter 
   this.innerText=str
}
function bodyClick(evt) {
    console.log("clicked at:"+evt.pageX,evt.PageY )
}
function

let p=document.getElementById("pElement")
p.addEventListener("click",clickHandler)

function pageLoaded(evt) {
    console.log("laden fertig ...")
}
windows.onload =pageLoaded;
function keypreesed(evt) {
    console.log("keyboard presse",evt.key);
}
window.onkeyup= keypressed;