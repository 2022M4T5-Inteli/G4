int web(float temp,float umi){
  WiFiClient client = server.available();
  if (client) {
    Serial.println("New Client.");
    String currentLine = "";
    //while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        Serial.write(c);

            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println();
            client.print("tempretura atual:"+String(temp));
            client.print("umidade atual:" + String(umi));
            client.println();  
      }
            /*
        if (c == '\n') {
          if (currentLine.length() == 0) {
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/html");
            client.println();
            client.print("tempretura atual:"+String(temp));
            client.print("umidade atual:" + String(umi));
            client.println();
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\r') {
          currentLine += c;
        }
    }
    //client.stop();
  */  //Serial.println("Client Disconnected.");
  }
}