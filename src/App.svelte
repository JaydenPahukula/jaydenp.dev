<script>
  import Navbar from "./lib/Navbar.svelte"
  import Card from "./lib/Card.svelte"

  import headshot from "./assets/headshot.jpg"
</script>


<main>
  <Navbar items={["About","Projects","test3"]}/>

  <div class="header">
    <div>
      <p class="titleline1">Hello, my name is</p>
      <h1 class="titleline2">Jayden Pahukula</h1>
    </div>
  </div>

  <div class="section" id="About">
    <Card
      title="About Me"
      image={headshot}
      imageAlt="Headshot of Jayden Pahukula"
      imageLeftOrRight={false}
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    />
  </div>

  <div class="section" id="Projects">
    <Card
      title="Projects"
    />
    <Card
      image={headshot}
      header="About Me"
      imageLeftOrRight={true}
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    />
    <Card
      image={headshot}
      header="About Me"
      imageLeftOrRight={true}
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    />
  </div>


  <div style="height:10000px" />

</main>


<style>
  main {
    background-color: rgb(1, 65, 95);
    display: block;
  }
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 105vh;
    margin: 0;
    color: white;
    text-align: center;
  }
  .titleline1 {
    font-size: 3rem;
    
  }
  .titleline2 {
    font-size: 5rem;
    margin-top: 1rem;
  }
  .section {
    margin-bottom: 40px;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>