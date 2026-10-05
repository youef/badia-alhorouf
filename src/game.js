import * as THREE from "three";

const game = document.querySelector("#game");
const ui = document.querySelector("#ui");

const characters = {
  fawaz: { name: "فواز", skin: 0xc98d64, cloth: 0x4d6f59, scarf: 0xe8c978 },
  ziyad: { name: "زياد", skin: 0x9b684b, cloth: 0x6c536f, scarf: 0xd9b35e }
};

const state = {
  character: "fawaz",
  started: false,
  paused: false,
  speed: 5,
  coins: 0,
  distance: 0,
  time: 0,
  joystick: { x: 0, y: 0 }
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x9bdcff);
scene.fog = new THREE.Fog(0x9bdcff, 30, 105);

const camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 180);
camera.position.set(0, 5.5, 9);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
game.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xfff3d5, 0x70513b, 2.2));
const sun = new THREE.DirectionalLight(0xffe5ad, 3.2);
sun.position.set(-18, 24, 10);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
scene.add(sun);

const world = new THREE.Group();
scene.add(world);

const material = color => new THREE.MeshStandardMaterial({ color, roughness: 0.9 });

const ground = new THREE.Mesh(new THREE.PlaneGeometry(140, 180), material(0xe5bd72));
ground.rotation.x = -Math.PI / 2;
ground.position.z = -35;
ground.receiveShadow = true;
world.add(ground);

function addRock(x, y, z, scale = 1) {
  const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(scale, 0), material(0xc99a59));
  rock.position.set(x, y, z);
  rock.scale.y = 0.55;
  rock.castShadow = rock.receiveShadow = true;
  world.add(rock);
}

function addPalm(x, z) {
  const g = new THREE.Group();
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(.18, .3, 3.2, 8), material(0x76502e));
  trunk.position.y = 1.6;
  trunk.castShadow = true;
  g.add(trunk);
  for (let i = 0; i < 7; i++) {
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(.23, 2.5, 5), material(0x3f7448));
    leaf.position.set(0, 3.25, 0);
    leaf.rotation.z = Math.PI / 2;
    leaf.rotation.y = i * Math.PI * 2 / 7;
    leaf.castShadow = true;
    g.add(leaf);
  }
  g.position.set(x, 0, z);
  world.add(g);
}

for (let i = 0; i < 34; i++) {
  const x = (Math.random() - .5) * 55;
  const z = -Math.random() * 120 + 8;
  addRock(x, 0.45, z, .45 + Math.random() * 1.35);
}
[-8, 10, -16, 15, -24, 6].forEach((z, i) => addPalm(i % 2 ? 11 : -11, z));

const oasis = new THREE.Mesh(
  new THREE.CylinderGeometry(5, 5.3, .15, 48),
  new THREE.MeshStandardMaterial({ color: 0x48b9d1, roughness: .25 })
);
oasis.position.set(9, .08, -34);
world.add(oasis);

const oasisRing = new THREE.Mesh(new THREE.TorusGeometry(5.2, .12, 8, 48), material(0x8c6a3b));
oasisRing.rotation.x = Math.PI / 2;
oasisRing.position.set(9, .18, -34);
world.add(oasisRing);

function createCamel() {
  const g = new THREE.Group();
  const brown = material(0xb77942);
  const body = new THREE.Mesh(new THREE.SphereGeometry(1.25, 16, 12), brown);
  body.scale.set(1.45, .82, .72);
  body.position.y = 1.35;
  g.add(body);

  const hump = new THREE.Mesh(new THREE.SphereGeometry(.62, 14, 10), brown);
  hump.scale.y = 1.35;
  hump.position.set(-.25, 2.2, 0);
  g.add(hump);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.38, .58, 2.2, 12), brown);
  neck.position.set(.85, 2.25, 0);
  neck.rotation.z = -.35;
  g.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(.58, 12, 10), brown);
  head.position.set(1.35, 3.15, 0);
  g.add(head);

  for (const z of [-.5, .5]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(.16, .2, 1.35, 8), brown);
    leg.position.set(-.75, .68, z);
    g.add(leg);
  }
  g.position.set(-5, 0, -13);
  g.rotation.y = Math.PI;
  g.traverse(o => { if (o.isMesh) o.castShadow = true; });
  world.add(g);
  return g;
}
const camel = createCamel();

