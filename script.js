onClick = (event) => {
	console.log("that's some cheese");
	var phrase = text[Math.floor(Math.random()*text.length)];
	console.log("phrase: ", phrase, " curPhrase: ", curPhrase);
	while(phrase === curPhrase) {
		phrase = text[Math.floor(Math.random()*text.length)]; //no repeats
		console.log("new phrase: ", phrase);
	}
	curPhrase = phrase;

	while(scene.children.length > 0){ 
		console.log("children");
	    scene.remove(scene.children[0]); 
	}
	makeText(phrase);
	render();
}

var button = document.getElementById("button");
button.addEventListener("click", onClick, false);



var loader = new THREE.FontLoader();

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 100;


var controls = new THREE.OrbitControls( camera );

//light
var light = new THREE.AmbientLight( 0x404040, 5 ); // soft white light


// var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6 );
// directionalLight.position.set( - 1, 1, 1 );
// scene.add( directionalLight );

// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({antialias:true});

// Configure renderer
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( '#003366', 1 );

// Configure renderer size
renderer.setSize( window.innerWidth, window.innerHeight );

// Append Renderer to DOM
document.body.appendChild( renderer.domElement );
renderer.render (scene, camera);

var group = new THREE.Group();
scene.add(group);

var text;
var curPhrase;
var meshes = [];



function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                text = rawFile.responseText.split("\n");
            }
        }
    }
    rawFile.send(null);
}

readTextFile('words.txt');

function makeText(phrase) {
	loader.load( './ms_yahei_regular.json', function ( font ) {

		var geometry = new THREE.TextGeometry( phrase, {
			font: font,
			size: 20,
			height: 2,
			curveSegments: 12,
			bevelEnabled: true,
			bevelThickness: 1,
			bevelSize: 1,
			bevelSegments: 5
	} );

	//var material = new THREE.MeshBasicMaterial({ color: 'pink'} );
	var material = new THREE.MeshLambertMaterial({color: 'white', transparent: true, opacity: 0.7});
	var mesh = new THREE.Mesh(geometry, material);
	var edges = new THREE.EdgesHelper(mesh, 'grey');
	mesh.add(edges);
	mesh.position.set(-50, -10, 0);
	scene.add(mesh);
	scene.add( light );
	//return mesh;
	
	});
}



function render() {
	requestAnimationFrame(render);
	renderer.render( scene, camera );

}


function init() {
	curPhrase = text[Math.floor(Math.random()*text.length)];
	makeText(curPhrase);
	render();
	console.log("hello")
}
init(); //initializes at beginning





