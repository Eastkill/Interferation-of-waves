setInterval(main, 250);
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

}

function begin()
{ 
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.fillStyle="#ece2d7";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.strokeRect(0,0,canvas.width, canvas.height);
    ctx.moveTo(0,canvas.height/2);
    ctx.lineTo(canvas.width,canvas.height/2);
        ctx.fillStyle="#000000";
    ctx.fillText(0,0,canvas.height/2);
    ctx.stroke();
    
}
function update_value(value,id)
{
  document.getElementById(id).innerHTML=value;  
}
function Draw_function(val)
{

    ctx.beginPath();

for(var x=-10.5; x<10.5; x+=0.1)
    {
        ctx.moveTo((x+10.5)*(canvas.width/21),-parseFloat(eval(val))*canvas.height/21+canvas.height/2);
        
        ctx.lineTo((x+10.6)*(canvas.width/21),-parseFloat(eval(val))*canvas.height/21+canvas.height/2);
        ctx.stroke();
    }
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
function draw_line()
{
    min = parseFloat(document.getElementById("min").value);
    max = parseFloat(document.getElementById("max").value);
    real_min = parseFloat((canvas.width/(21))*(min+10.5));
    real_max = parseFloat((canvas.width/(21))*(max+10.5));
    ctx.beginPath();
    ctx.moveTo(real_min,0);
    ctx.lineTo(real_min,canvas.height);
    ctx.moveTo(real_max,0);
    ctx.lineTo(real_max,canvas.height);
    ctx.strokeStyle = "#FF0000";
    ctx.stroke();
    
}
