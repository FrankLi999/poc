curl http://localhost:8080/person -v -u tom:password
curl http://localhost:8080/person/{id} -v -u tom:password
curl http://localhost:8080/person -X POST -d '{"name":"John Doe","age":20}' -H "Content-Type:application/json" -v -u tom:password


curl http://localhost:8080/person -X POSTc-d '{"name":"John Doe","age":20}'                                   -H "Content-Type: application/json" -v -u tom:password