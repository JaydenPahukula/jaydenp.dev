<script>
  import Navbar from "./lib/Navbar.svelte"
  import Card from "./lib/Card.svelte";
  import Button from "./lib/Button.svelte"

  import headshot from "./assets/headshot.jpg"
  import minesweeperPic from "./assets/minesweeper.png"
  import dockerDashPic from "./assets/dockerdash.jpg"
  import codePic from "./assets/code.png"
  import fishPic from "./assets/fishies.png"

  import githubIcon from "./assets/github-icon-white.svg"
</script>


<main>

  <Navbar items={["About","Projects","Contact"]}/>

  <div class="header">
    <div>
      <p class="titleline1">Hello, my name is</p>
      <h1 class="titleline2">Jayden Pahukula</h1>
    </div>
  </div>

  <section id="About">
    <Card>
      <h2>About Me</h2>
      <img src={headshot} alt="Jayden Pahukula" class="floatRight"/>
      <p>
        I am junior studying computer science at Colorado School of Mines. *add more*
      </p>
    </Card>
  </section>

  <section id="Projects">
    <Card>
      <h2>Projects</h2>
    </Card>
    <Card>
      <img src={minesweeperPic} alt="minesweeper" class="floatLeft">
      <div class="projectHeader">
        <h3>Minesweeper</h3>
        <Button icon={githubIcon} text="GitHub" link="https://github.com/JaydenPahukula/minesweeper"/>
      </div>
      <p>
        The classic game of Minesweeper, written in C++ using SFML.
      </p>
      <p>
        Along the way I have learned a lot about C++, OOP principles, and developing a game from scratch. This
        is an ongoing project, and I am currently working on an algorithm that can solve boards on its own.
      </p>
    </Card>
    <Card>
      <img src={dockerDashPic} alt="dockerdash" class="floatRight">
      <div class="projectHeader">
        <h3>Docker Dash</h3>
        <Button icon={githubIcon} text="GitHub" link="https://github.com/jaxsonp/docker-dash"/>
      </div>
      <p>
        Docker Dash is a dashboard for administrators to monitor server status and manage apps running as Docker
        containers on a server. 
      </p>
      <p>
        This is my 2023 summer internship project for the
        <a href="https://arl.hawaii.edu" target="_blank">Applied Research Lab at the University of Hawai‘i</a>.
      </p>
      <p>
        This was a team project, and I made the backend. I created a Python Flask API that interfaced with Docker that
        could get hardware and user info, as well as create, stop and start containers. It also supported Docker
        swarm mode, and came with installation scripts. I learned many technical skills like APIs, networking, and
        scripting, but it was also very valuable to learn about documentation and collaborating with a team.
      </p>
    </Card>
    <Card>
      <img src={codePic} alt="code" class="floatLeft">
      <div class="projectHeader">
        <h3>Competitive Programming</h3>
        <Button icon={githubIcon} text="GitHub" link="https://github.com/JaydenPahukula/competitive-coding" />
      </div>
      <p>
        This is not exactly a project, it is a collection of my work solving competitive programming problems. This
        year I am competing in ICPC and I am currently preparing for the 2024 North America Championship!
      </p>
    </Card>
    <Card>
      <img src={fishPic} alt="fish" class="floatRight">
      <div class="projectHeader">
        <h3>This website!</h3>
        <Button icon={githubIcon} text="GitHub" link="https://github.com/JaydenPahukula/JaydenPahukula.github.io" />
      </div>
      <p>
        This is my first experience with frontend development. I have been learning about html, css, javascript,
        and everything related to the frontend. I created this website using Svelte (not sure that that was overkill),
        and the background is made with p5js.
      </p>
      <p>
        There are some things like I would like to add, like maybe hosting some
        of my projects here, but I am proud of what I have made!
      </p>
    </Card>
  </section>

  <section id="Contact">
    <Card>
      <h2>Contact Me</h2>
      <p class="textCentered">Email: {atob("amF5ZGVuLnBhaHVrdWxhQGdtYWlsLmNvbQ==")}</p>
      <p class="textCentered">Github: <a href="https://github.com/JaydenPahukula" target="_blank">https://github.com/JaydenPahukula</a></p>
      <p class="textCentered">LinkedIn: <a href="https://linkedin.com/in/jaydenpahukula" target="_blank">https://linkedin.com/in/jaydenpahukula</a></p>
    </Card>
  </section>

  <div id="backgroundDiv"/>

</main>


<style>
  #backgroundDiv {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
    overflow-x: hidden;
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
  section {
    padding-top: 4h;
    padding-bottom: 2vh;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  h2 {
    display: block;
    text-align: center;
    margin: 0px;
    font-size: 2.2rem;
  }
  h3 {
    font-size: 1.7rem;
    margin: 0px;
  }
  .projectHeader {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0px;
  }
  p {
    font-size: 1.1em;
    margin: 0.75em 0px;
  }
  a {
    color: darkblue;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  img {
    width: 200px;
    border-radius: 10px;
  }
  .floatLeft {
    float: left;
    margin-right: 16px;
  }
  .floatRight {
    float: right;
    margin-left: 16px;
  }
  .textCentered {
    text-align: center;
  }
</style>