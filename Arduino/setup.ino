void setup()
{
    setupArduino();
    nextProcessBar(2);
    setupLCD();
    nextProcessBar(3);
    nextProcessBar(2);
    setupRFID();
    nextProcessBar(3);
    nextProcessBar(2);
    ConnectWifi();
    nextProcessBar(3);
    nextProcessBar(2);
    SyncClock();
    nextProcessBar(3);
    nextProcessBar(2);
    CertificateVerify();
    nextProcessBar(3);
    nextProcessBar(2);
    TestServer();
    nextProcessBar(3);
    nextProcessBar(2);
    GetMaster();
    nextProcessBar(3);
    nextProcessBar(2);
    StartList();
    nextProcessBar(3);
    delay(1000);
    clearLCD();
}

void setupArduino()
{
    Serial.begin(115200);
}