<script>
    export let width;
    export let src;
    export let caption;
</script>

<div class="container w-100 d-flex flex-column align-items-center">
    <div style='width: calc({Number(width)} / 8 * 100%)' class="d-flex flex-column align-items-center">
        <img src={src} class="w-100">
    </div>
    <figcaption>{@html caption}</figcaption>
</div>