import csv
import json

def convert_weather_csv():
    weather_data = {}
    
    with open('../chongqing_weather_2025.csv', 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader) # Skip header
        
        for row in reader:
            if len(row) < 6: continue
            
            date_str = row[0] # 2025-01-01
            high_temp = row[1]
            low_temp = row[2]
            weather = row[3]
            
            # Convert date to 20250101 format
            key = date_str.replace('-', '')
            
            # Format temperature range
            temp_range = f"{low_temp} - {high_temp}"
            
            weather_data[key] = {
                "w": weather,
                "t": temp_range
            }
            
    with open('cq_weather_2025.js', 'w', encoding='utf-8') as f:
        f.write('const WEATHER_DB = ')
        json.dump(weather_data, f, ensure_ascii=False, indent=0)
        f.write(';')
        
    print(f"Converted {len(weather_data)} daily records.")

if __name__ == "__main__":
    convert_weather_csv()
