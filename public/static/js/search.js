import { HtmlSanitizer } from "../public/static/modules/sanitizer.js";

export function search(search_div, data_div, length=40){
    const request_time = Date.now();
    const value = HtmlSanitizer.SanitizeHtml(document.getElementById(search_div).value); 
    const div = document.getElementById(data_div);
    const course = document.getElementById('searchtype').value

    fetch(`http://localhost:8080/search/${course}?length=${length}`, {
        method: 'POST',
        body: JSON.stringify({value: value}),
        headers: {
            "Content-Type": "application/json",
          }
    })
    .then(response => response.json())
    .then(data => {
        const div_set_time = Number(div.getAttribute('origin'));

        if(div_set_time > request_time){
            return
        }

        if (value === ''){
            div.innerHTML = ''; //clear div
            return
        }

        div.setAttribute('origin', request_time);

        div.innerHTML = ''; //clear div

        const msg = data['message'];

        if (Object.keys(msg).length === 0){
            const list_element = document.createElement('li')
            list_element.setAttribute('class', "p-0 m-2 bg-white")
            list_element.innerText = 'No matching results...'

            div.appendChild(list_element)
            return 
        }

        const res = Object.fromEntries(Object.entries(msg).slice(0, Math.min(Object.keys(msg).length, 5)));
        
        const course_tags = {
            210: 'sta',
            212: 'dyn',
            251: 'sol'
        }
        
        

        

        Object.keys(res).forEach(function(key) {
            console.log(res[key])
            

            const values = res[key]
            const course_tag = course_tags[values[3]]
            console.log(course_tag)
            const text = values[2].replace(value, `<span class="bg-highlight">${value}</span>`)

            const list_element = document.createElement('li')
            list_element.setAttribute('class', "p-0 border bg-white")
            
            const link_element = document.createElement('a')
            link_element.setAttribute('href', `https://mechref.engr.illinois.edu/${course_tag}/${values[0]}.html`)
            link_element.setAttribute('class', "text-black text-decoration-none dropdown-item px-sm-3 py-2")

            const container = document.createElement('div')
            
            const title = document.createElement('h6')
            title.setAttribute('class', 'fw-bold mb-1')
            title.innerText = values[1]

            const context = document.createElement('p')
            context.setAttribute('class', 'm-0')
            context.innerHTML = `... ${text} ...`

            container.appendChild(title)
            container.appendChild(context)

            link_element.appendChild(container)

            list_element.appendChild(link_element)

            div.appendChild(list_element)
         });

        Array.from(res).forEach(element=>{
            console.log(element[0])
            
        });
    })
    .catch(error => {
        console.error('Error:', error);
        //div.innerHTML = error;
    });
}

export function adjust_select_width(){
    const course = document.getElementById('searchtype').value;
    console.log(course)
    const course_tags = {
        210: 'Statics',
        212: 'Dynamics',
        251: 'Solid Mechanics'
    };

    document.getElementById('search-width-test').innerText = course_tags[course];

    const span_width = document.getElementById('search-width-test').clientWidth;

    console.log(span_width)
}