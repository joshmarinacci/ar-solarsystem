const WHITE = 0xffffff;
const BLUE = 0x0000ff;
const GRAY = 0xa0a0a0;
const RED = 0xff0000;

function $(selector) {
    return document.querySelector(selector);
}
function on(elem,type,cb) {
    elem.addEventListener(type,cb);
}

class PlanetGroup {
    constructor(opts) {
        this.group = new THREE.Group();
        this.planet = new THREE.Mesh(new THREE.SphereGeometry(opts.planetRadius, 16, 16), new THREE.MeshLambertMaterial({color:WHITE}));
        if(opts.planetTexture) {
            let textureLoader = new THREE.TextureLoader();
            textureLoader.crossOrigin = true;
            // console.log("loading the texture",opts.planetTexture)
            textureLoader.load(opts.planetTexture,(tex) => {
                // console.log(`loaded ${opts.planetTexture}`,tex);
                this.planet.material = new THREE.MeshLambertMaterial({color:WHITE, map:tex});
            });
        }
        this.planet.position.z = -3;
        this.planet.position.y = 1;
        this.group.add(this.planet);

        this.orbit = new THREE.Mesh(
            new THREE.TorusGeometry(10,0.1,10,50),
            new THREE.MeshBasicMaterial({color:WHITE, wireframe: false, transparent: true, opacity: 0.7})
        );
        this.orbit.rotation.x = Math.PI/2;
        this.orbit.position.x = -10.0;
        this.orbit.position.z = -3;
        this.orbit.position.y = 1;
        this.group.add(this.orbit);
    }
}
class App extends XRExampleBase{
    constructor(domElement){
        super(domElement, false);
    }
    initializeScene() {
        this.current = 0;
        this.planets = [];
        this.makeMoonEarth();
        this.makeMars();
        this.makeJupiter();
        this.makeLights();
        this.addEvents();
    }
    makeLights() {
        //make lights
        const sunLight = new THREE.DirectionalLight(WHITE, 1.0);
        sunLight.position.x = -30;
        sunLight.position.y = 0;
        sunLight.position.z = -30;
        sunLight.target = this.planets[this.current].planet;
        this.scene.add(sunLight);


        this.scene.add(new THREE.AmbientLight(WHITE, 0.5));
    }

    makeMoonEarth(){
        this.earth =  new PlanetGroup({
            planetRadius:0.5,
            planetTexture:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg'
        });
        this.planets.push(this.earth);


        // earth label
        // this.earthLabel = new THREE.Mesh(
        //     new THREE.PlaneGeometry(0.5, 0.15),
        //     new THREE.MeshBasicMaterial({color: WHITE, side: THREE.DoubleSide})
        // );
        // this.earthLabel.position.z = -3.0;
        // this.earthLabel.position.y = 1.8;
        // this.earthGroup.add(this.earthLabel);

        // make moon
        /*
        const moon_material = new THREE.MeshLambertMaterial({color: GRAY});
        this.moon = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), moon_material);
        this.moon.position.x = 1.0;
        this.moonGroup = new THREE.Group();
        this.moonGroup.position.z = -3.0;
        this.moonGroup.position.y = 1;
        this.moonGroup.add(this.moon);
        this.earthGroup.add(this.moonGroup);
        textureLoader.load('https://raw.githubusercontent.com/CoryG89/MoonDemo/master/img/maps/moon.jpg',(tex)=>{
            this.moon.material = new THREE.MeshLambertMaterial({color:WHITE, map:tex});
        })
        */

        // make moon label
        // this.moonLabel = new THREE.Mesh(
        //     new THREE.PlaneGeometry(0.5, 0.15),
        //     new THREE.MeshBasicMaterial({color: WHITE, side: THREE.DoubleSide})
        // );
        // this.moonLabel.position.x = 1.0;
        // this.moonLabel.position.y = 0.3;
        // this.moonGroup.add(this.moonLabel);


        /*
        // make moon orbit path
        this.moonOrbit = new THREE.Mesh(
            new THREE.TorusGeometry(1.0, 0.01, 10, 50),
            new THREE.MeshBasicMaterial({color: WHITE, wireframe: false, transparent: true, opacity: 0.7})
        );
        this.moonOrbit.rotation.x = Math.PI / 2;
        this.moonGroup.add(this.moonOrbit);
        */


        /*
        let nextDir = new THREE.Vector3(0, 2, 0);
        nextDir.normalize();
        let prevDir = new THREE.Vector3(0, -2, 0);
        prevDir.normalize();
        let origin = new THREE.Vector3( 0, 0, -3.0 );
        let length = 10;
        let hex = 0xffff00;
        let nextArrow = new THREE.ArrowHelper(nextDir, origin, length, hex);
        this.floorGroup.add( nextArrow );
        let prevArrow = new THREE.ArrowHelper(prevDir, origin, length, hex);
        this.floorGroup.add( prevArrow );
        */


        this.floorGroup.add(this.earth.group);
    }

    makeMars() {
        this.mars =  new PlanetGroup({
            planetRadius:0.3,
            planetTexture:'mars.jpg'
        });
        this.floorGroup.add(this.mars.group);
        this.mars.group.visible = false;
        this.planets.push(this.mars);
    }

    makeJupiter() {
        this.jupiter =  new PlanetGroup({
            planetRadius:0.8,
            planetTexture:'jupiter.jpg'
        });
        this.floorGroup.add(this.jupiter.group);
        this.jupiter.group.visible = false;
        this.planets.push(this.jupiter);
    }

    addEvents() {
        on($("#next"),'click',() => {
            this.planets[this.current].group.visible = false;
            this.current++;
            if(this.current > this.planets.length -1) this.current = 0;
            this.planets[this.current].group.visible = true;
        });
        on($("#prev"),'click',() => {
            this.planets[this.current].group.visible = false;
            this.current--;
            if(this.current < 0) this.current = this.planets.length -1;
            this.planets[this.current].group.visible = true;
        })
    }
    updateScene(frame){
        const rate = 0.003;
        this.planets.forEach((planet)=>{
            planet.planet.rotation.y += rate;
        });
    }

}

