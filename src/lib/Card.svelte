<script>
  export let title = "";
  export let leftOrRight = false;
  export let image = "";
  export let imageAlt = ""
  export let header = "";
  export let text = "";
</script>

<div class="card">
  <h2>{title}</h2>
  <div class={"contents "+(leftOrRight ? "left" : "right")}>
    <div>
      <h3>{header}</h3>
      <p>{text}</p>
    </div>
    <img src={image} alt={imageAlt}/>
  </div>
</div>

<style>
  .card {
    max-width: 90vw;
    margin: auto;
    margin-bottom: 4vw;
    padding: 5px;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0px 0px 15px 2px rgba(0,0,0,0.5);
  }
  h2 {
    font-size: 2rem;
    text-align: center;
  }
  h3 {
    font-size: 1.5rem;
    text-align: center;
  }
  .contents {
    display: flex;
    flex-wrap: wrap-reverse;
    justify-content: center;
  }
  .left {
    flex-direction: row-reverse;
  }
  .right {
    flex-direction: row;
  }
  p {
    width: 500px;
  }
  img {
    height: 40vh;
    margin: 10px;
    flex-grow: -1;
    border-radius: 16px;
  }
</style>