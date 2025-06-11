# Dockerfile
FROM python:3.11-slim

# 设置工作目录
WORKDIR /app

# 复制当前文件夹内容到容器
COPY ./app /app

# 设置容器启动时默认执行的命令
CMD ["python", "main.py"]
