import os

# 创建一个空的 files.md 文件
with open('files.md', 'w') as outfile:
    # 使用 os.walk 遍历当前目录及其所有子目录中的 .js, .sql 和 .env 文件
    for root, dirs, files in os.walk("."):
        for file in files:
            if file.endswith((".js", ".sql", ".env")):
                # 将 .js, .sql 和 .env 文件的名称和路径以Markdown格式写入 files.md 文件
                path = os.path.join(root, file)
                outfile.write(f'- **File Name:** {file}\n')
                outfile.write(f'  - **Path:** {path}\n')