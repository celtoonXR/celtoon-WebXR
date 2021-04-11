import * as THREE from '../../libs/three/three.module.js';
import { OrbitControls } from '../../libs/three/jsm/OrbitControls.js';

class App{
	constructor(){
		const container = document.createElement( 'div' );
		document.body.appendChild( container );

        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,0.1,100);
        this.camera.position.set(0,0,4);
        // cria uma Camera em perspectiva, é definido um FOV, um Aspect Ratio

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xaaaaaa);
        // cria a cena e define a cor do fundo

        const ambient = new THREE.HemisphereLight (0xffffff, 0xbbbbff, 0.3);
        this.scene.add (ambient);
        // cria um ambiente e uma luz para o ambiente

        const light = new THREE.DirectionalLight();
        light.position.set (0.2, 1, 1);
        this.scene.add(light);
        // cria uma luz que aponta para a origem, onde está o objeto

        this.renderer = new THREE.WebGLRenderer ({antialias: true});
        this.renderer.setPixelRatio (window.devicePixelRatio);
        this.renderer.setSize (window.innerWidth, window.innerHeight);
        container.appendChild (this.renderer.domElement);
        // criar um renderer 

        this.renderer.setAnimationLoop (this.render.bind(this));
        // cria  animação de rotação para o cubo

        const geometry = new THREE.BoxBufferGeometry();
        const material = new THREE.MeshStandardMaterial ({color: 0xff0000});

        this.mesh = new THREE.Mesh (geometry, material);
        this.scene.add (this.mesh);
        // cria um objeto para a cena - no caso uma caixa

        const controls = new OrbitControls (this.camera, this.renderer.domElement);
        // permite que o usuario interaja com o objeto 

        window.addEventListener('resize', this.resize.bind(this) );
        // faz com que a cena se adeque ao tamanho da tela
	}	
    
    resize(){
        this.camera.aspect = window.innerWidth/window.innerHeight;
        this.camera.uptadeProjectionMatrix();
        this.renderer.setSize (window.innerWidth, window.innerHeight);
        // se houver reajuste do tamanho da janela o renderer se ajusta a ela
        
    }
    
	render( ) {   
        this.mesh.rotateY(0.01);
        this.renderer.render(this.scene, this.camera);
        
    }
}

export { App };