# Secure Notes

A simple Spring Boot Application for creating and storing text notes that are securely encrypted.
The Application consists of a Spring REST Service with a database and an angular frontend, all within an executable jar.
The question of how to provide security for the content is to be answered.
Reasons for the decisions made according to the software design are stated below.

Requirements:
* The user should be able to post notes to an endpoint of the API and store it in a database in an encrypted format.
* The user should then be able to retrieve these notes in a readable format.
* The user should also be able to see the notes in the encrypted format.

Tech decisions:
* latest LTS Java 17
* latest Spring Boot 2.75
* Spring data, jpa, autoconfigure, test
* Lombok -> no boilerplate
* Tomcat -> included
* h2 -> lightweight and easy
* angular 14.2.9 
* node 18.12.1  

Sec decisions:
* plain text upload/download -> BAD
* plain text storage on server -> BAD
* encryption key on server -> BAD
* => NO unencrypted data transfer!
* => NO unencrypted data on the server!
* => NO encryption keys on the server!
* => Client side encryption with public key

Alg desicions:
