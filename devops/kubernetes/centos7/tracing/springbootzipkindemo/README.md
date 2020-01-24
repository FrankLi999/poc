#Test

cd useraddress-service
mvn spring-boot:run

cd username-service
mvn spring-boot:run

cd usergreeting-service
mvn spring-boot:run

curl http://user-greeting-service:3000/api/user/greet