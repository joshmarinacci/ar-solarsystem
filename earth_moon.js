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

class App extends XRExampleBase{
    constructor(domElement){
        super(domElement, false)
    }
    initializeScene() {
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
        sunLight.target = this.earth;
        this.scene.add(sunLight);


        this.scene.add(new THREE.AmbientLight(WHITE, 0.5));
    }

    makeMoonEarth(){
        this.earthGroup = new THREE.Group();


        //make earth
        this.earth = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshLambertMaterial({color: WHITE}));
        this.earth.position.z = -3;
        this.earth.position.y = 1;
        this.earthGroup.add(this.earth);
        // this.camera.lookAt(this.earth.position);

        let textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = true;
        textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthmap1k.jpg',(tex) => {
            this.earth.material = new THREE.MeshLambertMaterial({color:WHITE, map:tex});
        });



        this.earthOrbit = new THREE.Mesh(
            new THREE.TorusGeometry(10.0, 0.1, 10, 50),
            new THREE.MeshBasicMaterial({color: WHITE, wireframe: false, transparent: true, opacity: 0.7})
        );
        this.earthOrbit.rotation.x = Math.PI/2;
        this.earthOrbit.position.x = -10.0;
        this.earthOrbit.position.z = -3;
        this.earthOrbit.position.y = 1;

        this.earthGroup.add(this.earthOrbit);


        // earth label
        this.earthLabel = new THREE.Mesh(
            new THREE.PlaneGeometry(0.5, 0.15),
            new THREE.MeshBasicMaterial({color: WHITE, side: THREE.DoubleSide})
        );
        this.earthLabel.position.z = -3.0;
        this.earthLabel.position.y = 1.8;
        this.earthGroup.add(this.earthLabel);

        // make moon
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

        // make moon label
        this.moonLabel = new THREE.Mesh(
            new THREE.PlaneGeometry(0.5, 0.15),
            new THREE.MeshBasicMaterial({color: WHITE, side: THREE.DoubleSide})
        );
        this.moonLabel.position.x = 1.0;
        this.moonLabel.position.y = 0.3;
        this.moonGroup.add(this.moonLabel);


        // make moon orbit path
        this.moonOrbit = new THREE.Mesh(
            new THREE.TorusGeometry(1.0, 0.01, 10, 50),
            new THREE.MeshBasicMaterial({color: WHITE, wireframe: false, transparent: true, opacity: 0.7})
        );
        this.moonOrbit.rotation.x = Math.PI / 2;
        this.moonGroup.add(this.moonOrbit);



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


        this.floorGroup.add(this.earthGroup);
    }

    makeMars() {
        this.marsGroup = new THREE.Group();

        this.mars = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshLambertMaterial({color: RED}));
        this.mars.position.z = -3;
        this.mars.position.y = 1;
        this.marsGroup.add(this.mars);
        let textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = true;
        textureLoader.load('mars.jpg',(tex) => {
            this.mars.material = new THREE.MeshLambertMaterial({color:WHITE, map:tex});
        });
        this.floorGroup.add(this.marsGroup);
        this.marsGroup.visible = false;
    }

    makeJupiter() {
        this.jupiterGroup = new THREE.Group();
        this.jupiter = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), new THREE.MeshLambertMaterial({color: RED}));
        this.jupiter.position.z = -3;
        this.jupiter.position.y = 1;
        this.jupiterGroup.add(this.jupiter);
        let textureLoader = new THREE.TextureLoader();
        textureLoader.crossOrigin = true;
        textureLoader.load('jupiter.jpg',(tex) => {
            this.jupiter.material = new THREE.MeshLambertMaterial({color:WHITE, map:tex});
        });


        const jupiterOrbit = new THREE.Mesh(
            new THREE.TorusGeometry(10.0, 0.1, 10, 50),
            new THREE.MeshBasicMaterial({color: WHITE, wireframe: false, transparent: true, opacity: 0.7})
        );
        jupiterOrbit.rotation.x = Math.PI/2;
        jupiterOrbit.position.x = -10.0;
        jupiterOrbit.position.z = -3;
        jupiterOrbit.position.y = 1;
        this.jupiterGroup.add(jupiterOrbit);

        this.floorGroup.add(this.jupiterGroup);
        this.jupiterGroup.visible = false;
    }

    addEvents() {
        on($("#next"),'click',() => {
            this.earthGroup.visible = false;
            this.jupiterGroup.visible = true;
        });
        on($("#prev"),'click',() => {
            this.earthGroup.visible = true;
            this.jupiterGroup.visible = false;
        })
    }
    updateScene(frame){
        const rate = 0.003;
        this.moonGroup.rotation.y -= rate/2;
        this.earth.rotation.y -= rate;
        this.moonLabel.rotation.y += rate/2;
        this.mars.rotation.y -= rate;
        this.jupiter.rotation.y += rate/3;
    }

    jstart() {
        const app = this;

        function tick() {
            requestAnimationFrame(tick);
            app.tick();
        }

        requestAnimationFrame(tick);
    }
}

