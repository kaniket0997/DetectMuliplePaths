var len=10;
var original= 'rgb(198, 238, 245)';
var wall= 'rgb(22, 22, 22)';
var start_color='rgb(255, 228, 233)';
var end='rgb(220, 130, 146)';
var path_color='rgb(136, 189, 206)';
var path_color2='rgb(87, 176, 211)';
var vis_color='rgb(81, 191, 211)';


function setup(){
    var modalBtn= document.querySelector('.modal-btn');
    var modalBg= document.querySelector('.modal-bg');
    var modalCloss= document.querySelector('.modal-closs');

    modalBtn.addEventListener('click',function(){
    modalBg.classList.add('bg-active');
    });

    modalCloss.addEventListener('click', function(){
        modalBg.classList.remove('bg-active');
    });

    for(var i=0;i<len;i++)
    {
        var row=document.createElement('div');
        row.className='row row'+(i+1);
        row.id='row'+(i+1);
        for(var j=0;j<len;j++)
        {
            var node=document.createElement('div');
            node.className='node node'+((i*len)+(j+1));
            node.id='node'+((i*len)+(j+1));
            if(((i*len)+(j+1))!=1 && ((i*len)+(j+1))!=100)
            {
                node.style.backgroundColor=original;
                    node.onclick=function()
                    {
                        clicked(this.id);
                    }
            }
            row.appendChild(node);
        }
        maze_container.appendChild(row);
    }
}

function clicked(elementID){
    var node=document.getElementById(elementID);
    if(node.style.backgroundColor==original)
        node.style.backgroundColor=wall;
    else   
        node.style.backgroundColor=original;
}

function reset()
{
    for(var row=0;row<len;row++)
    {
        for(var col=0;col<len;col++)
        {
            if(((row*len)+(col+1))==1 || ((row*len)+(col+1))==100 )
                continue;
            var node=document.getElementById('node'+((row*len)+(col+1)));
            node.style.backgroundColor=original;
        }
    }
    return;
}

function reset1()
{
    for(var row=0;row<len;row++)
    {
        for(var col=0;col<len;col++)
        {
            var node=document.getElementById('node'+((row*len)+(col+1)));
            if(((row*len)+(col+1))==1 || ((row*len)+(col+1))==100 || node.style.backgroundColor==wall)
                continue;
            var node=document.getElementById('node'+((row*len)+(col+1)));
            node.style.backgroundColor=original;
        }
    }
    return;
}

function display(visited, i, j)
{

    // for(var x=0;x<1000;x++)
    // {
    //     for(var y=0;y<100000;y++)
    //     {

    //     }
    // }
    for(var row=0;row<len;row++)
    {
        for(var col=0;col<len;col++)
        {
            if( (row==0 && col==0) || (row==len-1 && col==len-1) )
                continue;
            if(visited[row][col]==1)
            {
                //console.log(i,j);
                var v=(row*len)+col+1;
                var node=document.getElementById( 'node'+ v); 
                node.style.backgroundColor=vis_color;
                //console.log('hello ');
            }
        }
    }
    return;
}


// -----------------------------------BFS----------------------------------------------

function bfs()
{
    reset1();
    var maze=[];
    for(let i=0;i<len;i++)
        maze[i]= new Array(len).fill(0);
    for(let row=0;row<len;row++)
    {
        for(let col=0;col<len;col++)
        {
            if(document.getElementById('node'+((row*len)+(col+1))).style.backgroundColor==wall )
            {
                maze[row][col]=-1;
            }
        }
    }  
}