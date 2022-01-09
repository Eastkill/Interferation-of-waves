
setInterval(main, 17);
class Wave {
  constructor(T,l,f,A,rgb) {
    this.T = T;
    this.l = l;
    this.f = f;
    this.A = A;
    this.rgb=rgb;
  }
}
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var time = Date.now();
var depth = 1000;
var z = canvas.width/depth;//kwant współrzędnej z
var id=0;
var t=0;//czas
var waves = [];
var A_max=0;

function main()
{
    set_time();
    begin();
    value_generate();
    
                  for(let i = 0; i < depth; i++){
                      line_drawing(i);
                  }
}
function set_time()
{
    t=(Date.now() - time)/1000; 
    document.getElementById('time').innerHTML = "Czas: " + t.toFixed(1);
}
function begin()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#000000";
    ctx.fillStyle="#ECE2D7"
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.strokeRect(0,0,canvas.width, canvas.height);
    
}
function line_drawing(i)
{
    var sum=0;
    var sum_=0;
    waves.forEach(wave =>{
        sum+=calculate_y(wave.T,wave.l,wave.f,wave.A,i);
        sum_ +=calculate_y(wave.T,wave.l,wave.f,wave.A,i+1);
        if(document.getElementById("checker").checked==true)
            {
        ctx.strokeStyle = wave.rgb;
        draw(wave.T,wave.l,wave.f,wave.A,wave.rgb,i);
            }
    });
    draw_summ(i,sum,sum_);
}
function calculate_y(T,l,f,A,i)
{
    var w = 2*Math.PI/T;//predkosc kolowa
    var k = 2*Math.PI/l;//liczba falowa
    var n = 20;  
    var true_A = (canvas.height/2)*(A/(A_max));   
    return(true_A * Math.sin(w*t - k*i*(A/A_max)/(depth/20) + f*Math.PI));
}
function draw(T,l,f,A,RGB,i) 
{
  if (canvas.getContext) 
  {
        ctx.beginPath();
        ctx.moveTo(z*i,calculate_y(T,l,f,A,i) + (canvas.height/2));
        ctx.lineTo(z*(i+1),calculate_y(T,l,f,A,i+1) + (canvas.height/2))
        ctx.stroke();
  }
}
function draw_summ(i, sum, sum_)
{
    ctx.strokeStyle="#000000";
    ctx.beginPath();
    ctx.lineWidth=2;
    ctx.moveTo(z*i,sum + (canvas.height/2));
    ctx.lineTo(z*(i+1),sum_ + (canvas.height/2));
    ctx.stroke(); 
}
function Add_to_list()
{
    let wave= new Wave
    (
        document.getElementById("T").value,
        document.getElementById("l").value,
        document.getElementById("f").value,
        document.getElementById("A").value, 
        document.getElementById("color").value
    );
    waves.push(wave);
    refresh_list();
}
function refresh_list()
{
    A_max=0;
    var ul = document.getElementById("lista");
    ul.innerHTML="";  
    waves.forEach(function(wave,i)
    {
        var li = document.createElement("li");
        var button = document.createElement("button");
        button.type = "button";
        button.innerHTML = "Usuń element";
        button.onclick= function () {
            waves.splice(i,1);
            refresh_list();
        };
        li.appendChild(document.createTextNode("Amplituda: "+wave.A +" Faza: "+ wave.f +" Długość fali: "+ wave.l +" Okres: "+ wave.T));
        li.appendChild(button);
        ul.appendChild(li);
        A_max+=parseFloat(wave.A);
    });

    
}
function update_value(value,id)
{
  document.getElementById(id).innerHTML=value;  
}
function value_generate()
{
    ctx.fillStyle = "#000000";
    ctx.fillText(A_max.toFixed(2),0,10);
    ctx.fillText(-A_max.toFixed(2),0,canvas.height);
    waves.forEach(wave=>
    {
        ctx.beginPath();
        ctx.strokeStyle=wave.rgb;
        ctx.fillText(wave.A,0,canvas.height/2-(wave.A/A_max)*canvas.height/2+10);
        ctx.fillText(-wave.A,0,(wave.A/A_max)*canvas.height/2+canvas.height/2);
        ctx.moveTo(0,canvas.height/2-(wave.A/A_max)*canvas.height/2);
        ctx.lineTo(canvas.width,canvas.height/2-(wave.A/A_max)*canvas.height/2);
        ctx.moveTo(0,(wave.A/A_max)*canvas.height/2+canvas.height/2);
        ctx.lineTo(canvas.width,(wave.A/A_max)*canvas.height/2+canvas.height/2);
        ctx.stroke();
    });
}

