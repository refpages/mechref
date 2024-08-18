<script>
	export let name;
	export let id;
	export let course;

	const coursetags = {
		'Statics': 'sta',
		'Dynamics': 'dyn',
		'Solid Mechanics': 'sol'
	}
</script>

<style>
	.class-card{
        height: 300px;
        padding: 1rem;
    }

	.class-card-img{
		max-height: 250px;
	}

	.card:hover{
		transform: scale(1.05);
	}
</style>

<div class="class-card">
	<a href={'/'+coursetags[course]+'/'+id} class="text-decoration-none">
	<div class="card bg-yellow h-100">
		<div class="w-100 class-card-img overflow-hidden">
			<img src="https://picsum.photos/250/250" class="card-img-top ">
		</div>
		<div class="m-2 text-center fw-bold text-black">{ name }</div>
	</div>
	</a>
</div>