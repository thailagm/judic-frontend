const highlightColor = "rgb(213, 234, 255)";

const template = `
  <template id="highlightTemplate">
    <span class="highlight" style="background-color: ${highlightColor}; display: inline"></span>
  </template>
  <button id="mediumHighlighter">
    <svg class="text-marker" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459.319 459.319"><path d="M141.288,189.821h-23.685V145.28h23.528v-23.69h21.016v23.374h23.681v44.707h-23.681v0.151H141.288z M60.801,398.87 c0.012,1.1,0.03,1.921,0.042,2.459c0.006,0.331-0.053,0.638-0.071,0.963c0.739,18.224,15.755,32.817,34.146,32.817h303.76v-33.461 c0-6.68,5.421-12.105,12.105-12.105c6.679,0,12.105,5.426,12.105,12.105v45.565c0,6.686-5.427,12.105-12.105,12.105H93.091 c-0.629,0-1.235-0.089-1.847-0.183c-30.505-1.91-54.757-27.261-54.757-58.245c0-0.71,0.085-1.396,0.109-2.099 c-0.375-35.943,0-309.36,0.042-339.109c-0.047-0.423-0.127-0.827-0.127-1.259C36.511,26.205,62.719,0,94.938,0h19.343h293.535 h2.955c6.685,0,12.105,5.423,12.105,12.105v342.139c0,6.679-5.421,12.104-12.105,12.104c-0.071,0-0.13-0.023-0.201-0.023 c-0.887,0.213-1.82,0.354-2.772,0.354H94.918C76.736,366.674,61.859,380.948,60.801,398.87z M278.347,121.59h94.425v20.862h-23.685 v23.69h-23.525v23.685h-23.69v23.533h-23.536v49.882h120.792v-26.209h-94.584v-20.859h23.69V192.49h23.525v-23.69h23.689V145.28 h23.679V95.237h-120.78V121.59z M224.949,192.49h56.265v-26.353h-56.265V192.49z M91.41,263.229h26.2v-47.056h23.679v-0.15h44.54 v47.219h26.354v-120.79h-23.688v-23.841H164.81V95.237h-26.202v23.684h-23.685v23.69H91.389v120.618H91.41z"></path></svg>
  </button>
`;

const styled = ({ display = "none", left = 0, top = 0 }) => `
  #mediumHighlighter {
    align-items: center;
    background-color: black;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    display: ${display};
    justify-content: center;
    left: ${left}px;
    padding: 5px 10px;
    position: fixed;
    top: ${top}px;
    width: 40px;
    z-index: 9999;
  }
  .text-marker {
    fill: white;
  }
  .text-marker:hover {
    fill: ${highlightColor};
  }
`;

class MediumHighlighter extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    get markerPosition() {
        return JSON.parse(this.getAttribute("markerPosition") || "{}");
    }

    get styleElement() {
        return this.shadowRoot.querySelector("style");
    }

    get highlightTemplate() {
        return this.shadowRoot.getElementById("highlightTemplate");
    }

    static get observedAttributes() {
        return ["markerPosition"];
    }

    render() {
        this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = styled({});
        this.shadowRoot.appendChild(style);
        this.shadowRoot.innerHTML += template;
        this.shadowRoot
            .getElementById("mediumHighlighter")
            .addEventListener("click", () => {
                //this.selecaoVerbete();
                this.formataConteudo();

            });
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "markerPosition") {
            this.styleElement.textContent = styled(this.markerPosition);
        }
    }

    async selecaoVerbete() {
        //let url = 'http://localhost:3000/glossario';
        let url = 'http://localhost:8080/glossario';
        let response = await fetch(url);

        var sel = window.getSelection().toString();
        if (sel.endsWith(' ') || sel.endsWith('.')) {
            sel = sel.slice(0, -1)
            console.log("eita " + sel);
        }

        var conteudo;

        if (response.status === 200) {
            let data = await response.json();
            // handle data
            //console.log(data);

            let consulta = url + "/" + encodeURIComponent(sel);
            let response2 = await fetch(consulta);

            try {
                let data2 = await response2.json();

                //console.log(data2);
                //alert(data2);

                let totalElements = JSON.stringify(data2, ['totalElements']);
                console.log("totalElements " + totalElements);

                let content = JSON.stringify(data2, ['content', 'verbete', 'significados', 'significado']);
                //console.log(content);
                //console.log('content = ' + typeof content);

                //alert(content);
                conteudo = content;
                return conteudo;

            } catch {
                conteudo = 'Hello darkness my old friend';
                console.log(conteudo);
                return conteudo;
            }

        } else {
            conteudo = 'tururu';
            console.log(conteudo);
        }
    }

    async formataConteudo() {
        var original = await this.selecaoVerbete();
        console.log('original = ' + typeof original);

        //content e verbete
        const regexContent = /\{\"content\"\:\[\{\"verbete\"\:\"/;
        console.log('regexContent = ' + typeof regexContent);

        /* //const sContent = '\{\"content\"\: \[\{';
        const foundContent = original.match(regexContent);
        console.log('foundContent = ' + typeof foundContent);

        const formatContent = '';
        console.log('formatContent = ' + typeof formatContent);
        //formatContent = JSON.parse(formatContent);
        console.log('formatContent = ' + typeof formatContent); */

        original = original.replace(regexContent, '');
        //console.log(typeof replaceOriginal);
        //console.log(replaceOriginalContent);

        //significados
        const regexSignificados = /\"\,\"significados\"\:\[\{\"significado\"\:\"/g;
        original = original.replace(regexSignificados, '\n');
        //console.log(typeof replaceOriginal);
        //console.log(replaceOriginalSignificados);

        //significado
        const regexSignificado = /\"\}\,\{\"significado\"\:\"/g;
        original = original.replace(regexSignificado, '\n');
        //console.log(typeof replaceOriginal);
        //console.log(original);

        // verbete

        const regexVerbete = /\"\}\]\}\,\{\"verbete\"\:\"/g;
        original = original.replaceAll(regexVerbete, '\n\n');
        //console.log(original);

        //* /fechamento
        const regexFechamento = /\"\}\]\}\]\}/g;
        original = original.replace(regexFechamento, '');
        console.log(original);

        const formatado = original;

        alert(formatado);

        return formatado;


    }
}

window.customElements.define("medium-highlighter", MediumHighlighter);