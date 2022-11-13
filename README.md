# Secret Notes

Tech decisions:
* latest LTS Java 17
* latest Spring Boot 2.75
* Spring data, jpa, autoconfigure, test
* Lombok -> no boilerplate
* Tomcat -> included
* h2 -> lightweight and easy

Sec decisions:
* plain text upload/download -> BAD
* plain text storage on server -> BAD
* encryption key on server -> BAD
* => NO unencrypted data transfer!
* => NO unencrypted data on the server!
* => NO encryption keys on the server!
* => Client side encryption with public key

Alg desicions: