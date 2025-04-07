function toggle_simplified_view(obj){

    if (obj.hasAttribute('checked')){
        simp_view_off();
        
    }else{
        simp_view_on();
    }
    
}

function simp_view_off(){
    Array.from(document.querySelectorAll('.simp-btn')).forEach(e =>{
        e.removeAttribute('checked');
    });

    Array.from(document.querySelectorAll('.card-grid-fancy')).forEach(e =>{
        e.classList.remove('d-none');
    });

    Array.from(document.querySelectorAll('.card-grid-simple')).forEach(e =>{
        e.classList.add('d-none');
    });

    localStorage.setItem('simple', JSON.stringify('false'))
}

function load_view(){    
    console.log(localStorage.getItem('simple'));

    if (JSON.parse(localStorage.getItem('simple')) == 'true'){
        simp_view_on()
    }else{
        simp_view_off()
    }
}

function simp_view_on(){
    

    
    Array.from(document.querySelectorAll('.simp-btn')).forEach(e =>{
        e.setAttribute('checked', '');
    });

    Array.from(document.querySelectorAll('.card-grid-fancy')).forEach(e =>{
        e.classList.add('d-none');
    });

    Array.from(document.querySelectorAll('.card-grid-simple')).forEach(e =>{
        e.classList.remove('d-none');
    });

    localStorage.setItem('simple', JSON.stringify('true'))
}

$(document).ready(function(){
    load_view();
})
