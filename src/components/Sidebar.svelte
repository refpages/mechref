<script>
    import classes from "../../public/classes.json"

    const course_tags = {
        'Dynamics': 'dyn',
        'Solid Mechanics': 'sol',
        'Statics': 'sta'
    }
</script>

<div class="flex-shrink-0 p-3 bg-white sidebar w-100">
    <div class="w-100">
        <p class="fw-bold h3 text-center">
            Navigate
        </p>
        <p>
        <ul class="list-group list-group-flush">
            <li class="list-group-item course-group p-0 my-2">
                <a href="/" class="text-decoration-none text-black w-100 d-flex justify-content-center">
                    <strong class="m-0 fw-semibold h5">Home</strong>
                </a>
            </li>
            {#each classes as course}            
                <li class="list-group-item course-group p-0 my-2">
                    <button class="btn d-inline-flex align-items-center rounded collapsed sidebar-btn p-0 mb-1" data-bs-toggle="collapse" data-bs-target="#{course[0].replace(' ', '_')}-collapse">
                        <strong class="m-0 fw-semibold h5">{course[0]}</strong>
                    </button>
                    <div class="collapse" id="{course[0].replace(' ', '_')}-collapse">
                    
                      <ul class="course-list">
                            {#each course[1] as page}
                                  <li class="mb-1"><a href="/{course_tags[course[0]]}/{page.id}">{page.name}</a></li>
                            {/each}
                      </ul>
                    </div>
                </li>
            {/each}
        </ul>
    </div>
  </div>

