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
    
    var queue=[];
    queue.push([0,0]);
    
    var visited=[];
    for(let i=0;i<len;i++)
        visited[i]= new Array(len).fill(0);
    visited[0][0]=1;
    
    var pred=[];
    for(let i=0;i<len;i++)
        pred[i]=new Array(len).fill(0);
    pred[0][0]=-1;

    var path=[]; 

    while(queue.length>0)
    {
        var u= queue.splice(0,1);
        //console.log(u);
        if(u[0][0]==len-1 && u[0][1]==len-1)
        {
            //console.log(pred);
            var x=pred[len-1][len-1];
            path.push([x]);
            //console.log(x);
            while(x!=-1)
            {
                y=parseInt(x/len);
                z=x%len-1;
                if(z<0)
                {
                    y=y-1;
                    z=9;
                }
                x=pred[y][z];
                path.push([x]);
            }
            var i=path.length-2;
            while(i)
            {
                //console.log(path[i-1]);
                var node1=document.getElementById('node'+path[i-1]);
                node1.style.backgroundColor=path_color;
                i--;
            }
            return;
        }
    }
    if(u[0][0]-1>=0 && maze[u[0][0]-1][u[0][1]]==0 && visited[ u[0][0]-1 ][ u[0][1] ]==0 )
    {
        visited[u[0][0]-1][u[0][1]]=1;
        // display(visited, u[0][0]-1, u[0][1]);
        queue.push([u[0][0]-1,u[0][1]]);
        pred[u[0][0]-1][u[0][1]]=u[0][0]*len+u[0][1]+1;
    }
    if(u[0][0]+1<len && maze[u[0][0]+1][u[0][1]]==0 && visited[ u[0][0]+1 ][ u[0][1] ]==0 )
    {
        visited[u[0][0]+1][u[0][1]]=1;
        // display(visited, u[0][0]+1, u[0][1]);
        queue.push([u[0][0]+1,u[0][1]]);
        pred[u[0][0]+1][u[0][1]]=u[0][0]*len+u[0][1]+1;
    }
    if(u[0][1]-1>=0 && maze[u[0][0]][u[0][1]-1]==0 && visited[ u[0][0] ][ u[0][1]-1 ]==0 )
    {
        visited[u[0][0]][u[0][1]-1]=1;
        // display(visited, u[0][0], u[0][1]-1);
        queue.push([u[0][0],u[0][1]-1]);
        pred[u[0][0]][u[0][1]-1]=u[0][0]*len+u[0][1]+1;
    }
    if(u[0][1]+1<len && maze[u[0][0]][u[0][1]+1]==0 && visited[ u[0][0] ][ u[0][1]+1 ]==0 )
    {
        visited[u[0][0]][u[0][1]+1]=1;
        // display(visited, u[0][0], u[0][1]+1);
        queue.push([u[0][0],u[0][1]+1]);
        pred[u[0][0]][u[0][1]+1]=u[0][0]*len+u[0][1]+1;
    }
    alert("Not found");
    return;
}

// ---------------------------------------DFS------------------------------------------


function dfs1(maze, visited, sx, sy, path)
{
    if(sx==len-1 && sy==len-1)
    {
        return 1;
    }
    if(visited[sx][sy]==0)
    {
        visited[sx][sy]=1;
        if(sx+1<len && visited[sx+1][sy]==0 && maze[sx+1][sy]==0)
        {
            path.push([sx+1,sy]);
            if(dfs1(maze, visited, sx+1, sy, path))
                return 1;
            path.pop();
        }
        if(sx-1>=0 && visited[sx-1][sy]==0 && maze[sx-1][sy]==0)
        {
            path.push([sx-1,sy]);
            if(dfs1(maze, visited, sx-1, sy, path))
                return 1;
            path.pop();
        }
        if(sy+1<len && visited[sx][sy+1]==0 && maze[sx][sy+1]==0)
        {
            path.push([sx,sy+1]);
            if(dfs1(maze, visited, sx, sy+1, path))
                return 1;
            path.pop();
        }
        if(sy-1>=0 && visited[sx][sy-1]==0 && maze[sx][sy-1]==0)
        {
            path.push([sx,sy-1]);
            if(dfs1(maze, visited, sx, sy-1, path))
                return 1;
            path.pop();
        }
        return 0;
    }
    return 0;
}

function dfs()
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

    var visited=[];
    for(let i=0;i<len;i++)
        visited[i]= new Array(len).fill(0);

    var path=[];

    if(dfs1(maze, visited, 0, 0, path))
    {
        //console.log(path);
        var i=0;
        while(i<path.length-1)
        {
            var x=path[i][0];
            var y=path[i][1];
            y=y+1;
            x=x*10+y;
            var node1=document.getElementById('node'+x);
            node1.style.backgroundColor=path_color;
            i++;
        }
    }
    else    
        alert("not found ");
    //console.log(path);
}

// -----------------------------------------------BD BFS-----------------------------------------------

function bdbfs1(pred1, pred2, maze)
{
    var q1=[];
    q1.push([0,0]);
    
    var q2=[];
    q2.push([len-1,len-1]);

    var visited1=[];
    for(let i=0;i<len;i++)
        visited1[i]= new Array(len).fill(0);
    visited1[0][0]=1;
    
    var visited2=[];
    for(let i=0;i<len;i++)
        visited2[i]= new Array(len).fill(0);
    visited2[len-1][len-1]=1;  

    return 0;
}

