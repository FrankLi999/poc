<template>
  <div class="service">
    <h1>{{ msg }}</h1>
    <h2>Websocket call results</h2>

    <button @click="callWebsocket()">Connect to Spring Boot Websocket service</button>
    <button @click="send()">Send a message to Spring Boot Websocket service</button>
    <h4>Backend response: {{ response }}</h4>

  </div>
</template>
<script>
  // import SockJS from 'sockjs-client'
  // import Stomp from 'webstomp-client'

  export default {
    name: 'websocket',
    data () {
      return {
        msg: 'HowTo call Websocket:',
        response: [],
        errors: [],
        invokeIdCnt: 0
      }
    },
    /*
    computed: {
      stompClient () {
        const socket = new SockJS('/boot-websocket')
        const stompClient = Stomp.over(socket)
        return stompClient
      }
    },
    */
    methods: {
      onConnected (frame) {
        console.log('Connected: ' + frame)
        // this.$stompClient.subscribe('/topic/greetings', function (greeting) {
        //  console.log('>>>>>>>>>>>>>>>>>greeting')
        //  console.log(greeting)
        // })
        this.$stompClient.subscribe('/topic/greetings', this.responseCallback, this.onFailed)
        // this.stompClient.subscribe('/topic/greetings', function (greeting) {
        //  console.log('>>>>>>>>>>>>>>>>>greeting')
        //  console.log(greeting)
        // })
      },
      onFailed (frame) {
        console.log('Failed: ' + frame)
      },
      callWebsocket () {
        // this.stompClient.connect({}, this.onConnected) //, this.onFailed)
        this.connetWM('/boot-websocket', {}, this.onConnected, this.onFailed)
      },
      getInvokeId () {
        let hex = (this.invokeIdCnt++).toString(16)
        var zero = '0000'
        var tmp = 4 - hex.length
        return zero.substr(0, tmp) + hex
      },
      send () {
        let destination = '/app/hello'
        let invokeId = this.getInvokeId()
        let body = JSON.stringify({'name': 'Frank Li', 'invokeId': invokeId})
        this.sendWM(destination, body, invokeId, this.responseCallback, 3000)
        // this.$stompClient.send(destination, body)
        // this.stompClient.send(destination, body)
      },
      responseCallback (frame) {
        console.log('responseCallback msg=>')
        console.log(frame)
        // let invokeId = frame.body.invokeId
        // this.removeStompMonitor(invokeId)
      },
      disconnect () {
        this.disconnetWM()
        // this.stompClient.disconnect()
      }
    },
    stompClient: {
      monitorIntervalTime: 100,
      stompReconnect: true,
      timeout (orgCmd) {
        console.log('timeout - ' + orgCmd)
      }
    }
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
