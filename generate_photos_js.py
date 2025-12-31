#!/usr/bin/env python3
"""
生成 photos.js 文件，包含所有照片的数据
"""
import os
import json

IMAGES_DIR = '/home/petehsu/Documents/2025/memory-2025/images'
OUTPUT_FILE = '/home/petehsu/Documents/2025/memory-2025/photos.js'

# GitHub raw URL base (will be updated after push)
# For local testing, use relative path
USE_LOCAL = True
GITHUB_USER = 'YOUR_USERNAME'
REPO_NAME = 'memory-2025'
BRANCH = 'main'

def get_image_url(month, filename):
    if USE_LOCAL:
        return f'images/{month}/{filename}'
    else:
        return f'https://raw.githubusercontent.com/{GITHUB_USER}/{REPO_NAME}/{BRANCH}/images/{month}/{filename}'

def main():
    photos = []
    
    for month in ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']:
        month_dir = os.path.join(IMAGES_DIR, month)
        if os.path.exists(month_dir):
            files = sorted([f for f in os.listdir(month_dir) if f.lower().endswith('.jpg')])
            for f in files:
                # Extract date from filename (e.g., 20250101.jpg -> 2025-01-01)
                if len(f) >= 12 and f[:8].isdigit():
                    year = f[0:4]
                    m = f[4:6]
                    day = f[6:8]
                    date_str = f'{year}-{m}-{day}'
                else:
                    date_str = f'{month}/?'
                
                photos.append({
                    'src': get_image_url(month, f),
                    'date': date_str
                })
    
    # Write JavaScript file
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
        out.write('// Auto-generated photo data\n')
        out.write(f'const PHOTOS = {json.dumps(photos, indent=2, ensure_ascii=False)};\n')
    
    print(f'Generated {OUTPUT_FILE} with {len(photos)} photos')

if __name__ == '__main__':
    main()
