async def get_first_photo_url_async(session, keywords, key):
    """
    异步获取搜索结果中第一个地点的第一张照片的 URL。
    """
    url = "https://restapi.amap.com/v5/place/text"
    params = {
        "key": key,
        "keywords": keywords,
        "show_fields": "photos"
    }

    try:
        async with session.get(url, params=params, timeout=5) as response:
            data = await response.json()

            if data.get("status") == "1" and data.get("pois"):
                photos = data["pois"][0].get("photos", [])
                if photos:
                    return photos[0].get("url", '')
            return ''
    except Exception:
        return ''