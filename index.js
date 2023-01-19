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
}