function createPlayer() {
  const cfg = characters[state.character];
  const g = new THREE.Group();

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(.45, 1.0, 6, 12), material(cfg.cloth));
  body.position.y = 1.05;
  body.castShadow = true;
  g.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(.42, 16, 12), material(cfg.skin));
  head.position.y = 2.0;
  head.castShadow = true;
  g.add(head);

  const scarf = new THREE.Mesh(new THREE.TorusGeometry(.43, .075, 8, 18), material(cfg.scarf));
  scarf.rotation.x = Math.PI / 2;
  scarf.position.y = 1.78;
  g.add(scarf);

  const armL = new THREE.Mesh(new THREE.CapsuleGeometry(.11, .58, 4, 8), material(cfg.cloth));
  const armR = armL.clone();
  armL.position.set(-.52, 1.25, 0);
  armR.position.set(.52, 1.25, 0);
  g.add(armL, armR);

  const legL = new THREE.Mesh(new THREE.CapsuleGeometry(.13, .62, 4, 8), material(0x4c3d35));
  const legR = legL.clone();
  legL.position.set(-.2, .42, 0);
  legR.position.set(.2, .42, 0);
  g.add(legL, legR);

  g.userData.parts = { body, armL, armR, legL, legR };
  g.position.set(0, 0, 4);
  scene.add(g);
  return g;
}

let player = createPlayer();

function rebuildPlayer() {
  scene.remove(player);
  player = createPlayer();
}

const collectibles = [];
function spawnCoin(x, z) {
  const g = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(.34, .1, 10, 18), material(0xf7c843));
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  const letter = new THREE.Mesh(
    new THREE.CircleGeometry(.23, 20),
    new THREE.MeshBasicMaterial({ color: 0xfff0b0 })
  );
  letter.rotation.x = -Math.PI / 2;
  letter.position.y = .02;
  g.add(letter);
  g.position.set(x, 1.2, z);
  world.add(g);
  collectibles.push(g);
}
for (let i = 0; i < 18; i++) spawnCoin((Math.random() - .5) * 18, -8 - i * 6);

const stars = [];
for (let i = 0; i < 10; i++) {
  const s = new THREE.Mesh(new THREE.OctahedronGeometry(.3), material(0xffd54a));
  s.position.set((Math.random() - .5) * 24, 2.4 + Math.random() * 1.2, -15 - i * 9);
  world.add(s);
  stars.push(s);
}

const hud = document.createElement("div");
hud.className = "hud";
hud.innerHTML = '<div class="pill">⭐ <span id="coins">0</span></div><div class="pill" id="who">🧑🏻 فواز</div><button id="pause">Ⅱ</button>';
ui.appendChild(hud);

const hint = document.createElement("div");
hint.className = "game-hint";
hint.textContent = "تحرك في البادية واجمع النجوم ✨";
ui.appendChild(hint);

const controls = document.createElement("div");
controls.className = "touch-controls";
controls.innerHTML = '<div class="joystick"><div class="stick"></div></div><div class="action"><button id="jump">↑</button></div>';
ui.appendChild(controls);

const joystick = controls.querySelector(".joystick");
const stick = controls.querySelector(".stick");

function setJoystick(e) {
  const r = joystick.getBoundingClientRect();
  const max = r.width * .32;
  let x = e.clientX - (r.left + r.width / 2);
  let y = e.clientY - (r.top + r.height / 2);
  const len = Math.hypot(x, y);
  if (len > max) { x *= max / len; y *= max / len; }
  state.joystick.x = x / max;
  state.joystick.y = y / max;
  stick.style.transform = `translate(${x}px,${y}px)`;
}
joystick.addEventListener("pointerdown", e => { joystick.setPointerCapture(e.pointerId); setJoystick(e); });
joystick.addEventListener("pointermove", e => { if (joystick.hasPointerCapture(e.pointerId)) setJoystick(e); });
["pointerup","pointercancel"].forEach(type => joystick.addEventListener(type, () => {
  state.joystick.x = state.joystick.y = 0;
  stick.style.transform = "translate(0,0)";
}));

const keys = {};
addEventListener("keydown", e => {
  keys[e.key.toLowerCase()] = true;
  if (e.key === " " || e.key === "Enter") jump();
});
addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

let jumpVelocity = 0;
function jump() {
  if (!state.started || state.paused || player.position.y > .05) return;
  jumpVelocity = 7.2;
}
controls.querySelector("#jump").onclick = jump;

function updateHud() {
  document.querySelector("#coins").textContent = state.coins;
  document.querySelector("#who").textContent = (state.character === "fawaz" ? "🧑🏻 " : "🧑🏽 ") + characters[state.character].name;
}

