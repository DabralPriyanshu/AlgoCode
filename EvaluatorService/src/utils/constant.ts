export const PYTHON_IMAGE = "python:3.8-slim";
export const JAVA_IMAGE = "eclipse-temurin:11-jdk";

//this will represent the header size of docker stream
// docker stream header will contain data about type of  stdout/stderr and the length of data 4 byte for type 4 for length of data of chunk value except header
export const DOCKER_STREAM_HEADER_SIZE = 8; // in bytes
