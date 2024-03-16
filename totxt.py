import os

# 定义分隔符
separator = "\n" + "-" * 50 + "\n" + "\n"

# 创建一个空的 combined.txt 文件
with open('combined.txt', 'w') as outfile:
    # 使用 os.walk 遍历当前目录及其所有子目录中的 .js 文件
    for root, dirs, files in os.walk("."):
        for file in files:
            if file.endswith(".js"):
                # 将 .js 文件的内容追加到 combined.txt 文件
                with open(os.path.join(root, file), 'r') as infile:
                    outfile.write(infile.read())
                    # 在每个文件之间添加一个换行符，分隔符，然后另一个换行符
                    outfile.write(separator)