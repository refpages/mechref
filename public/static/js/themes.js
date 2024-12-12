let theme = localStorage.getItem('theme');

if(theme===null){
    localStorage.setItem('theme','light')
    theme = 'light'
}

const dark_css = document.getElementById('darkTheme')
const light_css = document.getElementById('lightTheme')

if(theme==='dark'){
    dark_css.removeAttribute('disabled');
    light_css.setAttribute('disabled','disabled');
}else{
    light_css.removeAttribute('disabled');
    dark_css.setAttribute('disabled','disabled');
}

document.querySelector('html').setAttribute('data-bs-theme',theme)

function themed_items(){
    if(theme==='light'){return}

    const themed_items = document.querySelectorAll('[themed]')
    const themed_texts=document.querySelectorAll('[themed-text]')
    const themed_btns=document.querySelectorAll('button[themed]')

    Array.from(themed_texts).forEach(element=>{
        element.classList.remove('text-dark')
        element.classList.add('text-light')
    })

    Array.from(themed_btns).forEach(element=>{
        element.classList.remove('btn-outline-dark')
        element.classList.remove('btn-light')
        element.classList.add('btn-outline-light')
    })
    
    console.log(themed_btns)
}

function toggle_theme(){
    if(theme==='light'){
        theme='dark'
    }else{
        theme='light'
    
    }
    localStorage.setItem('theme',theme)
    window.location.reload()
}

function change_theme(new_theme){
    localStorage.setItem('theme',new_theme)
    window.location.reload()
}

function setCodeTheme(){
    const dark_css = document.getElementById('darkTheme')
    const light_css = document.getElementById('lightTheme')

    if(theme==='dark'){
        dark_css.removeAttribute('disabled');
        light_css.setAttribute('disabled','disabled');
    }else{
        light_css.removeAttribute('disabled');
        dark_css.setAttribute('disabled','disabled');
    }
}

function lightTheme(){
    change_theme('light');
}

function darkTheme(){
    change_theme('dark');
}