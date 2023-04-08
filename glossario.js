class Glossario {

    getTest = async () => {
        return window.getSelection().toString();
    }
    getSignificado = async () => {
        //let url = 'http://localhost:3000/glossario';
        let url = 'http://localhost:8080/glossario';
        let response = await fetch(url);

        var sel = window.getSelection().toString();
        if (sel.endsWith(' ') || sel.endsWith('.')) {
            sel = sel.slice(0, -1)
            console.log("eita " + sel);
        }

        if (response.status === 200) {
            let data = await response.json();
            // handle data

            //console.log(data);

            let consulta = url + "/" + encodeURIComponent(sel);
            let response2 = await fetch(consulta);

            if (response2.status === 200) {
                let data2 = await response2.json();

                console.log(data2);
                //alert(data2);

                let content = JSON.stringify(data2, ['content', 'id', 'verbete', 'significados', 'significado']);
                console.log(content);

                alert(content);
                //return content;

                let totalElements = JSON.stringify(data2, ['totalElements']);
                console.log("totalElements " + totalElements);

            } else {
                console.log("Hello darkness my old friend");
                return "Hello darkness my old friend";
            }


        } else {
            console.log("tururu");
            return "tururu";
        }

        return content

    }
}

/* @param{ Function } pglossario
@returns{ Promise }
const glossarioPromise = (pglossario) => {

} */

/* let promiseGlossario = new Promise(function (resolve, reject) {
    resolve(

    );
}); */