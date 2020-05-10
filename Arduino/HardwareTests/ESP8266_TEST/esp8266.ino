#include <ESP8266WiFi.h>

void setup()
{
    Serial.begin(115200);
    Serial.println();

    WiFi.begin("Private", "tonguc001");

    Serial.print("Connecting");
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println();

    Serial.print("Connected, IP address: ");
    Serial.println(WiFi.localIP());
}

void loop()
{
    delay(5000);
    Serial.println(WiFi.localIP());
}