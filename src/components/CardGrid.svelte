<script>
    import classes from "/public/sections.json";
    import Card from "/src/components/Card.svelte";

    export let target_course;

    const coursetags = {
		'Statics': 'sta',
		'Dynamics': 'dyn',
		'Solid Mechanics': 'sol'
	}

    
</script>

<style>
    .card-grid{
        display: grid;
        grid-template-columns: repeat(auto-fit, 250px);
        justify-content: center;
    }

    a {
        font-size: 1.5rem;
    }

    @media(min-width: 992px){
        a{
            font-size: 1.1rem;
        }

        a:hover{
            font-weight: bold;
        }
    }   
</style>



{#each classes as course}
    {#if (course[0] == target_course)}
    
        {#each course[1] as section}
            <section class="mt-sm-4 mt-2">
                <div class="d-flex justify-content-between">
                    <h3 class="fw-bold w-100">{ section[0] }:</h3>
                    <div class="form-check form-switch">
                        
                        <input class="form-check-input simp-btn" type="checkbox" role="switch" onchange="toggle_simplified_view(this);">
                        <label class="form-check-label">Simplified view:</label>
                    </div>
                    
                </div>
            
            <ol class="card-grid-simple">
                {#each section[1] as page}
                    <li class="">
                        <a href={`/${coursetags[course[0]]}/${page.id}`} class="text-decoration-none themed-text">{page.name}</a>
                        
                    </li>
                {/each}
            </ol>
            
            <div class="card-grid card-grid-fancy w-100  d-none">
                {#each section[1] as page}
                    <Card name={page.name} course={course[0]} id={page.id}/>
                {/each}
            </div>
            
            </section>
        {/each}
    {/if}
{/each}