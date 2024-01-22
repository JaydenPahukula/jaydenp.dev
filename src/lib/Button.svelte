<script>
    export let icon;
    export let text;
    export let link;
</script>


<div class="button">
    <a href={link}>
        <img src={icon} alt="github icon"/>
        <p>{text}</p>
    </a>
</div>


<style>
    .button {
        display: inline-block;
        margin: 0px;
        height: 36;
    }
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
        float: left;
        height: 24px;
    }
    p {
        margin: 0;
        margin-left: 1ch;
        margin-right: 0.5ch;
        float: left;
        color: white;
    }
</style>