setInterval(main,17);
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var time = Date.now();
var T=0.0;
var f=0.0;
var A=0.0;
var T1=0.0;
var A1=0.0;
var t=0;//czas
var first_time = true;
var real_value = 0.0;
var sum =0; 
function main()
{
if(first_time)
{
begin();
first_time=false;
}
}

function begin()
{ 
    ctx.beginPath();
    ctx.lineWidth=1;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle="#ece2d7";
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.strokeRect(0,0,canvas.width, canvas.height);
    ctx.moveTo(0,canvas.height/2);
    ctx.lineTo(canvas.width,canvas.height/2);
        ctx.moveTo(canvas.height/2,0);
    ctx.lineTo(canvas.width/2,canvas.height);
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
    real_value=0;
    var j=0;
for(var x=-10.5; x<10.5; x+=0.001)
    {
        ctx.beginPath();
        if(j==10)
            {
        ctx.arc((x+10.5)*(canvas.width/21),eval(count_y(val))*canvas.height/21+canvas.height/2,1,0,Math.PI*2);
                j=0;
            }
        j++;
        if(x>=document.getElementById("min").value && x<=document.getElementById("max").value)
            {
            real_value+=parseFloat(-0.001*eval(count_y(val)));
            }
//        ctx.moveTo((x+10.5)*(canvas.width/21),-parseFloat(eval(val))*canvas.height/21+canvas.height/2);
//        
//        ctx.lineTo((x+10.6)*(canvas.width/21),-parseFloat(eval(val))*canvas.height/21+canvas.height/2);
            ctx.lineWidth=1;
            ctx.stroke();
    }
    document.getElementById("real_value").innerHTML = Math.floor((real_value) *100)/100;
}

function count_y(val)
{
    var y=val;
    var real_y="-(";
        for(var i=0; i < y.length; i++)
        {
         if(y[i]=='s' && y[i+1]=='i' && y[i+2]=='n')
             {
                 real_y+="Math.sin";
                 i+=2;
             }
         else if(y[i]=='c' && y[i+1]=='o' && y[i+2]=='s')
             {
                 real_y+="Math.cos";
                 i+=2;
             }
         else if(y[i]=='t' && y[i+1]=='a' && y[i+2]=='n')
             {
                 real_y+="Math.tan";
                 i+=2;
             }
         else if(y[i]=='c' && y[i+1]=='t' && y[i+2]=='g')
             {
                 real_y+="1/Math.tan";
                 i+=2;
             }
         else if(y[i]=='p' && y[i+1]=='i')
             {
                 real_y+="Math.PI";
                 i+=1;
             }
        else if(y[i]=='^')
             {
                 real_y+="  ";
             }
        else
            {
                real_y+=y[i];
            }  
                        //console.log(real_y);
        }
        real_y+=")";
        return real_y;
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
    ctx.lineWidth=1;
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
function estimate()
{
    sum=0;
    var val = document.getElementById("f").value;
    var min = parseFloat(document.getElementById("min").value);
    var max = parseFloat(document.getElementById("max").value);
    var num = document.getElementById("depth").value;
    console.log(num);
    var delta = ((max-min))/num;
    for(var i=0; i<num; i++)
        {
        var x=min+delta*i;
        sum+=eval(count_y(val))*-delta;
        ctx.beginPath();
        ctx.rect((min+10.5)/21*canvas.width+delta/21*i*canvas.width,canvas.height/2,delta/21*canvas.width,eval(count_y(val))*canvas.height/21);
        if(eval(count_y(val))<0)ctx.strokeStyle="#0000FF";
        else ctx.strokeStyle="#00FF00";
        ctx.lineWidth=3;
        ctx.stroke();
        }
    document.getElementById("estimated_value").innerHTML = Math.floor(parseFloat(sum)*100)/100;
    if(Math.abs(real_value)<0.1) document.getElementById("diff").innerHTML = "∞%"
    else document.getElementById("diff").innerHTML = Math.round(sum/real_value * 100)  + "%";
    
}
