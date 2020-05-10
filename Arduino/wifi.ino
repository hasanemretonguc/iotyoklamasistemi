#include <ESP8266WiFi.h> // WIFI

#define ssid "Private"   // Wifi Adı
#define pass "tonguc001" // Wifi Şifre

void ConnectWifi()
{
    // BASLA
    WiFi.begin(ssid, pass);
    String strssid = String(ssid);
    write_LCD(strssid + " araniyor!");
    // ARAMA
    bool isFind = false;
    while (!isFind)
    {
        delay(500);
        int numberOfNetworks = WiFi.scanNetworks();
        for (int i = 0; i < numberOfNetworks; i++)
        {
            if (strssid == WiFi.SSID(i))
            {
                write_LCD(strssid + " bulundu!");
                isFind = true;
            }
        }
        if (!isFind)
        {
            write_LCD(strssid + " bulunamadi.");
        }
    }
    // BAGLANTI
    write_LCD(strssid + " baglaniliyor!");
    String i;
    int time = 0;
    while (WiFi.waitForConnectResult() != WL_CONNECTED)
    {
        if (time >= 10000)
        {
            delay(200);
            time = 0;
            lcd.setCursor(15, 0);
            lcd.write(5);
            write_LCD(strssid);
            WiFi.reconnect();
            delay(100);
            write_LCD(strssid);
        }
        else
        {
            lcd.setCursor(15, 0);
            lcd.print(" ");
            delay(100);
            lcd.setCursor(0, 0);
            lcd.print(strssid + "                ");
            lcd.setCursor(15, 0);
            lcd.write(5);
            time += 1500;
        }
    }
    write_LCD("IP:" + WiFi.localIP().toString());
}