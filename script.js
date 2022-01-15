
setInterval(main, 17);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var time = Date.now();
var depth = 1000;
var z = canvas.width/depth;//kwant współrzędnej z
var t=0;//czas

class Wave {
  constructor(T,l,f,A,rgb) {
    this.T = T;
    this.l = l;
    this.f = f;
    this.A = A;
    this.rgb=rgb;
  }
}
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
        var y = calculate_y(wave.T,wave.l,wave.f,wave.A,i);
        var y_= calculate_y(wave.T,wave.l,wave.f,wave.A,i+1);

        draw(y,y_,i,wave.rgb);
            }
    });
    
    draw(sum,sum_,i,"#000000");
}
function calculate_y(T,l,f,A,i)
{
    var w = 2*Math.PI/T;//predkosc kolowa
    var k = 2*Math.PI/l;//liczba falowa
    var n = 20;  
    var true_A = (canvas.height/2)*(A/(A_max));   
    return(true_A * Math.sin(w*t - k*i*(A/A_max)/(depth/10) + f*Math.PI));
}
function draw(y,y_,i,rgb) 
{
  if (canvas.getContext) 
  {
        ctx.beginPath();
        ctx.strokeStyle = rgb;
        ctx.moveTo(z*i,y + (canvas.height/2));
        ctx.lineTo(z*(i+1),y_ + (canvas.height/2));
        ctx.stroke();
  }
}
function value_generate()
{
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    
    ctx.fillText(A_max.toFixed(2),0,10);//A sumy fal
    ctx.fillText(-A_max.toFixed(2),0,canvas.height);//-A sumy fal
    
    ctx.moveTo(0,canvas.height/2);
    ctx.lineTo(canvas.width,canvas.height/2);
    ctx.fillText(0,0,canvas.height/2);//środek
    ctx.stroke();
    
    waves.forEach(wave=>
    {
        ctx.beginPath();
        ctx.strokeStyle=wave.rgb;
        ctx.setLineDash([10, 10]);
        ctx.fillText(wave.A,0,canvas.height/2-(wave.A/A_max)*canvas.height/2+10);
        ctx.fillText(-wave.A,0,(wave.A/A_max)*canvas.height/2+canvas.height/2);
        ctx.moveTo(0,canvas.height/2-(wave.A/A_max)*canvas.height/2);
        ctx.lineTo(canvas.width,canvas.height/2-(wave.A/A_max)*canvas.height/2);
        ctx.moveTo(0,(wave.A/A_max)*canvas.height/2+canvas.height/2);
        ctx.lineTo(canvas.width,(wave.A/A_max)*canvas.height/2+canvas.height/2);
        ctx.stroke();
        ctx.setLineDash([]);
    });

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
        var div = document.createElement("div")
        var li = document.createElement("li");
        var button = document.createElement("button");
        div.className = "list-item";
        button.type = "button";
        button.innerHTML = "Usuń element";
        button.className = "button is-warning is-light is-outlined";
        button.onclick= function () {
            waves.splice(i,1);
            refresh_list();
        };
        li.appendChild(document.createTextNode("Amplituda: "+wave.A +" | Faza: "+ wave.f +" | Długość fali: "+ wave.l +" | Okres: "+ wave.T));
        li.appendChild(button);
        div.appendChild(li);
        ul.appendChild(div);
        A_max+=parseFloat(wave.A);
    });

    
}
function update_value(value,id)
{
  document.getElementById(id).innerHTML=value;  
}


