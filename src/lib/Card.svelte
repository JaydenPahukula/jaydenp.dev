<script>
  export let title = "";
  export let image = "";
  export let imageAlt = ""
  export let imageLeftOrRight = false;
  export let header = "";
  export let text = "";
</script>


<div class="card">
  {#if title != ""}<h2>{title}</h2>{/if}
  <div class="contents">
    {#if image != ""}<img src={image} class={(imageLeftOrRight ? "floatLeft" : "floatRight")} alt={imageAlt}/>{/if}
    <div class="textSection">
      {#if header != ""}<h3>{header}</h3>{/if}
      {#if text != ""}<p>{text}</p>{/if}
    </div>
  </div>
</div>


<style>
  .card {
    width: 90vw;
    max-width: 850px;
    min-width: 400px;
    margin: auto;
    margin-bottom: 2vw;
    padding: 5px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 13px 1px rgba(0,0,0,0.5);
  }
  h2 {
    display: block;
    text-align: center;
    margin: 0.65rem;
    font-size: 2rem;
  }
  h3 {
    margin-top: 15px;
    text-align: center;
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
  }
  .contents {
    display: block;
  }
  .textSection {
    flex-grow: 1;
  }
  .floatLeft { float: left; }
  .floatRight { float: right; }
  img {
    width: 200px;
    margin: 15px;
    margin-top: 0px;
    border-radius: 10px;
  }
</style>