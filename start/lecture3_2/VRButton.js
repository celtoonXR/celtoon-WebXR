/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 * @author NikLever / http://niklever.com
 */

class VRButton{

	constructor( renderer ) {
        this.renderer = renderer;
        
        if ( 'xr' in navigator ) {
            const button = document.createElement ('button');
            button.style.display = 'none';
            button.style.height ='40px';
            document.body.appendChild (button);
            /* cria o botão, mas ele só é mostrado se o computador constatar
            que a cena é compatível com modo VR, o que é feito asseguir*/

            navigator.xr.isSessionSupported ('immersive-vr').then ((supported) =>
            {supported ? this.showEnterVR (button) : this.showWebXRNotFound (button);
            })

		} else {
            const message = document.createElement ('a');
            if (window.isSecureContext === false){
                message.href = document.location.href.replace (/^http:/, 'https:');
                message.innerHTML = 'WEBXR NEEDS HTTPS';
            }

            else {
                message.href = 'https;//immersiveweb.dev'; 
                // o usuário será direcionado a está página se estiver tendo problemas
                message.innerHTML = 'WEBXR NOT AVAILABLE';
            }
            /* O computador verifica se o navegador suporta WEBXR.
            se o usuário está tentando exibir a sessão em uma navegador
            que não tem suporte, esta mensagem será mostrada. */
		}

    }

	showEnterVR( button ) {
        let currentSession = null;

        this.stylizeElement (button, true, 30, true);

        button.style.display = '';
        button.style.right = '20px';
        button.style.width = '80px';
        button.style.cursor = 'pointer';
        button.innerHTML = '<i class="fas fa-vr-cardboard"></1>';
        //define a aparência do botão quando VR está disponível

        button.onmouseenter = function(){
            button.style.fontSize = '12px'
            button.textContent = (currentSession === null) ? 'ENTER VR' : 'EXIT VR';
            button.style.opacity = '1';
        }

        button.onmouseleave = function (){
            button.style.fontSize = '30px';
            button.innerHTML = '<i class="fas fa-vr-cardboard"></1>';
            button.style.opacity = '0.5';
        }
        //definem a aparência do botão quando o mouse está sobre o botão ou não

        function onSessionStarted (session){
            session.addEventListener ('end', onSessionEnded);

            self.renderer.xr.setSession (session);
            self.styleElement (button, false, 12, true);

            button.textContent = 'EXIT VR';

            currentSession = session;
        }
        /* quando a sessão VR é iniciada, o computador espera até que ela seja 
        terminada. Quando o botão de sair é acionado, a tela muda de modo VR para
        stereo e o botão deve exibir o botão se sair */

        function onSessionEnded (){
            currentSession.removeEventListener ('end', onSessionEnded);

            self.stylizeElement (button, true, 12, true);
            button.textContent = 'ENTER VR';

            currentSession = null;
        }
        /*quando a sessão já está terminada, o computador passa esperar que ela reinicie
        e o botão deve mostrar o texto para iniciar a sessão novamente*/

        button.onclick = function (){
            if (currentSession === null){
                const sessionInit = {optionalFeatures: ['local-floor', ' bounded-floor'']};
                navigator.xr.requestSession ('immersive-vr', sessionInit).then (onSessionStarted);
            }
            
            else {
                currentSession.end();
            }
            // isto dá a função de entrar e sair do modo VR ao botão
        }
        
    }

    disableButton( button ) {

        button.style.cursor = 'auto';
        button.style.opacity = '0.5';
        
        button.onmouseenter = null;
        button.onmouseleave = null;

        button.onclick = null;

    }

    showWebXRNotFound( button ) { 
        this.stylizeElement (button, false);
        this.disableButton (button);

        button.style.display = '';
        button.style.width = '100%';
        button.style.right = '0px';
        button.style.bottom = '0px';
        button.style.border = '';
        button.style.opacity = '1';
        button.style.fontSize = '13px';
        button.textContent = 'VR NOT SUPPORTED';
        //define a aparência do botão quando VR não está disponível
    }

    stylizeElement( element, green = true, fontSize = 13, ignorePadding = false ) {

        element.style.position = 'absolute';
        element.style.bottom = '20px';
        if (!ignorePadding) element.style.padding = '12px 6px';
        element.style.border = '1px solid #fff';
        element.style.borderRadius = '4px';
        element.style.background = (green) ? 'rgba(20,150,80,1)' : 'rgba(180,20,20,1)';
        element.style.color = '#fff';
        element.style.font = `normal ${fontSize}px sans-serif;
        element.style.textAlign = 'center';
        element.style.opacity = '0.5';
        element.style.outline = 'none';
        element.style.zIndex = '999';
    }
};

export { VRButton };
