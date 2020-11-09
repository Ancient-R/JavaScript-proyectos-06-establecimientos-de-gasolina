class API{
    
   async obtenerDatos(){

        //Total de resultados que se requieren o que quieres
        const total = 500
       const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`)
        const respuesta = await datos.json()

        return{
            respuesta
        }
    }
}