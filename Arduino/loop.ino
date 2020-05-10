void loop()
{
    clearLCD();
    if (GetCard())
    {
        write_LCD("Bekleyin!             ");
        delay(500);
        RegisterUserToList();
        delay(100);
    }
}