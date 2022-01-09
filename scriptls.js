
setInterval(main, 18);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var time = Date.now();
var T=0.0;
var f=0.0;
var A=0.0;
var T1=0.0;
var A1=0.0;
var t=0;//czas


function main()
{

    
    reset();
    set_time();
    begin();
    draw_point();

}
function set_time()
{
    t=(Date.now() - time)/1000; 
    document.getElementById('time').innerHTML = "Czas: " + t.toFixed(1);
}
function begin()
{
    ctx.strokeStyle = "#000000";
    ctx.fillStyle="#ece2d7";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.strokeRect(0,0,canvas.width, canvas.height);
    
}
function update_value(value,id)
{
  document.getElementById(id).innerHTML=value;  
}
function draw_point()
{

    ctx.beginPath
    ctx.lineWidth=3;
    ctx.moveTo(count_x(t)+canvas.width/2,count_y(t)+canvas.height/2);
    ctx.lineTo(count_x(t+0.1)+canvas.width/2,count_y(t+0.1)+canvas.height/2)
    ctx.fillStyle = "#000000"
    ctx.stroke();
}
function count_x(t)
{
 return parseFloat(A*Math.sin(T*t+f*Math.PI)*canvas.width/2);
}
function count_y(t)
{
return parseFloat(A1*Math.sin(T1*t)*canvas.width/2);
}
function refresh()
{
    ctx.beginPath();
ctx.clearRect(0, 0, canvas.width, canvas.height);

 
}
function reset()
{
    T = parseFloat(document.getElementById("T").value);
f = parseFloat(document.getElementById("f").value);
A = parseFloat(document.getElementById("A").value);
T1 = parseFloat(document.getElementById("T1").value);
A1 = parseFloat(document.getElementById("A1").value);
}