all: docker
docker:
	sudo docker run --name blabla1 -it -P angelcervera/docker-hadoop:2.7.1-single
mongo:
	mongoimport -d BigData -c Players --type csv --file PlayerPersonalDataM.csv --headerline
