class UI{
    constructor(){
        //Instanciamos a la clase api del archivo API.js
        this.api = new API()
        //Instanciamos la clase desde leaflets
        this.markers = new L.layerGroup()
        this.mapa = this.inicializarMapa()
    }

    inicializarMapa(){
        //Inicializar y obtener propiedades del mapa
        const map = L.map('mapa').setView([19.390519, -99.3739778], 6)
        const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>'

        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
                attribution: ' ' + enlaceMapa + ' Contributors',
                maxZoom: 18,
            }).addTo(map)     
    
        return map;

    }

    mostrarEstablecimientos(){
        this.api.obtenerDatos()
            .then(data =>{
                const datos = data.respuesta.results

                //Ejecutamos la función para ejecutar los pines
                this.mostrarPines(datos)
            })
    }

    mostrarPines(datos){
        //Limpiamos los markers
        this.markers.clearLayers()

        for(const dato of datos){
            //destructuring
            const {latitude, longitude, calle, regular, premium} = dato

            //Creación de los PopUps
            const popUp = L.popup()
                .setContent(
                    `<p><b>Ubicación de establecimiento:</b> ${calle}</p>
                     <p><b>Regular:</b> $ ${regular}</p>
                     <p><b>Premium:</b> ${premium}</p>`
                )
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(popUp)

            this.markers.addLayer(marker)
        }
        this.markers.addTo(this.mapa)
    }

    //Obtiene la busqueda de la api
    obtenerSugerencias(busqueda){
        //consultamos a la api de nuevo
        this.api.obtenerDatos()
            .then(datos =>{
                const resultados = datos.respuesta.results

                //Envia el json y la busqueda
                this.filtrarSugerencias(resultados, busqueda)
            })
    }

    filtrarSugerencias(resultados, busqueda){
        //Filtrar los resultados con .filter
        const filtro = resultados.filter(filtro => filtro.calle.indexOf(busqueda) !==-1)
        this.mostrarPines(filtro)
        //mostrar los pines
    }
}