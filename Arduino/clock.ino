#include <time.h> // Clock

void SyncClock()
{
    write_LCD("Saat ayarlaniyor!!");
    configTime(8 * 3600, 0, "pool.ntp.org", "time.nist.gov");
    time_t now = time(nullptr);
    String dot = ".";
    while (now < 8 * 3600 * 2)
    {
        delay(500);
        now = time(nullptr);
        write_LCD("Saat " + dot);
        dot += (dot.length() >= 11) ? "." : dot;
    }
    struct tm timeinfo;
    gmtime_r(&now, &timeinfo);
    write_LCD(asctime(&timeinfo));
}