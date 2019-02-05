onClick = (event) => {
	var phrase = text[Math.floor(Math.random()*text.length)];
	while(phrase === curPhrase) {
		phrase = text[Math.floor(Math.random()*text.length)]; //no repeats
	}
	curPhrase = phrase;
	smols = [];
	while(scene.children.length > 0){ 
	    scene.remove(scene.children[0]); 
	}
	makeText(phrase);
	setButton();
	makeAllMinor();
	render();
}

var button = document.getElementById("button");
button.addEventListener("click", onClick, false);



var loader = new THREE.FontLoader();

// Create an empty scene
var scene = new THREE.Scene();

// Create a basic perspective camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 120;


var controls = new THREE.OrbitControls( camera );

//light
var light = new THREE.AmbientLight( 0x404040, 5 ); // soft white light
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
var curPhrase = "";
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
	console.log("boop");
	loader.load( './ms_yahei_regular.json', function ( font ) {

		geometry = new THREE.TextGeometry( phrase, {
			font: font,
			size: 20,
			height: 2,
			curveSegments: 5,
			bevelEnabled: true,
			bevelThickness: 1,
			bevelSize: 1,
			bevelSegments: 5
	} );

	//var material = new THREE.MeshBasicMaterial({ color: 'pink'} );
	// var material = new THREE.MeshLambertMaterial({color: 'white', transparent: true, opacity: 0.7});
	var material = new THREE.MeshLambertMaterial({color: 'white', transparent: false});
	var mesh = new THREE.Mesh(geometry, material);
	var edges = new THREE.EdgesHelper(mesh, 'grey');
	mesh.add(edges);
	if(phrase.length === 4)
		mesh.position.set(-55, -10, 0);
	else if(phrase.length === 5)
		mesh.position.set(-60, -10, 0)
	scene.add(mesh);
	scene.add( light );
	//return mesh;
	
	});
}


function makeMinorText(phrase, x, y, z) {
	var mesh;
	var direction;

	this.init = () => {
		loader.load( './ms_yahei_regular.json', function ( font ) {

			var geometry = new THREE.TextGeometry( phrase, {
				font: font,
				size: 1,
				height: 0,
				curveSegments: 5,
		} );

		//var material = new THREE.MeshBasicMaterial({ color: 'pink'} );
		// var material = new THREE.MeshLambertMaterial({color: 'white', transparent: true, opacity: 0.7});
		var material = new THREE.MeshLambertMaterial({color: 'white', transparent: false});
		var mesh = new THREE.Mesh(geometry, material);
		//var edges = new THREE.EdgesHelper(mesh, 'grey');
		//mesh.add(edges);
		mesh.position.set(x, y, z);
		scene.add(mesh);
		
		});
		direction = new THREE.Vector3(Math.random(), Math.random(), 0);
	}
	this.init();

}

var xVals = [];
var yVals = [];
var smols = [];

for(i= 0-text.length; i<text.length;i++) {
	xVals.push(i*12);
	yVals.push(i*10);
}

console.log(xVals);
function makeAllMinor() {
	let xTemp = xVals;
	let yTemp = yVals;
	for(i = 0; i < text.length; i++) {
		if(text[i] !== curPhrase) {
			let x = xTemp[Math.floor(Math.random() * xTemp.length)];
			let y = yTemp[Math.floor(Math.random() * yTemp.length)];
			smols[i] = new makeMinorText(text[i], x, y, -10);
		}
	}
}

function setButton() {
	switch(curPhrase) {
		case "吃饭了吗?":
			document.getElementById("button").innerHTML = "吃了";
			break;
		case "回家了吗?":
			document.getElementById("button").innerHTML = "回家了";
			break;
		default:
			document.getElementById("button").innerHTML = "好";
			break;


	}
	

}

function render() {
	requestAnimationFrame(render);
	renderer.render( scene, camera );
	//window.setTimeout(setButton(), 5000)
}

function init() {
	curPhrase = text[Math.floor(Math.random()*text.length)];
	makeText(curPhrase);
	makeAllMinor();
	render();
	setButton();
	console.log("hello")
}
init(); //initializes at beginning





