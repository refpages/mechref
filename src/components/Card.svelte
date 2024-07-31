<script>
	export let name;
</script>

<style>
	.class-card{
        height: 300px;
        padding: 1rem;
    }

	.class-card-img{
		max-height: 250px;
	}
</style>

<div class="class-card">
	<a href="#" class="text-decoration-none">
	<div class="card bg-yellow h-100">
		<div class="w-100 class-card-img overflow-hidden">
			<img src="https://picsum.photos/250/250" class="card-img-top ">
		</div>
		<div class="m-2 text-center fw-bold text-black">{ name }</div>
	</div>
	</a>
</div>