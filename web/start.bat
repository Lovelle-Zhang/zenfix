@echo off
chcp 65001 >nul
echo ========================================
echo Zenfix 启动脚本
echo ========================================
echo.

cd /d C:\Users\ALIENWARE\.openclaw\workspace\projects\zenfix\web
if errorlevel 1 (
    echo 错误: 无法进入目录
    pause
    exit /b 1
)

echo 当前目录: %CD%
echo.

where npm >nul 2>&1
if errorlevel 1 (
    echo 错误: 未找到npm命令
    echo 请先安装Node.js: https://nodejs.org/
    pause
    exit /b 1
)

echo 检查package.json...
if not exist package.json (
    echo 错误: 未找到package.json
    pause
    exit /b 1
)

echo.
echo 正在安装依赖...
call npm install
if errorlevel 1 (
    echo 错误: npm install 失败
    pause
    exit /b 1
)

echo.
echo 正在启动服务器...
echo 启动后请访问: http://localhost:3000
echo 按 Ctrl+C 可停止服务器
echo.
call npm start

pause
