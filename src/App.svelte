<script>
  import Navbar from "./lib/Navbar.svelte"
  import Card from "./lib/Card.svelte";

  import headshot from "./assets/headshot.jpg"
</script>


<main>

  <Navbar items={["About","Projects","Contact"]}/>

  <div class="header">
    <div>
      <p class="titleline1">Hello, my name is</p>
      <h1 class="titleline2">Jayden Pahukula</h1>
    </div>
  </div>

  <div class="section" id="About">
    <Card>
      <h2>About Me</h2>
      <img src={headshot} alt="Jayden Pahukula" class="floatRight"/>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </Card>
  </div>

  <div class="section" id="Projects">
    <Card>
      <h2>Projects</h2>
    </Card>
    <Card>
      <img src={headshot} alt="" class="floatLeft">
      <div>
        <h3>Project1</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </Card>
    <Card>
      <img src={headshot} alt="" class="floatRight">
      <div>
        <h3>Project2</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </Card>
    <Card>
      <img src={headshot} alt="" class="floatLeft">
      <div>
        <h3>Project3</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </Card>
  </div>

  <div class="section" id="Contact">
    <Card>
      <h2>Contact</h2>
      <p class="textCentered">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </Card>
  </div>

  <div id="backgroundDiv"/>

</main>


<style>
  #backgroundDiv {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
  }
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    color: white;
    text-align: center;
    text-shadow: 0px 0px 18px rgba(0,0,0,0.8);
  }
  .titleline1 {
    font-size: 3rem;
  }
  .titleline2 {
    font-size: 5rem;
    margin-top: 1rem;
  }
  .section {
    padding-top: 8vh;
    padding-bottom: 1vh;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h2 {
    display: block;
    text-align: center;
    margin: 0.8rem;
    font-size: 2.2rem;
  }
  h3 {
    font-size: 1.7rem;
    margin: 1em 15px;
  }
  p {
    font-size: 1.2em;
    margin: 15px;
  }
  img {
    width: 200px;
    margin: 15px;
    border-radius: 10px;
  }
  .floatLeft {
    float: left;
  }
  .floatRight {
    float: right;
  }
  .textCentered {
    text-align: center;
  }
</style>