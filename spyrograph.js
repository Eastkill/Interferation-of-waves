
setInterval(main, 5);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var first_time = true;
var time = Date.now();
var depth = 1000;
var z = canvas.width/depth;//kwant współrzędnej z
var t=0;//czas
var last_r = 1;
var A_max=0;

function main()
{
    set_time();
    if(first_time)
        {
         clr();
        first_time=false;
        }
    if(document.getElementById("checker").checked)
    draw(document.getElementById("r").value,
        document.getElementById("w").value,
        document.getElementById("f").value,
        document.getElementById("color").value);
}

function set_time()
{
    t=(Date.now() - time)/1000; 
    document.getElementById('time').innerHTML = "Czas: " + t.toFixed(1);
}
function begin()
{

}
function draw(r,w,f,color)
{
ctx.beginPath();
ctx.strokeStyle = color;
    x=(canvas.width/2+r*canvas.width/2*Math.cos(w*t*r+Math.PI*f));
    y=(canvas.width/2+r*canvas.width/2*Math.sin(w*t*r+Math.PI*f));


ctx.arc(x+(1-r)*canvas.width/2*Math.cos(w*t),
        y+(1-r)*canvas.width/2*Math.sin(w*t),
        1,0,Math.PI*2);

ctx.stroke();
}
function update_value(value,id)
{
  document.getElementById(id).innerHTML=value;  
}
function clr()
{
    ctx.beginPath();
    
    ctx.strokeStyle = "#000000";
    ctx.fillStyle="#ECE2D7"
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.strokeRect(0,0,canvas.width, canvas.height);
    ctx.arc(canvas.width/2,canvas.height/2,1*canvas.height/2,0,Math.PI*2);
    ctx.stroke();
}

