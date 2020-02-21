## Instrucciones Docker

docker build -t name_image:tag .
docker build -t node_app_image:1 .

docker images

docker run -p port_maq:port_container --name name_container -d name_image:tag
docker run -p 49160:8080 --name node_app_cont -d node_app_image:1

docker ps

docker logs id_container

docker stop name_container

docker ps -a
docker rm -f id_container

docker images
docker rmi name_image:tag

## Estructura de proyecto en Node
package.json    -> dependencias
app.js          -> servidor web configurado con express
index.js        -> conexion base de datos