#include <LiquidCrystal_I2C.h> // LCD

#define LCD_LOC 0x27 // I2C için lcd başlangıç adresi
#define LCD_COL 16   // LCD SUTUN
#define LCD_ROW 2    // LCD SATIR
#define LCD_SDA 4    // LCD SDA PINI
#define LCD_SCL 5    // LCD SCL PINI

LiquidCrystal_I2C lcd(LCD_LOC, LCD_COL, LCD_ROW); // LCD

int stat = 4;
int instat = 0;
String previousText;

void setupLCD()
{
    lcd.begin();
    lcd.backlight();
    write("Hosgeldiniz!");
    delay(500);
    lcd.createChar(0, p1);
    write("Yukleniyor!.");
    lcd.createChar(1, p2);
    write("Yukleniyor!..");
    lcd.createChar(2, p3);
    lcd.createChar(3, p4);
    lcd.createChar(4, p5);
    lcd.createChar(5, wait);
    write("Yukleniyor!...");
    lcd.home();
    lcd.setCursor(0, 0);
    write(clientname + "             ");
}

void write_LCD(String line)
{
    delay(500);
    lcd.setCursor(0, 0);
    lcd.print(line);
    Serial.println(line);
}

void write_LCD(String lineone, String linetwo)
{
    delay(500);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print(lineone);
    lcd.setCursor(0, 1);
    lcd.print(linetwo);

    write_Serial(lineone + linetwo);
}

void write_Serial(String line)
{
    if (previousText != line)
    {
        Serial.println(line);
        previousText = line;
    }
}

void write(String line)
{
    nextProcessBar();
    write_LCD(line);
}

void write(String lineone, String linetwo)
{
    nextProcessBar();
    write_LCD(lineone, linetwo);
}

void nextProcessBar()
{
    if (stat <= 12)
    {
        lcd.setCursor(3, 1);
        lcd.print("[");
        lcd.setCursor(12, 1);
        lcd.print("]");
        if (instat < 5)
        {
            lcd.setCursor(stat, 1);
            lcd.write(instat);
            delay(100);
            instat++;
        }
        else
        {
            instat = 0;
            stat++;
        }
    }
    else
    {
        lcd.clear();
        stat = 4;
        instat = 0;
    }
}

void nextProcessBar(int steps)
{
    for (size_t i = 0; i < steps; i++)
    {
        nextProcessBar();
    }
}

void backProcessBar()
{
    instat--;
    lcd.setCursor(stat, 1);
    lcd.write(instat);
}

void clearLCD()
{
    write_LCD("               ", "                  ");
}
