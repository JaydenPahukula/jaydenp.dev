<script>
    export let items = [];
</script>

<div class="navbar">
    <ul>
        {#each items as item}<li>
            <a href="#{item}">{item}</a>
        </li>{/each}
    </ul>
</div>

<style>
    .navbar {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: sticky;
        top: 0; left: 0;
        width: 100%;
        background-image: linear-gradient(rgba(0,0,0,0.5), transparent);
        z-index: 1;
    }
    ul {
        display: flex;
        justify-content: flex-end;
    }
    li {
        list-style: none;
        margin-right: 2rem;
        font-size: 1rem;
    }
    a {
        color: white;
        transition: color 0.5s;
        text-decoration: none;
    }
    a:hover {
        color: lightgray;
    }
</style>