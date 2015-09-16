// JavaScript Document
/*
 *global var
 */
 var isStr=false;
 var isPause=false;
 var timer;
 var highest=0;
 
 /*
 * Utility Fn
 */
 
document.onkeydown = checkKey;

function checkKey(e) 
{
    e = e || window.event;
    switch(e.keyCode)
	{
		case 32:
			pse();
			break;
		case 37:
			snake.chndir("left");
			break;
		case 38:
			snake.chndir("up");
			break;
		case 39:
			snake.chndir("right");
			break;
		case 40:
			snake.chndir("down");
			break;
	}
}
var output = function(score)
{
	if(score>highest){highest=score;}
	document.getElementById("highest").textContent="Highest: "+highest;
	document.getElementById("score").textContent="Score: "+score
}
var clear = function()
{
	for(var i=0;i<width;i++)
	{
		for(var j=0;j<height;j++)
		{document.getElementById("c"+j+"r"+i).style.background="white";}
	}
	while(snake.x.length > 0) 
	{ snake.x.pop();}
	while(snake.y.length > 0) 
	{ snake.y.pop();}
	snake.length=0;
	snake.speed=0;
	snake.dir="right";
	document.getElementById("strbtn").textContent="---";
}

 
var width=15;
var height=15;
var initialLength=4;
var tg =
{
	x:0,
	y:0,
	isGnr:false,
	gnr:function(a,b)
	{
		var isOS=true;
		var isOver=false;
		while(isOS||!isOver)
		{
			if(isOS===true)
			{
				tg.x=Math.floor(Math.random()*a);
				tg.y=Math.floor(Math.random()*b);
				counter=0;
			}
			if(tg.x!==snake.x[counter]||tg.y!==snake.y[counter]){isOS=false;}
			else{isOS=true;}
			if(counter>=snake.length){isOver=true;}
			counter++;
		}
		
		document.getElementById("c"+tg.x+"r"+tg.y).style.background="red";
		tg.isGnr=true;
	},
}
var snake =
{
	x:[0],
	y:[0],
	m:[],
	length:0,
	dir:"right",
	speed:0,
	gnr:function(length)
	{
		do
		{
			while(snake.x.length > 0) 
			{ snake.x.pop();}
			while(snake.y.length > 0) 
			{ snake.y.pop();}
			snake.x.push(Math.floor(Math.random()*(width-length)+length));
			snake.y.push(Math.floor(Math.random()*width));
			for(var i=1;i<length;i++)
			{
				snake.x.push(snake.x[i-1]-1);
				snake.y.push(snake.y[0]);
			}
			
		}
		while(snake.y[0]===tg.y)
		snake.length=length;
		snake.speed=snake.length/initialLength;
		if(snake.x[0]>Math.floor(width/2))
		{
			snake.x.reverse();
			snake.dir="left";
		}
		document.getElementById("c"+snake.x[0]+"r"+snake.y[0]).style.background="green";
		for(var i=1;i<length;i++)
		{
			document.getElementById("c"+snake.x[i]+"r"+snake.y[i]).style.background="black";
		}
	},
	move:function()
	{
		//new head
		var X;
		var Y;
		isCol=false;//Collapsed?
		isHit=false;//Hit Target?
		isOEd=false;//Over Edge
		if(snake.m.length!==0)
		{
			snake.dir=snake.m[0];
			snake.m.reverse();
			snake.m.pop();
			snake.m.reverse();
		}
		
		
		switch(snake.dir)
		{
			case 'right':
				X=snake.x[0]+1;
				Y=snake.y[0];
				break;
			case 'left':
				X=snake.x[0]-1;
				Y=snake.y[0];
				break;
			case 'up':
				Y=snake.y[0]-1;
				X=snake.x[0];
				break;
			case 'down':
				Y=snake.y[0]+1;
				X=snake.x[0];
				break;
			default:
				break;
		}
		
		if(X===tg.x&&Y==tg.y)
		{
			isHit=true;
			snake.x.reverse();
			snake.y.reverse();
			snake.x.push(X);
			snake.y.push(Y);
			snake.x.reverse();
			snake.y.reverse();
			snake.length++;
			snake.speed=snake.length/initialLength;
			clearInterval(timer);
			timer=setInterval(function(){snake.move()},1000/snake.speed);
		}
		
		var counter=2;
		do
		{
			if(X===snake.x[counter]&&Y===snake.y[counter]){isCol=true;}
			counter++;
		}
		while(!isCol&&counter<snake.length)
		
		
		if(X<0||X>width-1||Y<0||Y>width-1){isOEd=true;}
		
		if(isOEd||isCol)//game over
		{
			clearInterval(timer);
			//square map
			if(width===height)
			{
				for(var i=0;i<height;i++)
				{
					for(var j=0;j<width;j++)
					{
						if(i===j||i===width-j-1)
						{document.getElementById("c"+j+"r"+i).style.background="red";}
						else
						{document.getElementById("c"+j+"r"+i).style.background="white";}
					}
				}
			}
			isStr=false;
			document.getElementById("strbtn").textContent="Restart";
			
			
			
			
			//non-square map
		}
		else
		{
			
			if(isHit)
			{tg.gnr(width,height);}
			else
			{
				document.getElementById("c"+snake.x[snake.length-1]+"r"+snake.y[snake.length-1]).style.background="white";
			for(var i=0;i<snake.length-1;i++)
			{
				snake.x[snake.length-1-i]=snake.x[snake.length-2-i];
				snake.y[snake.length-1-i]=snake.y[snake.length-2-i];
			}
			switch(snake.dir)
			{
				case 'right':
					snake.x[0]++;
					break;
				case 'left':
					snake.x[0]--;
					break;
				case 'up':
					snake.y[0]--;
					break;
				case 'down':
					snake.y[0]++;
					break;
				default:
					break;
			}
			}
			document.getElementById("c"+snake.x[0]+"r"+snake.y[0]).style.background="green";
			document.getElementById("c"+snake.x[1]+"r"+snake.y[1]).style.background="black";
			isHit=false;
		}
		output(snake.length-initialLength);

	},
	chndir:function(dir)
	{
		if(snake.m.length===0)
		{
			if(
		  (snake.dir==="up"&&dir==="down")
		||(snake.dir==="down"&&dir==="up")
		||(snake.dir==="left"&&dir==="right")
		||(snake.dir==="right"&&dir==="left")
		||(snake.dir===dir)
		  ){}
		else{snake.m.push(dir);}
		}
		else
		{
			if(
		  (snake.m[snake.m.length-1]==="up"&&dir==="down")
		||(snake.m[snake.m.length-1]==="down"&&dir==="up")
		||(snake.m[snake.m.length-1]==="left"&&dir==="right")
		||(snake.m[snake.m.length-1]==="right"&&dir==="left")
		  ){snake.m.pop();}
		  else if(snake.m[snake.m.length-1]===dir){}
		else{snake.m.push(dir);}
		}
	},
}



