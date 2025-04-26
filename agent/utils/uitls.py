import random


async def get_first_photo_url_async(session, keywords, key):
    url = "https://restapi.amap.com/v5/place/text"
    params = {
        "key": key,
        "keywords": keywords,
        "show_fields": "photos"
    }
    
    try:
        async with session.get(url, params=params, timeout=40) as response:
            data = await response.json()

            if data.get("status") == "1" and data.get("pois"):
                poi = random.choice(data.get("pois"))
                photos = poi.get("photos", [])
                if photos:
                    photo = random.choice(photos)
                    return photo.get("url", '')
            return ''
    except Exception as e:
        print(f"获取图片出错了：{e}")
        return ''
