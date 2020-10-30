## Start the mail server

   > cd C:\tools\FakeSMTP-2.0\target
   > java -jar fakeSMTP-2.0.jar -s -p 2525 -a 127.0.0.1
   
## Start the app

   > mvn clean install -DskipTests
   > mvn spring-boot:run   