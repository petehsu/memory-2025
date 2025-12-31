#!/usr/bin/env python3
"""
图片压缩脚本：将原图压缩成适合Web的缩略图
"""
import os
import shutil
from PIL import Image
import concurrent.futures

SOURCE_DIR = '/home/petehsu/Documents/2025'
DEST_DIR = '/home/petehsu/Documents/2025/memory-2025'
ORIGINALS_DIR = os.path.join(DEST_DIR, 'originals')
IMAGES_DIR = os.path.join(DEST_DIR, 'images')

# 缩略图设置 - 更高质量
MAX_SIZE = (1600, 1200)  # 更大尺寸，更清晰
QUALITY = 92  # 更高JPEG质量

def process_image(src_path, month_folder, filename):
    """处理单张图片：复制原图 + 生成缩略图"""
    try:
        # 创建月份文件夹
        orig_month_dir = os.path.join(ORIGINALS_DIR, month_folder)
        img_month_dir = os.path.join(IMAGES_DIR, month_folder)
        os.makedirs(orig_month_dir, exist_ok=True)
        os.makedirs(img_month_dir, exist_ok=True)
        
        # 复制原图
        orig_dest = os.path.join(orig_month_dir, filename)
        if not os.path.exists(orig_dest):
            shutil.copy2(src_path, orig_dest)
        
        # 生成缩略图
        thumb_dest = os.path.join(img_month_dir, filename)
        if not os.path.exists(thumb_dest):
            with Image.open(src_path) as img:
                # 转换为RGB（处理可能的RGBA图片）
                if img.mode in ('RGBA', 'P'):
                    img = img.convert('RGB')
                
                # 调整尺寸
                img.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
                
                # 保存
                img.save(thumb_dest, 'JPEG', quality=QUALITY, optimize=True)
        
        return f"✓ {month_folder}/{filename}"
    except Exception as e:
        return f"✗ {month_folder}/{filename}: {e}"

def main():
    # 收集所有需要处理的图片
    tasks = []
    
    for month in ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']:
        month_dir = os.path.join(SOURCE_DIR, month)
        if os.path.exists(month_dir):
            for f in os.listdir(month_dir):
                if f.lower().endswith('.jpg'):
                    src_path = os.path.join(month_dir, f)
                    tasks.append((src_path, month, f))
    
    print(f"Found {len(tasks)} images to process...")
    
    # 并行处理
    processed = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        futures = [executor.submit(process_image, *task) for task in tasks]
        for future in concurrent.futures.as_completed(futures):
            result = future.result()
            processed += 1
            if processed % 20 == 0 or processed == len(tasks):
                print(f"Progress: {processed}/{len(tasks)}")
    
    print("\nDone!")
    
    # 统计
    total_orig = sum(os.path.getsize(os.path.join(ORIGINALS_DIR, m, f)) 
                     for m in os.listdir(ORIGINALS_DIR) if os.path.isdir(os.path.join(ORIGINALS_DIR, m))
                     for f in os.listdir(os.path.join(ORIGINALS_DIR, m)))
    total_thumb = sum(os.path.getsize(os.path.join(IMAGES_DIR, m, f)) 
                      for m in os.listdir(IMAGES_DIR) if os.path.isdir(os.path.join(IMAGES_DIR, m))
                      for f in os.listdir(os.path.join(IMAGES_DIR, m)))
    
    print(f"\nOriginals total: {total_orig / 1024 / 1024:.1f} MB")
    print(f"Thumbnails total: {total_thumb / 1024 / 1024:.1f} MB")
    print(f"Compression ratio: {total_thumb / total_orig * 100:.1f}%")

if __name__ == '__main__':
    main()
