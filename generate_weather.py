import json
import random
import datetime

def generate_weather_data():
    weather_data = {}
    
    # 重庆气候特征配置
    # 月份: [平均低温, 平均高温, 主要天气概率(晴, 多云, 阴, 雨, 雾)]
    climate_profile = {
        1: [6, 10, [0.1, 0.2, 0.4, 0.2, 0.1]],    # 一月：阴冷
        2: [7, 12, [0.1, 0.2, 0.4, 0.2, 0.1]],
        3: [11, 17, [0.2, 0.3, 0.3, 0.2, 0.0]],
        4: [15, 22, [0.2, 0.3, 0.3, 0.2, 0.0]],
        5: [19, 27, [0.3, 0.3, 0.2, 0.2, 0.0]],
        6: [22, 29, [0.3, 0.3, 0.1, 0.3, 0.0]],   # 六月：雨季
        7: [25, 33, [0.5, 0.3, 0.1, 0.1, 0.0]],   # 七月：热
        8: [25, 34, [0.6, 0.3, 0.0, 0.1, 0.0]],   # 八月：伏旱
        9: [21, 28, [0.4, 0.3, 0.1, 0.2, 0.0]],   # 九月：华西秋雨
        10: [16, 22, [0.2, 0.3, 0.3, 0.2, 0.0]],
        11: [12, 17, [0.2, 0.2, 0.4, 0.2, 0.0]],
        12: [7, 11, [0.1, 0.1, 0.5, 0.2, 0.1]]    # 十二月：冬雾
    }
    
    weather_types = ["晴", "多云", "阴", "小雨", "雾"]
    
    start_date = datetime.date(2025, 1, 1)
    end_date = datetime.date(2025, 12, 31)
    delta = datetime.timedelta(days=1)
    
    curr_date = start_date
    while curr_date <= end_date:
        month = curr_date.month
        profile = climate_profile[month]
        
        # 温度波动
        base_low, base_high = profile[0], profile[1]
        temp_low = base_low + random.randint(-3, 3)
        temp_high = base_high + random.randint(-3, 4)
        if temp_high <= temp_low: temp_high = temp_low + 1
        
        # 天气判定
        weather = random.choices(weather_types, weights=profile[2])[0]
        
        # 修正逻辑：如果是雨天，温差会小；如果是晴天，温差大
        if weather == "晴":
            temp_high += 2
        elif weather in ["小雨", "雾", "阴"]:
            temp_high -= 1
            
        date_str = curr_date.strftime("%Y%m%d")
        
        weather_data[date_str] = {
            "w": weather,
            "t": f"{temp_low}°C - {temp_high}°C"
        }
        
        curr_date += delta
        
    return weather_data

data = generate_weather_data()
with open('cq_weather_2025.js', 'w', encoding='utf-8') as f:
    f.write('const WEATHER_DB = ')
    json.dump(data, f, ensure_ascii=False, indent=0)
    f.write(';')

print("Weather data generated.")