/*
 * Buttons
 */
var pse = function()
{
	if(isStr)
	{
		if(isPause)
		{
			timer=setInterval(function(){snake.move()},1000/snake.speed);
			isPause=false;
			document.getElementById("psebtn").textContent="Pause";
		}
		else
		{
			clearInterval(timer);
			isPause=true;
			document.getElementById("psebtn").textContent="Resume";
		}
	}
	
}
var str = function()
{
	if(!isStr)
	{
		clear();
		tg.gnr(width,height);
		snake.gnr(initialLength);
		isStr=true;
		timer=setInterval(function(){snake.move()},1000/snake.speed);
	}
}




/*
 * grid building define
 */
var bdgrid = function(x,y)
{
		for(var i=0;i<y;i++)
		{
			var row=document.createElement("div");
			row.id="r"+i;
			row.style.width=32*x+"px";
			row.style.height="32px";
			row.style.background="gray";
			document.getElementById("main_frame").appendChild(row);
			for(var j=0;j<x;j++)
			{
				var span=document.createElement("span");
				span.id="c"+j+"r"+i;
				span.style.width="30px";
				span.style.height="30px";
				span.style.background="white";
				span.style.margin="1px";
				span.style.display="inline-block";
				document.getElementById("r"+i).appendChild(span);
			}
		}
}


/*
 *snake
 */



/*
 * Run
 */
//build grid here
bdgrid(width,height);
output(0,0);


