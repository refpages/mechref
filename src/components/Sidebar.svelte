<script>
    import classes from "../../public/classes.json"

    const course_tags = {
        'Dynamics': 'dyn',
        'Solid Mechanics': 'sol',
        'Statics': 'sta'
    }

    const course_tags_reversed = {
        'sta': 'Statics',
        'dyn': 'Dynamics',
        'sol': 'Solid Mechanics'
    }

    export let current_course;
    export let current_page;
</script>

<style>
    .sidebar-btn:before{
        content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
    }


    .course-list{
        list-style-type: none;
    }

    a.course-link{
        text-decoration: none;
    }

    #sidebar_container{
        display: none;
    }

    @media (min-width: 1200px){
        #sidebar_container{
            display: flex;
            flex-direction: column;
        }
    }
</style>

<div class="flex-shrink-0 p-3 sidebar w-100" id="sidebar_container">
    <div class="w-100">
        <p class="fw-bold h3 text-center">
            Navigate
        </p>
        <p>
        <ul class="list-group list-group-flush">
            <li class="list-group-item course-group p-0 my-2">
                <a href="/" class="text-decoration-none themed-text w-100 d-flex justify-content-center">
                    <strong class="m-0 fw-semibold h5">Home</strong>
                </a>
            </li>
            {#each classes as course}            
                <li class="list-group-item course-group p-0 my-2">
                    <button class="btn d-inline-flex align-items-center rounded sidebar-btn p-0 mb-1" data-bs-toggle="collapse" data-bs-target="#{course[0].replace(' ', '_')}-collapse">
                        <strong class="m-0 fw-semibold h5 themed-text">{course[0]}</strong>
                    </button>
                    
                    {#if course[0] == course_tags_reversed[current_course]} 
                    <div class="collapse show" id="{course[0].replace(' ', '_')}-collapse">
                      <ul class="course-list">
                            {#each course[1] as page}
                                {#if page.name.replaceAll(" ", "_").toLowerCase() == current_page}
                                    <li class="mb-1"><a class="course-link fw-bold themed-text" href="/{course_tags[course[0]]}/{page.id}" >{page.name}</a></li>
                                {:else}
                                    <li class="mb-1"><a class="course-link themed-text" href="/{course_tags[course[0]]}/{page.id}" >{page.name}</a></li>
                                {/if} 
                            {/each}
                      </ul>
                    </div>
                    {:else}
                    <div class="collapse" id="{course[0].replace(' ', '_')}-collapse">
                    
                        <ul class="course-list">
                              {#each course[1] as page}
                                    <li class="mb-1"><a class="course-link themed-text" href="/{course_tags[course[0]]}/{page.id}" >{page.name}</a></li>
                              {/each}
                        </ul>
                      </div>
                    {/if}
                </li>
            {/each}
        </ul>
    </div>
  </div>

