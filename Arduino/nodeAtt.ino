String name = "";
String listName;
String className = "";
String ID = "";
String uid;

void GetMaster()
{
    int state = 0;
    bool isDone = false;
    while (!isDone)
    {
        switch (state)
        {
        case 0:
            if (GetCard())
            {
                state = 1;
            }
            break;
        case 1:
            if (GetUserInfo())
            {
                isDone = !isDone;
            }
            else
            {
                state = 0;
                write_LCD("Geçersiz Kart!");
            }
            break;
        }
    }
    delay(2000);
}

bool GetUserInfo()
{
    write_LCD("  Bekleyiniz!     ");
    String url = "/api/list/getuserinfo?iotName=" + clientname + "&key=" + deviceKey + "&cardNo=" + uid;
    uid = "";
    String payload;
    while (payload.isEmpty())
    {
        payload = SendRequest(url);
        if (payload == "false")
        {
            write_LCD("Hata oldu!       ");
            ErrorCount();
        }
        else
        {
            DynamicJsonDocument doc(1024);
            deserializeJson(doc, payload);
            ID = doc["_id"].as<String>();
            name = doc["name"].as<String>();
            className = doc["className"].as<String>();
        }
    }

    return IsIDFetched();
}

bool IsIDFetched()
{
    if (ID.isEmpty() == true)
    {
        return false;
    }
    else
    {
        return true;
    }
}

void StartList()
{
    while (listName.isEmpty())
    {
        write_LCD("Liste baslatiliyor!     ");
        String url = "/api/list/generateListName?iotName=" + clientname + "&key=" + deviceKey + "&User=" + ID;
        delay(1000);
        write_LCD(name);
        delay(1000);
        write_LCD("Yukleniyor");
        listName = SendRequest(url);
        if (listName.isEmpty())
        {
            write_LCD("Liste: Hata oldu!");
            ErrorCount();
        }
        else
        {
            write_LCD("Liste hazir!          ");
            listName.replace("_", "");
        }
    }
}

void RegisterUserToList()
{
    String url = "/api/list/register?iotName=" + clientname + "&key=" + deviceKey + "&User=" + ID + "&listName=" + listName + "&className=" + className + "&PersonelCardNo=" + uid;
    String responce;
    while (responce.isEmpty())
    {
        responce = SendRequest(url);
        if (responce.isEmpty())
        {
            write_LCD("", responce);
            ErrorCount();
        }
        else
        {
            write_LCD("", responce);
        }
    }
}
