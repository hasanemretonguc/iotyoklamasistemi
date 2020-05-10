#include <WiFiClientSecure.h> // HTTPS CLIENT

#include <ArduinoJson.h>

WiFiClientSecure client; // HTTPS

const char *server = "nodeattapi.herokuapp.com";                                          // SUNUCU ADRES
const char fingerprint[] = "08 3B 71 72 02 43 6E CA ED 42 86 93 BA 7E DF 81 C4 BC 62 30"; // SSL KEY
const int port = 443;                                                                     // SUNUCU PORT

extern const unsigned char caCert[]; // SSL
extern const unsigned int caCertLen; // SSL

void StartConnection()
{
    bool connectStat = false;
    while (!connectStat)
    {
        connectStat = client.connect(server, port);
        if (connectStat)
        {
            Serial.println("Bağlanıyor!");
        }
        else
        {
            write_LCD("Sunucu: Hata    ");
            delay(500);
        }
    }
}

void StopConnection()
{
    client.stop();
}

void CertificateVerify()
{
    client.setFingerprint(fingerprint);
    client.setTimeout(15000);
    write_LCD("Sunucu: Sertifi.");
    delay(500);
    StartConnection();
    delay(3000);
    bool cerVer = false;
    while (!cerVer)
    {
        cerVer = client.verify(fingerprint, server);
        if (cerVer)
        {
            write_LCD("Sunucu: Aktif     ");
        }
        else
        {
            write_LCD("Sunucu: NoCertif");
            delay(1000);
            write_LCD("Sunucu: Tekrar!!   ");
        }
    }
    StopConnection();
}

void TestServer()
{
    delay(500);
    StartConnection();
    String url = "/api/v1/areyoualive";
    write_LCD("Sunucu:CevapBek.");
    if (SendRequest(url) == "Yes")
    {
        write_LCD("  Bekleyiniz!        ");
    }
    StopConnection();
    delay(2000);
}

String SendRequest(String url)
{
    delay(2000);
    Serial.println(url);
    String responce = "";
    StartConnection();
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: " + server + "\r\n" +
                 "User-Agent: BuildFailureDetectorESP8266\r\n" +
                 "Connection: close\r\n\r\n");
    int timeout = millis() + 5000;
    while (client.available() == 0)
    {
        if (timeout - millis() < 0)
        {
            Serial.println(">>> Zaman Aşımı !");
            return "Hata!";
        }
    }
    while (client.available())
    {
        responce = client.readStringUntil('\n');
        Serial.println(responce);
    }
    Serial.println("Yanıt: " + responce);
    StopConnection();
    return responce;
}