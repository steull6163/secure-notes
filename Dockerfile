FROM openjdk:latest
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
ARG LIBS=target/*.lib
COPY ${LIBS} libs
CMD cd /
EXPOSE 8080
ENTRYPOINT ["java","-cp","/libs","-jar","/app.jar"]

