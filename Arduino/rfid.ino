#include <MFRC522.h> // RFID

#define RST_PIN 0 // RFID RST PINI
#define SS_PIN 2  // RFID SDA PINI

MFRC522 mfrc522(SS_PIN, RST_PIN); // RFID

void setupRFID()
{
    write("RFID Aciliyor!");
    delay(200);
    write("RFID Bekleyin!");
    SPI.begin();
    mfrc522.PCD_Init();
    write("RFID Yukleniyor!");
    mfrc522.PCD_DumpVersionToSerial();
}

String getUID()
{
    delay(500);
    String uid;
    if (!mfrc522.PICC_IsNewCardPresent())
    { // EGER KART VARSA DONGUYE DEVAM ETSIN
        return uid;
    }
    if (!mfrc522.PICC_ReadCardSerial())
    { // EGER KARTLARIN KODU OKUNABILIYORSA DEVAM ETSIN
        delay(200);
        return uid;
    }
    // KARTIN OKUNAN SERIAL NUMARASINI 8 HANELI HEX'e CEVIRIYOR
    for (byte i = 0; i < mfrc522.uid.size; i++)
    {
        uid.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
        uid.concat(String(mfrc522.uid.uidByte[i], HEX));
    }
    return uid.substring(1);
}

bool GetCard()
{
    bool isUID = false;
    while (!isUID)
    {
        write_LCD("Kartinizi okutun!       ");
        uid = getUID();
        isUID = !uid.isEmpty();
    }
    uid.replace(" ", "");
    write_LCD("Kart: " + uid + "         ");
    return true;
}
