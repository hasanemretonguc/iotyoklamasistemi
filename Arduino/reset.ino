int error = 15;

void ErrorCount()
{
    if (error <= 0)
    {
        write_LCD("Çok fazla hata oldu!");
        delay(1500);
        Reset();
    }
    error--;
}

void Reset()
{
    ESP.restart();
}
