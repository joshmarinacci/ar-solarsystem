const WHITE = 0xffffff;
const BLUE = 0x0000ff;
const GRAY = 0xa0a0a0;

class App extends XRExampleBase{
    constructor(domElement){
        super(domElement, false)
    }

    initializeScene(){
        //make earth
        this.earth = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshLambertMaterial({color: WHITE}));
        this.earth.position.z = -3;
        this.earth.position.y = 1;
        this.floorGroup.add(this.earth);
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

        this.floorGroup.add(this.earthOrbit);


        // earth label
        this.earthLabel = new THREE.Mesh(
            new THREE.PlaneGeometry(0.5, 0.15),
            new THREE.MeshBasicMaterial({color: WHITE, side: THREE.DoubleSide})
        );
        this.earthLabel.position.z = -3.0;
        this.earthLabel.position.y = 1.8;
        this.floorGroup.add(this.earthLabel);

        // make moon
        const moon_material = new THREE.MeshLambertMaterial({color: GRAY});
        this.moon = new THREE.Mesh(new THREE.SphereGeometry(0.1, 16, 16), moon_material);
        this.moon.position.x = 1.0;
        this.moonGroup = new THREE.Group();
        this.moonGroup.position.z = -3.0;
        this.moonGroup.position.y = 1;
        this.moonGroup.add(this.moon);
        this.floorGroup.add(this.moonGroup);
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

        //make lights
        const sunLight = new THREE.DirectionalLight(WHITE, 1.0);
        sunLight.position.x = -30;
        sunLight.position.y = 0;
        sunLight.position.z = -30;
        sunLight.target = this.earth;
        this.scene.add(sunLight);


        this.scene.add(new THREE.AmbientLight(WHITE, 0.4));


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
    }

    updateScene(frame){
        const rate = 0.003;
        this.moonGroup.rotation.y -= rate/2;
        this.earth.rotation.y -= rate;
        this.moonLabel.rotation.y += rate/2;
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

