(function(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        75,                                     //Field of View
        window.innerWidth / window.innerHeight, //aspect ratio
        0.1,                                    //near clipping plane
        1000                                    //far clipping plane
    );

    var renderer = new THREE.WebGLRenderer({
        alpha: true,    //transparent background
        antialias: true //smooth edges
    });

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    var geometry = new THREE.BoxGeometry(1, -10, 1);

    // Load in the mesh and add it to the scene.
    var loader = new THREE.JSONLoader();
    loader.load( "Tree.js", function(geometry) {
        var material = new THREE.MeshLambertMaterial({color: 0x555653});
        mesh = new THREE.Mesh(geometry, material);
        //mesh.rotateX(Math.PI / 2);
        scene.add(mesh);
        mesh.position.set(-2, -5, 0);
    });

    loader.load( "Tree2.json", function(geometry, materials) {
        var material = new THREE.MeshFaceMaterial(materials);
        mesh = new THREE.Mesh(geometry, material);
        mesh.rotateX(Math.PI / 2);
        scene.add(mesh);
        mesh.position.set(5, -5, 0);
    });

    loader.load("landscape.json", function(geometry, materials) {
        var material = new THREE.MeshFaceMaterial(materials);
        model = new THREE.Mesh(geometry, material);
        model.scale.set(5, 5, 5);
        model.rotateX(Math.PI / 2);
        model.position.set(0, -5, 0);
        scene.add(model);
    });

    //var ambientLight = new THREE.AmbientLight(0xc5c5e5);
    var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    var directionalLight = new THREE.DirectionalLight(0xeeffbb);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    camera.position.z = 20; //move camera back so we can see the tree

    var render = function() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    };

    render();
    controls.update();
})();