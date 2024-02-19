<script>
  import Navbar from "../lib/Navbar.svelte"
  import Card from "../lib/Card.svelte";
  import Button from "../lib/Button.svelte"

  import headshot from "../assets/headshot.jpg"
  import minesweeperPic from "../assets/minesweeper.png"
  import dockerDashPic from "../assets/dockerdash.jpg"
  import minesmapPic from "../assets/minesmap.png"
  import fishPic from "../assets/fishies.png"

  import githubIcon from "../assets/github-icon-white.svg"
  import documentIcon from "../assets/document-icon.ico"
</script>


<main id="main">
  <Navbar items={["About","Projects","Contact"]}/>

  <div id="background"/>

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
        I am a junior at Colorado School of Mines, and I am a total nerd for computer science. I have a passion
        for building things and solving problems, and I am very fortunate to be studying in a feild where I can
        make a difference while doing something that I love.
      </p>
      <p>
        In my free time I like playing piano, going hiking, and playing pickup volleyball. I also
        do competitive coding, and I am currently preparing for the ICPC 2024 North America Championship!
      </p>
      <p>
        Scroll down and check out some projects that I have done, and for more information about my experience,
        check out my resume:
      </p>
      <div class="centered">
        <Button icon={documentIcon} text="Resume" link="/resume.pdf"/>
      </div>
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
        Throughout this project I have learned a lot about C++, OOP principles, and developing a game from scratch.
        This is an ongoing project, and I am currently working on an algorithm that can solve boards on its own.
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
        <a href="https://arl.hawaii.edu" target="noopener noreferrer">Applied Research Lab at the University of Hawai‘i</a>.
      </p>
      <p>
        This was a team project, and I made the backend. I created a Python Flask API that interfaced with Docker that
        could get hardware and user info, as well as create, stop and start containers. It also supported Docker
        swarm mode, and came with installation scripts. I learned many technical skills like APIs, networking, and
        scripting, but it was also very valuable to learn about documentation and collaborating with a team.
      </p>
    </Card>
    <Card>
      <img src={minesmapPic} alt="code" class="floatLeft">
      <div class="projectHeader">
        <h3>Mines Map</h3>
        <Button icon={githubIcon} text="GitHub" link="https://github.com/TheGreatRambler/MinesMap" />
      </div>
      <p>
        An interactive map of the Mines campus to help guests and new students navigate inside buildings. This map
        can show an interior view of each building, along with information about each room like room number, upcoming
        events, and a street-view style 360° glimpse inside.
      </p>
      <p>
        The map is a 3D model made in Blender with open street map data, and it is rendered using three.js. The website
        is made with Solid.js and Tailwind CSS.
      </p>
      <p>
        This project won 1st place in the advanced general track at the
        <a href="https://blasterhacks.devpost.com/" target="noopener noreferrer">2024 BlasterHacks hackathon</a>, and I
        worked on it with three other Mines students. It was a blast, and this is definitely a project that we want to
        build into a full app in the future!
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
        and everything related to the frontend. I created this website using Svelte, and the background is made
        with p5js.
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

</main>


<style>
  main {
    position: relative;
    height: 100vh;
    inset: 0;
    overflow-y: auto;
    overflow-x: hidden;
    perspective: 1px;
    perspective-origin: center center;
  }
  #background {
    position: absolute;
    inset: 0 -20px 0 0; /* because of funky things with the scroll bar */
    transform: translateZ(-2px) scale(3);
    z-index: -1;
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
    margin: 1em 0px;
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
  .centered {
    display: flex;
    justify-content: center;
  }
</style>