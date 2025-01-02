<script>
    export let icon;
    export let text;
    export let link;
</script>


<div class="button">
    <a href={link} target="noopener noreferrer">
        <img src={icon} alt="github icon"/>
        <p>{text}</p>
    </a>
</div>


<style>
    
    a {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 6px 12px;
        border-radius: 50vh;
        background-color: rgb(20, 63, 170);
    }
    a:hover {
        background-color: rgb(60, 98, 196);
    }
    img {
        
    }
    p {
        
    }
</style>