function pause() {
  if (!state.started) return;
  state.paused = !state.paused;
  document.querySelector(".pause-menu")?.remove();
  if (state.paused) {
    const m = document.createElement("div");
    m.className = "menu pause-menu";
    m.innerHTML = '<div class="sheet"><h1>استراحة 🌴</h1><p>استمتع بالرحلة واستكشف البادية.</p><button class="start" id="resume">متابعة</button><button class="start secondary" id="home">اختيار الشخصية</button></div>';
    ui.appendChild(m);
    m.querySelector("#resume").onclick = pause;
    m.querySelector("#home").onclick = () => { state.paused = false; showHome(); };
  }
}
document.querySelector("#pause").onclick = pause;

function showHome() {
  state.started = false;
  state.paused = false;
  ui.querySelector(".menu")?.remove();
  const m = document.createElement("div");
  m.className = "menu";
  m.innerHTML = `<div class="sheet"><div class="big-title">بادية الحروف 🐪</div><p>لعبة مغامرة ثلاثية الأبعاد — تحرك واستكشف واجمع النجوم.</p><h3>اختر مغامرك</h3><div class="choice">${Object.entries(characters).map(([id,c]) => `<button class="${id===state.character?"active":""}" data-c="${id}"><b>${id==="fawaz"?"🧑🏻":"🧑🏽"} ${c.name}</b><span>مغامر الصحراء</span></button>`).join("")}</div><button class="start" id="play">ابدأ اللعب 🎮</button></div></div>`;
  ui.appendChild(m);
  m.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { state.character = b.dataset.c; rebuildPlayer(); showHome(); });
  m.querySelector("#play").onclick = () => { m.remove(); startGame(); };
}
function startGame() {
  state.started = true;
  state.paused = false;
  state.coins = 0;
  state.distance = 0;
  state.time = 0;
  player.position.set(0, 0, 4);
  updateHud();
}

function collectObjects() {
  for (const c of collectibles) {
    if (!c.visible) continue;
    if (c.position.distanceTo(player.position) < 1.25) {
      c.visible = false;
      state.coins++;
      updateHud();
      player.scale.setScalar(1.12);
      setTimeout(() => player.scale.setScalar(1), 100);
    }
  }
  for (const s of stars) {
    if (!s.visible) continue;
    if (s.position.distanceTo(player.position) < 1.3) {
      s.visible = false;
      state.coins += 3;
      updateHud();
    }
  }
}

function update(dt, t) {
  if (!state.started || state.paused) return;

  const inputX = (keys.d || keys.arrowright ? 1 : 0) - (keys.a || keys.arrowleft ? 1 : 0) + state.joystick.x;
  const inputY = (keys.s || keys.arrowdown ? 1 : 0) - (keys.w || keys.arrowup ? 1 : 0) + state.joystick.y;
  const v = new THREE.Vector2(inputX, inputY);
  if (v.length() > 1) v.normalize();

  const moving = v.lengthSq() > .01;
  player.position.x += v.x * state.speed * dt;
  player.position.z += v.y * state.speed * dt;
  player.position.x = THREE.MathUtils.clamp(player.position.x, -22, 22);
  player.position.z = THREE.MathUtils.clamp(player.position.z, -105, 8);
  if (moving) {
    player.rotation.y = Math.atan2(v.x, v.y);
    state.distance += state.speed * dt;
  }

  jumpVelocity -= 18 * dt;
  player.position.y += jumpVelocity * dt;
  if (player.position.y < 0) { player.position.y = 0; jumpVelocity = 0; }

  const p = player.userData.parts;
  const walk = moving ? Math.sin(t * .012) * .55 : 0;
  p.armL.rotation.x = walk;
  p.armR.rotation.x = -walk;
  p.legL.rotation.x = -walk;
  p.legR.rotation.x = walk;
  p.body.position.y = 1.05 + (moving ? Math.abs(Math.sin(t * .012)) * .05 : 0);

  camel.rotation.z = Math.sin(t * .001) * .015;
  stars.forEach((s, i) => { s.rotation.y += dt * 2; s.position.y += Math.sin(t * .002 + i) * .001; });

  collectObjects();

  const target = new THREE.Vector3(player.position.x * .55, 4.5 + player.position.y * .4, player.position.z + 9);
  camera.position.lerp(target, 1 - Math.pow(.001, dt));
  camera.lookAt(player.position.x, 1.25 + player.position.y * .35, player.position.z - 4);
}

let last = performance.now();
function loop(t) {
  const dt = Math.min((t - last) / 1000, .05);
  last = t;
  update(dt, t);
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
});

showHome();
requestAnimationFrame(loop);
