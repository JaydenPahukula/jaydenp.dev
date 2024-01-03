<script>
  import Navbar from './lib/Navbar.svelte'
</script>


<main>
  <Navbar items={["test1","test2","test3"]}/>

  <div class="header">
    <div>
      <p class="titleline1">Hello, my name is</p>
      <h1 class="titleline2">Jayden Pahukula</h1>
    </div>
  </div>


  <div style="height:10000px" />

</main>


<style>
  main {
    background-color: rgb(1, 65, 95);
  }
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  .titleline1 {
    font-size: 3rem;
    margin: 0;
  }
  .titleline2 {
    font-size: 5rem;
    margin: 0;
    margin-top: 1rem;
    
  }
</style>